import Foundation

enum TranslationService {
    private static let baseURL = URL(string: "https://2khj1mwr-5172.jpe1.devtunnels.ms")!

    static func translate(_ text: String) async throws -> String {
        let modelsURL = baseURL.appendingPathComponent("api/v1/models")
        let (modelsData, _) = try await URLSession.shared.data(from: modelsURL)
        let models = try JSONSerialization.jsonObject(with: modelsData) as? [String: Any]
        let modelList = models?["models"] as? [[String: Any]] ?? []
        let model = modelList.first(where: { ($0["key"] as? String) == "google/gemma-3-4b" })?["key"] as? String
            ?? modelList.first(where: { ($0["key"] as? String)?.localizedCaseInsensitiveContains("gemma-3-4b") == true })?["key"] as? String
            ?? "google/gemma-3-4b"

        var request = URLRequest(url: baseURL.appendingPathComponent("api/v1/chat"))
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try JSONSerialization.data(withJSONObject: [
            "model": model,
            "input": text,
            "system_prompt": "Translate the user's English text into natural Vietnamese. Return only the Vietnamese translation, with no explanation.",
            "temperature": 0.0,
            "max_output_tokens": 128,
            "store": false
        ])
        let (data, response) = try await URLSession.shared.data(for: request)
        if let http = response as? HTTPURLResponse, !(200...299).contains(http.statusCode) {
            throw URLError(.badServerResponse)
        }
        let root = try JSONSerialization.jsonObject(with: data) as? [String: Any]
        let output = root?["output"] as? [[String: Any]] ?? []
        return output.first(where: { ($0["type"] as? String) == "message" })?["content"] as? String ?? ""
    }
}
