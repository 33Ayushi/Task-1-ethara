'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStockQuote, searchStocks } from '@/lib/stockService';
import { WatchlistItem } from '@/types/stock';
import { Star, Trash2, Plus, TrendingUp, TrendingDown, Search, BarChart3, Bell } from 'lucide-react';

const DEFAULT_WATCHLIST: WatchlistItem[] = [
  { symbol: 'TCS', name: 'Tata Consultancy Services', addedAt: new Date().toISOString() },
  { symbol: 'RELIANCE', name: 'Reliance Industries', addedAt: new Date().toISOString() },
  { symbol: 'INFY', name: 'Infosys Limited', addedAt: new Date().toISOString() },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Limited', addedAt: new Date().toISOString() },
];

function formatINR(value: number) {
  return value.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [enriched, setEnriched] = useState<(WatchlistItem & { price?: number; change?: number; changePercent?: number })[]>([]);
  const [addQuery, setAddQuery] = useState('');
  const [addResults, setAddResults] = useState<{ symbol: string; name: string; sector: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // Load watchlist from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('watchlist');
    const list: WatchlistItem[] = saved ? JSON.parse(saved) : DEFAULT_WATCHLIST;
    setWatchlist(list);
  }, []);

  // Enrich with live prices
  useEffect(() => {
    if (watchlist.length === 0) { setLoading(false); return; }
    const enrichedList = watchlist.map((item) => {
      const quote = getStockQuote(item.symbol);
      return {
        ...item,
        price: quote?.price,
        change: quote?.change,
        changePercent: quote?.changePercent,
      };
    });
    setEnriched(enrichedList);
    setLoading(false);
  }, [watchlist]);

  // Search for adding
  useEffect(() => {
    if (addQuery.trim().length > 0) {
      setAddResults(searchStocks(addQuery).filter((r) => !watchlist.find((w) => w.symbol === r.symbol)));
    } else {
      setAddResults([]);
    }
  }, [addQuery, watchlist]);

  const saveWatchlist = (list: WatchlistItem[]) => {
    localStorage.setItem('watchlist', JSON.stringify(list));
    setWatchlist(list);
  };

  const removeStock = (symbol: string) => {
    saveWatchlist(watchlist.filter((w) => w.symbol !== symbol));
  };

  const addStock = (symbol: string, name: string) => {
    const newItem: WatchlistItem = { symbol, name, addedAt: new Date().toISOString() };
    saveWatchlist([...watchlist, newItem]);
    setAddQuery('');
    setAddResults([]);
  };

  const totalPositive = enriched.filter((e) => (e.changePercent || 0) > 0).length;
  const totalNegative = enriched.filter((e) => (e.changePercent || 0) < 0).length;

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.5px', marginBottom: 6 }}>
            My Watchlist
          </h1>
          <p style={{ fontSize: 14, color: '#475569' }}>
            Tracking <strong style={{ color: '#94a3b8' }}>{watchlist.length}</strong> stocks •{' '}
            <span style={{ color: '#10b981' }}>{totalPositive} gaining</span> •{' '}
            <span style={{ color: '#ef4444' }}>{totalNegative} declining</span>
          </p>
        </div>

        {/* Summary pills */}
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ padding: '8px 14px', borderRadius: 10, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#10b981' }}>{totalPositive}</div>
            <div style={{ fontSize: 11, color: '#475569' }}>Gaining</div>
          </div>
          <div style={{ padding: '8px 14px', borderRadius: 10, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#ef4444' }}>{totalNegative}</div>
            <div style={{ fontSize: 11, color: '#475569' }}>Declining</div>
          </div>
        </div>
      </div>

      {/* Add Stock */}
      <div
        style={{
          position: 'relative',
          marginBottom: 28,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            borderRadius: 12,
            padding: '0 16px',
            gap: 10,
          }}
        >
          <Plus size={18} color="#3b82f6" />
          <input
            value={addQuery}
            onChange={(e) => setAddQuery(e.target.value)}
            placeholder="Add stock to watchlist..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f1f5f9',
              fontSize: 14,
              padding: '14px 0',
              fontFamily: 'Inter, sans-serif',
            }}
          />
          <Search size={16} color="#475569" />
        </div>

        {addResults.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              borderRadius: 10,
              marginTop: 6,
              zIndex: 50,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              overflow: 'hidden',
            }}
          >
            {addResults.map((r) => (
              <div
                key={r.symbol}
                onClick={() => addStock(r.symbol, r.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  borderBottom: '1px solid rgba(30,45,74,0.4)',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.05)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>{r.symbol}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{r.name}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11, color: '#64748b' }}>{r.sector}</span>
                  <Plus size={16} color="#3b82f6" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Watchlist */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid rgba(59,130,246,0.2)', borderTopColor: '#3b82f6', animation: 'spin 1s linear infinite' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : enriched.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '80px 20px',
            color: '#475569',
          }}
        >
          <Star size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
          <div style={{ fontSize: 18, fontWeight: 700, color: '#64748b', marginBottom: 8 }}>Your watchlist is empty</div>
          <div style={{ fontSize: 14, marginBottom: 24 }}>Start by adding stocks you want to track</div>
          <Link href="/search" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex' }}>
            <Search size={16} /> Find Stocks
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {enriched.map((item) => (
            <div
              key={item.symbol}
              className="card"
              style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}
            >
              {/* Symbol */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: 'rgba(59,130,246,0.1)',
                  border: '1px solid rgba(59,130,246,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 800,
                  color: '#3b82f6',
                  fontFamily: 'JetBrains Mono, monospace',
                  flexShrink: 0,
                }}
              >
                {item.symbol.slice(0, 3)}
              </div>

              {/* Name */}
              <div style={{ flex: 1, minWidth: 150 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#f1f5f9' }}>{item.symbol}</div>
                <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>{item.name}</div>
              </div>

              {/* Price & Change */}
              <div style={{ textAlign: 'right', minWidth: 120 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#f1f5f9', fontFamily: 'JetBrains Mono, monospace' }}>
                  ₹{item.price ? formatINR(item.price) : '—'}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: (item.changePercent || 0) >= 0 ? '#10b981' : '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 4,
                    marginTop: 2,
                  }}
                >
                  {(item.changePercent || 0) >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                  {(item.changePercent || 0) >= 0 ? '+' : ''}{(item.changePercent || 0).toFixed(2)}%
                </div>
              </div>

              {/* Change amount */}
              <div style={{ textAlign: 'right', minWidth: 80 }}>
                <div style={{ fontSize: 12, color: '#475569', marginBottom: 2 }}>Day Change</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: (item.change || 0) >= 0 ? '#10b981' : '#ef4444', fontFamily: 'JetBrains Mono, monospace' }}>
                  {(item.change || 0) >= 0 ? '+' : ''}₹{Math.abs(item.change || 0).toFixed(2)}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 8 }}>
                <Link
                  href={`/analysis?symbol=${item.symbol}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    background: 'rgba(59,130,246,0.1)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    color: '#3b82f6',
                    borderRadius: 8,
                    padding: '7px 12px',
                    fontSize: 12,
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  <BarChart3 size={14} />
                  Analyze
                </Link>
                <button
                  onClick={() => removeStock(item.symbol)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    color: '#ef4444',
                    borderRadius: 8,
                    padding: '7px 12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
