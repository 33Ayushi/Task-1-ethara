import { NextRequest, NextResponse } from 'next/server';

const KEY = process.env.ALPHA_VANTAGE_KEY!;
const BASE = 'https://www.alphavantage.co/query';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';

  if (!q.trim()) {
    return NextResponse.json([]);
  }

  try {
    const res = await fetch(
      `${BASE}?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(q)}&apikey=${KEY}`,
      { next: { revalidate: 300 } }
    );
    const data = await res.json();
    const matches = data['bestMatches'] || [];

    // Filter Indian exchanges (BSE/NSE) and format
    const results = matches
      .filter((m: Record<string, string>) =>
        m['4. region'] === 'India/Mumbai' || m['4. region'] === 'India/Bombay'
      )
      .slice(0, 8)
      .map((m: Record<string, string>) => ({
        symbol: m['1. symbol'].replace('.BSE', '').replace('.NSE', ''),
        name: m['2. name'],
        sector: 'Listed',
        exchange: m['4. region'],
        avSymbol: m['1. symbol'],
      }));

    return NextResponse.json(results);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
