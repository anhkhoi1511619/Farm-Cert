package com.Zz1511619zZ.farmcert.utils

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import java.io.File

class QuizRepositoryTest {
    @Test
    fun parsesQuizJavaScriptFixture() {
        val source = """
            const sample = {
              "title": "Sample exam",
              "description": "A sample",
              "questions": [
                // Question one
                {"question":"2 + 2?","options":["3","4"],"answers":["4"]}
              ]
            };
        """.trimIndent()

        val quiz = QuizRepository.parse("sample.js", source, mapOf("1" to "2 + 2 bằng bao nhiêu?"))

        assertEquals("sample", quiz.id)
        assertEquals("Sample exam", quiz.title)
        assertEquals(1, quiz.questions.size)
        assertEquals(setOf("4"), quiz.questions.single().correctAnswers)
        assertEquals("2 + 2 bằng bao nhiêu?", quiz.questions.single().questionVi)
    }

    @Test
    fun bundledQuizFilesContainExpectedQuestionBanks() {
        val assets = listOf(
            File("src/main/assets/quiz"),
            File("app/src/main/assets/quiz")
        ).first { it.isDirectory }
        val ccar = QuizRepository.parse("ccar-p.js", assets.resolve("ccar-p.js").readText())
        val ccdv = QuizRepository.parse("ccdv-f.js", assets.resolve("ccdv-f.js").readText())

        assertEquals("ccar-p", ccar.id)
        assertEquals("ccdv-f", ccdv.id)
        assertTrue(ccar.questions.isNotEmpty())
        assertTrue(ccdv.questions.isNotEmpty())
        assertTrue(ccar.questions.all { it.question.isNotBlank() })
        assertTrue(ccdv.questions.all { it.question.isNotBlank() })
    }
}
