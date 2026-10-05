package com.Zz1511619zZ.farmcert.view.viewmodel

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class UiStateTest {
    @Test
    fun quizDataStartsInLoadingState() {
        assertTrue(UiState().quizDataState === QuizDataState.Loading)
    }

    @Test
    fun quizDataErrorKeepsRetryMessage() {
        val error = QuizDataState.Error("asset unavailable")

        assertEquals("asset unavailable", error.message)
    }
}