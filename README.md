# Scaler Personas — AI Chatbot

A persona-based AI chatbot that lets you have real conversations with three Scaler personalities: **Anshuman Singh** (CEO), **Abhimanyu Saxena** (CTO), and **Kshitij Mishra** (Instructor).

## Live Demo

<!-- Add your deployed URL here after deployment -->

## Features

- Three distinct AI personas, each with a deeply researched system prompt
- Persona switcher that resets the conversation on switch
- Suggestion chips (quick-start questions) per persona
- Typing indicator during API calls
- Graceful error handling
- Fully responsive (mobile + desktop)

## Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Express 4 (ES modules)
- **AI**: Groq API (llama-3.3-70b-versatile)

## Setup

### Prerequisites
- Node.js 18+
- A free Groq API key from [console.groq.com](https://console.groq.com)

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd chatbot_assignment
```

### 2. Backend setup
```bash
cd backend
npm install
cp ../.env.example .env
# Edit .env and add your GROQ_API_KEY
npm run dev
```

### 3. Frontend setup (new terminal)
```bash
cd frontend
npm install
npm run dev
```

### 4. Open the app
Navigate to [http://localhost:5173](http://localhost:5173)

## Project Structure

```
chatbot_assignment/
├── backend/
│   ├── server.js          # Express entry point
│   ├── routes/chat.js     # Chat API route
│   └── prompts/           # System prompts per persona
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Root component
│   │   ├── data/          # Persona metadata
│   │   └── components/    # Chat, PersonaSwitcher, etc.
├── prompts.md             # All system prompts with annotations
└── reflection.md          # 300–500 word reflection
```

## Deployment

### Backend (Railway / Render)
- Set environment variable: `GROQ_API_KEY`
- Set `FRONTEND_URL` to your deployed frontend URL
- Start command: `node server.js`

### Frontend (Vercel / Netlify)
- Set `VITE_API_URL` if not using a proxy
- Build command: `npm run build`
- Output directory: `dist`

## Screenshots

<!-- Add screenshots here -->
