'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { HistoricalDataPoint } from '@/types/stock';
import { format, parseISO } from 'date-fns';

interface StockChartProps {
  data: HistoricalDataPoint[];
  symbol: string;
  period: string;
  height?: number;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: HistoricalDataPoint }>;
  label?: string;
}) => {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;

  return (
    <div
      style={{
        background: 'rgba(15, 22, 41, 0.95)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: 10,
        padding: '12px 16px',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>
        {label ? format(parseISO(label), 'dd MMM yyyy') : ''}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
        {[
          ['Open', d.open],
          ['High', d.high],
          ['Low', d.low],
          ['Close', d.close],
        ].map(([key, val]) => (
          <div key={key as string} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#475569' }}>{key}:</span>
            <span style={{ fontSize: 12, color: '#f1f5f9', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>
              ₹{(val as number).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(30,45,74,0.8)' }}>
        <span style={{ fontSize: 11, color: '#475569' }}>Volume: </span>
        <span style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>
          {(d.volume / 1000000).toFixed(2)}M
        </span>
      </div>
    </div>
  );
};

export default function StockChart({ data, symbol, period, height = 320 }: StockChartProps) {
  if (!data.length) return null;

  const firstClose = data[0].close;
  const lastClose = data[data.length - 1].close;
  const isPositive = lastClose >= firstClose;
  const color = isPositive ? '#10b981' : '#ef4444';
  const gradientId = `gradient-${symbol}`;

  const formatXAxis = (dateStr: string) => {
    try {
      const date = parseISO(dateStr);
      if (period === '1W') return format(date, 'EEE');
      if (period === '1M') return format(date, 'dd MMM');
      return format(date, 'MMM yy');
    } catch {
      return dateStr;
    }
  };

  const minVal = Math.min(...data.map((d) => d.low)) * 0.995;
  const maxVal = Math.max(...data.map((d) => d.high)) * 1.005;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,45,74,0.5)" vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={formatXAxis}
          tick={{ fill: '#475569', fontSize: 11, fontFamily: 'Inter, sans-serif' }}
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          domain={[minVal, maxVal]}
          tickFormatter={(v) => `₹${(v / 1000).toFixed(1)}k`}
          tick={{ fill: '#475569', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
          axisLine={false}
          tickLine={false}
          width={60}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={firstClose} stroke="rgba(148,163,184,0.3)" strokeDasharray="4 4" />
        <Area
          type="monotone"
          dataKey="close"
          stroke={color}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          dot={false}
          activeDot={{ r: 4, fill: color, stroke: 'white', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
