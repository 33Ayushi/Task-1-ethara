'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getStockQuote, searchStocks } from '@/lib/stockService';
import { fetchStockQuote, fetchSearchResults } from '@/lib/alphaVantage';
import { StockQuote } from '@/types/stock';
import { Search, TrendingUp, TrendingDown, ArrowUpRight, BarChart3, Star, X } from 'lucide-react';

const POPULAR_STOCKS = ['TCS', 'RELIANCE', 'INFY', 'HDFCBANK', 'ICICIBANK', 'WIPRO', 'BAJFINANCE', 'BHARTIARTL'];

function formatINR(value: number) {
  return value.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<{ symbol: string; name: string; sector: string }>>([]);
  const [selectedStock, setSelectedStock] = useState<StockQuote | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) setRecentSearches(JSON.parse(saved));
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (query.trim().length > 0) {
      const res = searchStocks(query);
      setResults(res);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = async (symbol: string) => {
    setLoading(true);
    const quote = await fetchStockQuote(symbol);
    setSelectedStock(quote);
    setQuery('');
    setResults([]);
    setLoading(false);

    const updated = [symbol, ...recentSearches.filter((s) => s !== symbol)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.2)',
            borderRadius: 20,
            padding: '6px 14px',
            marginBottom: 16,
          }}
        >
          <Search size={14} color="#3b82f6" />
          <span style={{ fontSize: 12, color: '#3b82f6', fontWeight: 600 }}>Stock Search</span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.5px', marginBottom: 12 }}>
          Find Any Stock
        </h1>
        <p style={{ fontSize: 15, color: '#64748b', maxWidth: 400, margin: '0 auto' }}>
          Search across 25+ NSE-listed companies by name or ticker symbol
        </p>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: 32 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            borderRadius: 14,
            padding: '0 16px',
            gap: 12,
            transition: 'all 0.3s',
            boxShadow: query ? '0 0 0 3px rgba(59,130,246,0.1)' : 'none',
          }}
        >
          <Search size={20} color={query ? '#3b82f6' : '#475569'} style={{ flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by company name or ticker (e.g. TCS, Reliance)"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f1f5f9',
              fontSize: 16,
              padding: '18px 0',
              fontFamily: 'Inter, sans-serif',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: 4 }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Dropdown results */}
        {results.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              borderRadius: 12,
              marginTop: 6,
              overflow: 'hidden',
              zIndex: 50,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {results.map((r, i) => (
              <div
                key={r.symbol}
                onClick={() => handleSelect(r.symbol)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '13px 16px',
                  cursor: 'pointer',
                  borderBottom: i < results.length - 1 ? '1px solid rgba(30,45,74,0.5)' : 'none',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.05)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: 'rgba(59,130,246,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      fontWeight: 700,
                      color: '#3b82f6',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    {r.symbol.slice(0, 3)}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9' }}>{r.symbol}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{r.name}</div>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: '#64748b',
                    background: 'rgba(255,255,255,0.04)',
                    padding: '3px 8px',
                    borderRadius: 6,
                  }}
                >
                  {r.sector}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Searches */}
      {recentSearches.length > 0 && !selectedStock && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Recent Searches
            </span>
            <button
              onClick={clearRecent}
              style={{ fontSize: 12, color: '#475569', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Clear all
            </button>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {recentSearches.map((sym) => (
              <button
                key={sym}
                onClick={() => handleSelect(sym)}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  padding: '7px 14px',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#94a3b8',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#3b82f6';
                  (e.currentTarget as HTMLElement).style.color = '#3b82f6';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.color = '#94a3b8';
                }}
              >
                {sym}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Stocks */}
      {!selectedStock && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 14 }}>
            Popular Stocks
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {POPULAR_STOCKS.map((sym) => {
              const q = getStockQuote(sym);
              if (!q) return null;
              return (
                <div
                  key={sym}
                  onClick={() => handleSelect(sym)}
                  className="card"
                  style={{ padding: '14px 16px', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#f1f5f9', fontFamily: 'JetBrains Mono, monospace' }}>{sym}</div>
                      <div style={{ fontSize: 11, color: '#475569', marginTop: 2, maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {q.name}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', fontFamily: 'JetBrains Mono, monospace' }}>
                        ₹{formatINR(q.price)}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: q.changePercent >= 0 ? '#10b981' : '#ef4444' }}>
                        {q.changePercent >= 0 ? '+' : ''}{q.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Stock Result */}
      {selectedStock && (
        <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: 16,
              overflow: 'hidden',
            }}
          >
            {/* Stock header */}
            <div
              style={{
                padding: '24px',
                background: 'linear-gradient(135deg, rgba(59,130,246,0.05), rgba(6,182,212,0.05))',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 900, color: '#f1f5f9', fontFamily: 'JetBrains Mono, monospace' }}>
                      {selectedStock.symbol}
                    </h2>
                    <span
                      style={{
                        fontSize: 12,
                        color: '#94a3b8',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        padding: '3px 10px',
                        borderRadius: 6,
                      }}
                    >
                      {selectedStock.exchange}
                    </span>
                  </div>
                  <div style={{ fontSize: 16, color: '#94a3b8', marginBottom: 4 }}>{selectedStock.name}</div>
                  <div style={{ fontSize: 12, color: '#475569' }}>{selectedStock.sector} Sector</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      fontSize: 36,
                      fontWeight: 900,
                      color: '#f1f5f9',
                      fontFamily: 'JetBrains Mono, monospace',
                      letterSpacing: '-1px',
                    }}
                  >
                    ₹{formatINR(selectedStock.price)}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: 6,
                      fontSize: 16,
                      fontWeight: 700,
                      color: selectedStock.changePercent >= 0 ? '#10b981' : '#ef4444',
                      marginTop: 4,
                    }}
                  >
                    {selectedStock.changePercent >= 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                    {selectedStock.change >= 0 ? '+' : ''}₹{Math.abs(selectedStock.change).toFixed(2)} ({selectedStock.changePercent >= 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%)
                  </div>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: 0,
                borderBottom: '1px solid var(--border)',
              }}
            >
              {[
                { label: 'Open', value: `₹${formatINR(selectedStock.open)}` },
                { label: "Day's High", value: `₹${formatINR(selectedStock.high)}` },
                { label: "Day's Low", value: `₹${formatINR(selectedStock.low)}` },
                { label: 'Prev Close', value: `₹${formatINR(selectedStock.close)}` },
                { label: 'Volume', value: `${(selectedStock.volume / 1000000).toFixed(2)}M` },
                { label: 'P/E Ratio', value: selectedStock.pe?.toFixed(1) || 'N/A' },
                { label: '52W High', value: `₹${formatINR(selectedStock.week52High || 0)}` },
                { label: '52W Low', value: `₹${formatINR(selectedStock.week52Low || 0)}` },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    padding: '16px 20px',
                    borderRight: '1px solid rgba(30,45,74,0.5)',
                  }}
                >
                  <div style={{ fontSize: 11, color: '#475569', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9', fontFamily: 'JetBrains Mono, monospace' }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12, padding: '20px 24px', flexWrap: 'wrap' }}>
              <Link
                href={`/analysis?symbol=${selectedStock.symbol}`}
                className="btn-primary"
                style={{ textDecoration: 'none' }}
              >
                <BarChart3 size={16} />
                Full Analysis
              </Link>
              <Link
                href={`/watchlist`}
                className="btn-secondary"
                style={{ textDecoration: 'none' }}
              >
                <Star size={16} />
                Add to Watchlist
              </Link>
              <button className="btn-secondary" onClick={() => setSelectedStock(null)}>
                <Search size={16} />
                New Search
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
