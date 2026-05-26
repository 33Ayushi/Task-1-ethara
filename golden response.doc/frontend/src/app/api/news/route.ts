import { NextRequest, NextResponse } from 'next/server';

const KEY = process.env.ALPHA_VANTAGE_KEY!;
const BASE = 'https://www.alphavantage.co/query';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get('symbol') || '';

  try {
    const tickerParam = symbol ? `&tickers=${symbol}.BSE` : '&topics=finance,economy';
    const res = await fetch(
      `${BASE}?function=NEWS_SENTIMENT${tickerParam}&limit=10&apikey=${KEY}`,
      { next: { revalidate: 900 } } // cache 15 minutes
    );
    const data = await res.json();
    const items = data['feed'] || [];

    if (!items.length) {
      return NextResponse.json({ error: 'No news or rate limited', raw: data }, { status: 404 });
    }

    const mapped = items.slice(0, 8).map((item: Record<string, unknown>, i: number) => {
      const rawTime = item['time_published'] as string;
      // AV format: '20240315T143000' → parse manually
      let timestamp = Date.now();
      if (rawTime && rawTime.length >= 15) {
        const year = parseInt(rawTime.slice(0, 4));
        const month = parseInt(rawTime.slice(4, 6)) - 1;
        const day = parseInt(rawTime.slice(6, 8));
        const hour = parseInt(rawTime.slice(9, 11));
        const min = parseInt(rawTime.slice(11, 13));
        timestamp = new Date(year, month, day, hour, min).getTime();
      }

      const sentimentLabel = (item['overall_sentiment_label'] as string) || 'Neutral';
      const sentimentScore = parseFloat((item['overall_sentiment_score'] as string) || '0');

      const sentiment =
        sentimentLabel.toLowerCase().includes('bullish') || sentimentScore > 0.15
          ? 'positive'
          : sentimentLabel.toLowerCase().includes('bearish') || sentimentScore < -0.15
          ? 'negative'
          : 'neutral';

      return {
        id: String(i),
        headline: item['title'] as string,
        source: (item['source'] as string) || 'News',
        url: (item['url'] as string) || '#',
        datetime: timestamp,
        summary: (item['summary'] as string) || '',
        sentiment,
        sentimentScore,
      };
    });


    return NextResponse.json(mapped);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
