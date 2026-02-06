## 🚀 Công nghệ sử dụng

### Frontend
- **React** - Thư viện UI
- **Axios Zustand** - Quản lý state
- **Socket.io-client** - Kết nối realtime
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Socket.io** - Real-time communication
- **MongoDB** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## 🛠️ Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js >= 18.x
- npm >= 9.x hoặc yarn >= 1.22.x
- MongoDB >= 6.x

### Bước 1: Clone repository
```bash
git clone https://github.com/tranl0ng110204-netizen/realtime-chat

```

### Bước 2 : Cài đặt backend
cd server
npm install
cp .env.example .env


### Bước 3 : Cài đặt frontend
cd ../frontend/chat-app
npm install

### Bước 4 : Cấu hình file .env phía backend
PORT=
MONGODB=
JWTTOKEN=TOKEN

CLOUDINARY_NAME=
CLOUDINARY_API=
CLOUDINARY_SECRET=


### Bước 5 : Chạy lẻ 
backend :
kill terminal
view terminal -> cd backend -> npm start

frontend:
new terminal
cd frontend/chat-app -> npm run dev

