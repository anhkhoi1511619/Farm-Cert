# Farm Cert iOS

Đây là bản SwiftUI độc lập của Farm Cert, dùng chung database quiz `.js` với bản Android. Bản iOS có Home, lịch sử điểm, thiết lập bài test, chọn câu hỏi, chấm điểm, retry câu sai/tất cả câu và dịch từ qua LM Studio.

## Mở và chạy

Mở `FarmCert/FarmCert.xcodeproj` trên macOS bằng Xcode, chọn iPhone Simulator hoặc iPhone thật rồi bấm Run.

Yêu cầu:

- macOS và Xcode.
- Apple Developer account nếu chạy trên thiết bị thật hoặc phát hành TestFlight.
- iOS 16 trở lên.

## Database

Các file `FarmCert/Resources/quiz/ccar-p.js` và `ccdv-f.js` được đọc khi app khởi động. Parser loại bỏ phần khai báo JavaScript bên ngoài object JSON và xử lý trailing comma trong dữ liệu hiện tại.

## Dịch từ

Người dùng có thể chọn/copy từ trong câu hỏi, sau đó bấm **Dịch từ đã sao chép**. App gọi:

```text
GET  https://2khj1mwr-5172.jpe1.devtunnels.ms/api/v1/models
POST https://2khj1mwr-5172.jpe1.devtunnels.ms/api/v1/chat
```

Dev Tunnel chỉ phù hợp cho thử nghiệm; trước khi phát hành chính thức nên dùng endpoint ổn định.
