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

## Build bản phát hành Google Play

Ứng dụng mới trên Google Play cần được phát hành dưới dạng Android App Bundle (`.aab`). Tạo file `keystore.properties` từ file mẫu `keystore.properties.example`, tạo upload keystore ở ngoài Git, rồi chạy:

```powershell
.\gradlew.bat :app:bundleRelease
```

File kết quả:

```text
app/build/outputs/bundle/release/app-release.aab
```

Không commit keystore, mật khẩu hoặc `keystore.properties` lên GitHub.

## Dữ liệu và quyền riêng tư

Bản hiện tại hoạt động offline. Bộ câu hỏi nằm trong assets; lịch sử điểm được lưu cục bộ trên thiết bị. Ứng dụng không yêu cầu tài khoản và không sử dụng backend, quảng cáo hoặc phân tích người dùng.

Các bản nháp phục vụ Play Console nằm trong thư mục `docs/`:

- `docs/PLAY_STORE_LISTING.md`
- `docs/PRIVACY_POLICY_DRAFT.md`
- `docs/DATA_SAFETY_DRAFT.md`
- `docs/PLAY_RELEASE_CHECKLIST.md`

Trước khi phát hành, cần thay email hỗ trợ và công bố chính sách riêng tư tại một URL HTTPS công khai.

## Nhánh phát triển

Nhánh UI và chuẩn bị phát hành hiện tại là `codex/profile-ui-refresh`.
