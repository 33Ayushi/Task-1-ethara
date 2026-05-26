/**
 * Alpha Vantage client — calls our Next.js API routes (which hold the key server-side).
 * Falls back to mock data from stockService.ts on error / rate-limit.
 */

import { StockQuote, HistoricalDataPoint, NewsItem } from '@/types/stock';
import * as mock from './stockService';

// ─── Stock Quote ──────────────────────────────────────────────────────────────

export async function fetchStockQuote(symbol: string): Promise<StockQuote | null> {
  try {
    const res = await fetch(`/api/quote/${symbol}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.error) throw new Error(data.error);

    // Enrich with static info from our mock DB
    const mockQ = mock.getStockQuote(symbol);
    return {
      symbol: data.symbol,
      name: mockQ?.name || symbol,
      price: data.price,
      change: data.change,
      changePercent: data.changePercent,
      open: data.open,
      high: data.high,
      low: data.low,
      close: data.close,
      volume: data.volume,
      marketCap: mockQ?.marketCap,
      pe: mockQ?.pe,
      week52High: mockQ?.week52High,
      week52Low: mockQ?.week52Low,
      sector: mockQ?.sector,
      exchange: 'BSE',
      currency: 'INR',
    };
  } catch (err) {
    console.warn(`[Alpha Vantage] Quote fallback for ${symbol}:`, err);
    return mock.getStockQuote(symbol);
  }
}

// ─── Historical Data ───────────────────────────────────────────────────────────

export async function fetchHistoricalData(
  symbol: string,
  period: '1W' | '1M' | '3M' | '6M' | '1Y'
): Promise<HistoricalDataPoint[]> {
  try {
    const res = await fetch(`/api/history/${symbol}?period=${period}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data) || !data.length) throw new Error('Empty response');
    return data;
  } catch (err) {
    console.warn(`[Alpha Vantage] History fallback for ${symbol}:`, err);
    return mock.getHistoricalData(symbol, period);
  }
}

// ─── Search ───────────────────────────────────────────────────────────────────

export async function fetchSearchResults(
  query: string
): Promise<Array<{ symbol: string; name: string; sector: string }>> {
  if (!query.trim()) return [];
  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data) || !data.length) throw new Error('Empty');
    return data;
  } catch {
    // Fall back to local mock search
    return mock.searchStocks(query);
  }
}

// ─── News ─────────────────────────────────────────────────────────────────────

export async function fetchNews(symbol?: string): Promise<NewsItem[]> {
  try {
    const url = symbol ? `/api/news?symbol=${symbol}` : '/api/news';
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data) || !data.length) throw new Error('Empty');
    return data;
  } catch (err) {
    console.warn('[Alpha Vantage] News fallback:', err);
    return mock.getStockNews(symbol);
  }
}
