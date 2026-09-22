import Foundation

struct QuizQuestion: Codable, Identifiable, Hashable {
    let question: String
    let options: [String]?
    let statements: [String]?
    let answers: [String]
    let type: String?

    var id: String { question }
    var choices: [String] { options ?? statements ?? [] }
}

struct QuizSet: Codable, Identifiable {
    let title: String
    let description: String
    let defaultCount: Int
    let questions: [QuizQuestion]

    var id: String { title }
}

struct QuizAttempt: Codable, Identifiable {
    let id: UUID
    let quizTitle: String
    let score: Int
    let total: Int
    let completedAt: Date

    var percentage: Int { total == 0 ? 0 : Int((Double(score) / Double(total) * 100).rounded()) }
}

enum QuizScreen {
    case home
    case quiz
    case result
}
