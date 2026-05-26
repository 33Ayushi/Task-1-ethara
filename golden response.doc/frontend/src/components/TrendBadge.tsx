'use client';

import { TrendAnalysis } from '@/types/stock';
import { TrendingUp, TrendingDown, Minus, CheckCircle, AlertCircle } from 'lucide-react';

interface TrendBadgeProps {
  analysis: TrendAnalysis;
  compact?: boolean;
}

export default function TrendBadge({ analysis, compact = false }: TrendBadgeProps) {
  const colors = {
    Bullish: { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', text: '#10b981' },
    Bearish: { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', text: '#ef4444' },
    Neutral: { bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.3)', text: '#94a3b8' },
  };
  const c = colors[analysis.trend];
  const Icon =
    analysis.trend === 'Bullish' ? TrendingUp : analysis.trend === 'Bearish' ? TrendingDown : Minus;

  if (compact) {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          padding: '4px 10px',
          borderRadius: 20,
          background: c.bg,
          border: `1px solid ${c.border}`,
          color: c.text,
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        <Icon size={13} />
        {analysis.trend}
      </span>
    );
  }

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: c.bg,
              border: `1px solid ${c.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={22} color={c.text} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#475569', marginBottom: 2 }}>AI Trend Signal</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: c.text }}>{analysis.trend}</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: '#475569', marginBottom: 4 }}>Confidence</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9' }}>{analysis.confidence}%</div>
        </div>
      </div>

      {/* Confidence bar */}
      <div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${analysis.confidence}%`,
              background: `linear-gradient(90deg, ${c.text}, ${c.text}aa)`,
            }}
          />
        </div>
      </div>

      {/* Signals */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 12, color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Signals Detected
        </div>
        {analysis.signals.map((signal, i) => {
          const isBull = signal.toLowerCase().includes('above') || signal.toLowerCase().includes('golden') || signal.toLowerCase().includes('high');
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              {isBull ? (
                <CheckCircle size={14} color="#10b981" style={{ marginTop: 1, flexShrink: 0 }} />
              ) : (
                <AlertCircle size={14} color="#f59e0b" style={{ marginTop: 1, flexShrink: 0 }} />
              )}
              <span style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.4 }}>{signal}</span>
            </div>
          );
        })}
      </div>

      {/* Technical indicators */}
      {analysis.rsi !== undefined && (
        <div
          style={{
            display: 'flex',
            gap: 12,
            padding: '12px',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: 8,
            border: '1px solid rgba(30,45,74,0.5)',
          }}
        >
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: '#475569', marginBottom: 4 }}>RSI</div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: analysis.rsi! < 30 ? '#10b981' : analysis.rsi! > 70 ? '#ef4444' : '#f1f5f9',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {analysis.rsi}
            </div>
          </div>
          <div style={{ width: 1, background: 'rgba(30,45,74,0.8)' }} />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: '#475569', marginBottom: 4 }}>MA50</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', fontFamily: 'JetBrains Mono, monospace' }}>
              ₹{analysis.movingAverage50?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </div>
          </div>
          <div style={{ width: 1, background: 'rgba(30,45,74,0.8)' }} />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: '#475569', marginBottom: 4 }}>MA200</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', fontFamily: 'JetBrains Mono, monospace' }}>
              ₹{analysis.movingAverage200?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
