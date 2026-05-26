'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getTrendAnalysis, getAllStockSymbols } from '@/lib/stockService';
import { fetchStockQuote, fetchHistoricalData } from '@/lib/alphaVantage';
import { StockQuote, HistoricalDataPoint, TrendAnalysis } from '@/types/stock';
import StockChart from '@/components/StockChart';
import TrendBadge from '@/components/TrendBadge';
import {
  Search, BarChart3,
  ArrowUpRight, ArrowDownRight, Info, ChevronDown, RefreshCw, Wifi
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

type Period = '1W' | '1M' | '3M' | '6M' | '1Y';

function formatINR(value: number) {
  return value.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

function AnalysisContent() {
  const searchParams = useSearchParams();
  const initialSymbol = searchParams.get('symbol') || 'TCS';

  const [symbol, setSymbol] = useState(initialSymbol);
  const [inputSymbol, setInputSymbol] = useState(initialSymbol);
  const [period, setPeriod] = useState<Period>('3M');
  const [quote, setQuote] = useState<StockQuote | null>(null);
  const [historical, setHistorical] = useState<HistoricalDataPoint[]>([]);
  const [trend, setTrend] = useState<TrendAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [liveData, setLiveData] = useState(false);
  const [allSymbols] = useState(getAllStockSymbols());

  const loadData = async (sym: string, per: Period) => {
    setLoading(true);
    const [q, h] = await Promise.all([
      fetchStockQuote(sym),
      fetchHistoricalData(sym, per),
    ]);
    const t = getTrendAnalysis(sym, h);
    setQuote(q);
    setHistorical(h);
    setTrend(t);
    setLiveData(true);
    setLoading(false);
  };

  useEffect(() => { loadData(symbol, period); }, [symbol, period]);

  const handleSymbolChange = (newSym: string) => {
    setSymbol(newSym);
    setInputSymbol(newSym);
  };

  // Volume bar chart data (last 2 weeks)
  const volumeData = historical.slice(-14).map((d) => ({
    date: d.date.slice(5),
    volume: d.volume / 1000000,
    positive: d.close >= d.open,
  }));

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.5px' }}>
              Stock Analysis
            </h1>
            {liveData && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20, letterSpacing: '0.5px' }}>
                <Wifi size={11} /> LIVE DATA
              </span>
            )}
          </div>
          <p style={{ fontSize: 13, color: '#475569' }}>Alpha Vantage real-time data • AI-powered trend insights</p>
        </div>

        {/* Symbol picker */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: 10,
              padding: '8px 12px',
              gap: 8,
            }}
          >
            <Search size={15} color="#475569" />
            <select
              value={symbol}
              onChange={(e) => handleSymbolChange(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#f1f5f9',
                fontSize: 14,
                fontWeight: 700,
                fontFamily: 'JetBrains Mono, monospace',
                outline: 'none',
                cursor: 'pointer',
                minWidth: 120,
              }}
            >
              {allSymbols.map((s) => (
                <option key={s} value={s} style={{ background: '#111827' }}>{s}</option>
              ))}
            </select>
            <ChevronDown size={14} color="#475569" />
          </div>
          <button
            className="btn-secondary"
            onClick={() => loadData(symbol, period)}
            style={{ padding: '8px 14px' }}
          >
            <RefreshCw size={14} />
            Refresh
          </button>
          <a
            href="https://www.alphavantage.co"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 11, color: '#475569', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            Powered by Alpha Vantage
          </a>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400, flexDirection: 'column', gap: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid rgba(59,130,246,0.2)', borderTopColor: '#3b82f6', animation: 'spin 1s linear infinite' }} />
          <div style={{ color: '#475569', fontSize: 14 }}>Loading analysis...</div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : quote ? (
        <>
          {/* Quote card */}
          <div
            className="gradient-border"
            style={{ marginBottom: 24, padding: '20px 24px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 24, fontWeight: 900, color: '#f1f5f9', fontFamily: 'JetBrains Mono, monospace' }}>
                    {quote.symbol}
                  </span>
                  <span style={{ fontSize: 12, color: '#64748b', background: 'rgba(255,255,255,0.04)', padding: '3px 8px', borderRadius: 6 }}>
                    {quote.exchange}
                  </span>
                  {trend && <TrendBadge analysis={trend} compact />}
                </div>
                <div style={{ fontSize: 15, color: '#94a3b8' }}>{quote.name}</div>
                <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>{quote.sector} • Currency: ₹</div>
              </div>
              <div>
                <div style={{ fontSize: 38, fontWeight: 900, color: '#f1f5f9', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '-1px' }}>
                  ₹{formatINR(quote.price)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: quote.changePercent >= 0 ? '#10b981' : '#ef4444', display: 'flex', alignItems: 'center', gap: 4 }}>
                    {quote.changePercent >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {quote.change >= 0 ? '+' : ''}₹{Math.abs(quote.change).toFixed(2)}
                  </span>
                  <span className={quote.changePercent >= 0 ? 'badge-positive' : 'badge-negative'}>
                    {quote.changePercent >= 0 ? '+' : ''}{quote.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Key metrics bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: 0,
                marginTop: 20,
                paddingTop: 16,
                borderTop: '1px solid rgba(30,45,74,0.6)',
              }}
            >
              {[
                { label: 'Open', value: `₹${formatINR(quote.open)}` },
                { label: 'High', value: `₹${formatINR(quote.high)}`, color: '#10b981' },
                { label: 'Low', value: `₹${formatINR(quote.low)}`, color: '#ef4444' },
                { label: 'Volume', value: `${(quote.volume / 1000000).toFixed(2)}M` },
                { label: 'P/E Ratio', value: quote.pe?.toFixed(1) || 'N/A' },
                { label: '52W High', value: `₹${formatINR(quote.week52High || 0)}`, color: '#10b981' },
                { label: '52W Low', value: `₹${formatINR(quote.week52Low || 0)}`, color: '#ef4444' },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ padding: '0 16px 0 0' }}>
                  <div style={{ fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: color || '#f1f5f9', fontFamily: 'JetBrains Mono, monospace' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Main grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, marginBottom: 20 }}>
            {/* Price Chart */}
            <div className="chart-container" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <h2 style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9' }}>Price Chart</h2>
                  <p style={{ fontSize: 12, color: '#475569' }}>{historical.length} trading days</p>
                </div>
                {/* Period selector */}
                <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.03)', padding: 4, borderRadius: 8, border: '1px solid rgba(30,45,74,0.6)' }}>
                  {(['1W', '1M', '3M', '6M', '1Y'] as Period[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPeriod(p)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: 6,
                        border: 'none',
                        background: period === p ? '#3b82f6' : 'transparent',
                        color: period === p ? 'white' : '#64748b',
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <StockChart data={historical} symbol={quote.symbol} period={period} height={300} />
            </div>

            {/* Trend Analysis */}
            <div>
              {trend && <TrendBadge analysis={trend} />}
            </div>
          </div>

          {/* Volume Chart */}
          <div className="chart-container" style={{ padding: '20px', marginBottom: 20 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>Volume Analysis</h2>
            <p style={{ fontSize: 12, color: '#475569', marginBottom: 16 }}>Trading volume over last 14 sessions (Millions)</p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={volumeData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,45,74,0.5)" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: 'rgba(15,22,41,0.95)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8 }}
                  labelStyle={{ color: '#94a3b8' }}
                  formatter={(v: number) => [`${v.toFixed(2)}M`, 'Volume']}
                />
                <Bar dataKey="volume" radius={[4, 4, 0, 0]}>
                  {volumeData.map((entry, index) => (
                    <Cell key={index} fill={entry.positive ? 'rgba(16,185,129,0.6)' : 'rgba(239,68,68,0.6)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Historical Data Table */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9' }}>Historical Data</h2>
              <p style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>Last 20 trading sessions</p>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(30,45,74,0.8)' }}>
                    {['Date', 'Open', 'High', 'Low', 'Close', 'Change', 'Volume'].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: '12px 16px',
                          textAlign: h === 'Date' ? 'left' : 'right',
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#475569',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...historical].reverse().slice(0, 20).map((row, i) => {
                    const dayChange = row.close - row.open;
                    const dayChangePct = (dayChange / row.open) * 100;
                    return (
                      <tr
                        key={row.date}
                        style={{
                          borderBottom: i < 19 ? '1px solid rgba(30,45,74,0.4)' : 'none',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
                      >
                        <td style={{ padding: '10px 16px', fontSize: 13, color: '#94a3b8' }}>{row.date}</td>
                        {[row.open, row.high, row.low, row.close].map((v, idx) => (
                          <td
                            key={idx}
                            style={{
                              padding: '10px 16px',
                              textAlign: 'right',
                              fontSize: 13,
                              fontFamily: 'JetBrains Mono, monospace',
                              color: idx === 1 ? '#10b981' : idx === 2 ? '#ef4444' : '#f1f5f9',
                            }}
                          >
                            ₹{formatINR(v)}
                          </td>
                        ))}
                        <td style={{ padding: '10px 16px', textAlign: 'right' }}>
                          <span className={dayChange >= 0 ? 'badge-positive' : 'badge-negative'}>
                            {dayChange >= 0 ? '+' : ''}{dayChangePct.toFixed(2)}%
                          </span>
                        </td>
                        <td style={{ padding: '10px 16px', textAlign: 'right', fontSize: 13, color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>
                          {(row.volume / 1000000).toFixed(2)}M
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: 80, color: '#64748b' }}>
          <Info size={40} style={{ margin: '0 auto 16px' }} />
          <div style={{ fontSize: 16 }}>Stock not found. Please try a different symbol.</div>
          <Link href="/search" className="btn-primary" style={{ display: 'inline-flex', marginTop: 20, textDecoration: 'none' }}>
            <Search size={16} /> Search Stocks
          </Link>
        </div>
      )}
    </div>
  );
}

export default function AnalysisPage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', flexDirection: 'column', gap: 16 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid rgba(59,130,246,0.2)', borderTopColor: '#3b82f6', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <AnalysisContent />
    </Suspense>
  );
}
