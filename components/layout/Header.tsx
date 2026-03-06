'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CubeLogo from '../ui/CubeLogo';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState('0');

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await fetch('/api/analytics');
        const data = await res.json();
        const count = data.activeUsers || '0';
        setVisitorCount(Number(count).toLocaleString());
      } catch (err) {
        console.error('GA4 데이터 로드 실패:', err);
      }
    };

    fetchVisitors();
    const interval = setInterval(fetchVisitors, 60000);
    return () => clearInterval(interval);
  }, []);

  // [수정] 형 요청대로 Study, Notion 지우고 3개만 남겼어!
  const navItems = [
    { name: 'Archive', href: '/archive', isExternal: false },
    { name: 'Lab', href: '/lab', isExternal: false },
    { name: 'About', href: '/about', isExternal: false },
  ];

  return (
    <header className="fixed top-0 z-100 w-full bg-linear-to-b from-black/40 to-transparent transition-all duration-300">
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* 좌측 로고 */}
        <Link
          href="/"
          onClick={closeMenu}
          className="group flex items-center gap-2"
        >
          <CubeLogo />
          <span className="font-cookie pt-1 text-2xl tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] transition-opacity group-hover:opacity-70">
            Dechive
          </span>
        </Link>

        {/* 중앙 네비게이션 (3개 아이템) */}
        <nav className="hidden md:absolute md:left-1/2 md:flex md:-translate-x-1/2 md:items-center md:gap-12">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative py-1 text-sm font-medium text-slate-300 drop-shadow-md transition-all hover:scale-105 hover:text-white"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-blue-500 shadow-[0_0_8px_#3b82f6] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* 우측 Visitors 정보 */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-4 text-[11px] font-bold tracking-[0.15em] text-slate-400 uppercase sm:flex">
            <div className="flex flex-col items-end">
              <span className="font-sans text-[9px] text-slate-500">
                Visitors
              </span>
              <div className="flex items-center gap-2">
                <span className="font-sans text-slate-200 drop-shadow-sm">
                  {visitorCount}
                </span>
                <div className="h-2 w-px bg-white/10" />
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75"></span>
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                  </span>
                  <span className="font-sans text-blue-400/90">Live</span>
                </div>
              </div>
            </div>
          </div>

          <button
            className="relative z-110 p-2 text-slate-300 hover:text-white md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      <div
        className={`bg-bg-main/95 fixed inset-x-0 top-0 h-screen w-full transform backdrop-blur-2xl transition-all duration-500 ease-in-out md:hidden ${
          isMenuOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0'
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center space-y-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMenu}
              className="text-xl font-medium tracking-[0.2em] text-slate-400 uppercase transition-colors hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
