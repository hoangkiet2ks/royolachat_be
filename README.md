# 🚀 Fullstack Real-time Chat & Secure Auth System

[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![AWS S3](https://img.shields.io/badge/AWS%20S3-FF9900?style=for-the-badge&logo=amazons3&logoColor=white)](https://aws.amazon.com/s3/)
[![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)](https://socket.io/)

Một hệ thống Fullstack hiện đại, cung cấp tính năng nhắn tin theo thời gian thực (Real-time) kết hợp với hệ thống xác thực người dùng bảo mật cao. Dự án được thiết kế theo kiến trúc module hóa, tối ưu hiệu năng và dễ dàng mở rộng.

---

## ✨ Tính năng nổi bật (Key Features)

### 🔐 1. Hệ thống Xác thực Bảo mật cao (Advanced Auth)

- **Xác thực đa phương thức:** Hỗ trợ Đăng ký/Đăng nhập bằng Email & Mật khẩu truyền thống hoặc **Google OAuth 2.0**.
- **Bảo mật 2 lớp (2FA/TOTP):** Tích hợp Google Authenticator để bảo vệ tài khoản với mã bảo mật 6 số sinh ra liên tục.
- **Xác thực Email (OTP):** Gửi mã OTP qua email thực tế để xác minh tài khoản khi đăng ký và quên mật khẩu.
- **Quản lý Phiên & Thiết bị:** Sử dụng cặp `AccessToken` & `RefreshToken`, có khả năng ghi nhận IP, User-Agent và buộc đăng xuất (Revoke token) từ xa.
- **Validation chặt chẽ:** Sử dụng `Zod` để kiểm tra dữ liệu từ Frontend đến Backend.

### 💬 2. Chat Real-time (Zalo/Messenger Clone)

- **Nhắn tin tức thời:** Sử dụng WebSockets (`Socket.io`) để đẩy tin nhắn đến người dùng ngay lập tức với độ trễ tính bằng mili-giây.
- **Chia sẻ phương tiện:** Tích hợp **AWS S3** để upload, lưu trữ và hiển thị hình ảnh có độ phân giải cao trong cuộc trò chuyện.
- **Room Management:** Hỗ trợ tách biệt các phòng chat (Conversation Rooms), đảm bảo tin nhắn được gửi đúng người, đúng nhóm.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

### Khối Frontend

- **Core:** ReactJS (Vite), TypeScript.
- **Styling & UI:** Tailwind CSS, Lucide React (Icons).
- **State & Form:** React Hook Form, Zod.
- **Network:** Axios, Socket.io-client.

### Khối Backend

- **Core:** NestJS, TypeScript, Node.js.
- **Database & ORM:** PostgreSQL, Prisma ORM.
- **Real-time:** `@nestjs/websockets`, `socket.io`.
- **Cloud & Media:** AWS SDK (`@aws-sdk/client-s3`), Multer.
- **Security:** Passport.js, Bcrypt, JsonWebToken, OTP Generator.

---

## 📂 Cấu trúc dự án (Architecture)

```text
📦 project-root
 ┣ 📂 ecom-api (Backend)
 ┃ ┣ 📂 prisma         # Database schema & migrations
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 routes       # Các modules chính (Auth, Chat, Roles...)
 ┃ ┃ ┣ 📂 shared       # Các services dùng chung (S3, Prisma, Token, Email, Config)
 ┃ ┃ ┗ 📜 main.ts      # Điểm khởi chạy hệ thống
 ┃ ┗ 📜 .env           # Biến môi trường
 ┗ 📂 ecom-api-fe (Frontend)
   ┣ 📂 src
   ┃ ┣ 📂 components   # Giao diện tái sử dụng (Login, Register, ChatRoom, Sidebar)
   ┃ ┣ 📂 pages        # Giao diện tổng (Dashboard)
   ┃ ┣ 📂 services     # Xử lý gọi API (Axios) và Socket.io
   ┃ ┗ 📜 App.tsx      # Routing & Điều hướng
   ┗ 📜 .env           # Biến môi trường
```
