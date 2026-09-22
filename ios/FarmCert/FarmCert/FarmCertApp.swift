import SwiftUI

@main
struct FarmCertApp: App {
    @StateObject private var viewModel = QuizViewModel()

    var body: some Scene {
        WindowGroup {
            ContentView(viewModel: viewModel)
        }
    }
}
