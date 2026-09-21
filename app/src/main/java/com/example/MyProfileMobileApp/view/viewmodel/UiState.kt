package com.example.MyProfileMobileApp.view.viewmodel

import com.example.MyProfileMobileApp.model.AImessage.ResponseMessageFromAI
import com.example.MyProfileMobileApp.model.balance.BalanceResponse
import com.example.MyProfileMobileApp.model.card.TransitHistory
import com.example.MyProfileMobileApp.model.card.transitHistoryList
import com.example.MyProfileMobileApp.model.experience.Experiences
import com.example.MyProfileMobileApp.model.experience.experiencesExampleList
import com.example.MyProfileMobileApp.model.post.dto.Post
import com.example.MyProfileMobileApp.model.post.post1
import com.example.MyProfileMobileApp.model.post.post2
import com.example.MyProfileMobileApp.model.post.post3
import com.example.MyProfileMobileApp.model.history.HistoryDataModel
import com.example.MyProfileMobileApp.model.history.PostHistoryData
import com.example.MyProfileMobileApp.model.login.Credentials
import com.example.MyProfileMobileApp.model.login.credentialsExample
import com.example.MyProfileMobileApp.model.quiz.QuizQuestion
import com.example.MyProfileMobileApp.model.quiz.QuizSet
import com.example.MyProfileMobileApp.model.quiz.QuizAttempt

data class UiState (
    val credentials: Credentials = credentialsExample,
    val loadedDetailPost: Post = post3,
    val loadedMessageFromAI: com.example.MyProfileMobileApp.model.AImessage.ResponseMessageFromAI = com.example.MyProfileMobileApp.model.AImessage.ResponseMessageFromAI(),
    val showingPostList: List<Experiences> = experiencesExampleList,
    val historyPost: List<com.example.MyProfileMobileApp.model.history.PostHistoryData> = com.example.MyProfileMobileApp.model.history.HistoryDataModel.list,
    val historyTransitList: List<com.example.MyProfileMobileApp.model.card.TransitHistory> = com.example.MyProfileMobileApp.model.card.transitHistoryList,
    val balanceList: ArrayList<com.example.MyProfileMobileApp.model.balance.BalanceResponse.SFInfo> = ArrayList(),
    val upLoadDone: Boolean = false,
    val screenID: ScreenID = ScreenID.QUIZ_LIST,
    val quizSets: List<QuizSet> = emptyList(),
    val selectedQuiz: QuizSet? = null,
    val quizQuestions: List<QuizQuestion> = emptyList(),
    val quizIndex: Int = 0,
    val selectedAnswers: Set<String> = emptySet(),
    val answerSubmitted: Boolean = false,
    val quizAttempts: List<QuizAttempt> = emptyList(),
    val correctAnswersCount: Int = 0
)

enum class ScreenID {
    FLASH,
    LOGIN,
    HOME,
    DETAIL_POST,
    AI_CHAT_BOX,
    SETTING,
    QUIZ_LIST,
    QUIZ_SETUP,
    QUIZ_RUN
}
