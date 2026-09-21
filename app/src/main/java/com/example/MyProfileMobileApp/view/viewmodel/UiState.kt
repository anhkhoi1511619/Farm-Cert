package com.example.MyProfileMobileApp.view.viewmodel

import com.example.MyProfileMobileApp.model.quiz.QuizQuestion
import com.example.MyProfileMobileApp.model.quiz.QuizSet
import com.example.MyProfileMobileApp.model.quiz.QuizAttempt

data class UiState(
    val screenID: ScreenID = ScreenID.HOME,
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
    HOME,
    QUIZ_LIST,
    QUIZ_SETUP,
    QUIZ_RUN
}
