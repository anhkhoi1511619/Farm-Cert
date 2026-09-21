# Farm Cert

> Ứng dụng Android luyện thi CCAR-P và CCDV-F, hoạt động offline và lưu lịch sử điểm trên thiết bị.

## Tổng quan

Farm Cert được phát triển bằng Kotlin và Jetpack Compose. Ứng dụng đọc bộ câu hỏi được đóng gói sẵn trong `app/src/main/assets/quiz`, cho phép người dùng tạo bài test tùy chỉnh, làm bài, xem kết quả và theo dõi các lần thi trước đó.

Application ID chính thức:

```text
com.Zz1511619zZ.farmcert
```

## Tính năng

- Màn hình Home với thành tích cao nhất.
- Hiển thị lịch sử các lần thi theo dạng ngang có thể vuốt.
- Danh sách bộ đề CCAR-P và CCDV-F.
- Chọn số lượng câu hỏi ngẫu nhiên từ toàn bộ ngân hàng câu hỏi.
- Chọn khoảng câu hỏi cố định.
- Xáo trộn thứ tự câu hỏi.
- Xáo trộn thứ tự đáp án.
- Chọn đáp án và xem đáp án đúng sau khi hoàn thành.
- Hiển thị điểm số, số câu đúng và thời gian làm bài.
- Lưu lịch sử điểm cục bộ trên thiết bị.
- Không yêu cầu đăng nhập và không phụ thuộc backend.

## Kiến trúc thư mục

```text
app/src/main/
├── assets/quiz/              # Dữ liệu câu hỏi CCDV-F và CCAR-P
├── java/com/Zz1511619zZ/farmcert/
│   ├── model/quiz/           # QuizQuestion, QuizSet, QuizAttempt
│   ├── utils/                # Đọc database assets và lưu lịch sử
│   ├── view/                 # Home, quiz, theme
│   └── view/viewmodel/       # UI state và điều hướng màn hình
└── res/                      # Manifest, icon và tài nguyên Android
```

## Công nghệ sử dụng

- Kotlin
- Jetpack Compose
- Material 3
- Android ViewModel
- Gradle Kotlin DSL
- Android Gradle Plugin 8.13.0
- Gradle 8.13
- Compile SDK / Target SDK 36
- Minimum SDK 28
- Lưu dữ liệu cục bộ bằng SharedPreferences

## Môi trường phát triển

Cần cài đặt:

- Android Studio phiên bản mới hỗ trợ AGP 8.13.
- JDK 17.
- Android SDK Platform 36.
- Android SDK Build-Tools và Platform-Tools.
- Git.

Mở project bằng Android Studio, chọn Gradle JDK là `Embedded JDK` hoặc JDK 17, sau đó chạy Gradle Sync.

## Build debug

Trên Windows:

```powershell
.\gradlew.bat :app:assembleDebug
```

Trên macOS/Linux:

```bash
./gradlew :app:assembleDebug
```

## Chạy JUnit test

Chạy toàn bộ unit test:

```powershell
.\gradlew.bat :app:testDebugUnitTest
```

Các test hiện có kiểm tra việc parse hai ngân hàng câu hỏi thật, chọn câu ngẫu nhiên hoặc theo khoảng, giới hạn số câu, xáo trộn đáp án, chấm câu đơn/multi-select, tính phần trăm, số câu bỏ qua và retry câu sai.

## Jenkins CI/CD

File `Jenkinsfile` ở thư mục gốc mô phỏng pipeline của dự án PR-Profile nhưng phù hợp với cấu trúc Farm Cert hiện tại. Pipeline không chứa đường dẫn tuyệt đối kiểu `/Users/...`; nó chỉ dùng SDK path chuẩn trên Jenkins agent để tạo `local.properties` tạm thời.

Pipeline gồm:

1. Checkout source từ SCM.
2. Chạy toàn bộ JUnit test bằng `testDebugUnitTest` và xuất kết quả JUnit cho Jenkins.
3. Build APK debug bằng `assembleDebug`.
4. Lưu APK và các report làm artifact của build.

Jenkins agent cần có JDK 17, Android SDK Platform 36, Android SDK Build-Tools, Android SDK Platform-Tools và quyền chạy shell script. Pipeline tự tìm SDK tại `~/Library/Android/sdk` (macOS) hoặc `~/Android/Sdk` (Linux), sau đó tạo `local.properties` tạm thời trong workspace.

Bản release `.aab` và upload lên Google Play cần bổ sung credential keystore/Play Console riêng trên Jenkins; không đưa các secret này vào Git.

```powershell
.\gradlew.bat :app:bundleRelease
```

## Nhánh phát triển

Nhánh UI và chuẩn bị phát hành hiện tại là `codex/profile-ui-refresh`.
