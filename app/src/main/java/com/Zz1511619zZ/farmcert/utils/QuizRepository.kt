package com.Zz1511619zZ.farmcert.utils

import android.content.Context
import com.Zz1511619zZ.farmcert.model.quiz.QuizQuestion
import com.Zz1511619zZ.farmcert.model.quiz.QuizSet
import org.json.JSONArray
import org.json.JSONObject

object QuizRepository {
    private const val TRANSLATIONS_FILE = "quiz-translations-vi.js"

    fun loadBundledQuizSets(context: Context): List<QuizSet> {
        val translations = loadTranslations(context)
        return context.assets.list("quiz")
            ?.filter { it.endsWith(".js") && it != TRANSLATIONS_FILE }
            ?.mapNotNull { file -> runCatching {
                parse(
                    file,
                    context.assets.open("quiz/$file").bufferedReader().use { it.readText() },
                    translations[file.substringBeforeLast('.')].orEmpty()
                )
            }.getOrNull() }
            ?: emptyList()
    }

    internal fun parse(fileName: String, source: String, translations: Map<String, String> = emptyMap()): QuizSet {
        val root = JSONObject(cleanJson(source))
        val questions = root.optJSONArray("questions") ?: JSONArray()
        val parsed = (0 until questions.length()).map { index ->
            val item = questions.getJSONObject(index)
            val options = item.optJSONArray("options").toStrings()
            val statements = item.optJSONArray("statements").toStrings()
            val answers = item.optJSONArray("answers").toStrings().toSet()
            val dropdownOptions = item.optJSONArray("dropdowns").toLists()
            QuizQuestion(
                number = index + 1,
                question = item.optString("question"),
                options = options,
                correctAnswers = answers,
                type = item.optString("type", "single"),
                statements = statements,
                dropdownOptions = dropdownOptions,
                questionVi = translations[(index + 1).toString()].orEmpty()
            )
        }
        val id = fileName.substringBeforeLast('.')
        return QuizSet(id, root.optString("title", id), root.optString("description", ""), parsed)
    }

    private fun loadTranslations(context: Context): Map<String, Map<String, String>> = runCatching {
        val source = context.assets.open("quiz/$TRANSLATIONS_FILE").bufferedReader().use { it.readText() }
        val root = JSONObject(cleanJson(source))
        root.keys().asSequence().associateWith { quizId ->
            val questions = root.optJSONObject(quizId) ?: JSONObject()
            questions.keys().asSequence().associateWith { key -> questions.optString(key) }
        }
    }.getOrDefault(emptyMap())

    private fun cleanJson(source: String): String = source.substringAfter("=").trim()
            .replace(Regex("(?m)^\\s*//.*$"), "")
            .removeSuffix(";").trim()
            .replace(Regex(",\\s*([}\\]])"), "$1")

    private fun JSONArray?.toStrings(): List<String> = if (this == null) emptyList() else
        (0 until length()).mapNotNull { optString(it, null) }

    private fun JSONArray?.toLists(): List<List<String>> = if (this == null) emptyList() else
        (0 until length()).map { index -> optJSONArray(index).toStrings() }
}
