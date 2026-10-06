package com.Zz1511619zZ.farmcert.utils

import android.content.Context
import android.util.Log
import com.Zz1511619zZ.farmcert.model.quiz.QuizQuestion
import com.Zz1511619zZ.farmcert.model.quiz.QuizSet
import org.json.JSONArray
import org.json.JSONObject

object QuizRepository {
    private const val TAG = "QuizRepository"

    fun loadBundledQuizSets(context: Context): Result<List<QuizSet>> {
        val files = context.assets.list("quiz")?.filter { it.endsWith(".js") } ?: emptyList()
        val result = loadQuizSets(files) { file ->
            context.assets.open("quiz/$file").bufferedReader().use { it.readText() }
        }
        result.exceptionOrNull()?.let { error ->
            if (error is QuizAssetLoadError) {
                Log.e(TAG, "Failed to load quiz asset: ${error.fileName}")
            }
        }
        return result
    }

    internal fun loadQuizSets(files: Iterable<String>, read: (String) -> String): Result<List<QuizSet>> =
        runCatching {
            files.sorted().map { file ->
                runCatching { parse(file, read(file)) }
                    .getOrElse { cause -> throw QuizAssetLoadError(file, cause) }
            }
        }

    internal class QuizAssetLoadError(fileName: String, cause: Throwable) : Exception(
        "Không thể đọc bộ câu hỏi từ tệp ${safeFileName(fileName)}. Hãy cập nhật ứng dụng hoặc báo lỗi cho nhóm phát triển.",
        cause
    ) {
        val fileName: String = safeFileName(fileName)
    }

    private fun safeFileName(fileName: String): String = fileName
        .substringAfterLast('/')
        .substringAfterLast('\\')
        .filter { it.isLetterOrDigit() || it == '.' || it == '-' || it == '_' }
        .ifEmpty { "không xác định" }

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
                item.optString("type", "single"), statements, dropdownOptions,
                item.optJSONArray("answers").toStrings())
        }
        val id = fileName.substringBeforeLast('.')
        return QuizSet(id, root.optString("title", id), root.optString("description", ""), parsed)
    }

    private fun JSONArray?.toStrings(): List<String> = if (this == null) emptyList() else
        (0 until length()).mapNotNull { optString(it, null) }

    private fun JSONArray?.toLists(): List<List<String>> = if (this == null) emptyList() else
        (0 until length()).map { index -> optJSONArray(index).toStrings() }
}
