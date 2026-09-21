package com.Zz1511619zZ.farmcert.model.quiz

import org.junit.Assert.assertEquals
import org.junit.Test

class QuizAttemptTest {
    @Test
    fun percentageIsCalculatedFromScoreAndTotal() {
        assertEquals(75, QuizAttempt("demo", "Demo", 3, 4, 0L).percentage)
    }

    @Test
    fun percentageIsZeroWhenThereAreNoQuestions() {
        assertEquals(0, QuizAttempt("demo", "Demo", 0, 0, 0L).percentage)
    }
}
