package com.example.MyProfileMobileApp.view.viewmodel

import com.example.MyProfileMobileApp.model.card.TransitHistory
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertSame
import org.junit.Assert.assertTrue
import org.junit.Test
import org.mockito.Mockito.mock

class UIViewModelMockitoTest {
    @Test
    fun typingCredentials_updatesStateWithoutChangingTheOtherCredentialField() {
        val viewModel = UIViewModel()

        viewModel.typingID("khoi")
        viewModel.typingPassword("secret")

        assertEquals("khoi", viewModel.uiState.value.credentials.login)
        assertEquals("secret", viewModel.uiState.value.credentials.password)
    }

    @Test
    fun onCheckRemember_togglesRememberFlagAndPreservesCredentials() {
        val viewModel = UIViewModel()
        viewModel.typingID("khoi")
        viewModel.typingPassword("secret")

        viewModel.onCheckRemember()

        assertEquals("khoi", viewModel.uiState.value.credentials.login)
        assertEquals("secret", viewModel.uiState.value.credentials.password)
        assertTrue(viewModel.uiState.value.credentials.remember)

        viewModel.onCheckRemember()
        assertFalse(viewModel.uiState.value.credentials.remember)
    }

    @Test
    fun updateLogin_setsResultWhileKeepingEnteredCredentials() {
        val viewModel = UIViewModel()
        viewModel.typingID("khoi")
        viewModel.typingPassword("secret")
        viewModel.onCheckRemember()

        viewModel.updateLogin(false)

        assertEquals("khoi", viewModel.uiState.value.credentials.login)
        assertEquals("secret", viewModel.uiState.value.credentials.password)
        assertTrue(viewModel.uiState.value.credentials.remember)
        assertFalse(viewModel.uiState.value.credentials.isSuccessLogin)
    }

    @Test
    fun loadTransitList_keepsTheMockedHistoryObjectsInState() {
        val first = mock(TransitHistory::class.java)
        val second = mock(TransitHistory::class.java)
        val transitHistory = listOf(first, second)
        val viewModel = UIViewModel()

        viewModel.loadTransitList(transitHistory)

        assertSame(transitHistory, viewModel.uiState.value.historyTransitList)
        assertSame(first, viewModel.uiState.value.historyTransitList[0])
        assertSame(second, viewModel.uiState.value.historyTransitList[1])
    }
}
