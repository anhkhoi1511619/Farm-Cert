package com.Zz1511619zZ.farmcert.view.viewmodel

import com.Zz1511619zZ.farmcert.model.quiz.QuizQuestion
import com.Zz1511619zZ.farmcert.model.quiz.QuizSet
import com.Zz1511619zZ.farmcert.model.quiz.QuizAttempt

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
