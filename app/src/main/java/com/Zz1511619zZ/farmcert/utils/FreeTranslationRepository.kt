package com.Zz1511619zZ.farmcert.utils

import android.net.Uri
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

object FreeTranslationRepository {
    fun translateEnglishToVietnamese(text: String): String {
        require(text.isNotBlank())
        val endpoint = Uri.parse("https://api.mymemory.translated.net/get").buildUpon()
            .appendQueryParameter("q", text)
            .appendQueryParameter("langpair", "en|vi")
            .build()
        val connection = (URL(endpoint.toString()).openConnection() as HttpURLConnection).apply {
            requestMethod = "GET"
            connectTimeout = 10_000
            readTimeout = 10_000
            setRequestProperty("Accept", "application/json")
        }
        return try {
            val body = connection.inputStream.bufferedReader(Charsets.UTF_8).use { it.readText() }
            JSONObject(body).getJSONObject("responseData").getString("translatedText")
        } finally {
            connection.disconnect()
        }
    }
}
