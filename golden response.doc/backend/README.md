# StockPulse - Backend

This project uses **Next.js API Routes** as the backend layer.

## API Endpoints

| Route | Method | Description |
|---|---|---|
| /api/quote?symbol=RELIANCE | GET | Get real-time stock quote |
| /api/history/[symbol]?period=1M | GET | Get historical price data |
| /api/news | GET | Get market news & sentiment |
| /api/search?q=TCS | GET | Search NSE/BSE stocks |

## Tech Stack

- **Runtime**: Node.js (via Next.js)
- **Framework**: Next.js 16 API Routes
- **API Provider**: Alpha Vantage
- **Language**: TypeScript

## Environment Variables

`env
ALPHA_VANTAGE_KEY=your_alpha_vantage_api_key_here
`

Get a free API key at: https://www.alphavantage.co/support/#api-key

## Running the Backend

Since this is a Next.js full-stack app, both frontend and backend run together:

`ash
npm install
npm run dev
`

The API routes will be available at http://localhost:3000/api/*
