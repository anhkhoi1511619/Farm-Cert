package com.Zz1511619zZ.farmcert.utils

import com.Zz1511619zZ.farmcert.model.quiz.QuizQuestion

object QuizScoring {
    fun isCorrect(question: QuizQuestion, selectedAnswers: Set<String>): Boolean =
        selectedAnswers == question.correctAnswers

    fun percentage(correct: Int, total: Int): Int =
        if (total <= 0) 0 else (correct * 100 / total).coerceIn(0, 100)

    fun skipped(total: Int, answered: Int): Int =
        (total - answered).coerceAtLeast(0)

    fun retryWrongQuestions(
        questions: List<QuizQuestion>,
        results: Map<Int, Boolean>
    ): List<QuizQuestion> = questions.filterIndexed { index, _ -> results[index] == false }
}
