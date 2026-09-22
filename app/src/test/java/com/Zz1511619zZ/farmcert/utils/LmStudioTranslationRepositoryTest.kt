package com.Zz1511619zZ.farmcert.utils

import org.junit.Assert.assertEquals
import org.junit.Test

class LmStudioTranslationRepositoryTest {
    @Test
    fun extractsMessageContentFromLmStudioResponse() {
        val response = """
            {"output":[{"type":"reasoning","content":"internal"},{"type":"message","content":"trợ lý"}]}
        """.trimIndent()

        assertEquals("trợ lý", LmStudioTranslationRepository.extractMessage(response))
    }

    @Test
    fun returnsEmptyTextWhenResponseHasNoMessage() {
        assertEquals("", LmStudioTranslationRepository.extractMessage("{\"output\":[]}"))
    }
}
