package com.example.MyProfileMobileApp.view.viewmodel

import com.example.MyProfileMobileApp.model.AImessage.ResponseMessageFromAI
import com.example.MyProfileMobileApp.model.card.TransitHistory
import com.example.MyProfileMobileApp.model.experience.Experiences
import com.example.MyProfileMobileApp.model.history.PostHistoryData
import com.example.MyProfileMobileApp.model.login.Credentials
import com.example.MyProfileMobileApp.model.post.dto.Post
import org.junit.Assert.assertSame
import org.junit.Test
import org.mockito.Mockito.mock

class UiStateMockitoTest {
    @Test
    fun copy_replacesScreenOnlyAndRetainsMockedModelReferences() {
        val credentials = mock(Credentials::class.java)
        val post = mock(Post::class.java)
        val aiResponse = mock(ResponseMessageFromAI::class.java)
        val experiences = listOf(mock(Experiences::class.java))
        val postHistory = listOf(mock(PostHistoryData::class.java))
        val transitHistory = listOf(mock(TransitHistory::class.java))
        val original = UiState(
            credentials = credentials,
            loadedDetailPost = post,
            loadedMessageFromAI = aiResponse,
            showingPostList = experiences,
            historyPost = postHistory,
            historyTransitList = transitHistory
        )

        val updated = original.copy(screenID = ScreenID.HOME)

        assertSame(credentials, updated.credentials)
        assertSame(post, updated.loadedDetailPost)
        assertSame(aiResponse, updated.loadedMessageFromAI)
        assertSame(experiences, updated.showingPostList)
        assertSame(postHistory, updated.historyPost)
        assertSame(transitHistory, updated.historyTransitList)
    }
}
