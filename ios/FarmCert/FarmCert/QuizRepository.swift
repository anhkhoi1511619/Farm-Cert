import Foundation

enum QuizRepository {
    static func loadSets() -> [QuizSet] {
        ["ccar-p", "ccdv-f"].compactMap { name in
            guard let url = Bundle.main.url(forResource: name, withExtension: "js", subdirectory: "quiz")
                ?? Bundle.main.url(forResource: name, withExtension: "js"),
                  let raw = try? String(contentsOf: url, encoding: .utf8),
                  let data = jsonData(from: raw),
                  let quiz = try? JSONDecoder().decode(QuizSet.self, from: data) else { return nil }
            return quiz
        }
    }

    private static func jsonData(from source: String) -> Data? {
        guard let start = source.firstIndex(of: "{"), let end = source.lastIndex(of: "}") else { return nil }
        let object = String(source[start...end])
            .replacingOccurrences(of: ",\\s*([}\\]])", with: "$1", options: .regularExpression)
        return object.data(using: .utf8)
    }
}

enum AttemptStore {
    private static let key = "farm-cert.quiz-attempts"

    static func load() -> [QuizAttempt] {
        guard let data = UserDefaults.standard.data(forKey: key),
              let attempts = try? JSONDecoder().decode([QuizAttempt].self, from: data) else { return [] }
        return attempts.sorted { $0.completedAt > $1.completedAt }
    }

    static func save(_ attempt: QuizAttempt) {
        var attempts = load()
        attempts.insert(attempt, at: 0)
        if let data = try? JSONEncoder().encode(Array(attempts.prefix(50))) {
            UserDefaults.standard.set(data, forKey: key)
        }
    }
}
