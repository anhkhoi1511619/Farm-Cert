package com.Zz1511619zZ.farmcert.utils

import com.Zz1511619zZ.farmcert.model.quiz.QuizQuestion
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class QuizScoringTest {
    private val question = QuizQuestion(1, "Question", listOf("A", "B"), setOf("A"))

    @Test
    fun recognizesCorrectAndWrongAnswers() {
        assertTrue(QuizScoring.isCorrect(question, setOf("A")))
        assertFalse(QuizScoring.isCorrect(question, setOf("B")))
        assertFalse(QuizScoring.isCorrect(question, emptySet()))
    }

    @Test
    fun supportsMultiSelectExactSetMatching() {
        val multi = question.copy(correctAnswers = setOf("A", "B"))

        assertTrue(QuizScoring.isCorrect(multi, setOf("A", "B")))
        assertFalse(QuizScoring.isCorrect(multi, setOf("A")))
        assertFalse(QuizScoring.isCorrect(multi, setOf("A", "B", "C")))
    }

    @Test
    fun scoresCompoundAnswersByStatementIdentityAndExactOrder() {
        val dropdown = QuizQuestion(
            1,
            "Classify",
            type = "dropdown",
            statements = listOf("first", "second"),
            dropdownOptions = listOf(listOf("A", "B"), listOf("A", "B")),
            correctAnswers = setOf("A"),
            correctAnswerValues = listOf("A", "A")
        )
        val separator = QuizScoring.SELECTION_SEPARATOR

        assertTrue(QuizScoring.isCorrect(dropdown, setOf("0${separator}A", "1${separator}A")))
        assertFalse(QuizScoring.isCorrect(dropdown, setOf("0${separator}A", "1${separator}B")))
        assertFalse(QuizScoring.isCorrect(dropdown, setOf("1${separator}A", "0${separator}A", "2${separator}A")))
    }

    @Test
    fun calculatesPercentageAndSkippedQuestions() {
        assertEquals(60, QuizScoring.percentage(6, 10))
        assertEquals(0, QuizScoring.percentage(0, 0))
        assertEquals(4, QuizScoring.skipped(10, 6))
        assertEquals(0, QuizScoring.skipped(3, 5))
    }

    @Test
    fun retryWrongQuestionsOnlyReturnsFailedQuestionIndices() {
        val questions = (1..4).map { QuizQuestion(it, "Q$it") }
        val wrong = QuizScoring.retryWrongQuestions(questions, mapOf(0 to true, 1 to false, 3 to false))

        assertEquals(listOf(2, 4), wrong.map { it.number })
    }
}
