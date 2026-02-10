'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CubeLogo from '../ui/CubeLogo';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

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

        {/* 3. 우측: 방문자 카운트 & 모바일 버튼 */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-4 text-[11px] font-bold tracking-[0.15em] text-slate-400 uppercase sm:flex">
            <div className="flex flex-col items-end">
              <span className="font-sans text-[9px] text-slate-300">
                Visitors
              </span>
              <div className="flex items-center gap-2">
                <span className="font-sans text-slate-800">1,284</span>
                <div className="h-2 w-px bg-slate-200" />
                <span className="font-sans text-blue-500/80">Live</span>
              </div>
            </div>
          </div>

          {/* 모바일 햄버거 버튼 - z-index 추가해서 클릭 우선순위 확보 */}
          <button
            className="relative z-110 p-2 text-slate-600 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 4. 모바일 메뉴 드롭다운 - 조건부 렌더링 대신 클래스로 제어하면 애니메이션 넣기 좋음 */}
      <div
        className={`fixed inset-x-0 top-0 z-105 w-full transform bg-white/80 backdrop-blur-xl transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0'
        }`}
      >
        {/* - pt-24 pb-12: 위아래 여백 조절
            - space-y-6: 메뉴 간격 살짝 좁힘 
        */}
        <nav className="flex flex-col items-center justify-center space-y-7 pt-24 pb-16">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMenu}
              // text-sm font-medium tracking-[0.2em]: 데스크탑 느낌 이식
              // uppercase: 영문 대문자로 더 깔끔하게
              className="text-sm font-medium tracking-[0.2em] text-slate-500 uppercase transition-colors hover:text-slate-900"
            >
              {item.name}
            </Link>
          ))}

          {/* 하단에 살짝 얇은 선 하나 넣어주면 더 예쁨 (선택사항) */}
          <div className="mt-4 h-px w-8 bg-slate-200" />
        </nav>
      </div>
    </header>
  );
}
