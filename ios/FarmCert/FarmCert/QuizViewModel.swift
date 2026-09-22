import Foundation
import Combine
import UIKit

@MainActor
final class QuizViewModel: ObservableObject {
    @Published var sets: [QuizSet] = QuizRepository.loadSets()
    @Published var attempts: [QuizAttempt] = AttemptStore.load()
    @Published var screen: QuizScreen = .home
    @Published var selectedSet: QuizSet?
    @Published var showSetup = false
    @Published var questions: [QuizQuestion] = []
    @Published var currentIndex = 0
    @Published var selectedAnswers: Set<String> = []
    @Published var answersByIndex: [Int: Set<String>] = [:]
    @Published var results: [Int: Bool] = [:]
    @Published var isSubmitted = false
    @Published var translation = ""
    @Published var translationWord = ""
    @Published var isTranslating = false

    var currentQuestion: QuizQuestion? { questions.indices.contains(currentIndex) ? questions[currentIndex] : nil }
    var currentChoices: [String] { currentQuestion?.choices ?? [] }
    var correctCount: Int { results.values.filter { $0 }.count }
    var wrongCount: Int { results.values.filter { !$0 }.count }
    var bestAttempt: QuizAttempt? { attempts.max { $0.percentage < $1.percentage } }

    func openSetup(for quiz: QuizSet) { selectedSet = quiz; showSetup = true }

    func startQuiz(random: Bool, shuffleQuestions: Bool, shuffleAnswers: Bool, count: Int, start: Int, end: Int) {
        guard let set = selectedSet else { return }
        var selected = random ? Array(set.questions.shuffled().prefix(max(1, min(count, set.questions.count)))) : Array(set.questions[max(0, start - 1)..<min(end, set.questions.count)])
        if shuffleQuestions && !random { selected.shuffle() }
        questions = selected
        if shuffleAnswers { questions = questions.map { question in
            QuizQuestion(question: question.question, options: question.options?.shuffled(), statements: question.statements?.shuffled(), answers: question.answers, type: question.type)
        }}
        currentIndex = 0; selectedAnswers = []; answersByIndex = [:]; results = [:]; isSubmitted = false; translation = ""; translationWord = ""
        showSetup = false; screen = .quiz
    }

    func toggleAnswer(_ answer: String) {
        guard !isSubmitted else { return }
        if selectedAnswers.contains(answer) { selectedAnswers.remove(answer) } else { selectedAnswers.insert(answer) }
    }

    func submit() {
        guard let question = currentQuestion else { return }
        answersByIndex[currentIndex] = selectedAnswers
        results[currentIndex] = selectedAnswers == Set(question.answers)
        isSubmitted = true
    }

    func next() {
        guard isSubmitted else { return }
        if currentIndex + 1 < questions.count {
            currentIndex += 1; selectedAnswers = answersByIndex[currentIndex] ?? []; isSubmitted = results[currentIndex] != nil
        } else {
            let attempt = QuizAttempt(id: UUID(), quizTitle: selectedSet?.title ?? "Farm Cert", score: correctCount, total: questions.count, completedAt: Date())
            AttemptStore.save(attempt); attempts = AttemptStore.load(); screen = .result
        }
    }

    func jump(to index: Int) {
        guard questions.indices.contains(index) else { return }
        currentIndex = index; selectedAnswers = answersByIndex[index] ?? []; isSubmitted = results[index] != nil
    }

    func retryAll() { restart(with: questions) }
    func retryWrong() { restart(with: questions.enumerated().compactMap { results[$0.offset] == false ? $0.element : nil }) }
    private func restart(with newQuestions: [QuizQuestion]) { questions = newQuestions; currentIndex = 0; selectedAnswers = []; answersByIndex = [:]; results = [:]; isSubmitted = false; screen = .quiz }
    func backHome() { screen = .home; selectedSet = nil }

    func translateCopiedWord() {
        guard let copied = UIPasteboard.general.string?.trimmingCharacters(in: .whitespacesAndNewlines), !copied.isEmpty else { return }
        translationWord = copied; isTranslating = true; translation = ""
        Task {
            do { let value = try await TranslationService.translate(copied); translation = value }
            catch { translation = "Không thể dịch lúc này." }
            isTranslating = false
        }
    }
}
