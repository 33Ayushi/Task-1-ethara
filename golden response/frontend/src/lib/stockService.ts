import {
  StockQuote,
  HistoricalDataPoint,
  MarketIndex,
  NewsItem,
  TopMover,
  TrendAnalysis,
  SentimentData,
} from '@/types/stock';

// ─── Indian Stock Market Data ──────────────────────────────────────────────

const STOCK_DATABASE: Record<string, { name: string; sector: string; basePrice: number }> = {
  TCS: { name: 'Tata Consultancy Services', sector: 'IT', basePrice: 3950 },
  RELIANCE: { name: 'Reliance Industries', sector: 'Energy', basePrice: 2850 },
  INFY: { name: 'Infosys Limited', sector: 'IT', basePrice: 1750 },
  HDFCBANK: { name: 'HDFC Bank Limited', sector: 'Banking', basePrice: 1620 },
  ICICIBANK: { name: 'ICICI Bank Limited', sector: 'Banking', basePrice: 1180 },
  WIPRO: { name: 'Wipro Limited', sector: 'IT', basePrice: 520 },
  BAJFINANCE: { name: 'Bajaj Finance', sector: 'Finance', basePrice: 6750 },
  BHARTIARTL: { name: 'Bharti Airtel', sector: 'Telecom', basePrice: 1420 },
  ASIANPAINT: { name: 'Asian Paints', sector: 'Consumer', basePrice: 2680 },
  HINDUNILVR: { name: 'Hindustan Unilever', sector: 'FMCG', basePrice: 2350 },
  KOTAKBANK: { name: 'Kotak Mahindra Bank', sector: 'Banking', basePrice: 1810 },
  MARUTI: { name: 'Maruti Suzuki India', sector: 'Auto', basePrice: 10950 },
  SUNPHARMA: { name: 'Sun Pharmaceutical', sector: 'Pharma', basePrice: 1680 },
  LT: { name: 'Larsen & Toubro', sector: 'Infrastructure', basePrice: 3420 },
  AXISBANK: { name: 'Axis Bank Limited', sector: 'Banking', basePrice: 1080 },
  ULTRACEMCO: { name: 'UltraTech Cement', sector: 'Cement', basePrice: 9870 },
  TITAN: { name: 'Titan Company', sector: 'Consumer', basePrice: 3650 },
  NESTLEIND: { name: 'Nestle India', sector: 'FMCG', basePrice: 2280 },
  HCLTECH: { name: 'HCL Technologies', sector: 'IT', basePrice: 1890 },
  ITC: { name: 'ITC Limited', sector: 'FMCG', basePrice: 460 },
  ONGC: { name: 'Oil & Natural Gas Corp', sector: 'Energy', basePrice: 275 },
  POWERGRID: { name: 'Power Grid Corporation', sector: 'Utilities', basePrice: 315 },
  TATAMOTORS: { name: 'Tata Motors Limited', sector: 'Auto', basePrice: 920 },
  NTPC: { name: 'NTPC Limited', sector: 'Utilities', basePrice: 350 },
  SBIN: { name: 'State Bank of India', sector: 'Banking', basePrice: 780 },
};

// Seeded random for consistent data within a session
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generatePrice(base: number, seed: number, variance: number = 0.05): number {
  const rand = (seededRandom(seed) - 0.5) * 2;
  return Math.round((base * (1 + rand * variance)) * 100) / 100;
}

export function getStockQuote(symbol: string): StockQuote | null {
  const upperSymbol = symbol.toUpperCase();
  const stock = STOCK_DATABASE[upperSymbol];
  if (!stock) return null;

  const seed = Date.now() / 100000;
  const price = generatePrice(stock.basePrice, seed, 0.03);
  const prevClose = generatePrice(stock.basePrice, seed - 1, 0.03);
  const change = Math.round((price - prevClose) * 100) / 100;
  const changePercent = Math.round((change / prevClose) * 10000) / 100;
  const high = Math.round(price * (1 + seededRandom(seed + 1) * 0.02) * 100) / 100;
  const low = Math.round(price * (1 - seededRandom(seed + 2) * 0.02) * 100) / 100;
  const volume = Math.round((seededRandom(seed + 3) * 5 + 1) * 1000000);

  return {
    symbol: upperSymbol,
    name: stock.name,
    price,
    change,
    changePercent,
    open: generatePrice(stock.basePrice, seed - 0.5, 0.02),
    high,
    low,
    close: prevClose,
    volume,
    marketCap: Math.round(price * volume * 10),
    pe: Math.round((seededRandom(seed + 4) * 30 + 15) * 10) / 10,
    week52High: Math.round(stock.basePrice * 1.35 * 100) / 100,
    week52Low: Math.round(stock.basePrice * 0.72 * 100) / 100,
    sector: stock.sector,
    exchange: 'NSE',
    currency: 'INR',
  };
}

export function searchStocks(query: string): Array<{ symbol: string; name: string; sector: string }> {
  const q = query.toLowerCase();
  return Object.entries(STOCK_DATABASE)
    .filter(
      ([symbol, data]) =>
        symbol.toLowerCase().includes(q) || data.name.toLowerCase().includes(q)
    )
    .map(([symbol, data]) => ({ symbol, name: data.name, sector: data.sector }))
    .slice(0, 8);
}

export function getHistoricalData(symbol: string, period: '1W' | '1M' | '3M' | '6M' | '1Y'): HistoricalDataPoint[] {
  const upperSymbol = symbol.toUpperCase();
  const stock = STOCK_DATABASE[upperSymbol];
  if (!stock) return [];

  const daysMap = { '1W': 7, '1M': 30, '3M': 90, '6M': 180, '1Y': 365 };
  const days = daysMap[period];
  const data: HistoricalDataPoint[] = [];
  let price = stock.basePrice * (0.75 + seededRandom(42) * 0.2);

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    if (date.getDay() === 0 || date.getDay() === 6) continue; // skip weekends

    const dailySeed = i * 17 + upperSymbol.charCodeAt(0);
    const dayChange = (seededRandom(dailySeed) - 0.48) * 0.025;
    price = price * (1 + dayChange);
    const open = price * (1 + (seededRandom(dailySeed + 1) - 0.5) * 0.01);
    const high = Math.max(price, open) * (1 + seededRandom(dailySeed + 2) * 0.015);
    const low = Math.min(price, open) * (1 - seededRandom(dailySeed + 3) * 0.015);

    data.push({
      date: date.toISOString().split('T')[0],
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(price * 100) / 100,
      volume: Math.round((seededRandom(dailySeed + 4) * 4 + 0.5) * 1000000),
    });
  }
  return data;
}

export function getMarketIndices(): MarketIndex[] {
  const seed = Date.now() / 100000;
  return [
    {
      name: 'NIFTY 50',
      symbol: 'NIFTY',
      value: generatePrice(22450, seed, 0.02),
      change: Math.round((seededRandom(seed + 10) - 0.45) * 400 * 100) / 100,
      changePercent: Math.round((seededRandom(seed + 11) - 0.45) * 3 * 100) / 100,
    },
    {
      name: 'SENSEX',
      symbol: 'SENSEX',
      value: generatePrice(73800, seed + 1, 0.02),
      change: Math.round((seededRandom(seed + 12) - 0.45) * 1200 * 100) / 100,
      changePercent: Math.round((seededRandom(seed + 13) - 0.45) * 2.5 * 100) / 100,
    },
    {
      name: 'BANK NIFTY',
      symbol: 'BANKNIFTY',
      value: generatePrice(47600, seed + 2, 0.02),
      change: Math.round((seededRandom(seed + 14) - 0.45) * 800 * 100) / 100,
      changePercent: Math.round((seededRandom(seed + 15) - 0.45) * 2 * 100) / 100,
    },
    {
      name: 'NIFTY IT',
      symbol: 'NIFTYIT',
      value: generatePrice(32100, seed + 3, 0.02),
      change: Math.round((seededRandom(seed + 16) - 0.45) * 600 * 100) / 100,
      changePercent: Math.round((seededRandom(seed + 17) - 0.45) * 2.5 * 100) / 100,
    },
    {
      name: 'NIFTY AUTO',
      symbol: 'NIFTYAUTO',
      value: generatePrice(19800, seed + 4, 0.02),
      change: Math.round((seededRandom(seed + 18) - 0.45) * 400 * 100) / 100,
      changePercent: Math.round((seededRandom(seed + 19) - 0.45) * 2 * 100) / 100,
    },
    {
      name: 'MIDCAP 100',
      symbol: 'MIDCAP100',
      value: generatePrice(45600, seed + 5, 0.02),
      change: Math.round((seededRandom(seed + 20) - 0.45) * 700 * 100) / 100,
      changePercent: Math.round((seededRandom(seed + 21) - 0.45) * 2.5 * 100) / 100,
    },
  ];
}

export function getTopMovers(): { gainers: TopMover[]; losers: TopMover[] } {
  const seed = Date.now() / 100000;
  const symbols = Object.keys(STOCK_DATABASE);

  const gainers: TopMover[] = symbols.slice(0, 5).map((sym, i) => {
    const stock = STOCK_DATABASE[sym];
    const price = generatePrice(stock.basePrice, seed + i, 0.04);
    const cp = Math.round((seededRandom(seed + i + 100) * 4 + 1) * 100) / 100;
    return {
      symbol: sym,
      name: stock.name,
      price,
      change: Math.round(price * cp / 100 * 100) / 100,
      changePercent: cp,
    };
  });

  const losers: TopMover[] = symbols.slice(5, 10).map((sym, i) => {
    const stock = STOCK_DATABASE[sym];
    const price = generatePrice(stock.basePrice, seed + i + 50, 0.04);
    const cp = -Math.round((seededRandom(seed + i + 200) * 4 + 1) * 100) / 100;
    return {
      symbol: sym,
      name: stock.name,
      price,
      change: Math.round(price * cp / 100 * 100) / 100,
      changePercent: cp,
    };
  });

  return { gainers, losers };
}

export function getTrendAnalysis(symbol: string, historicalData: HistoricalDataPoint[]): TrendAnalysis {
  if (historicalData.length < 10) {
    return { trend: 'Neutral', confidence: 50, signals: ['Insufficient data'] };
  }

  const closes = historicalData.map((d) => d.close);
  const len = closes.length;

  // Simple Moving Averages
  const ma50 = closes.slice(Math.max(0, len - 50)).reduce((a, b) => a + b, 0) / Math.min(50, len);
  const ma20 = closes.slice(Math.max(0, len - 20)).reduce((a, b) => a + b, 0) / Math.min(20, len);
  const currentPrice = closes[len - 1];

  // RSI approximation
  const gains = [];
  const losses = [];
  for (let i = 1; i < Math.min(15, len); i++) {
    const diff = closes[len - i] - closes[len - i - 1];
    if (diff > 0) gains.push(diff);
    else losses.push(Math.abs(diff));
  }
  const avgGain = gains.reduce((a, b) => a + b, 0) / (gains.length || 1);
  const avgLoss = losses.reduce((a, b) => a + b, 0) / (losses.length || 1);
  const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
  const rsi = Math.round(100 - 100 / (1 + rs));

  // Trend signals
  const signals: string[] = [];
  let bullishScore = 0;

  if (currentPrice > ma20) { signals.push('Price above 20-day MA'); bullishScore += 2; }
  else { signals.push('Price below 20-day MA'); bullishScore -= 2; }

  if (currentPrice > ma50) { signals.push('Price above 50-day MA'); bullishScore += 2; }
  else { signals.push('Price below 50-day MA'); bullishScore -= 2; }

  if (ma20 > ma50) { signals.push('MA20 above MA50 (Golden Cross signal)'); bullishScore += 3; }
  else { signals.push('MA20 below MA50 (Death Cross signal)'); bullishScore -= 3; }

  if (rsi < 30) { signals.push(`RSI oversold (${rsi}) — potential reversal`); bullishScore += 1; }
  else if (rsi > 70) { signals.push(`RSI overbought (${rsi}) — caution`); bullishScore -= 1; }
  else { signals.push(`RSI neutral at ${rsi}`); }

  // Volume trend
  const recentVol = historicalData.slice(-5).reduce((a, b) => a + b.volume, 0) / 5;
  const avgVol = historicalData.reduce((a, b) => a + b.volume, 0) / len;
  if (recentVol > avgVol * 1.2) { signals.push('Above-average volume (strong momentum)'); bullishScore += 1; }

  const trend: 'Bullish' | 'Bearish' | 'Neutral' =
    bullishScore >= 3 ? 'Bullish' : bullishScore <= -3 ? 'Bearish' : 'Neutral';
  const confidence = Math.min(95, Math.max(30, 60 + bullishScore * 5));

  return {
    trend,
    confidence,
    signals: signals.slice(0, 5),
    rsi,
    movingAverage50: Math.round(ma50 * 100) / 100,
    movingAverage200: Math.round(ma50 * 0.95 * 100) / 100,
  };
}

export function getStockNews(symbol: string = ''): NewsItem[] {
  const newsItems: NewsItem[] = [
    {
      id: '1',
      headline: `${symbol || 'Reliance'} Q4 Results: Net profit rises 7.3% YoY, beats estimates`,
      source: 'Economic Times',
      url: '#',
      datetime: Date.now() - 1800000,
      summary: `${symbol || 'Reliance Industries'} reported a consolidated net profit of ₹19,878 crore for the quarter ended March 2024, up 7.3% year-on-year, beating analyst estimates on the back of strong performance from the retail and Jio businesses.`,
      sentiment: 'positive',
      sentimentScore: 0.78,
    },
    {
      id: '2',
      headline: 'SEBI tightens F&O regulations amid retail investor losses',
      source: 'Business Standard',
      url: '#',
      datetime: Date.now() - 3600000,
      summary: "The Securities and Exchange Board of India (SEBI) has proposed stricter regulations for futures and options (F&O) trading, including higher lot sizes and mandatory risk disclosures, to protect retail investors from significant losses.",
      sentiment: 'negative',
      sentimentScore: -0.42,
    },
    {
      id: '3',
      headline: 'FII inflows surge to ₹12,000 crore; markets expected to remain buoyant',
      source: 'Mint',
      url: '#',
      datetime: Date.now() - 7200000,
      summary: 'Foreign Institutional Investors (FIIs) pumped in over ₹12,000 crore into Indian equity markets this week, driven by improving macroeconomic indicators and expectations of an RBI rate cut in the upcoming monetary policy meeting.',
      sentiment: 'positive',
      sentimentScore: 0.85,
    },
    {
      id: '4',
      headline: 'IT sector headwinds: TCS, Infosys warn of slower growth in FY25',
      source: 'Financial Express',
      url: '#',
      datetime: Date.now() - 10800000,
      summary: 'Major IT companies including TCS and Infosys have flagged concerns about slower revenue growth in FY25, citing weak demand from BFSI clients and continued cost-cutting measures by global enterprises amid macroeconomic uncertainty.',
      sentiment: 'negative',
      sentimentScore: -0.55,
    },
    {
      id: '5',
      headline: 'HDFC Bank sees strong credit growth; NPA levels under control',
      source: 'CNBC-TV18',
      url: '#',
      datetime: Date.now() - 14400000,
      summary: 'HDFC Bank reported robust credit growth of 15% YoY in Q4FY24, with gross NPA levels remaining stable at 1.24%. The bank\'s management expressed optimism about the credit cycle and indicated plans for branch expansion in tier-2 and tier-3 cities.',
      sentiment: 'positive',
      sentimentScore: 0.72,
    },
    {
      id: '6',
      headline: 'India\'s GDP growth revised upward to 7.8% for FY24',
      source: 'Reuters India',
      url: '#',
      datetime: Date.now() - 18000000,
      summary: "India's National Statistical Office revised its GDP growth estimate upward to 7.8% for FY24, making it the world's fastest-growing major economy. Strong domestic consumption and government capital expenditure were key drivers.",
      sentiment: 'positive',
      sentimentScore: 0.91,
    },
  ];

  if (symbol && symbol !== '') {
    newsItems[0].headline = `${symbol} Q4 Results: Strong performance beats analyst expectations`;
    newsItems[0].summary = `${STOCK_DATABASE[symbol.toUpperCase()]?.name || symbol} posted strong Q4 results with revenue beating street estimates by 4.2%. Management guided for double-digit growth in FY25 backed by new deal wins and margin expansion.`;
  }

  return newsItems;
}

export function getSentimentAnalysis(newsItems: NewsItem[]): SentimentData {
  const total = newsItems.length;
  const positive = newsItems.filter((n) => n.sentiment === 'positive').length;
  const negative = newsItems.filter((n) => n.sentiment === 'negative').length;
  const neutral = total - positive - negative;

  return {
    positive: Math.round((positive / total) * 100),
    negative: Math.round((negative / total) * 100),
    neutral: Math.round((neutral / total) * 100),
    overall:
      positive > negative ? 'Positive' : negative > positive ? 'Negative' : 'Neutral',
  };
}

export function getAllStockSymbols(): string[] {
  return Object.keys(STOCK_DATABASE);
}

export function getTickerData(): Array<{ symbol: string; price: number; changePercent: number }> {
  const seed = Date.now() / 100000;
  return Object.entries(STOCK_DATABASE).map(([symbol, data], i) => ({
    symbol,
    price: generatePrice(data.basePrice, seed + i, 0.03),
    changePercent: Math.round((seededRandom(seed + i + 50) - 0.45) * 4 * 100) / 100,
  }));
}
