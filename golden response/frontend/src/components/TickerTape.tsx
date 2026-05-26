'use client';

import { useEffect, useState } from 'react';
import { getTickerData } from '@/lib/stockService';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function TickerTape() {
  const [tickers, setTickers] = useState<Array<{ symbol: string; price: number; changePercent: number }>>([]);

  useEffect(() => {
    setTickers(getTickerData());
    const interval = setInterval(() => setTickers(getTickerData()), 15000);
    return () => clearInterval(interval);
  }, []);

  const doubled = [...tickers, ...tickers];

  return (
    <div
      style={{
        overflow: 'hidden',
        background: 'rgba(10, 14, 26, 0.95)',
        borderBottom: '1px solid rgba(30, 45, 74, 0.8)',
        padding: '7px 0',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          gap: 0,
          animation: 'ticker 60s linear infinite',
          whiteSpace: 'nowrap',
        }}
      >
        {doubled.map((t, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '0 24px',
              borderRight: '1px solid rgba(30, 45, 74, 0.5)',
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <span style={{ color: '#94a3b8', fontWeight: 600 }}>{t.symbol}</span>
            <span style={{ color: '#f1f5f9', fontWeight: 500 }}>
              ₹{t.price.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                color: t.changePercent >= 0 ? '#10b981' : '#ef4444',
                fontWeight: 600,
              }}
            >
              {t.changePercent >= 0 ? (
                <TrendingUp size={11} />
              ) : (
                <TrendingDown size={11} />
              )}
              {t.changePercent >= 0 ? '+' : ''}{t.changePercent.toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
