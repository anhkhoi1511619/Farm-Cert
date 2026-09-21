package com.Zz1511619zZ.farmcert.utils

import android.content.Context
import com.Zz1511619zZ.farmcert.model.quiz.QuizQuestion
import com.Zz1511619zZ.farmcert.model.quiz.QuizSet
import org.json.JSONArray
import org.json.JSONObject

object QuizRepository {
    fun loadBundledQuizSets(context: Context): List<QuizSet> = context.assets.list("quiz")
        ?.filter { it.endsWith(".js") }
        ?.mapNotNull { file -> runCatching { parse(file, context.assets.open("quiz/$file").bufferedReader().use { it.readText() }) }.getOrNull() }
        ?: emptyList()

    internal fun parse(fileName: String, source: String): QuizSet {
        val jsonText = source.substringAfter("=").trim()
            .replace(Regex("(?m)^\\s*//.*$"), "")
            .removeSuffix(";").trim()
            .replace(Regex(",\\s*([}\\]])"), "$1")
        val root = JSONObject(jsonText)
        val questions = root.optJSONArray("questions") ?: JSONArray()
        val parsed = (0 until questions.length()).map { index ->
            val item = questions.getJSONObject(index)
            val options = item.optJSONArray("options").toStrings()
            val statements = item.optJSONArray("statements").toStrings()
            val answers = item.optJSONArray("answers").toStrings().toSet()
            val dropdownOptions = item.optJSONArray("dropdowns").toLists()
            QuizQuestion(index + 1, item.optString("question"), options, answers,
                item.optString("type", "single"), statements, dropdownOptions)
        }
        val id = fileName.substringBeforeLast('.')
        return QuizSet(id, root.optString("title", id), root.optString("description", ""), parsed)
    }

    private fun JSONArray?.toStrings(): List<String> = if (this == null) emptyList() else
        (0 until length()).mapNotNull { optString(it, null) }

    private fun JSONArray?.toLists(): List<List<String>> = if (this == null) emptyList() else
        (0 until length()).map { index -> optJSONArray(index).toStrings() }
}
