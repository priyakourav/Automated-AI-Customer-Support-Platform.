# Triage: Automated "Voice & Text" AI Customer Support Platform

<div align="center">

# 🤖 Triage — AI Customer Support Platform

### Voice & Text AI agent that resolves customer issues and auto-escalates to human support tickets when needed.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Gemini](https://img.shields.io/badge/AI-Gemini%20API-4285F4?logo=googlegemini&logoColor=white)](https://ai.google.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-ISC-lightgrey)](#-license)

</div>

---

## 📖 About

**Triage** is a full-stack AI customer support platform that lets customers chat (or talk) with an AI agent that troubleshoots their issue conversationally — one step at a time, like a real support agent — instead of dumping a wall of instructions. When the AI decides an issue genuinely needs a human, it automatically drafts a ticket title and summary and offers to escalate it, so nothing gets lost in translation.

Built as a personal full-stack + AI/ML project to demonstrate real-world LLM integration, authentication, and conversational UX design.

---

## ✨ Features

| | |
|---|---|
| 💬 **AI Chat Support** | Natural, human-like conversations powered by the Gemini API — not a rigid FAQ bot |
| 🎙️ **Voice Assistant** | Talk to Triage using speech recognition, with spoken AI replies via on-device TTS (Kokoro) |
| 🕑 **24/7 Availability** | No queues, no downtime — instant responses at any hour |
| 🔐 **Secure Auth** | JWT-based authentication with bcrypt password hashing |
| 🎫 **Smart Ticket Escalation** | AI auto-generates a ticket title & summary and hands off to a human only when truly needed |
| 🧠 **Conversation Memory** | Remembers context within a session and clears it once an issue is resolved |
| 📊 **Dashboard** | Central place to view support activity |

---

## 🛠️ Tech Stack

**Frontend**
- [Next.js 16](https://nextjs.org/) (App Router) + [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) for animation
- [React Icons](https://react-icons.github.io/react-icons/) / [Lucide React](https://lucide.dev/)
- [react-speech-recognition](https://www.npmjs.com/package/react-speech-recognition) for voice input
- [kokoro-js](https://www.npmjs.com/package/kokoro-js) for in-browser text-to-speech

**Backend**
- [Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [Google Gemini API](https://ai.google.dev/) (`@google/genai`) for the AI agent
- [JWT](https://jwt.io/) + [bcrypt](https://www.npmjs.com/package/bcrypt) for auth

---

## 📂 Project Structure

Automated-AI-Customer-Support-Platform/
├── src/
│ ├── app/ # Next.js App Router pages
│ │ ├── page.js # Landing page
│ │ ├── login/ # Login page
│ │ ├── register/ # Register page
│ │ ├── chat/ # AI chat (text + voice) interface
│ │ └── dashboard/ # User dashboard
│ ├── components/
│ │ ├── landing/ # Hero, Features, HowItWorks, FAQ, CTA, Footer
│ │ ├── layout/ # Navbar
│ │ └── common/ # Logo, shared UI
│ ├── data/ # Static content (features, FAQ, workflow)
│ ├── lib/kokoro.js # Kokoro TTS integration
│ └── constants/theme.js
│
├── backend/
│ ├── controllers/ # auth, chat (Gemini AI logic), ticket
│ ├── models/ # User, Conversation, Ticket (Mongoose schemas)
│ ├── routes/ # /api/auth, /api/chat, /api/tickets
│ ├── middleware/authMiddleware.js
│ └── server.js # Express app entry point
│
└── public/ # Static assets


---

## ⚙️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- A [Google Gemini API key](https://ai.google.dev/)

### 1. Clone the repository
```bash
git clone https://github.com/<priyakourav>/Automated-AI-Customer-Support-Platform.git
cd Automated-AI-Customer-Support-Platform
```

### 2. Set up the backend
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Run the backend:
```bash
npm run dev
```
Server will start on `http://localhost:5000`.

### 3. Set up the frontend
```bash
cd ..            # back to project root
npm install
npm run dev
```
App will be available at `http://localhost:3000`.

---

## 🚀 Usage

1. **Register / Login** to create your account.
2. Go to the **Chat** page and start describing your issue — via text or the mic 🎙️.
3. Triage will ask clarifying questions and walk you through troubleshooting one step at a time.
4. If the issue can't be resolved automatically, Triage will offer to **raise a support ticket** with an AI-generated title and summary.
5. Track your submitted issues from the **Dashboard**.

---

## 🧩 API Overview

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login & receive JWT | ❌ |
| `GET`  | `/api/auth/profile` | Get logged-in user profile | ✅ |
| `POST` | `/api/chat` | Send a message to the AI agent | ✅ |
| `GET`  | `/api/chat/history` | Get conversation history | ✅ |
| `POST` | `/api/tickets/create` | Create a support ticket | ✅ |
| `GET`  | `/api/tickets/my-tickets` | Get user's tickets | ✅ |
| `PUT`  | `/api/tickets/:id` | Update a ticket | ✅ |
| `DELETE` | `/api/tickets/:id` | Delete a ticket | ✅ |

---

## 🗺️ Roadmap

- [ ] Admin/agent dashboard for managing incoming tickets
- [ ] Real-time chat with WebSockets
- [ ] Multi-language support
- [ ] Analytics on resolution rate & response time

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **ISC License**.

---

## 👤 Author

**Priya Kourav**
B.Tech CSE (AI & ML) — Sagar Institute of Research And Technology, Bhopal

<div align="center">

⭐️ If you found this project interesting, consider giving it a star!

</div>