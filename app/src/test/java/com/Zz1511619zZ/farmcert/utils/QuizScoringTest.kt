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
