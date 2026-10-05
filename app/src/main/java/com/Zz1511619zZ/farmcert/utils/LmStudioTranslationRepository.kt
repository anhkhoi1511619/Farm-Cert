package com.Zz1511619zZ.farmcert.utils

import com.Zz1511619zZ.farmcert.BuildConfig
import org.json.JSONArray
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URI
import java.net.URL

class LmStudioUnavailableException(message: String) : IllegalStateException(message)

object LmStudioTranslationRepository {
    private const val DEFAULT_MODEL = "google/gemma-3-4b"

    fun translateEnglishToVietnamese(text: String): String {
        require(text.isNotBlank())
        baseUrl()
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

    internal fun validateEndpoint(endpoint: String): String {
        val trimmed = endpoint.trim().trimEnd('/')
        val uri = runCatching { URI(trimmed) }.getOrNull()
        if (
            trimmed.isEmpty() ||
            uri == null ||
            uri.scheme?.lowercase() !in setOf("http", "https") ||
            uri.host.isNullOrBlank() ||
            uri.userInfo != null ||
            uri.query != null ||
            uri.fragment != null
        ) {
            throw LmStudioUnavailableException(
                "LM Studio translation is unavailable: configure a valid HTTP(S) endpoint."
            )
        }
        return trimmed
    }

    private fun baseUrl(): String = validateEndpoint(BuildConfig.LM_STUDIO_BASE_URL)

    private fun request(path: String, method: String, body: String? = null): String {
        val connection = (URL(baseUrl() + path).openConnection() as HttpURLConnection).apply {
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
