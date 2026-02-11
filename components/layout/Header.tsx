'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CubeLogo from '../ui/CubeLogo';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState('0'); // 실제 방문자 수 상태

  const closeMenu = () => setIsMenuOpen(false);

  // 구글 애널리틱스 데이터 가져오기
  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await fetch('/api/analytics');
        const data = await res.json();
        // 숫자가 0이면 좀 그러니까 최소 1명(형 본인)은 찍히게 하거나 그대로 노출
        const count = data.activeUsers || '0';
        setVisitorCount(Number(count).toLocaleString());
      } catch (err) {
        console.error('GA4 데이터 로드 실패:', err);
      }
    };

    fetchVisitors();
    // 1분(60,000ms)마다 숫자를 갱신 (너무 자주 하면 구글이 차단할 수 있음)
    const interval = setInterval(fetchVisitors, 60000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { name: 'Archive', href: '/archive', isExternal: false },
    { name: 'Study', href: '/exam', isExternal: false },
    { name: 'Lab', href: '/lab', isExternal: false },
    { name: 'Notion', href: 'https://www.notion.so', isExternal: true },
    { name: 'About', href: '/about', isExternal: false },
  ];

  return (
    <header className="fixed top-0 z-100 w-full border-b border-white/5 bg-white/10 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* 1. 좌측: 로고 */}
        <Link
          href="/"
          onClick={closeMenu}
          className="group flex items-center gap-2"
        >
          <CubeLogo />
          <span className="font-cookie pt-1 text-2xl tracking-tight text-slate-800 transition-opacity group-hover:opacity-70">
            Dechive
          </span>
        </Link>

        {/* 2. 중앙: 데스크탑 네비게이션 */}
        <nav className="hidden md:absolute md:left-1/2 md:flex md:-translate-x-1/2 md:items-center md:gap-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative py-1 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-slate-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* 3. 우측: 방문자 카운트 (실제 데이터) & 모바일 버튼 */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-4 text-[11px] font-bold tracking-[0.15em] text-slate-400 uppercase sm:flex">
            <div className="flex flex-col items-end">
              <span className="font-sans text-[9px] text-slate-300">
                Visitors
              </span>
              <div className="flex items-center gap-2">
                {/* 실시간 방문자 수 반영 */}
                <span className="font-sans text-slate-800">{visitorCount}</span>
                <div className="h-2 w-px bg-slate-200" />
                <div className="flex items-center gap-1.5">
                  {/* 깜빡이는 라이브 포인트 효과 (선택사항) */}
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  </span>
                  <span className="font-sans text-blue-500/80">Live</span>
                </div>
              </div>
            </div>
          </div>

          <button
            className="relative z-110 p-2 text-slate-600 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 4. 모바일 메뉴 드롭다운 */}
      <div
        className={`z-[105 fixed inset-x-0 top-0 w-full transform bg-white/80 backdrop-blur-xl transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0'
        }`}
      >
        <nav className="flex flex-col items-center justify-center space-y-7 pt-24 pb-16">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMenu}
              className="text-sm font-medium tracking-[0.2em] text-slate-500 uppercase transition-colors hover:text-slate-900"
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-4 h-px w-8 bg-slate-200" />
        </nav>
      </div>
    </header>
  );
}
