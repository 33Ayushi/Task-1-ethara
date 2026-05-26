# 📈 StockPulse - Indian Stock Market Intelligence Platform

> **Golden Response** to the Full-Stack Animated Application Prompt

---

## 🚀 Overview

**StockPulse** is a production-grade, full-stack Indian stock market intelligence platform built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. It delivers real-time NSE/BSE market data, animated dashboards, and AI-powered market insights.

---

## 🏗️ Project Structure

`
golden response.doc/
├── frontend/          # Complete Next.js full-stack app (UI + API Routes)
│   ├── src/
│   │   ├── app/       # Next.js App Router pages & API routes
│   │   ├── components/# Reusable React components
│   │   ├── lib/       # Service layer & utilities
│   │   └── types/     # TypeScript type definitions
│   ├── public/        # Static assets
│   ├── package.json
│   └── .env.example   # Environment variable template
│
├── backend/           # Backend logic (API routes + services)
│   ├── api/           # Next.js API route handlers
│   ├── lib/           # Alpha Vantage service layer
│   └── README.md      # Backend API documentation
│
└── PROJECT_DOCUMENTATION.html  # Full project documentation
`

---

## 💻 Tech Stack

### Frontend
- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (animations)
- **Recharts** (stock charts)
- **Radix UI** (accessible components)
- **Lucide React** (icons)

### Backend
- **Next.js API Routes** (Node.js)
- **Alpha Vantage API** (real-time Indian stock data)
- **Axios** (HTTP client)

---

## ✨ Key Features

- 📊 **Live Market Dashboard** — NIFTY 50, SENSEX, BANK NIFTY, NIFTY IT, NIFTY AUTO, MIDCAP 100
- 📈 **Real-Time Stock Quotes** — NSE/BSE listed stocks with live pricing
- 📉 **Historical Charts** — Interactive price history with Recharts
- 🔍 **Smart Stock Search** — Search any NSE/BSE listed stock
- ⭐ **Watchlist** — Personal stock tracking with persistence
- 📰 **Market News & Sentiment** — AI-powered news analysis
- 🎯 **Top Gainers & Losers** — Real-time market movers
- 🎨 **Cinematic UI** — Dark mode with glassmorphism & smooth animations

---

## 🚦 Getting Started

`ash
# 1. Navigate to the frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Add your Alpha Vantage API key to .env.local

# 4. Run the development server
npm run dev
`

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🔑 Environment Variables

`env
ALPHA_VANTAGE_KEY=your_alpha_vantage_api_key_here
`

Get a free API key at: https://www.alphavantage.co/support/#api-key

---

## 🌐 API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| /api/quote?symbol=RELIANCE | GET | Real-time stock quote |
| /api/history/TCS?period=1M | GET | Historical price data |
| /api/news | GET | Market news & sentiment |
| /api/search?q=INFY | GET | Search stocks |

---

## 📦 Deployment

Deploy to **Vercel** (recommended):

`ash
npm run build
vercel deploy
`

Set ALPHA_VANTAGE_KEY in your Vercel environment variables.

---

## 📄 Documentation

See PROJECT_DOCUMENTATION.html for full technical documentation.
