'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Search,
  BarChart3,
  Star,
  Newspaper,
  Menu,
  X,
  TrendingUp,
  Bell,
  Briefcase,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/analysis', label: 'Analysis', icon: BarChart3 },
  { href: '/watchlist', label: 'Watchlist', icon: Star },
  { href: '/news', label: 'News', icon: Newspaper },
  { href: '/portfolio', label: 'Portfolio', icon: Briefcase },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled
          ? 'rgba(10, 14, 26, 0.95)'
          : 'rgba(10, 14, 26, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(30, 45, 74, 0.8)',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: 64, gap: 32 }}>
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
              }}
            >
              <TrendingUp size={20} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.5px',
                }}
              >
                StockPulse
              </div>
              <div style={{ fontSize: 10, color: '#475569', letterSpacing: '0.5px', marginTop: -2 }}>
                INDIA
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              flex: 1,
            }}
            className="desktop-nav"
          >
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    padding: '7px 14px',
                    borderRadius: 8,
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: active ? 600 : 500,
                    color: active ? '#3b82f6' : '#94a3b8',
                    background: active ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    border: active ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = '#f1f5f9';
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = '#94a3b8';
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                    }
                  }}
                >
                  <Icon size={15} />
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(30, 45, 74, 0.8)',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#f1f5f9';
                (e.currentTarget as HTMLElement).style.borderColor = '#3b82f6';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#94a3b8';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(30, 45, 74, 0.8)';
              }}
            >
              <Bell size={16} />
            </button>

            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 700,
                color: 'white',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              U
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'none',
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(30, 45, 74, 0.8)',
                color: '#94a3b8',
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="mobile-menu-btn"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            borderTop: '1px solid rgba(30, 45, 74, 0.8)',
            padding: '12px 24px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 14px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: active ? 600 : 500,
                  color: active ? '#3b82f6' : '#94a3b8',
                  background: active ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                }}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
