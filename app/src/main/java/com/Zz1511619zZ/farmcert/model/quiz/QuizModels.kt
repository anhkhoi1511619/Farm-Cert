package com.Zz1511619zZ.farmcert.model.quiz

data class QuizSet(
    val id: String,
    val title: String,
    val description: String,
    val questions: List<QuizQuestion>
)

data class QuizQuestion(
    val number: Int,
    val question: String,
    val options: List<String> = emptyList(),
    val correctAnswers: Set<String> = emptySet(),
    val type: String = "single",
    val statements: List<String> = emptyList(),
    val dropdownOptions: List<List<String>> = emptyList(),
    /** Ordered answers are required for compound questions where values may repeat. */
    val correctAnswerValues: List<String> = correctAnswers.toList()
) {
    val isMultiSelect: Boolean
        get() = correctAnswers.size > 1 || type == "yesno" || type == "dropdown"
}
