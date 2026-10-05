package com.Zz1511619zZ.farmcert.utils

import com.Zz1511619zZ.farmcert.model.quiz.QuizQuestion

object QuizScoring {
    fun isCorrect(question: QuizQuestion, selectedAnswers: Set<String>): Boolean {
        if (question.type != "yesno" && question.type != "dropdown") {
            return selectedAnswers == question.correctAnswers
        }

        // Keep callers that still provide value-only selections working. The UI
        // uses row-qualified selections below so repeated values remain distinct.
        if (selectedAnswers.none { it.contains(SELECTION_SEPARATOR) }) {
            return selectedAnswers == question.correctAnswers
        }

        val selectedValues = selectedAnswers
            .mapNotNull { selectionValue(it) }
            .sortedBy { it.first }
            .map { it.second }
        return selectedValues == question.correctAnswerValues
    }

    private fun selectionValue(selection: String): Pair<Int, String>? {
        val separator = selection.indexOf(SELECTION_SEPARATOR)
        if (separator < 0) return null
        return selection.substring(0, separator).toIntOrNull()?.let { index ->
            index to selection.substring(separator + SELECTION_SEPARATOR.length)
        }
    }

    const val SELECTION_SEPARATOR = "\u0000"

    fun percentage(correct: Int, total: Int): Int =
        if (total <= 0) 0 else (correct * 100 / total).coerceIn(0, 100)

    fun skipped(total: Int, answered: Int): Int =
        (total - answered).coerceAtLeast(0)

    fun retryWrongQuestions(
        questions: List<QuizQuestion>,
        results: Map<Int, Boolean>
    ): List<QuizQuestion> = questions.filterIndexed { index, _ -> results[index] == false }
}
