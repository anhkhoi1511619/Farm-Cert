package com.example.MyProfileMobileApp.utils

import android.content.Context
import com.example.MyProfileMobileApp.model.quiz.QuizAttempt
import org.json.JSONArray
import org.json.JSONObject

object QuizAttemptStore {
    private const val PREFS = "quiz_progress"
    private const val KEY_ATTEMPTS = "attempts"

    fun load(context: Context): List<QuizAttempt> = runCatching {
        val raw = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE).getString(KEY_ATTEMPTS, "[]") ?: "[]"
        val json = JSONArray(raw)
        (0 until json.length()).map { item ->
            val value = json.getJSONObject(item)
            QuizAttempt(value.getString("quizId"), value.getString("quizTitle"), value.getInt("score"), value.getInt("total"), value.getLong("completedAt"))
        }.sortedByDescending { it.completedAt }
    }.getOrDefault(emptyList())

    fun append(context: Context, attempt: QuizAttempt) {
        val attempts = load(context).toMutableList().apply { add(0, attempt) }.take(50)
        val json = JSONArray().apply {
            attempts.forEach {
                put(JSONObject().apply {
                    put("quizId", it.quizId)
                    put("quizTitle", it.quizTitle)
                    put("score", it.score)
                    put("total", it.total)
                    put("completedAt", it.completedAt)
                })
            }
        }
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit().putString(KEY_ATTEMPTS, json.toString()).apply()
    }
}
