package com.Zz1511619zZ.farmcert.view.viewmodel

import android.content.Context
import androidx.lifecycle.ViewModel
import com.Zz1511619zZ.farmcert.model.quiz.QuizAttempt
import com.Zz1511619zZ.farmcert.model.quiz.QuizQuestion
import com.Zz1511619zZ.farmcert.model.quiz.QuizSet
import com.Zz1511619zZ.farmcert.utils.QuizAttemptStore
import com.Zz1511619zZ.farmcert.utils.QuizRepository
import com.Zz1511619zZ.farmcert.utils.QuizScoring
import com.Zz1511619zZ.farmcert.utils.QuizSelection
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

class UIViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(UiState())
    val uiState: StateFlow<UiState> = _uiState.asStateFlow()
    private var appContext: Context? = null

    fun loadQuizData(context: Context) {
        appContext = context.applicationContext
        _uiState.update {
            it.copy(quizSets = QuizRepository.loadBundledQuizSets(context), quizAttempts = QuizAttemptStore.load(context), screenID = ScreenID.HOME)
        }
    }

    fun openQuizSetup(quiz: QuizSet) = _uiState.update { it.copy(selectedQuiz = quiz, screenID = ScreenID.QUIZ_SETUP) }

    fun showHome() = _uiState.update { it.copy(screenID = ScreenID.HOME, selectedQuiz = null, answerSubmitted = false) }

    fun showQuizSets() = _uiState.update { it.copy(screenID = ScreenID.QUIZ_LIST, answerSubmitted = false) }

    fun startQuiz(randomizeQuestions: Boolean, randomizeAnswers: Boolean, mode: String, count: Int, start: Int, end: Int) {
        val quiz = _uiState.value.selectedQuiz ?: return
        val questions = QuizSelection.select(quiz, randomizeQuestions, randomizeAnswers, mode, count, start, end)
        startQuestions(questions)
    }

    private fun startQuestions(questions: List<QuizQuestion>) {
        if (questions.isEmpty()) return
        _uiState.update {
            it.copy(
                quizQuestions = questions,
                quizIndex = 0,
                selectedAnswers = emptySet(),
                answerSubmitted = false,
                completedQuestionIndices = emptySet(),
                questionResults = emptyMap(),
                questionAnswers = emptyMap(),
                correctAnswersCount = 0,
                quizStartedAt = System.currentTimeMillis(),
                resultDurationSeconds = 0L,
                screenID = ScreenID.QUIZ_RUN
            )
        }
    }

    fun retryWrongQuestions() {
        val state = _uiState.value
        startQuestions(QuizScoring.retryWrongQuestions(state.quizQuestions, state.questionResults))
    }

    fun retryAllQuestions() {
        startQuestions(_uiState.value.quizQuestions)
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
        if (state.completedQuestionIndices.contains(state.quizIndex)) return
        val correct = if (QuizScoring.isCorrect(question, state.selectedAnswers)) 1 else 0
        _uiState.update {
            it.copy(
                answerSubmitted = true,
                completedQuestionIndices = it.completedQuestionIndices + it.quizIndex,
                questionResults = it.questionResults + (it.quizIndex to (correct == 1)),
                questionAnswers = it.questionAnswers + (it.quizIndex to it.selectedAnswers),
                correctAnswersCount = it.correctAnswersCount + correct
            )
        }
    }

    fun jumpToQuestion(index: Int) {
        if (index in _uiState.value.quizQuestions.indices) _uiState.update { it.copy(quizIndex = index, selectedAnswers = emptySet(), answerSubmitted = false) }
    }

    fun nextQuestion() {
        val next = _uiState.value.quizIndex + 1
        if (next >= _uiState.value.quizQuestions.size) finishQuiz()
        else _uiState.update { it.copy(quizIndex = next, selectedAnswers = emptySet(), answerSubmitted = false) }
    }

    private fun finishQuiz() {
        val state = _uiState.value
        val quiz = state.selectedQuiz ?: return
        val completedAt = System.currentTimeMillis()
        val attempt = QuizAttempt(quiz.id, quiz.title, state.correctAnswersCount, state.quizQuestions.size, completedAt)
        val attempts = (state.quizAttempts + attempt).sortedByDescending { it.completedAt }.take(50)
        appContext?.let { QuizAttemptStore.append(it, attempt) }
        _uiState.update {
            it.copy(
                quizAttempts = attempts,
                answerSubmitted = false,
                resultDurationSeconds = ((completedAt - it.quizStartedAt) / 1000L).coerceAtLeast(0L),
                screenID = ScreenID.RESULT
            )
        }
    }
}
