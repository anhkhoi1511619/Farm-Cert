package com.example.MyProfileMobileApp.model

import com.example.MyProfileMobileApp.model.card.TransitHistory
import com.example.MyProfileMobileApp.model.login.Credentials
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class ModelTest {
    @Test
    fun credentials_areNotEmpty_onlyWhenBothLoginAndPasswordArePresent() {
        assertTrue(Credentials(login = "admin", password = "secret").isNotEmpty())
        assertFalse(Credentials(login = "", password = "secret").isNotEmpty())
        assertFalse(Credentials(login = "admin", password = "").isNotEmpty())
        assertFalse(Credentials(login = "", password = "").isNotEmpty())
    }

    @Test
    fun credentials_defaultFlags_matchInitialLoginState() {
        val credentials = Credentials(login = "admin", password = "secret")

        assertFalse(credentials.remember)
        assertTrue(credentials.isSuccessLogin)
    }

    @Test
    fun transitHistory_toString_formatsAllTransactionDetails() {
        val history = TransitHistory(
            date = "2025-06-15",
            type = 25,
            lineCode = 1,
            stationCode = 251,
            balance = 578
        )

        assertEquals(
            "Ngày: 2025-06-15 | Giao dịch: 25 | Line: 1 | Station: 251 | Số dư: ¥578",
            history.toString()
        )
    }

    @Test
    fun transitHistory_dataClass_usesAllFieldsForEquality() {
        val history = TransitHistory("2025-06-15", 25, 1, 251, 578)

        assertEquals(history, history.copy())
        assertFalse(history == history.copy(balance = 577))
    }
}
