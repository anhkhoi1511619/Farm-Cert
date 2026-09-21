package com.example.MyProfileMobileApp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import com.example.MyProfileMobileApp.view.ProfileHomeScreen
import com.example.MyProfileMobileApp.view.quiz.QuizScreen
import com.example.MyProfileMobileApp.view.theme.JetpackComposeExampleTheme
import com.example.MyProfileMobileApp.view.viewmodel.ScreenID
import com.example.MyProfileMobileApp.view.viewmodel.UIViewModel

class MainActivity : ComponentActivity() {
    private val uiViewModel: UIViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        uiViewModel.loadQuizData(applicationContext)
        setContent {
            JetpackComposeExampleTheme {
                Surface(Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    QuizApp(uiViewModel)
                }
            }
        }
    }
}

@Composable
private fun QuizApp(uiViewModel: UIViewModel) {
    val state by uiViewModel.uiState.collectAsState()
    when (state.screenID) {
        ScreenID.HOME -> ProfileHomeScreen(uiViewModel)
        ScreenID.QUIZ_LIST, ScreenID.QUIZ_SETUP, ScreenID.QUIZ_RUN -> QuizScreen(uiViewModel)
        else -> ProfileHomeScreen(uiViewModel)
    }
}
