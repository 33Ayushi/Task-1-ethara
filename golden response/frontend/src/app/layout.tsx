import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import TickerTape from '@/components/TickerTape';

export const metadata: Metadata = {
  title: 'StockPulse India — Real-Time Stock Market Analytics',
  description:
    'Track Indian stock market in real-time. Search NSE/BSE stocks, view charts, analyze trends and get AI-powered insights on NIFTY, SENSEX and top Indian companies.',
  keywords: 'stock market india, nse, bse, nifty, sensex, stock charts, stock analysis',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        {/* Spacer for fixed navbar */}
        <div style={{ height: 64 }} />
        <TickerTape />
        <main style={{ minHeight: 'calc(100vh - 64px)' }}>{children}</main>
      </body>
    </html>
  );
}
