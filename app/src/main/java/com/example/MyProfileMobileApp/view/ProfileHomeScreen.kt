package com.example.MyProfileMobileApp.view

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.EmojiEvents
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.MyProfileMobileApp.model.quiz.QuizAttempt
import com.example.MyProfileMobileApp.model.quiz.QuizSet
import com.example.MyProfileMobileApp.view.viewmodel.UIViewModel
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProfileHomeScreen(uiViewModel: UIViewModel) {
    val state by uiViewModel.uiState.collectAsState()
    val best = state.quizAttempts.maxByOrNull { it.percentage }
    Scaffold(topBar = { TopAppBar(title = { Text("Trang chủ", fontWeight = FontWeight.Bold) }) }) { padding ->
        LazyColumn(Modifier.fillMaxSize().padding(padding).padding(horizontal = 20.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
            item {
                SectionTitle("🏆  Chúc mừng thành tích", Color(0xFF8A5A00), Color(0xFFFFF4D6))
                Spacer(Modifier.height(8.dp))
                BestScoreCard(best)
            }
            item {
                Spacer(Modifier.height(6.dp))
                SectionTitle("📚  Danh sách bài test", Color(0xFF5E2AA8), Color(0xFFF0E7FF))
                Text("Chọn một bài test để bắt đầu luyện tập.", color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 6.dp))
            }
            items(state.quizSets) { quiz -> QuizHomeCard(quiz) { uiViewModel.openQuizSetup(quiz) } }
            item {
                Card(Modifier.fillMaxWidth().border(3.dp, Color(0xFF6D91D8), RoundedCornerShape(18.dp)), shape = RoundedCornerShape(18.dp), colors = CardDefaults.cardColors(containerColor = Color(0xFFF2F6FF))) {
                    Column(Modifier.padding(16.dp)) {
                        SectionTitle("📊  Các lần thi đã qua", Color(0xFF24539B), Color(0xFFDCE8FF))
                        Spacer(Modifier.height(10.dp))
                        if (state.quizAttempts.isEmpty()) {
                            Text("Chưa có lần thi nào. Hãy chọn một bài test bên dưới để bắt đầu luyện tập.", color = MaterialTheme.colorScheme.onSurfaceVariant)
                        } else {
                            LazyRow(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                                items(state.quizAttempts.take(5)) { AttemptRow(it) }
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun SectionTitle(title: String, textColor: Color, backgroundColor: Color) {
    Text(title, modifier = Modifier.background(backgroundColor, RoundedCornerShape(10.dp)).padding(horizontal = 14.dp, vertical = 8.dp), color = textColor, style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
}

@Composable
private fun BestScoreCard(best: QuizAttempt?) {
    Card(Modifier.fillMaxWidth().border(3.dp, Color(0xFFE0A62A), RoundedCornerShape(18.dp)), shape = RoundedCornerShape(18.dp), colors = CardDefaults.cardColors(containerColor = Color(0xFFFFF4D6))) {
        Row(Modifier.padding(18.dp), verticalAlignment = Alignment.CenterVertically) {
            Icon(Icons.Default.EmojiEvents, null, tint = Color(0xFFE09A00))
            Spacer(Modifier.width(14.dp))
            Column {
                Text(if (best == null) "Bạn chưa có điểm thi" else "Điểm cao nhất: ${best.score}/${best.total} (${best.percentage}%)", fontWeight = FontWeight.Bold)
                Text(if (best == null) "Hãy bắt đầu bài test đầu tiên!" else best.quizTitle, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }
    }
}

@Composable
private fun AttemptRow(attempt: QuizAttempt) {
    Card(Modifier.width(250.dp).border(2.dp, Color(0xFF9CB8EA), RoundedCornerShape(14.dp)), shape = RoundedCornerShape(14.dp), colors = CardDefaults.cardColors(containerColor = Color.White)) {
        Row(Modifier.padding(14.dp), verticalAlignment = Alignment.CenterVertically) {
            Column(Modifier.weight(1f)) {
                Text(attempt.quizTitle, fontWeight = FontWeight.SemiBold)
                Text(SimpleDateFormat("dd/MM/yyyy HH:mm", Locale.getDefault()).format(Date(attempt.completedAt)), color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
            Text("${attempt.score}/${attempt.total}", color = MaterialTheme.colorScheme.primary, fontWeight = FontWeight.Bold)
        }
    }
}

@Composable
private fun QuizHomeCard(quiz: QuizSet, onClick: () -> Unit) {
    Card(Modifier.fillMaxWidth().border(2.dp, Color(0xFFB794E8), RoundedCornerShape(16.dp)).clickable(onClick = onClick), shape = RoundedCornerShape(16.dp), colors = CardDefaults.cardColors(containerColor = Color(0xFFFCFAFF)), elevation = CardDefaults.cardElevation(1.dp)) {
        Row(Modifier.fillMaxWidth().padding(20.dp), verticalAlignment = Alignment.CenterVertically) {
            Icon(Icons.Default.MenuBook, null, tint = MaterialTheme.colorScheme.primary)
            Spacer(Modifier.width(14.dp))
            Column(Modifier.weight(1f)) {
                Text(quiz.title, fontWeight = FontWeight.Bold)
                Text(quiz.description, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
            Text("${quiz.questions.size} câu", color = MaterialTheme.colorScheme.primary, fontWeight = FontWeight.Bold)
        }
    }
}
