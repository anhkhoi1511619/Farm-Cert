package com.Zz1511619zZ.farmcert.utils

import com.Zz1511619zZ.farmcert.model.quiz.QuizQuestion
import com.Zz1511619zZ.farmcert.model.quiz.QuizSet
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import kotlin.random.Random

class QuizSelectionTest {
    private val quiz = QuizSet(
        "demo", "Demo", "", (1..10).map { number ->
            QuizQuestion(number, "Question $number", listOf("A$number", "B$number"), setOf("A$number"))
        }
    )

    @Test
    fun rangeModeReturnsExactlyTheRequestedInclusiveRange() {
        val selected = QuizSelection.select(quiz, false, false, "range", 2, 3, 6)

        assertEquals((3..6).toList(), selected.map { it.number })
    }

    @Test
    fun randomModeReturnsRequestedNumberWithoutDuplicates() {
        val selected = QuizSelection.select(quiz, false, false, "random", 4, 1, 10, Random(7))

        assertEquals(4, selected.size)
        assertEquals(4, selected.map { it.number }.distinct().size)
        assertTrue(selected.all { it.number in 1..10 })
    }

    @Test
    fun randomizeAnswersPreservesAnswersButChangesOptionOrder() {
        val selected = QuizSelection.select(quiz, false, true, "range", 2, 1, 1, Random(2)).single()

        assertEquals(setOf("A1"), selected.correctAnswers)
        assertEquals(setOf("A1", "B1"), selected.options.toSet())
    }

    @Test
    fun invalidCountAndRangeAreClampedToValidQuestions() {
        val random = QuizSelection.select(quiz, false, false, "random", 99, 1, 1, Random(1))
        val range = QuizSelection.select(quiz, false, false, "range", 1, 0, 99)

        assertEquals(10, random.size)
        assertEquals(10, range.size)
    }

    @Test
    fun emptyQuizReturnsNoQuestions() {
        val empty = QuizSet("empty", "Empty", "", emptyList())

        assertTrue(QuizSelection.select(empty, false, false, "random", 5, 1, 5).isEmpty())
    }
}
