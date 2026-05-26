import { NextRequest, NextResponse } from 'next/server';

const KEY = process.env.ALPHA_VANTAGE_KEY!;
const BASE = 'https://www.alphavantage.co/query';

function nseSymbol(sym: string) {
  return `${sym}.BSE`;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  const { symbol } = await params;
  const { searchParams } = new URL(req.url);
  const period = searchParams.get('period') || '3M';
  const avSym = nseSymbol(symbol.toUpperCase());

  // Choose outputsize based on period
  const outputsize = ['1W', '1M'].includes(period) ? 'compact' : 'full';

  try {
    const res = await fetch(
      `${BASE}?function=TIME_SERIES_DAILY&symbol=${avSym}&outputsize=${outputsize}&apikey=${KEY}`,
      { next: { revalidate: 3600 } } // cache 1 hour
    );
    const data = await res.json();
    const timeSeries = data['Time Series (Daily)'];

    if (!timeSeries) {
      return NextResponse.json({ error: 'Not found or rate limited', raw: data }, { status: 404 });
    }

    const daysMap: Record<string, number> = { '1W': 7, '1M': 30, '3M': 90, '6M': 180, '1Y': 365 };
    const days = daysMap[period] || 90;

    const entries = Object.entries(timeSeries)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-days)
      .map(([date, values]: [string, unknown]) => {
        const v = values as Record<string, string>;
        return {
          date,
          open: parseFloat(v['1. open']),
          high: parseFloat(v['2. high']),
          low: parseFloat(v['3. low']),
          close: parseFloat(v['4. close']),
          volume: parseInt(v['5. volume']),
        };
      });

    return NextResponse.json(entries);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
