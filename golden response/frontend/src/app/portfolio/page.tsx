'use client';

import { useState, useEffect } from 'react';
import { getStockQuote, searchStocks } from '@/lib/stockService';
import { PortfolioItem } from '@/types/stock';
import { Briefcase, Plus, Trash2, TrendingUp, TrendingDown, Search, PieChart as PieChartIcon, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  { symbol: 'TCS', name: 'Tata Consultancy Services', quantity: 5, avgBuyPrice: 3700, totalInvested: 18500 },
  { symbol: 'RELIANCE', name: 'Reliance Industries', quantity: 6, avgBuyPrice: 2600, totalInvested: 15600 },
  { symbol: 'INFY', name: 'Infosys Limited', quantity: 10, avgBuyPrice: 1580, totalInvested: 15800 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Limited', quantity: 8, avgBuyPrice: 1500, totalInvested: 12000 },
];

const COLORS = ['#3b82f6', '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

function formatINR(value: number) {
  return value.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

function formatINRShort(value: number) {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${formatINR(value)}`;
}

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [enriched, setEnriched] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [addQuery, setAddQuery] = useState('');
  const [addResults, setAddResults] = useState<{ symbol: string; name: string; sector: string }[]>([]);
  const [newItem, setNewItem] = useState({ symbol: '', name: '', quantity: '', avgBuyPrice: '' });

  useEffect(() => {
    const saved = localStorage.getItem('portfolio');
    setPortfolio(saved ? JSON.parse(saved) : DEFAULT_PORTFOLIO);
  }, []);

  useEffect(() => {
    if (portfolio.length === 0) { setLoading(false); return; }
    const e = portfolio.map((item) => {
      const q = getStockQuote(item.symbol);
      const currentPrice = q?.price || item.avgBuyPrice;
      const currentValue = currentPrice * item.quantity;
      const pl = currentValue - item.totalInvested;
      const plPercent = (pl / item.totalInvested) * 100;
      return { ...item, currentPrice, currentValue, pl, plPercent };
    });
    setEnriched(e);
    setLoading(false);
  }, [portfolio]);

  useEffect(() => {
    if (addQuery.trim()) setAddResults(searchStocks(addQuery).slice(0, 6));
    else setAddResults([]);
  }, [addQuery]);

  const savePortfolio = (list: PortfolioItem[]) => {
    localStorage.setItem('portfolio', JSON.stringify(list));
    setPortfolio(list);
  };

  const removeItem = (symbol: string) => savePortfolio(portfolio.filter((p) => p.symbol !== symbol));

  const addItem = () => {
    if (!newItem.symbol || !newItem.quantity || !newItem.avgBuyPrice) return;
    const qty = parseFloat(newItem.quantity);
    const price = parseFloat(newItem.avgBuyPrice);
    const item: PortfolioItem = {
      symbol: newItem.symbol,
      name: newItem.name,
      quantity: qty,
      avgBuyPrice: price,
      totalInvested: qty * price,
    };
    savePortfolio([...portfolio, item]);
    setNewItem({ symbol: '', name: '', quantity: '', avgBuyPrice: '' });
    setShowAdd(false);
    setAddQuery('');
  };

  // Aggregate stats
  const totalInvested = enriched.reduce((a, b) => a + b.totalInvested, 0);
  const totalCurrentValue = enriched.reduce((a, b) => a + (b.currentValue || 0), 0);
  const totalPL = totalCurrentValue - totalInvested;
  const totalPLPct = totalInvested ? (totalPL / totalInvested) * 100 : 0;

  // Pie data
  const pieData = enriched.map((item) => ({
    name: item.symbol,
    value: item.currentValue || item.totalInvested,
  }));

  // Risk assessment (simple)
  const sectors = new Set(enriched.map((e) => e.symbol.slice(0, 2)));
  const diversification = Math.min(10, Math.round((sectors.size / 5) * 10));
  const risk = diversification >= 8 ? 'Low' : diversification >= 5 ? 'Medium' : 'High';
  const riskColor = risk === 'Low' ? '#10b981' : risk === 'Medium' ? '#f59e0b' : '#ef4444';

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Briefcase size={20} color="#10b981" />
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#f1f5f9' }}>Portfolio Analyzer</h1>
          </div>
          <p style={{ fontSize: 13, color: '#475569' }}>Track investments, P&L and portfolio health metrics</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => setShowAdd(!showAdd)}
        >
          <Plus size={16} />
          Add Investment
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Total Invested', value: formatINRShort(totalInvested), sub: 'Capital deployed', color: '#3b82f6' },
          { label: 'Current Value', value: formatINRShort(totalCurrentValue), sub: 'Live market value', color: '#06b6d4' },
          { label: 'Total P&L', value: `${totalPL >= 0 ? '+' : ''}${formatINRShort(totalPL)}`, sub: `${totalPLPct >= 0 ? '+' : ''}${totalPLPct.toFixed(2)}%`, color: totalPL >= 0 ? '#10b981' : '#ef4444' },
          { label: 'Holdings', value: portfolio.length.toString(), sub: 'Unique stocks', color: '#8b5cf6' },
        ].map(({ label, value, sub, color }) => (
          <div
            key={label}
            className="card"
            style={{ padding: '18px', position: 'relative', overflow: 'hidden' }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 3,
                height: '100%',
                background: color,
                borderRadius: '2px 0 0 2px',
              }}
            />
            <div style={{ fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>{label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color, fontFamily: 'JetBrains Mono, monospace', marginBottom: 4 }}>{value}</div>
            <div style={{ fontSize: 12, color: '#64748b' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Add investment form */}
      {showAdd && (
        <div
          className="card"
          style={{ padding: '20px', marginBottom: 24, border: '1px solid rgba(59,130,246,0.3)', animation: 'fadeIn 0.3s ease-out' }}
        >
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9', marginBottom: 16 }}>Add Investment</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 16 }}>
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 11, color: '#475569', marginBottom: 6 }}>Stock Symbol</div>
              <div style={{ position: 'relative' }}>
                <input
                  className="input-field"
                  style={{ paddingLeft: 36 }}
                  placeholder="Search symbol..."
                  value={addQuery || newItem.symbol}
                  onChange={(e) => {
                    setAddQuery(e.target.value);
                    setNewItem({ ...newItem, symbol: e.target.value.toUpperCase(), name: '' });
                  }}
                />
                <Search size={14} color="#475569" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
              </div>
              {addResults.length > 0 && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: 8, zIndex: 20, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
                  {addResults.map((r) => (
                    <div
                      key={r.symbol}
                      onClick={() => { setNewItem({ ...newItem, symbol: r.symbol, name: r.name }); setAddQuery(''); setAddResults([]); }}
                      style={{ padding: '10px 14px', cursor: 'pointer', borderBottom: '1px solid rgba(30,45,74,0.4)', transition: 'background 0.15s' }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.05)')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
                    >
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>{r.symbol}</div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>{r.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#475569', marginBottom: 6 }}>Quantity (shares)</div>
              <input
                className="input-field"
                type="number"
                placeholder="e.g. 10"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              />
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#475569', marginBottom: 6 }}>Avg Buy Price (₹)</div>
              <input
                className="input-field"
                type="number"
                placeholder="e.g. 3500"
                value={newItem.avgBuyPrice}
                onChange={(e) => setNewItem({ ...newItem, avgBuyPrice: e.target.value })}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn-primary" onClick={addItem}>
              <Plus size={15} /> Add to Portfolio
            </button>
            <button className="btn-secondary" onClick={() => { setShowAdd(false); setAddQuery(''); }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
        {/* Holdings table */}
        <div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid rgba(59,130,246,0.2)', borderTopColor: '#3b82f6', animation: 'spin 1s linear infinite' }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {enriched.map((item) => {
                const quote = getStockQuote(item.symbol);
                return (
                  <div
                    key={item.symbol}
                    className="card"
                    style={{ padding: '16px 20px' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                      {/* Left: stock info */}
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 10,
                            background: 'rgba(59,130,246,0.1)',
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
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 800, color: '#f1f5f9' }}>{item.symbol}</div>
                          <div style={{ fontSize: 12, color: '#475569' }}>{item.quantity} shares @ ₹{formatINR(item.avgBuyPrice)}</div>
                        </div>
                      </div>

                      {/* Right: values */}
                      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ fontSize: 11, color: '#475569', marginBottom: 3 }}>Current Price</div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9', fontFamily: 'JetBrains Mono, monospace' }}>
                            ₹{formatINR(item.currentPrice || 0)}
                          </div>
                          <div style={{ fontSize: 11, color: (quote?.changePercent || 0) >= 0 ? '#10b981' : '#ef4444', display: 'flex', gap: 3, alignItems: 'center' }}>
                            {(quote?.changePercent || 0) >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                            {(quote?.changePercent || 0) >= 0 ? '+' : ''}{(quote?.changePercent || 0).toFixed(2)}%
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: '#475569', marginBottom: 3 }}>Invested</div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>
                            {formatINRShort(item.totalInvested)}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: '#475569', marginBottom: 3 }}>Current Value</div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9', fontFamily: 'JetBrains Mono, monospace' }}>
                            {formatINRShort(item.currentValue || 0)}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: '#475569', marginBottom: 3 }}>P&L</div>
                          <div
                            style={{
                              fontSize: 15,
                              fontWeight: 800,
                              color: (item.pl || 0) >= 0 ? '#10b981' : '#ef4444',
                              fontFamily: 'JetBrains Mono, monospace',
                            }}
                          >
                            {(item.pl || 0) >= 0 ? '+' : ''}{formatINRShort(item.pl || 0)}
                          </div>
                          <div style={{ fontSize: 11, color: (item.plPercent || 0) >= 0 ? '#10b981' : '#ef4444' }}>
                            {(item.plPercent || 0) >= 0 ? '+' : ''}{(item.plPercent || 0).toFixed(2)}%
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.symbol)}
                          style={{
                            background: 'rgba(239,68,68,0.1)',
                            border: '1px solid rgba(239,68,68,0.2)',
                            color: '#ef4444',
                            borderRadius: 8,
                            padding: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* P&L progress bar */}
                    <div style={{ marginTop: 14 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                        <span style={{ fontSize: 11, color: '#475569' }}>Return</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: (item.plPercent || 0) >= 0 ? '#10b981' : '#ef4444' }}>
                          {(item.plPercent || 0) >= 0 ? '+' : ''}{(item.plPercent || 0).toFixed(2)}%
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${Math.min(100, Math.abs(item.plPercent || 0) * 3)}%`,
                            background: (item.plPercent || 0) >= 0 ? '#10b981' : '#ef4444',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar: allocation + risk */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Allocation pie */}
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <PieChartIcon size={16} color="#3b82f6" /> Allocation
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie dataKey="value" data={pieData} cx="50%" cy="50%" outerRadius={70} paddingAngle={3}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip
                  formatter={(v: number) => [formatINRShort(v), '']}
                  contentStyle={{ background: 'rgba(15,22,41,0.95)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {pieData.map(({ name, value }, i) => (
                <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS[i % COLORS.length], flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>{name}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#f1f5f9' }}>{formatINRShort(value)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertTriangle size={16} color="#f59e0b" /> Risk Assessment
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>Portfolio Risk</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: riskColor }}>{risk}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: risk === 'Low' ? '30%' : risk === 'Medium' ? '60%' : '90%', background: riskColor }} />
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>Diversification</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#f1f5f9' }}>{diversification}/10</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${diversification * 10}%`, background: 'linear-gradient(90deg, #3b82f6, #06b6d4)' }} />
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.6, padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid rgba(30,45,74,0.5)' }}>
                {risk === 'Low'
                  ? '✓ Well-diversified. Your portfolio is spread across multiple sectors.'
                  : risk === 'Medium'
                  ? '⚠ Moderate risk. Consider adding more sectors for better diversification.'
                  : '⚠ Concentrated portfolio. High correlation risk — diversify across more sectors.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
