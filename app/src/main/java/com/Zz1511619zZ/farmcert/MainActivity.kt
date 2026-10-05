package com.Zz1511619zZ.farmcert

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.Alignment
import androidx.compose.ui.unit.dp
import com.Zz1511619zZ.farmcert.view.ProfileHomeScreen
import com.Zz1511619zZ.farmcert.view.quiz.QuizScreen
import com.Zz1511619zZ.farmcert.view.theme.JetpackComposeExampleTheme
import com.Zz1511619zZ.farmcert.view.viewmodel.QuizDataState
import com.Zz1511619zZ.farmcert.view.viewmodel.ScreenID
import com.Zz1511619zZ.farmcert.view.viewmodel.UIViewModel

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
    when (val dataState = state.quizDataState) {
        QuizDataState.Loading -> LoadingScreen()
        is QuizDataState.Error -> ErrorScreen(dataState.message, uiViewModel::retryLoadQuizData)
        QuizDataState.Success -> when (state.screenID) {
            ScreenID.HOME -> ProfileHomeScreen(uiViewModel)
            ScreenID.QUIZ_LIST, ScreenID.QUIZ_SETUP, ScreenID.QUIZ_RUN, ScreenID.RESULT -> QuizScreen(uiViewModel)
        }
    }
}

@Composable
private fun LoadingScreen() {
    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        CircularProgressIndicator()
        Text("Đang tải dữ liệu bài test...", modifier = Modifier.padding(top = 16.dp))
    }
}

@Composable
private fun ErrorScreen(message: String, onRetry: () -> Unit) {
    Column(
        modifier = Modifier.fillMaxSize().padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text("Không thể tải dữ liệu", style = MaterialTheme.typography.headlineSmall)
        Text(message, modifier = Modifier.padding(top = 8.dp, bottom = 16.dp))
        Button(onClick = onRetry) { Text("Thử lại") }
    }
}
