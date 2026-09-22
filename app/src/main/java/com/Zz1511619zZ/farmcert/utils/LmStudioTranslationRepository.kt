package com.Zz1511619zZ.farmcert.utils

import org.json.JSONArray
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

object LmStudioTranslationRepository {
    private const val BASE_URL = "https://2khj1mwr-5172.jpe1.devtunnels.ms"
    private const val DEFAULT_MODEL = "google/gemma-3-4b"

    fun translateEnglishToVietnamese(text: String): String {
        require(text.isNotBlank())
        val model = resolveModel()
        val request = JSONObject()
            .put("model", model)
            .put("input", text)
            .put("system_prompt", "Translate the user's English text into natural Vietnamese. Return only the Vietnamese translation, with no explanation.")
            .put("temperature", 0.0)
            .put("max_output_tokens", 128)
            .put("store", false)
        val response = request("/api/v1/chat", "POST", request.toString())
        return extractMessage(response)
    }

    private fun resolveModel(): String = runCatching {
        val root = JSONObject(request("/api/v1/models", "GET"))
        val models = root.optJSONArray("models") ?: JSONArray()
        val llmKeys = (0 until models.length()).mapNotNull { index ->
            models.optJSONObject(index)?.takeIf { it.optString("type") == "llm" }?.optString("key")
        }
        llmKeys.firstOrNull { it == DEFAULT_MODEL }
            ?: llmKeys.firstOrNull { it.contains("gemma-3-4b", ignoreCase = true) }
            ?: llmKeys.firstOrNull()
            ?: DEFAULT_MODEL
    }.getOrDefault(DEFAULT_MODEL)

    internal fun extractMessage(source: String): String {
        val output = JSONObject(source).optJSONArray("output") ?: return ""
        for (index in 0 until output.length()) {
            val item = output.optJSONObject(index) ?: continue
            if (item.optString("type") == "message") {
                return item.optString("content").trim()
            }
        }
        return ""
    }

    private fun request(path: String, method: String, body: String? = null): String {
        val connection = (URL(BASE_URL + path).openConnection() as HttpURLConnection).apply {
            requestMethod = method
            connectTimeout = 10_000
            readTimeout = 60_000
            setRequestProperty("Accept", "application/json")
            setRequestProperty("Content-Type", "application/json")
            if (body != null) {
                doOutput = true
                outputStream.use { it.write(body.toByteArray(Charsets.UTF_8)) }
            }
        }
        return try {
            val stream = if (connection.responseCode in 200..299) connection.inputStream else connection.errorStream
            val response = stream?.bufferedReader(Charsets.UTF_8)?.use { it.readText() }.orEmpty()
            if (connection.responseCode !in 200..299) {
                error("LM Studio HTTP ${connection.responseCode}: $response")
            }
            response
        } finally {
            connection.disconnect()
        }
    }
}
