package com.Zz1511619zZ.farmcert.view

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.Image
import androidx.compose.foundation.clip
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
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.Zz1511619zZ.farmcert.model.quiz.QuizAttempt
import com.Zz1511619zZ.farmcert.model.quiz.QuizSet
import com.Zz1511619zZ.farmcert.R
import com.Zz1511619zZ.farmcert.view.viewmodel.UIViewModel
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

private val FarmBlue = Color(0xFF1F4E79)
private val HomeBackground = Color(0xFFF7F8FA)
private val CardBorder = Color(0xFFE3E5E8)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProfileHomeScreen(uiViewModel: UIViewModel) {
    val state by uiViewModel.uiState.collectAsState()
    val best = state.quizAttempts.maxByOrNull { it.percentage }

    Scaffold(
        containerColor = HomeBackground,
        topBar = {
            TopAppBar(
                title = {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Image(
                            painter = painterResource(R.drawable.farm_cert_icon),
                            contentDescription = "Biểu tượng Farm Cert",
                            modifier = Modifier.size(32.dp).clip(RoundedCornerShape(8.dp))
                        )
                        Spacer(Modifier.width(10.dp))
                        Text("Farm Cert", color = Color.White, fontWeight = FontWeight.Bold)
                    }
                },
                colors = TopAppBarDefaults.smallTopAppBarColors(containerColor = FarmBlue)
            )
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier.fillMaxSize().padding(padding).padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            item {
                Spacer(Modifier.height(4.dp))
                SectionHeading("Chúc mừng thành tích")
                BestScoreCard(best)
            }
            item {
                Spacer(Modifier.height(8.dp))
                SectionHeading("Danh sách bài test")
                Text("Chọn một bài test để bắt đầu luyện tập.", color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
            items(state.quizSets) { quiz -> QuizHomeCard(quiz) { uiViewModel.openQuizSetup(quiz) } }
            item {
                Spacer(Modifier.height(8.dp))
                SectionHeading("Các lần thi đã qua")
                if (state.quizAttempts.isEmpty()) {
                    EmptyHistoryCard()
                } else {
                    LazyRow(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                        items(state.quizAttempts.take(5)) { AttemptCard(it) }
                    }
                }
            }
            item { Spacer(Modifier.height(8.dp)) }
        }
    }
}

@Composable
private fun SectionHeading(title: String) {
    Text(title, style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold, color = Color(0xFF202124), modifier = Modifier.padding(bottom = 6.dp))
}

@Composable
private fun BestScoreCard(best: QuizAttempt?) {
    Card(Modifier.fillMaxWidth().border(1.dp, Color(0xFFFFC107), RoundedCornerShape(12.dp)), shape = RoundedCornerShape(12.dp), colors = CardDefaults.cardColors(containerColor = Color(0xFFFFFBF0))) {
        Row(Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
            Box(Modifier.size(48.dp).background(Color(0xFFFFE7A3), RoundedCornerShape(10.dp)), contentAlignment = Alignment.Center) {
                Icon(Icons.Default.EmojiEvents, null, tint = Color(0xFFB77900))
            }
            Spacer(Modifier.width(12.dp))
            Column {
                Text(if (best == null) "Bạn chưa có điểm thi" else "Điểm cao nhất ${best.percentage}%", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                Text(if (best == null) "Hãy bắt đầu bài test đầu tiên!" else "${best.score}/${best.total} — ${best.quizTitle}", color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }
    }
}

@Composable
private fun QuizHomeCard(quiz: QuizSet, onClick: () -> Unit) {
    Card(Modifier.fillMaxWidth().border(1.dp, CardBorder, RoundedCornerShape(12.dp)).clickable(onClick = onClick), shape = RoundedCornerShape(12.dp), colors = CardDefaults.cardColors(containerColor = Color.White)) {
        Row(Modifier.fillMaxWidth().padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
            Box(Modifier.size(44.dp).background(Color(0xFFE4EEFF), RoundedCornerShape(8.dp)), contentAlignment = Alignment.Center) {
                Icon(Icons.Default.MenuBook, null, tint = Color(0xFF2D6CDF))
            }
            Spacer(Modifier.width(12.dp))
            Column(Modifier.weight(1f)) {
                Text(quiz.title, fontWeight = FontWeight.Bold, color = Color(0xFF202124))
                Text(quiz.description, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
            Box(Modifier.background(Color(0xFFF0E8FF), RoundedCornerShape(20.dp)).padding(horizontal = 10.dp, vertical = 6.dp)) {
                Text("${quiz.questions.size} câu", color = Color(0xFF6A35C7), fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
private fun AttemptCard(attempt: QuizAttempt) {
    Card(Modifier.width(235.dp).border(1.dp, CardBorder, RoundedCornerShape(12.dp)), shape = RoundedCornerShape(12.dp), colors = CardDefaults.cardColors(containerColor = Color.White)) {
        Column(Modifier.padding(14.dp)) {
            Text("${attempt.score}/${attempt.total} điểm", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold, color = Color(0xFF24539B))
            Text("${attempt.percentage}%", color = Color(0xFF16803C), fontWeight = FontWeight.Bold)
            Text(attempt.quizTitle, maxLines = 2, color = MaterialTheme.colorScheme.onSurfaceVariant)
            Text(SimpleDateFormat("dd/MM/yyyy HH:mm", Locale.getDefault()).format(Date(attempt.completedAt)), color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
    }
}

@Composable
private fun EmptyHistoryCard() {
    Card(Modifier.fillMaxWidth().border(1.dp, CardBorder, RoundedCornerShape(12.dp)), shape = RoundedCornerShape(12.dp), colors = CardDefaults.cardColors(containerColor = Color.White)) {
        Text("Chưa có lần thi nào. Hãy chọn một bài test để bắt đầu.", modifier = Modifier.padding(16.dp), color = MaterialTheme.colorScheme.onSurfaceVariant)
    }
}
