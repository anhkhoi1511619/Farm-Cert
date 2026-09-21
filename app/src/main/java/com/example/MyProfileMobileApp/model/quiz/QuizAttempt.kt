package com.example.MyProfileMobileApp.model.quiz

data class QuizAttempt(
    val quizId: String,
    val quizTitle: String,
    val score: Int,
    val total: Int,
    val completedAt: Long
) {
    val percentage: Int
        get() = if (total == 0) 0 else score * 100 / total
}
