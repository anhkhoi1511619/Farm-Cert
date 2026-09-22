import SwiftUI

struct ContentView: View {
    @ObservedObject var viewModel: QuizViewModel

    var body: some View {
        Group {
            switch viewModel.screen {
            case .home: HomeView(viewModel: viewModel)
            case .quiz: QuizView(viewModel: viewModel)
            case .result: ResultView(viewModel: viewModel)
            }
        }
        .sheet(isPresented: $viewModel.showSetup) {
            if let selectedSet = viewModel.selectedSet { SetupView(viewModel: viewModel, quiz: selectedSet) }
        }
    }
}

struct HomeView: View {
    @ObservedObject var viewModel: QuizViewModel

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    HStack(spacing: 12) {
                        Image("FarmCertLogo").resizable().scaledToFill().frame(width: 44, height: 44).clipShape(RoundedRectangle(cornerRadius: 10))
                        VStack(alignment: .leading) { Text("Farm Cert").font(.title.bold()); Text("Luyện thi CCAR-P và CCDV-F").foregroundStyle(.secondary) }
                    }
                    SectionTitle(title: "Chúc mừng thành tích", color: .orange)
                    BestScoreCard(attempt: viewModel.bestAttempt)
                    SectionTitle(title: "Danh sách bài test", color: .blue)
                    Text("Chọn một bài test để bắt đầu luyện tập.").foregroundStyle(.secondary)
                    ForEach(viewModel.sets) { quiz in QuizSetCard(quiz: quiz) { viewModel.openSetup(for: quiz) } }
                    SectionTitle(title: "Các lần thi đã qua", color: .green)
                    if viewModel.attempts.isEmpty { Text("Chưa có lần thi nào.").foregroundStyle(.secondary).padding() }
                    else { ScrollView(.horizontal, showsIndicators: false) { HStack { ForEach(viewModel.attempts.prefix(10)) { AttemptCard(attempt: $0) } } } }
                }.padding()
            }
            .navigationTitle("Farm Cert")
            .toolbar { ToolbarItem(placement: .principal) { HStack { Image("FarmCertLogo").resizable().frame(width: 28, height: 28).clipShape(RoundedRectangle(cornerRadius: 6)); Text("Farm Cert").bold() } } }
        }
    }
}

struct SectionTitle: View { let title: String; let color: Color; var body: some View { Text(title).font(.title2.bold()).foregroundStyle(color) } }

struct BestScoreCard: View {
    let attempt: QuizAttempt?
    var body: some View { Card { HStack { Image(systemName: "trophy.fill").font(.title).foregroundStyle(.orange); VStack(alignment: .leading) { Text(attempt == nil ? "Bạn chưa có điểm thi" : "Điểm cao nhất (attempt!.percentage)%").font(.headline); Text(attempt == nil ? "Hãy bắt đầu bài test đầu tiên!" : "(attempt!.score)/(attempt!.total) — (attempt!.quizTitle)").foregroundStyle(.secondary) } } } }
}

struct QuizSetCard: View {
    let quiz: QuizSet; let action: () -> Void
    var body: some View { Button(action: action) { Card { HStack { Image(systemName: "book.closed.fill").foregroundStyle(.blue); VStack(alignment: .leading) { Text(quiz.title).font(.headline).multilineTextAlignment(.leading); Text(quiz.description).font(.subheadline).foregroundStyle(.secondary).multilineTextAlignment(.leading) }; Spacer(); Text("\(quiz.questions.count) câu").foregroundStyle(.purple).bold() } } }.buttonStyle(.plain) }
}

struct AttemptCard: View { let attempt: QuizAttempt; var body: some View { Card { VStack(alignment: .leading) { Text("\(attempt.score)/\(attempt.total) điểm").font(.headline); Text("\(attempt.percentage)%").foregroundStyle(.green).bold(); Text(attempt.quizTitle).lineLimit(2).foregroundStyle(.secondary); Text(attempt.completedAt.formatted(date: .numeric, time: .shortened)).font(.caption).foregroundStyle(.secondary) } }.frame(width: 220) } }

struct Card<Content: View>: View { @ViewBuilder let content: () -> Content; var body: some View { content().padding().frame(maxWidth: .infinity, alignment: .leading).background(.background, in: RoundedRectangle(cornerRadius: 16)).overlay(RoundedRectangle(cornerRadius: 16).stroke(.gray.opacity(0.2))) } }

struct SetupView: View {
    @ObservedObject var viewModel: QuizViewModel; let quiz: QuizSet
    @State private var random = true; @State private var shuffleQuestions = true; @State private var shuffleAnswers = true; @State private var count = 10; @State private var start = 1; @State private var end: Int
    init(viewModel: QuizViewModel, quiz: QuizSet) { self.viewModel = viewModel; self.quiz = quiz; _end = State(initialValue: quiz.questions.count) }
    var body: some View { NavigationStack { Form { Section("Tùy chỉnh") { Toggle("Xáo trộn câu hỏi", isOn: $shuffleQuestions); Toggle("Xáo trộn đáp án", isOn: $shuffleAnswers); Picker("Cách chọn câu hỏi", selection: $random) { Text("Ngẫu nhiên N câu").tag(true); Text("Chọn khoảng câu").tag(false) }; if random { Stepper("Số câu: \(count)", value: $count, in: 1...max(1, quiz.questions.count)) } else { Stepper("Từ câu: \(start)", value: $start, in: 1...max(1, quiz.questions.count)); Stepper("Đến câu: \(end)", value: $end, in: start...max(start, quiz.questions.count)) } }; Section { Button("Bắt đầu làm bài") { viewModel.startQuiz(random: random, shuffleQuestions: shuffleQuestions, shuffleAnswers: shuffleAnswers, count: count, start: start, end: end) }.disabled(!random && start > end) } }.navigationTitle(quiz.title).toolbar { ToolbarItem(placement: .cancellationAction) { Button("Hủy") { viewModel.showSetup = false } } } } }
}
