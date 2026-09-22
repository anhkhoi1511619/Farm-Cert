import SwiftUI

struct QuizView: View {
    @ObservedObject var viewModel: QuizViewModel
    var body: some View {
        if let question = viewModel.currentQuestion {
            VStack(spacing: 0) {
                HStack { Button { viewModel.backHome() } label: { Image(systemName: "chevron.left") }; Text("Question \(viewModel.currentIndex + 1) / \(viewModel.questions.count)").font(.headline); Spacer() }.padding()
                ScrollView { VStack(alignment: .leading, spacing: 16) { HStack { ForEach(viewModel.questions.indices, id: \.self) { index in Button("\(index + 1)") { viewModel.jump(to: index) }.frame(width: 36, height: 36).background(viewModel.results[index] == true ? Color.green.opacity(0.25) : viewModel.results[index] == false ? Color.red.opacity(0.25) : index == viewModel.currentIndex ? Color.blue.opacity(0.25) : Color.gray.opacity(0.15), in: RoundedRectangle(cornerRadius: 8)) } }.scrollIndicators(.hidden); Text(question.question).font(.title3.bold()).textSelection(.enabled); Button("Dịch từ đã sao chép") { viewModel.translateCopiedWord() }.font(.caption); if !viewModel.translationWord.isEmpty { Card { VStack(alignment: .leading) { Text("Dịch từ: \(viewModel.translationWord)").bold(); Text(viewModel.isTranslating ? "Đang dịch..." : viewModel.translation).foregroundStyle(.secondary) } } }; ForEach(question.choices, id: \.self) { choice in Button { viewModel.toggleAnswer(choice) } label: { HStack(alignment: .top) { Image(systemName: viewModel.selectedAnswers.contains(choice) ? "checkmark.circle.fill" : "circle").foregroundStyle(.blue); Text(choice).multilineTextAlignment(.leading); Spacer() } }.buttonStyle(.plain).padding().background(viewModel.selectedAnswers.contains(choice) ? Color.blue.opacity(0.12) : Color.clear, in: RoundedRectangle(cornerRadius: 14)).overlay(RoundedRectangle(cornerRadius: 14).stroke(.gray.opacity(0.25))) }; if viewModel.isSubmitted { Text(viewModel.results[viewModel.currentIndex] == true ? "✓ Chính xác" : "Đáp án đúng: \(question.answers.joined(separator: ", "))").foregroundStyle(viewModel.results[viewModel.currentIndex] == true ? .green : .red).bold() }; Button(viewModel.isSubmitted ? (viewModel.currentIndex + 1 == viewModel.questions.count ? "Hoàn thành" : "Câu tiếp theo") : "Kiểm tra đáp án") { viewModel.isSubmitted ? viewModel.next() : viewModel.submit() }.buttonStyle(.borderedProminent).frame(maxWidth: .infinity) }.padding() }
            }
        }
    }
}
