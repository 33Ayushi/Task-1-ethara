import { NextRequest, NextResponse } from 'next/server';

const KEY = process.env.ALPHA_VANTAGE_KEY!;
const BASE = 'https://www.alphavantage.co/query';

// Indian NSE stocks on Alpha Vantage use ".BSE" suffix
function nseSymbol(sym: string) {
  return `${sym}.BSE`;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  const { symbol } = await params;
  const avSym = nseSymbol(symbol.toUpperCase());

  try {
    const res = await fetch(
      `${BASE}?function=GLOBAL_QUOTE&symbol=${avSym}&apikey=${KEY}`,
      { next: { revalidate: 60 } } // cache 60 seconds
    );
    const data = await res.json();
    const q = data['Global Quote'];

    if (!q || !q['05. price']) {
      return NextResponse.json({ error: 'Not found or rate limited', raw: data }, { status: 404 });
    }

    return NextResponse.json({
      symbol: symbol.toUpperCase(),
      price: parseFloat(q['05. price']),
      open: parseFloat(q['02. open']),
      high: parseFloat(q['03. high']),
      low: parseFloat(q['04. low']),
      close: parseFloat(q['08. previous close']),
      change: parseFloat(q['09. change']),
      changePercent: parseFloat(q['10. change percent'].replace('%', '')),
      volume: parseInt(q['06. volume']),
      latestTradingDay: q['07. latest trading day'],
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
