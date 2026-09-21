package com.Zz1511619zZ.farmcert.utils

import com.Zz1511619zZ.farmcert.model.quiz.QuizQuestion
import com.Zz1511619zZ.farmcert.model.quiz.QuizSet
import kotlin.random.Random

object QuizSelection {
    fun select(
        quiz: QuizSet,
        randomizeQuestions: Boolean,
        randomizeAnswers: Boolean,
        mode: String,
        count: Int,
        start: Int,
        end: Int,
        random: Random = Random.Default
    ): List<QuizQuestion> {
        if (quiz.questions.isEmpty()) return emptyList()
        val selected = if (mode == "random") {
            quiz.questions.shuffled(random).take(count.coerceIn(1, quiz.questions.size))
        } else {
            val safeStart = (start - 1).coerceIn(0, (quiz.questions.size - 1).coerceAtLeast(0))
            val safeEnd = end.coerceIn(safeStart + 1, quiz.questions.size)
            quiz.questions.subList(safeStart, safeEnd).let {
                if (randomizeQuestions) it.shuffled(random) else it
            }
        }
        return selected.map { question ->
            if (randomizeAnswers && question.options.isNotEmpty()) {
                question.copy(options = question.options.shuffled(random))
            } else question
        }
    }
}
