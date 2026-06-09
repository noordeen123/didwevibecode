# didwevibecode

> A React + Vite web application powered by Google Gemini AI — featuring an AI Interview Coach, Swarm Chaos simulations, and more.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## About

`didwevibecode` is an open-source web app that brings together AI-powered tools including an AI Interview Coach and Swarm Chaos visualisation, built using React, Vite, TypeScript, TailwindCSS, and the Google Gemini API.

---

## Features

- AI Interview Coach — practice interviews with real-time AI feedback
- Swarm Chaos — interactive agent-based simulation pages
- Responsive UI with TailwindCSS and Framer Motion animations
- Fast development with Vite + HMR

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 6 | Build tool & dev server |
| TypeScript | Type safety |
| TailwindCSS 4 | Styling |
| Framer Motion | Animations |
| Google Gemini API | AI capabilities |
| Express | Local API server |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A [Google Gemini API key](https://aistudio.google.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/noordeen123/didwevibecode.git
cd didwevibecode

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Add your GEMINI_API_KEY to .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

> **Note:** Never commit your `.env.local` file. It is already included in `.gitignore`.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run TypeScript linting |
| `npm run clean` | Clean dist folder |

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to get started.

---

## License

This project is licensed under the [MIT License](./LICENSE).
