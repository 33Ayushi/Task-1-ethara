'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  getMarketIndices,
  getTopMovers,
} from '@/lib/stockService';
import { fetchHistoricalData, fetchNews } from '@/lib/alphaVantage';
import { MarketIndex, TopMover, NewsItem } from '@/types/stock';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  BarChart3,
  Search,
  Star,
  RefreshCw,
  Wifi,
} from 'lucide-react';
import StockChart from '@/components/StockChart';
import { HistoricalDataPoint } from '@/types/stock';

function formatINR(value: number) {
  return value.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

function timeAgo(timestamp: number) {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function Dashboard() {
  const [indices, setIndices] = useState<MarketIndex[]>([]);
  const [movers, setMovers] = useState<{ gainers: TopMover[]; losers: TopMover[] }>({
    gainers: [],
    losers: [],
  });
  const [news, setNews] = useState<NewsItem[]>([]);
  const [featuredData, setFeaturedData] = useState<HistoricalDataPoint[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'gainers' | 'losers'>('gainers');
  const [liveData, setLiveData] = useState(false);

  const loadData = async () => {
    // Indices & movers use simulated data (AV free tier doesn't cover NIFTY/SENSEX)
    setIndices(getMarketIndices());
    setMovers(getTopMovers());

    // TCS chart & news — real Alpha Vantage data with mock fallback
    const [hist, newsData] = await Promise.all([
      fetchHistoricalData('TCS', '1M'),
      fetchNews(),
    ]);
    setFeaturedData(hist);
    setNews(newsData);
    setLiveData(true);
    setLastUpdated(new Date());
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 120000); // 2 min refresh
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 120px)',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '3px solid rgba(59,130,246,0.2)',
            borderTopColor: '#3b82f6',
            animation: 'spin 1s linear infinite',
          }}
        />
        <div style={{ color: '#94a3b8', fontSize: 14 }}>Loading market data...</div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 32,
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: '#f1f5f9',
                letterSpacing: '-0.5px',
              }}
            >
              Market Dashboard
            </h1>
            {liveData && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  color: '#10b981',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '3px 9px',
                  borderRadius: 20,
                  letterSpacing: '0.5px',
                }}
              >
                <Wifi size={11} />
                LIVE DATA
              </span>
            )}
          </div>
          <p style={{ fontSize: 14, color: '#475569' }}>
            Indian equity market overview •{' '}
            <span style={{ color: '#94a3b8' }}>
              Updated {lastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-secondary" onClick={loadData}>
            <RefreshCw size={15} />
            Refresh
          </button>
          <Link href="/search" className="btn-primary" style={{ textDecoration: 'none' }}>
            <Search size={15} />
            Search Stock
          </Link>
        </div>
      </div>

      {/* Market Indices */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 16,
          marginBottom: 32,
        }}
      >
        {indices.map((idx) => (
          <div
            key={idx.symbol}
            className="card"
            style={{ padding: '16px 20px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {idx.name}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 11,
                  fontWeight: 700,
                  color: idx.changePercent >= 0 ? '#10b981' : '#ef4444',
                  background: idx.changePercent >= 0 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                  padding: '3px 7px',
                  borderRadius: 6,
                }}
              >
                {idx.changePercent >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {Math.abs(idx.changePercent).toFixed(2)}%
              </div>
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: '#f1f5f9',
                fontFamily: 'JetBrains Mono, monospace',
                letterSpacing: '-0.5px',
              }}
            >
              {idx.value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </div>
            <div style={{ fontSize: 12, marginTop: 4, color: idx.change >= 0 ? '#10b981' : '#ef4444' }}>
              {idx.change >= 0 ? '+' : ''}{idx.change.toFixed(2)} pts
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: 24,
          marginBottom: 32,
        }}
      >
        {/* Featured Chart */}
        <div className="chart-container" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9' }}>TCS — Tata Consultancy Services</h2>
              <p style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>NSE • IT Sector • 1 Month</p>
            </div>
            <Link
              href="/analysis?symbol=TCS"
              style={{
                fontSize: 12,
                color: '#3b82f6',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              Full Analysis <ArrowUpRight size={13} />
            </Link>
          </div>
          <StockChart data={featuredData} symbol="TCS" period="1M" height={280} />
        </div>

        {/* Top Movers */}
        <div
          className="card"
          style={{ padding: 0, overflow: 'hidden' }}
        >
          {/* Tabs */}
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid var(--border)',
            }}
          >
            {(['gainers', 'losers'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: '14px',
                  border: 'none',
                  background: 'transparent',
                  color: activeTab === tab ? (tab === 'gainers' ? '#10b981' : '#ef4444') : '#475569',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  borderBottom: activeTab === tab
                    ? `2px solid ${tab === 'gainers' ? '#10b981' : '#ef4444'}`
                    : '2px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  transition: 'all 0.2s',
                }}
              >
                {tab === 'gainers' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {tab === 'gainers' ? 'Top Gainers' : 'Top Losers'}
              </button>
            ))}
          </div>

          {/* List */}
          <div>
            {(activeTab === 'gainers' ? movers.gainers : movers.losers).map((stock, i) => (
              <Link
                key={stock.symbol}
                href={`/analysis?symbol=${stock.symbol}`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 16px',
                    borderBottom: i < 4 ? '1px solid rgba(30,45,74,0.5)' : 'none',
                    transition: 'background 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 8,
                        background: activeTab === 'gainers' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 10,
                        fontWeight: 700,
                        color: activeTab === 'gainers' ? '#10b981' : '#ef4444',
                        fontFamily: 'JetBrains Mono, monospace',
                        flexShrink: 0,
                      }}
                    >
                      {stock.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>{stock.symbol}</div>
                      <div style={{ fontSize: 11, color: '#475569', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {stock.name}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', fontFamily: 'JetBrains Mono, monospace' }}>
                      ₹{formatINR(stock.price)}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: stock.changePercent >= 0 ? '#10b981' : '#ef4444',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: 3,
                      }}
                    >
                      {stock.changePercent >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {Math.abs(stock.changePercent).toFixed(2)}%
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* News Section */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9' }}>Market News & Insights</h2>
          <Link
            href="/news"
            style={{
              fontSize: 13,
              color: '#3b82f6',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            View All <ArrowUpRight size={14} />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: 16,
          }}
        >
          {news.slice(0, 3).map((item) => (
            <div key={item.id} className="card" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {item.source}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    className={
                      item.sentiment === 'positive'
                        ? 'badge-positive'
                        : item.sentiment === 'negative'
                        ? 'badge-negative'
                        : 'badge-neutral'
                    }
                  >
                    {item.sentiment === 'positive' ? '▲ Positive' : item.sentiment === 'negative' ? '▼ Negative' : '● Neutral'}
                  </span>
                  <span style={{ fontSize: 11, color: '#475569' }}>{timeAgo(item.datetime)}</span>
                </div>
              </div>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#f1f5f9',
                  lineHeight: 1.5,
                  marginBottom: 8,
                }}
              >
                {item.headline}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: '#64748b',
                  lineHeight: 1.6,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 16,
        }}
      >
        {[
          { href: '/search', icon: Search, label: 'Search Stocks', desc: 'Find any NSE/BSE listed stock', color: '#3b82f6' },
          { href: '/analysis', icon: BarChart3, label: 'Stock Analysis', desc: 'Charts, trends & indicators', color: '#06b6d4' },
          { href: '/watchlist', icon: Star, label: 'My Watchlist', desc: 'Track your favorite stocks', color: '#f59e0b' },
          { href: '/news', icon: Activity, label: 'News & Sentiment', desc: 'AI-powered news analysis', color: '#8b5cf6' },
        ].map(({ href, icon: Icon, label, desc, color }) => (
          <Link
            key={href}
            href={href}
            style={{ textDecoration: 'none' }}
          >
            <div
              className="card"
              style={{
                padding: '20px',
                display: 'flex',
                gap: 14,
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `${color}1a`,
                  border: `1px solid ${color}33`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={22} color={color} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 12, color: '#475569' }}>{desc}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
