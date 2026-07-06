# 🌱 Gemini AI Chatbot - Konsultasi Perawatan Tanaman

Chatbot berbasis **Google Gemini AI** yang membantu pengguna berkonsultasi mengenai perawatan tanaman, pemupukan, penyiraman, hama, dan penyakit tanaman.

Aplikasi dibangun menggunakan **Node.js**, **Express.js**, dan **Google Gemini API**, dengan antarmuka web sederhana menggunakan HTML, CSS, dan JavaScript.

---

## ✨ Features

- 🤖 Chatbot berbasis Google Gemini AI
- 🌱 Konsultasi perawatan tanaman
- 💧 Rekomendasi penyiraman
- 🌾 Informasi pemupukan
- 🐛 Identifikasi hama tanaman
- 🍂 Informasi penyakit tanaman
- 💬 Riwayat percakapan (Conversation Context)
- ⌨️ Typing Indicator
- 🎨 Modern Chat UI
- 📱 Responsive Layout

---

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- Google Gemini API
- dotenv
- cors

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript
- Marked.js (Markdown Renderer)

---

## 📁 Project Structure

```
gemini-chatbot-api/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── index.js
├── package.json
├── package-lock.json
├── env.example
└── README.md
```

---

## 🚀 Installation

### 1. Clone repository

```bash
git clone https://github.com/dodhit14/gemini-chatbot-api.git
```

Masuk ke folder project

```bash
cd gemini-chatbot-api
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Generate `GEMINI_API_KEY` melalui Google AI Studio
- Kunjungi website ```https://aistudio.google.com/app/api-keys.```
- Pastikan anda sudah login dengan akun google yang aktif.
- Klik tombol ``Create API Key``
- Isikan nama key dan pilih project yang diinginkan
- Klik ``create Key``
- Setelah proses simpan selesai, silakan salin `GEMINI_API_KEY` yang telah digenerate.

### 4. Ubah nama file `env.example` ke `.env`
Tempelkan `GEMINI_API_KEY` yang telah di salin dari website Google AI Studio.

```env
GEMINI_API_KEY=YOUR_API_KEY
PORT=3000
```

---

### 5. Run server

```bash
node index.js
```

Server akan berjalan pada

```
http://localhost:3000
```

---

## 💬 API Endpoint

### POST `/api/chat`

Request

```json
{
    "conversation": [
        {
            "role": "user",
            "text": "Bagaimana cara merawat tanaman cabai?"
        }
    ]
}
```

Response

```json
{
    "success": true,
    "answer": "Tanaman cabai membutuhkan sinar matahari..."
}
```

---

## 🌱 Conversation Format

Chatbot menggunakan format conversation yang mengikuti Google Gemini API.

```json
[
    {
        "role": "user",
        "text": "Halo"
    },
    {
        "role": "model",
        "text": "Halo, ada yang bisa saya bantu?"
    }
]
```

---

## 📷 Preview

Tampilan aplikasi Gemini Chatbot -- Perawatan Tanaman


<img width="1122" height="942" alt="image" src="https://github.com/user-attachments/assets/92c684de-6a9d-4a73-b66e-41f56e58c6e3" />

---

## ⚠️ Known Issues

Google Gemini API terkadang mengembalikan error berikut ketika layanan sedang mengalami lonjakan trafik:

```
503 UNAVAILABLE
This model is currently experiencing high demand.
```

Hal ini berasal dari layanan Gemini dan bukan dari aplikasi.

---

## 🔮 Future Improvements

- Upload gambar tanaman
- Identifikasi penyakit tanaman melalui gambar
- Markdown rendering yang lebih lengkap
- Retry otomatis ketika Gemini sedang sibuk
- Riwayat percakapan
- Export chat
- Dark Mode
- Streaming response
- Voice input
- Multi-language support

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by **Adhitya Suharningsih**
