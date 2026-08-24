# Triage — AI Customer Support Platform

<div align="center">

**AI-powered voice and text customer support with intelligent ticket escalation.**

Automate customer conversations, resolve issues through conversational AI, and seamlessly escalate unresolved cases to support tickets.

<br />

[Live Demo](#) · [Features](#features) · [Tech Stack](#tech-stack) · [Setup](#installation--setup)

</div>

---

## Overview

**Triage** is a full-stack AI customer support platform designed to automate the first level of customer support through **text and voice conversations**.

Instead of relying on a rigid FAQ-style chatbot, Triage uses an AI agent to understand a customer's issue, ask relevant follow-up questions, provide troubleshooting steps, and determine when human intervention is required.

When an issue cannot be resolved automatically, Triage can create a **support ticket with an AI-generated title and summary**, allowing the support team to take over without losing the conversation context.

The project was built as a solo full-stack project to explore **AI integration, authentication, conversational interfaces, voice interaction, database design, and support workflow automation**.

---

## Features

### AI Customer Support

* Conversational AI powered by the Google Gemini API
* Handles customer queries through natural-language conversations
* Asks follow-up questions to better understand the issue
* Provides step-by-step troubleshooting instead of generic responses

### Voice Support

* Voice input using browser speech recognition
* AI-generated responses can be converted to speech using Kokoro TTS
* Voice functionality can be enabled when needed without affecting the normal text-chat experience

### Smart Ticket Escalation

When the AI determines that an issue requires human assistance:

* Generates a relevant ticket title
* Creates a concise issue summary
* Allows the customer to raise a support ticket
* Stores the ticket for later tracking

### Authentication

* User registration and login
* JWT-based authentication
* Password hashing with bcrypt
* Protected backend routes
* Authenticated access to chat and ticket functionality

### Conversation Handling

* Maintains conversation context during support interactions
* Stores conversation history
* Allows the AI to respond based on previous messages
* Separates support conversations between authenticated users

### Ticket Management

* Create support tickets
* View submitted tickets
* Update ticket information
* Delete tickets
* Track support issues from the dashboard

### Dashboard

A centralized dashboard for users to:

* View submitted support tickets
* Monitor ticket status
* Access AI support
* Manage ongoing support interactions

---

## Tech Stack

### Frontend

* **Next.js 16** — App Router
* **React 19**
* **Tailwind CSS v4**
* **Framer Motion** — UI animations
* **React Icons / Lucide React** — interface icons
* **react-speech-recognition** — voice input
* **Kokoro.js** — text-to-speech

### Backend

* **Node.js**
* **Express 5**
* **MongoDB**
* **Mongoose**
* **Google Gemini API**
* **JWT**
* **bcrypt**

### Development & Deployment

* **Git & GitHub**
* **VS Code**
* **Vercel** — frontend deployment
* **Render / Railway** — backend deployment
* **MongoDB Atlas** — cloud database

---

## Architecture

```text
                         ┌──────────────────────┐
                         │      Customer        │
                         └──────────┬───────────┘
                                    │
                           Voice / Text Input
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    Next.js Frontend  │
                         │  React + Tailwind UI  │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Express Backend    │
                         │      REST APIs       │
                         └───────┬───────┬──────┘
                                 │       │
                    ┌────────────┘       └─────────────┐
                    ▼                                  ▼
          ┌──────────────────┐               ┌──────────────────┐
          │   Gemini API     │               │ MongoDB / Atlas  │
          │   AI Support     │               │ Users / Tickets  │
          └────────┬─────────┘               │ Conversations    │
                   │                         └──────────────────┘
                   ▼
          AI Response / Escalation
                   │
          ┌────────┴─────────┐
          ▼                  ▼
     Customer Reply     Support Ticket
```

---

## Project Structure

```text
Automated-AI-Customer-Support-Platform/
│
├── src/
│   ├── app/
│   │   ├── page.js              # Landing page
│   │   ├── login/               # Login page
│   │   ├── register/            # Registration page
│   │   ├── chat/                # AI chat interface
│   │   └── dashboard/           # User dashboard
│   │
│   ├── components/
│   │   ├── landing/             # Landing page sections
│   │   ├── layout/              # Navbar and layout components
│   │   └── common/              # Shared components
│   │
│   ├── data/                    # Static application data
│   ├── lib/                     # Client-side utilities
│   └── constants/               # Application constants
│
├── backend/
│   ├── controllers/             # Authentication, chat and ticket logic
│   ├── models/                  # Mongoose schemas
│   ├── routes/                  # REST API routes
│   ├── middleware/              # Authentication middleware
│   └── server.js                # Express server entry point
│
├── public/                      # Static assets
├── package.json
├── next.config.mjs
├── jsconfig.json
└── README.md
```

---

## API Endpoints

| Method | Endpoint                  | Description                      | Authentication |
| ------ | ------------------------- | -------------------------------- | -------------- |
| POST   | `/api/auth/register`      | Register a new user              | No             |
| POST   | `/api/auth/login`         | Authenticate user and return JWT | No             |
| GET    | `/api/auth/profile`       | Get authenticated user profile   | Yes            |
| POST   | `/api/chat`               | Send a message to the AI agent   | Yes            |
| GET    | `/api/chat/history`       | Retrieve conversation history    | Yes            |
| POST   | `/api/tickets/create`     | Create a support ticket          | Yes            |
| GET    | `/api/tickets/my-tickets` | Retrieve user's tickets          | Yes            |
| PUT    | `/api/tickets/:id`        | Update a ticket                  | Yes            |
| DELETE | `/api/tickets/:id`        | Delete a ticket                  | Yes            |

---

## Installation & Setup

### Prerequisites

Make sure you have:

* Node.js 18+
* MongoDB or MongoDB Atlas
* Google Gemini API key
* Git

### 1. Clone the repository

```bash
git clone https://github.com/priyakourav/Automated-AI-Customer-Support-Platform.git

cd Automated-AI-Customer-Support-Platform
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Start the backend

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### 5. Start the frontend

Open another terminal:

```bash
cd ..
npm run dev
```

The frontend will run on:

```text
http://localhost:3000
```

> Never commit your `.env` file or real API keys to GitHub.

---

## How It Works

```text
Customer
   │
   ▼
Voice / Text Query
   │
   ▼
AI Support Agent
   │
   ├── Understands the issue
   │
   ├── Asks follow-up questions
   │
   ├── Provides troubleshooting
   │
   ▼
Issue Resolved?
   │
   ├── Yes ──► Conversation completed
   │
   └── No
         │
         ▼
   AI-generated Ticket
         │
         ▼
   Support Dashboard
```

The goal is to automate routine support interactions while providing a clear path to human assistance when automation is not enough.

---

## Authentication Flow

```text
Register
   │
   ▼
Password hashed with bcrypt
   │
   ▼
User stored in MongoDB
   │
   ▼
Login
   │
   ▼
JWT generated
   │
   ▼
Protected API requests
```

---

## Security

The project includes several security-focused mechanisms:

* Password hashing using bcrypt
* JWT-based authentication
* Protected backend routes
* User-specific ticket access
* Environment variables for sensitive credentials
* MongoDB-based persistent data storage

API keys and database credentials are intentionally excluded from the repository through `.gitignore`.

---

## Current Status

Triage currently includes:

* AI text support
* Voice input
* AI voice output
* User authentication
* Conversation handling
* Ticket creation
* Ticket management
* User dashboard
* Responsive landing page
* Gemini API integration
* MongoDB persistence

---

## Future Improvements

Potential future enhancements include:

* Admin/support-agent dashboard
* Real-time agent-to-customer chat
* Advanced ticket assignment
* Multi-language voice support
* Support analytics and reporting
* Knowledge-base integration
* Email notifications for ticket updates
* WebSocket-based real-time updates

---

## Why I Built This

Triage was built to explore how modern AI can be integrated into a practical customer-support workflow rather than using an LLM as a standalone chatbot.

The project combines:

**AI + Full-Stack Development + Authentication + Databases + Voice Interaction + Workflow Automation**

It demonstrates the complete flow from a customer's initial request to AI-assisted resolution and human escalation.

---

## Author

**Priya Kourav**

B.Tech — Computer Science & Engineering
Artificial Intelligence & Machine Learning
Sagar Institute of Research and Technology, Bhopal

---

## License

This project is licensed under the **ISC License**.

---

<div align="center">

**Triage — AI-powered support that helps businesses respond faster.**

</div>
