package com.Zz1511619zZ.farmcert.view.quiz

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
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.Zz1511619zZ.farmcert.model.quiz.QuizQuestion
import com.Zz1511619zZ.farmcert.model.quiz.QuizSet
import com.Zz1511619zZ.farmcert.view.viewmodel.UIViewModel

@Composable
fun QuizScreen(uiViewModel: UIViewModel) {
    val state by uiViewModel.uiState.collectAsState()
    when (state.screenID) {
        com.Zz1511619zZ.farmcert.view.viewmodel.ScreenID.QUIZ_LIST -> QuizList(state.quizSets) { uiViewModel.openQuizSetup(it) }
        com.Zz1511619zZ.farmcert.view.viewmodel.ScreenID.QUIZ_SETUP -> QuizSetup(
            quiz = state.selectedQuiz ?: return,
            onCancel = uiViewModel::showHome,
            onStart = { randomizeQuestions, randomizeAnswers, mode, count, start, end ->
                uiViewModel.startQuiz(randomizeQuestions, randomizeAnswers, mode, count, start, end)
            }
        )
        com.Zz1511619zZ.farmcert.view.viewmodel.ScreenID.QUIZ_RUN -> QuizRun(
            question = state.quizQuestions.getOrNull(state.quizIndex) ?: return,
            index = state.quizIndex,
            total = state.quizQuestions.size,
            selected = state.selectedAnswers,
            answered = state.answerSubmitted,
            completedQuestionIndices = state.completedQuestionIndices,
            questionResults = state.questionResults,
            onSelect = uiViewModel::selectAnswer,
            onSubmit = uiViewModel::submitAnswer,
            onNext = uiViewModel::nextQuestion,
            onJump = uiViewModel::jumpToQuestion,
            onBack = uiViewModel::showHome
        )
        com.Zz1511619zZ.farmcert.view.viewmodel.ScreenID.RESULT -> QuizResultScreen(
            title = state.selectedQuiz?.title ?: "Kết quả bài thi",
            total = state.quizQuestions.size,
            correct = state.correctAnswersCount,
            answered = state.completedQuestionIndices.size,
            durationSeconds = state.resultDurationSeconds,
            wrongCount = state.questionResults.count { !it.value },
            onBackToSets = uiViewModel::showHome,
            onRetryWrong = uiViewModel::retryWrongQuestions,
            onRetryAll = uiViewModel::retryAllQuestions
        )
        else -> QuizList(state.quizSets) { uiViewModel.openQuizSetup(it) }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun QuizList(quizzes: List<QuizSet>, onOpen: (QuizSet) -> Unit) {
    Scaffold(topBar = { TopAppBar(title = { Text("📚 Danh sách bài test", fontWeight = FontWeight.Bold) }) }) { padding ->
        LazyColumn(Modifier.fillMaxSize().padding(padding).padding(horizontal = 20.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
            item { Text("Chọn một bài test để bắt đầu luyện tập.", color = MaterialTheme.colorScheme.onSurfaceVariant) }
            items(quizzes) { quiz ->
                Card(Modifier.fillMaxWidth().clickable { onOpen(quiz) }, shape = RoundedCornerShape(16.dp), colors = CardDefaults.cardColors(containerColor = Color.White), elevation = CardDefaults.cardElevation(1.dp)) {
                    Row(Modifier.fillMaxWidth().padding(20.dp), verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.MenuBook, null, tint = MaterialTheme.colorScheme.primary)
                        Spacer(Modifier.width(14.dp))
                        Column(Modifier.weight(1f)) { Text(quiz.title, fontWeight = FontWeight.Bold); Text(quiz.description, color = MaterialTheme.colorScheme.onSurfaceVariant) }
                        Text("${quiz.questions.size} câu", color = MaterialTheme.colorScheme.primary, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun QuizSetup(quiz: QuizSet, onCancel: () -> Unit, onStart: (Boolean, Boolean, String, Int, Int, Int) -> Unit) {
    var shuffleQuestions by remember { mutableStateOf(true) }
    var shuffleAnswers by remember { mutableStateOf(true) }
    var mode by remember { mutableStateOf("random") }
    var countText by remember { mutableStateOf(minOf(quiz.questions.size, 63).toString()) }
    var startText by remember { mutableStateOf("1") }
    var endText by remember { mutableStateOf(quiz.questions.size.toString()) }
    AlertDialog(onDismissRequest = onCancel, title = { Text(quiz.title, fontWeight = FontWeight.Bold) }, text = {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            SettingSwitch("Đảo thứ tự câu hỏi", "Ngẫu nhiên hóa thứ tự các câu trong bài.", shuffleQuestions) { shuffleQuestions = it }
            SettingSwitch("Đảo thứ tự đáp án", "Áp dụng cho câu hỏi dạng chọn đáp án.", shuffleAnswers) { shuffleAnswers = it }
            Text("Cách chọn câu hỏi", fontWeight = FontWeight.Bold)
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                if (mode == "random") Button({ mode = "random" }, Modifier.weight(1f)) { Text("🎲 Ngẫu nhiên N câu") }
                else OutlinedButton({ mode = "random" }, Modifier.weight(1f)) { Text("🎲 Ngẫu nhiên N câu") }
                if (mode == "range") Button({ mode = "range" }, Modifier.weight(1f)) { Text("🔢 Chọn khoảng câu") }
                else OutlinedButton({ mode = "range" }, Modifier.weight(1f)) { Text("🔢 Chọn khoảng câu") }
            }
            if (mode == "random") {
                OutlinedTextField(countText, { countText = it.filter(Char::isDigit) }, label = { Text("Số lượng câu hỏi") }, singleLine = true)
                Text("Bài test có ${quiz.questions.size} câu — sẽ chọn ngẫu nhiên $countText câu.", color = MaterialTheme.colorScheme.onSurfaceVariant)
            } else {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    OutlinedTextField(startText, { startText = it.filter(Char::isDigit) }, label = { Text("Từ câu") }, modifier = Modifier.weight(1f), singleLine = true)
                    OutlinedTextField(endText, { endText = it.filter(Char::isDigit) }, label = { Text("Đến câu") }, modifier = Modifier.weight(1f), singleLine = true)
                }
            }
        }
    }, confirmButton = { Button({ onStart(shuffleQuestions, shuffleAnswers, mode, countText.toIntOrNull() ?: 1, startText.toIntOrNull() ?: 1, endText.toIntOrNull() ?: quiz.questions.size) }) { Text("Bắt đầu làm bài") } }, dismissButton = { TextButton(onCancel) { Text("Hủy") } })
}

@Composable
private fun SettingSwitch(title: String, subtitle: String, checked: Boolean, onChecked: (Boolean) -> Unit) {
    Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) { Column(Modifier.weight(1f)) { Text(title, fontWeight = FontWeight.SemiBold); Text(subtitle, color = MaterialTheme.colorScheme.onSurfaceVariant) }; Switch(checked, onChecked) }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun QuizRun(question: QuizQuestion, index: Int, total: Int, selected: Set<String>, answered: Boolean, completedQuestionIndices: Set<Int>, questionResults: Map<Int, Boolean>, onSelect: (String) -> Unit, onSubmit: () -> Unit, onNext: () -> Unit, onJump: (Int) -> Unit, onBack: () -> Unit) {
    Scaffold(topBar = { TopAppBar(title = { Text("Question ${index + 1} / $total") }, navigationIcon = { IconButton(onBack) { Icon(Icons.Default.ArrowBack, "Trang chủ") } }) }) { padding ->
        LazyColumn(Modifier.fillMaxSize().padding(padding).padding(horizontal = 18.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            item {
                Text("Câu hỏi", fontWeight = FontWeight.Bold)
                Column(verticalArrangement = Arrangement.spacedBy(6.dp), modifier = Modifier.padding(top = 6.dp)) {
                    (0 until total).toList().chunked(8).forEach { row ->
                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            row.forEach { number ->
                                val selectedNumber = number == index
                                val completed = number in completedQuestionIndices
                                val isCorrect = questionResults[number] == true
                                val isIncorrect = questionResults[number] == false
                                val chipColor = when {
                                    selectedNumber -> MaterialTheme.colorScheme.primaryContainer
                                    isCorrect -> Color(0xFFDDF5E5)
                                    isIncorrect -> Color(0xFFFFE0E0)
                                    else -> MaterialTheme.colorScheme.surfaceVariant
                                }
                                val chipBorderColor = when {
                                    selectedNumber -> MaterialTheme.colorScheme.primary
                                    isCorrect -> Color(0xFF16803C)
                                    isIncorrect -> Color(0xFFB3261E)
                                    else -> MaterialTheme.colorScheme.outlineVariant
                                }
                                Box(Modifier.width(38.dp).height(36.dp).background(chipColor, RoundedCornerShape(8.dp)).border(1.dp, chipBorderColor, RoundedCornerShape(8.dp)).clickable { onJump(number) }, contentAlignment = Alignment.Center) {
                                    Text("${number + 1}", fontWeight = if (selectedNumber || completed) FontWeight.Bold else FontWeight.Normal, color = when {
                                        selectedNumber -> MaterialTheme.colorScheme.onSurface
                                        isCorrect -> Color(0xFF16803C)
                                        isIncorrect -> Color(0xFFB3261E)
                                        else -> MaterialTheme.colorScheme.onSurface
                                    })
                                }
                            }
                        }
                    }
                }
            }
            item { Text(question.question, style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold) }
            if (question.type == "yesno" || question.type == "dropdown") {
                items(question.statements) { statement -> AnswerCard(statement, selected.contains(statement), answered, false) { onSelect(statement) } }
            } else {
                items(question.options) { option -> AnswerCard(option, selected.contains(option), answered, question.correctAnswers.contains(option)) { onSelect(option) } }
            }
            item {
                if (answered) Text(if (selected == question.correctAnswers) "✓ Chính xác" else "Đáp án đúng: ${question.correctAnswers.joinToString()}", color = if (selected == question.correctAnswers) Color(0xFF16803C) else MaterialTheme.colorScheme.error, fontWeight = FontWeight.Bold)
                Spacer(Modifier.height(4.dp))
                Button(if (answered) onNext else onSubmit, Modifier.fillMaxWidth()) { Text(if (answered) if (index + 1 == total) "Hoàn thành" else "Câu tiếp theo" else "Kiểm tra đáp án") }
            }
        }
    }
}

@Composable
private fun AnswerCard(text: String, checked: Boolean, answered: Boolean, correct: Boolean, onClick: () -> Unit) {
    val color = if (answered && correct) Color(0xFFDDF5E5) else if (answered && checked) Color(0xFFFFE0E0) else Color.Transparent
    Row(Modifier.fillMaxWidth().background(color, RoundedCornerShape(14.dp)).border(1.dp, MaterialTheme.colorScheme.outlineVariant, RoundedCornerShape(14.dp)).clickable(enabled = !answered, onClick = onClick).padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
        Text(if (checked) "◉" else "○", color = MaterialTheme.colorScheme.primary, style = MaterialTheme.typography.titleLarge)
        Spacer(Modifier.width(12.dp)); Text(text)
    }
}

@Composable
private fun QuizResultScreen(
    title: String,
    total: Int,
    correct: Int,
    answered: Int,
    durationSeconds: Long,
    wrongCount: Int,
    onBackToSets: () -> Unit,
    onRetryWrong: () -> Unit,
    onRetryAll: () -> Unit
) {
    val skipped = (total - answered).coerceAtLeast(0)
    val percentage = if (total == 0) 0 else correct * 100 / total
    val minutes = durationSeconds / 60
    val seconds = durationSeconds % 60
    LazyColumn(
        Modifier.fillMaxSize().padding(20.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Text("📊 KẾT QUẢ", color = MaterialTheme.colorScheme.primary, fontWeight = FontWeight.Bold)
            Text("Kết quả bài thi", style = MaterialTheme.typography.headlineLarge, fontWeight = FontWeight.Bold)
            Text(title, color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
        item {
            Card(Modifier.fillMaxWidth(), shape = RoundedCornerShape(20.dp)) {
                Column(Modifier.fillMaxWidth().padding(24.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("$percentage%", style = MaterialTheme.typography.displayMedium, fontWeight = FontWeight.Bold, color = if (percentage >= 70) Color(0xFF16803C) else Color(0xFFB3261E))
                    Text("Điểm số", color = MaterialTheme.colorScheme.onSurfaceVariant)
                    Spacer(Modifier.height(12.dp))
                    Text(if (percentage >= 70) "✓ ĐẠT" else "✕ CHƯA ĐẠT", fontWeight = FontWeight.Bold, color = if (percentage >= 70) Color(0xFF16803C) else Color(0xFFB3261E))
                }
            }
        }
        item {
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                ResultStat("$correct", "ĐÚNG", Color(0xFF16803C), Modifier.weight(1f))
                ResultStat("$wrongCount", "SAI", Color(0xFFB3261E), Modifier.weight(1f))
                ResultStat("$skipped", "BỎ QUA", Color(0xFF9A6700), Modifier.weight(1f))
                ResultStat("%d:%02d".format(minutes, seconds), "THỜI GIAN", MaterialTheme.colorScheme.primary, Modifier.weight(1f))
            }
        }
        item {
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Button(onClick = onBackToSets, Modifier.weight(1f)) { Text("Trang chủ") }
                OutlinedButton(onClick = onRetryAll, Modifier.weight(1f)) { Text("Tất cả câu") }
                OutlinedButton(onClick = onRetryWrong, enabled = wrongCount > 0, modifier = Modifier.weight(1f)) { Text("Làm lại sai ($wrongCount)") }
            }
        }
    }
}

@Composable
private fun ResultStat(value: String, label: String, color: Color, modifier: Modifier = Modifier) {
    Card(modifier) {
        Column(Modifier.fillMaxWidth().padding(vertical = 14.dp), horizontalAlignment = Alignment.CenterHorizontally) {
            Text(value, fontWeight = FontWeight.Bold, color = color)
            Text(label, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
    }
}
