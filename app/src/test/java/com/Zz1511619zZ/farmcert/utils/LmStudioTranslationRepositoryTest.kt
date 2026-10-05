package com.Zz1511619zZ.farmcert.utils

import org.junit.Assert.assertEquals
import org.junit.Assert.assertThrows
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

    @Test
    fun acceptsHttpAndHttpsEndpoints() {
        assertEquals(
            "https://lm-studio.example/api",
            LmStudioTranslationRepository.validateEndpoint(" https://lm-studio.example/api/ ")
        )
    }

    @Test
    fun rejectsMissingOrUnsafeEndpoints() {
        assertThrows(LmStudioUnavailableException::class.java) {
            LmStudioTranslationRepository.validateEndpoint("")
        }
        assertThrows(LmStudioUnavailableException::class.java) {
            LmStudioTranslationRepository.validateEndpoint("file:///tmp/lm-studio")
        }
    }
}
