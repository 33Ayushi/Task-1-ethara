export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  marketCap?: number;
  pe?: number;
  week52High?: number;
  week52Low?: number;
  sector?: string;
  exchange?: string;
  currency?: string;
}

export interface HistoricalDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MarketIndex {
  name: string;
  symbol: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface NewsItem {
  id: string;
  headline: string;
  source: string;
  url: string;
  datetime: number;
  summary: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  sentimentScore?: number;
}

export interface WatchlistItem {
  symbol: string;
  name: string;
  addedAt: string;
  price?: number;
  change?: number;
  changePercent?: number;
}

export interface TrendAnalysis {
  trend: 'Bullish' | 'Bearish' | 'Neutral';
  confidence: number;
  signals: string[];
  rsi?: number;
  macd?: number;
  movingAverage50?: number;
  movingAverage200?: number;
}

export interface PortfolioItem {
  symbol: string;
  name: string;
  quantity: number;
  avgBuyPrice: number;
  currentPrice?: number;
  totalInvested: number;
  currentValue?: number;
  pl?: number;
  plPercent?: number;
}

export interface TopMover {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface SentimentData {
  positive: number;
  negative: number;
  neutral: number;
  overall: 'Positive' | 'Negative' | 'Neutral';
}
