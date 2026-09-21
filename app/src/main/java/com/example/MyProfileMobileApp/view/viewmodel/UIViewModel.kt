package com.example.MyProfileMobileApp.view.viewmodel

import android.util.Log
import androidx.lifecycle.ViewModel
import com.example.MyProfileMobileApp.controller.server.AwsConnectHelper
import com.example.MyProfileMobileApp.controller.history.PostHistoryController
import com.example.MyProfileMobileApp.model.card.TransitHistory
import com.example.MyProfileMobileApp.model.login.Credentials
import com.example.MyProfileMobileApp.model.post.dto.Post
import com.example.MyProfileMobileApp.utils.TLog
import com.example.MyProfileMobileApp.utils.TLog_Sync
import com.example.MyProfileMobileApp.utils.TarGzMaker
import com.example.MyProfileMobileApp.utils.UrlConstants.AI_CHAT_API_URL
import com.example.MyProfileMobileApp.utils.UrlConstants.BALANCE_API_URL_LOCAL_HOST
import com.example.MyProfileMobileApp.utils.UrlConstants.BALANCE_URL
import com.example.MyProfileMobileApp.utils.UrlConstants.DETAIL_PROFILE_API_URL
import com.example.MyProfileMobileApp.utils.UrlConstants.LOGIN_API_URL
import com.example.MyProfileMobileApp.utils.UrlConstants.UPLOAD_API_URL
import com.example.MyProfileMobileApp.model.quiz.QuizSet
import com.example.MyProfileMobileApp.model.quiz.QuizAttempt
import com.example.MyProfileMobileApp.utils.QuizRepository
import com.example.MyProfileMobileApp.utils.QuizAttemptStore
import android.content.Context
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

class UIViewModel: ViewModel() {
    val TAG: String = "UIViewModel"
    //Ui State
    private val _uiState = MutableStateFlow(UiState())
    val uiState: StateFlow<UiState> = _uiState.asStateFlow()
    private var appContext: Context? = null

    var loadedIDList: List<Int> = mutableListOf(0)
        private set
    var errorIDList: List<String> = mutableListOf()
        private set

    var isUpdated: Boolean = false

        private set

    fun loadQuizData(context: Context) {
        appContext = context.applicationContext
        val sets = QuizRepository.loadBundledQuizSets(context)
        _uiState.update { it.copy(quizSets = sets, quizAttempts = QuizAttemptStore.load(context), screenID = ScreenID.HOME) }
    }

    fun openQuizSetup(quiz: QuizSet) {
        _uiState.update { it.copy(selectedQuiz = quiz, screenID = ScreenID.QUIZ_SETUP) }
    }

    fun showQuizList() {
        _uiState.update { it.copy(screenID = ScreenID.HOME, selectedQuiz = null, answerSubmitted = false) }
    }

    fun startQuiz(randomizeQuestions: Boolean, randomizeAnswers: Boolean, mode: String, count: Int, start: Int, end: Int) {
        val quiz = _uiState.value.selectedQuiz ?: return
        val bounded = if (mode == "random") {
            quiz.questions.shuffled().take(count.coerceIn(1, quiz.questions.size))
        } else {
            val safeStart = (start - 1).coerceIn(0, (quiz.questions.size - 1).coerceAtLeast(0))
            val safeEnd = end.coerceIn(safeStart + 1, quiz.questions.size)
            quiz.questions.subList(safeStart, safeEnd)
        }
        val questions = if (randomizeQuestions && mode == "range") bounded.shuffled() else bounded
        _uiState.update { it.copy(quizQuestions = questions.map { q -> if (randomizeAnswers && q.options.isNotEmpty()) q.copy(options = q.options.shuffled()) else q }, quizIndex = 0, selectedAnswers = emptySet(), answerSubmitted = false, correctAnswersCount = 0, screenID = ScreenID.QUIZ_RUN) }
    }

    fun selectAnswer(answer: String) {
        if (_uiState.value.answerSubmitted) return
        _uiState.update { state ->
            val question = state.quizQuestions.getOrNull(state.quizIndex)
            val next = if (question?.isMultiSelect == true) {
                if (state.selectedAnswers.contains(answer)) state.selectedAnswers - answer else state.selectedAnswers + answer
            } else setOf(answer)
            state.copy(selectedAnswers = next)
        }
    }

    fun submitAnswer() {
        val state = _uiState.value
        val question = state.quizQuestions.getOrNull(state.quizIndex) ?: return
        val isCorrect = state.selectedAnswers == question.correctAnswers
        _uiState.update { it.copy(answerSubmitted = true, correctAnswersCount = it.correctAnswersCount + if (isCorrect) 1 else 0) }
    }

    fun jumpToQuestion(index: Int) {
        if (index in _uiState.value.quizQuestions.indices) {
            _uiState.update { it.copy(quizIndex = index, selectedAnswers = emptySet(), answerSubmitted = false) }
        }
    }

    fun nextQuestion() {
        val next = _uiState.value.quizIndex + 1
        if (next >= _uiState.value.quizQuestions.size) finishQuiz()
        else _uiState.update { it.copy(quizIndex = next, selectedAnswers = emptySet(), answerSubmitted = false) }
    }

    private fun finishQuiz() {
        val state = _uiState.value
        val quiz = state.selectedQuiz ?: return
        val attempt = QuizAttempt(quiz.id, quiz.title, state.correctAnswersCount, state.quizQuestions.size, System.currentTimeMillis())
        val attempts = (state.quizAttempts + attempt).sortedByDescending { it.completedAt }.take(50)
        appContext?.let { QuizAttemptStore.append(it, attempt) }
        _uiState.update { it.copy(quizAttempts = attempts, screenID = ScreenID.HOME, selectedQuiz = null, answerSubmitted = false) }
    }
    fun update() {
        if (isUpdated) return
        loadFromDB()
    }

    private fun loadFromDB() {
        PostHistoryController.get(5) { result ->
            _uiState.update { currentState ->
                currentState.copy(historyPost = result)
            }
            isUpdated = true
            Log.d(TAG,"data base have $result")
        }
    }

    fun loadTransitList(list: List<TransitHistory>) {
            _uiState.update { currentState ->
                currentState.copy(historyTransitList = list)
            }
    }
    private fun addDB(post: Post) {
        PostHistoryController.set(post, System.currentTimeMillis())
    }

    fun load(id: Int){
//        if(loadedIDList.contains(id)) {//Avoid duplicate
//            moveToDetail()
//            TLog.d(TAG,"Load with duplicate id")
//            return
//        }
        TLog_Sync.d(TAG,"Load new id")
        loadDetailProfile(id)
    }
    private fun loadDetailProfile(id: Int){
        loadedIDList += id
        AwsConnectHelper.getInstance().fetchDetailProfile(id, DETAIL_PROFILE_API_URL) { result ->
            Log.d(TAG,"result is $result")
            moveToDetail()
            _uiState.update { currentState ->
                currentState.copy(loadedDetailPost = result)
            }
            addDB(post = result)
            Log.d(TAG,"loadedDetailPost is ${_uiState.value.loadedDetailPost}")
        }
    }
    fun loadAIMessageResponse(message: String){
        AwsConnectHelper.getInstance().postRequestMessageToAI(message, AI_CHAT_API_URL) { result ->
            Log.d(TAG,"result is $result")
            moveToAIChatBoxDetail()
            _uiState.update { currentState ->
                currentState.copy(loadedMessageFromAI = result)
            }
            Log.d(TAG,"loadedDetailPost is ${_uiState.value.loadedMessageFromAI}")
        }
    }
    fun uploadLog() {
        Log.d(TAG, "Make TarGz file")
        TarGzMaker.createTarGzFromCsv("/sdcard/DCIM/ProfileApp/app_log.csv", "/sdcard/DCIM/ProfileApp/app_log.tar.gz")
        Log.d(TAG, "Sending.... TarGz file")
        AwsConnectHelper.getInstance().uploadLogOkHttp(UPLOAD_API_URL, "/sdcard/DCIM/ProfileApp/app_log.tar.gz") { result ->
            if (result) TarGzMaker.delete("/sdcard/DCIM/ProfileApp/app_log.csv")
            Log.d(TAG,"result is $result")
        }
    }
    fun openSocket() {
//        SocketControllerManager.getInstance().run();
        //TODO: Socket Comm is OK then next step
        _uiState.update { currentState ->
            currentState.copy(
                screenID = ScreenID.LOGIN
            )
        }
        TLog_Sync.d(TAG,"Screen ID is ${_uiState.value.screenID}")
    }
    fun loginUI() {
        _uiState.update { currentState ->
            currentState.copy(
                screenID = ScreenID.LOGIN
            )
        }
        TLog_Sync.d(TAG,"Screen ID is ${_uiState.value.screenID}")
    }
    fun login() {
        //if(!SocketControllerManager.getInstance().isMainController) return
        AwsConnectHelper.getInstance().login(LOGIN_API_URL, { result ->
            TLog_Sync.d(TAG,"Result: " + result)
            if (result) moveToHome()
            updateLogin(result)
           TLog_Sync.d(TAG,"Success is ${_uiState.value.credentials.isSuccessLogin}")
            TLog_Sync.d(TAG,"Screen ID is ${_uiState.value.screenID}")
        },_uiState.value.credentials)
    }
    fun typingID(ID: String) {
        _uiState.update { currentState ->
            currentState.copy(
                credentials = Credentials(
                    login = ID,
                    password = ""
                )
            )
        }
    }
    fun typingPassword(password: String) {
        _uiState.update { currentState ->
            currentState.copy(
                credentials = Credentials(
                    login = currentState.credentials.login,
                    password = password
                )
            )
        }
    }
    fun onCheckRemember() {
        _uiState.update { currentState ->
            currentState.copy(
                credentials = Credentials(
                    login = currentState.credentials.login,
                    password = currentState.credentials.password,
                    remember = !currentState.credentials.remember
                )
            )
        }
    }
    fun updateLogin(result: Boolean) {
        _uiState.update { currentState ->
            currentState.copy(
                credentials = Credentials(
                    login = currentState.credentials.login,
                    password = currentState.credentials.password,
                    remember = currentState.credentials.remember,
                    isSuccessLogin = result
                )
            )
        }
    }
    fun moveToHome() {
        _uiState.update { currentState ->
            currentState.copy(screenID = ScreenID.HOME)
        }
        AwsConnectHelper.getInstance().getBalanceInfo("0", "July 08", "22:40:00", "reset", BALANCE_URL) { result ->
            for (s in result.sfInfos) Log.d(TAG,"result is ${s.postSubtractBalance}")
            //Log.d(TAG,"result is ${result.sfInfos}")
            _uiState.update { currentState ->
                currentState.copy(balanceList = result.sfInfos)
            }
        }
        uploadLog()
        TLog_Sync.d(TAG,"Screen ID is ${_uiState.value.screenID}")
    }
    private fun moveToDetail() {
        _uiState.update { currentState ->
            currentState.copy(screenID = ScreenID.DETAIL_POST)
        }
        TLog_Sync.d(TAG,"Screen ID is ${_uiState.value.screenID}")
    }
    private fun moveToAIChatBoxDetail() {
        _uiState.update { currentState ->
            currentState.copy(screenID = ScreenID.AI_CHAT_BOX)
        }
        TLog_Sync.d(TAG,"Screen ID is ${_uiState.value.screenID}")
    }
    fun backHome() {
        _uiState.update { currentState ->
            currentState.copy(screenID = ScreenID.HOME)
        }
        isUpdated = false
        TLog_Sync.d(TAG,"Screen ID is ${_uiState.value.screenID}")
    }
}
