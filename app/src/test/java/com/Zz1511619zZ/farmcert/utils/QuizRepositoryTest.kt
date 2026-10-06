package com.Zz1511619zZ.farmcert.utils

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertTrue
import org.junit.Test
import java.io.File

class QuizRepositoryTest {
    @Test
    fun malformedQuizFixtureReturnsDiagnosticFailure() {
        val fixture = listOf(
            File("src/test/resources/quiz/malformed.js"),
            File("app/src/test/resources/quiz/malformed.js")
        ).first { it.isFile }

        val result = QuizRepository.loadQuizSets(listOf("malformed.js")) { fixture.readText() }

        assertTrue(result.isFailure)
        val error = result.exceptionOrNull() as? QuizRepository.QuizAssetLoadError
        assertNotNull(error)
        assertEquals("malformed.js", error?.fileName)
        assertTrue(error?.message?.contains("malformed.js") == true)
    }

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

        val quiz = QuizRepository.parse("sample.js", source)

        assertEquals("sample", quiz.id)
        assertEquals("Sample exam", quiz.title)
        assertEquals(1, quiz.questions.size)
        assertEquals(setOf("4"), quiz.questions.single().correctAnswers)
    }

    @Test
    fun preservesCompoundQuestionRenderingDataAndAnswerOrder() {
        val quiz = QuizRepository.parse("compound.js", """
            const sample = {
              "title": "Compound",
              "questions": [
                {"type":"yesno","question":"Claims","statements":["claim one","claim two"],"answers":["Yes","No"]},
                {"type":"dropdown","question":"Classify","statements":["first","second"],"dropdowns":[["A","B"],["A","B"]],"answers":["A","A"]}
              ]
            };
        """.trimIndent())

        assertEquals(listOf("claim one", "claim two"), quiz.questions[0].statements)
        assertEquals(listOf("A", "B"), quiz.questions[1].dropdownOptions[0])
        assertEquals(listOf("A", "A"), quiz.questions[1].correctAnswerValues)
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
