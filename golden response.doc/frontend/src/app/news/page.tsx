'use client';

import { useEffect, useState } from 'react';
import { getSentimentAnalysis } from '@/lib/stockService';
import { fetchNews } from '@/lib/alphaVantage';
import { NewsItem, SentimentData } from '@/types/stock';
import { Newspaper, TrendingUp, TrendingDown, Minus, ExternalLink, Clock, Filter, Wifi, Loader } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

function timeAgo(timestamp: number) {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

const sentimentColors = {
  positive: '#10b981',
  negative: '#ef4444',
  neutral: '#94a3b8',
};

const SentimentIcon = ({ sentiment }: { sentiment: string }) => {
  if (sentiment === 'positive') return <TrendingUp size={14} color="#10b981" />;
  if (sentiment === 'negative') return <TrendingDown size={14} color="#ef4444" />;
  return <Minus size={14} color="#94a3b8" />;
};

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [liveData, setLiveData] = useState(false);
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');

  useEffect(() => {
    fetchNews().then((data) => {
      setNews(data);
      setLiveData(true);
      setLoadingNews(false);
    });
  }, []);

  const sentiment = getSentimentAnalysis(news.length ? news : []);
  const filtered = filter === 'all' ? news : news.filter((n) => n.sentiment === filter);

  const pieData = [
    { name: 'Positive', value: sentiment.positive },
    { name: 'Negative', value: sentiment.negative },
    { name: 'Neutral', value: sentiment.neutral },
  ];

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'rgba(139,92,246,0.1)',
              border: '1px solid rgba(139,92,246,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Newspaper size={20} color="#8b5cf6" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: '#f1f5f9' }}>Market News &amp; Insights</h1>
              {liveData && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20, letterSpacing: '0.5px' }}>
                  <Wifi size={11} /> LIVE
                </span>
              )}
            </div>
            <p style={{ fontSize: 13, color: '#475569' }}>Alpha Vantage AI-powered sentiment analysis</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
        {/* News Feed */}
        <div>
          {/* Filters */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: 4 }}>
              <Filter size={14} color="#475569" />
              <span style={{ fontSize: 12, color: '#475569' }}>Filter:</span>
            </div>
            {(['all', 'positive', 'negative', 'neutral'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  border: `1px solid ${
                    filter === f
                      ? f === 'positive' ? '#10b981' : f === 'negative' ? '#ef4444' : f === 'neutral' ? '#94a3b8' : '#3b82f6'
                      : 'rgba(30,45,74,0.8)'
                  }`,
                  background: filter === f
                    ? f === 'positive' ? 'rgba(16,185,129,0.1)' : f === 'negative' ? 'rgba(239,68,68,0.1)' : f === 'neutral' ? 'rgba(148,163,184,0.1)' : 'rgba(59,130,246,0.1)'
                    : 'transparent',
                  color: filter === f
                    ? f === 'positive' ? '#10b981' : f === 'negative' ? '#ef4444' : f === 'neutral' ? '#94a3b8' : '#3b82f6'
                    : '#64748b',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textTransform: 'capitalize',
                }}
              >
                {f === 'all' ? 'All News' : f}
              </button>
            ))}
          </div>

          {/* News list */}
          {loadingNews ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 60, gap: 12, color: '#475569' }}>
              <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: 14 }}>Fetching live news from Alpha Vantage...</span>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filtered.map((item) => (
              <div
                key={item.id}
                className="card"
                style={{ padding: '20px', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <SentimentIcon sentiment={item.sentiment || 'neutral'} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {item.source}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
                    {item.sentimentScore !== undefined && (
                      <span style={{ fontSize: 11, color: '#475569' }}>
                        {Math.round(Math.abs(item.sentimentScore) * 100)}% confidence
                      </span>
                    )}
                  </div>
                </div>

                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9', lineHeight: 1.5, marginBottom: 10 }}>
                  {item.headline}
                </h3>

                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7, marginBottom: 14 }}>
                  {item.summary}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569', fontSize: 12 }}>
                    <Clock size={13} />
                    {timeAgo(item.datetime)}
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      fontSize: 12,
                      color: '#3b82f6',
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Read full article <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>

        {/* Sentiment Analysis Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Overall sentiment */}
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', marginBottom: 16 }}>Market Sentiment</h3>

            <div style={{ marginBottom: 20 }}>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    <Cell fill="#10b981" />
                    <Cell fill="#ef4444" />
                    <Cell fill="#475569" />
                  </Pie>
                  <Tooltip
                    formatter={(value: unknown) => [`${value}%`, '']}
                    contentStyle={{ background: 'rgba(15,22,41,0.95)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Overall badge */}
            <div
              style={{
                textAlign: 'center',
                padding: '12px',
                borderRadius: 10,
                background: sentiment.overall === 'Positive' ? 'rgba(16,185,129,0.1)' : sentiment.overall === 'Negative' ? 'rgba(239,68,68,0.1)' : 'rgba(148,163,184,0.1)',
                border: `1px solid ${sentiment.overall === 'Positive' ? 'rgba(16,185,129,0.3)' : sentiment.overall === 'Negative' ? 'rgba(239,68,68,0.3)' : 'rgba(148,163,184,0.3)'}`,
                marginBottom: 16,
              }}
            >
              <div style={{ fontSize: 11, color: '#475569', marginBottom: 4 }}>Overall Market Sentiment</div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: sentiment.overall === 'Positive' ? '#10b981' : sentiment.overall === 'Negative' ? '#ef4444' : '#94a3b8',
                }}
              >
                {sentiment.overall}
              </div>
            </div>

            {/* Breakdown bars */}
            {([
              { label: 'Positive', value: sentiment.positive, color: '#10b981' },
              { label: 'Negative', value: sentiment.negative, color: '#ef4444' },
              { label: 'Neutral', value: sentiment.neutral, color: '#475569' },
            ] as const).map(({ label, value, color }) => (
              <div key={label} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>{label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color }}>{value}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${value}%`, background: color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Sentiment Legend */}
          <div className="card" style={{ padding: '16px 20px' }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9', marginBottom: 14 }}>Sentiment Guide</h3>
            {[
              { label: 'Positive', desc: 'Bullish news, strong earnings, upgrades', color: '#10b981', icon: '▲' },
              { label: 'Negative', desc: 'Bearish news, downgrades, losses', color: '#ef4444', icon: '▼' },
              { label: 'Neutral', desc: 'Balanced reporting, updates', color: '#94a3b8', icon: '●' },
            ].map(({ label, desc, color, icon }) => (
              <div key={label} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                <div style={{ fontSize: 14, color, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color }}>{label}</div>
                  <div style={{ fontSize: 11, color: '#475569', lineHeight: 1.4 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="card" style={{ padding: '16px 20px' }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9', marginBottom: 12 }}>Today&apos;s Stats</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Total articles', value: news.length.toString() },
                { label: 'Positive news', value: `${news.filter((n) => n.sentiment === 'positive').length}` },
                { label: 'Negative news', value: `${news.filter((n) => n.sentiment === 'negative').length}` },
                { label: 'Sources covered', value: '6' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#64748b' }}>{label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', fontFamily: 'JetBrains Mono, monospace' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
