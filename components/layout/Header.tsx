'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CubeLogo from '../ui/CubeLogo'; // 기존 큐브 로고 유지
import { Menu, X, TrendingUp } from 'lucide-react'; // User 제거, TrendingUp 추가

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  // 메뉴 아이템 정의
  const navItems = [
    { name: 'Archive', href: '/archive', isExternal: false },
    { name: 'Study', href: '/exam', isExternal: false },
    // 👇 형, 여기에 LAB 메뉴 추가했어!
    { name: 'Lab', href: '/lab', isExternal: false },
    { name: 'Notion', href: 'https://www.notion.so', isExternal: true },
    { name: 'About', href: '/about', isExternal: false },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* 1. 좌측: 로고 (쿠키 폰트 + 큐브 로고) */}
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
              target={item.isExternal ? '_blank' : undefined}
              rel={item.isExternal ? 'noopener noreferrer' : undefined}
              className="group relative py-1 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {item.name}
              {/* 호버 시 나타나는 밑줄 애니메이션 */}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-slate-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* 3. 우측: 방문자 배지 & 모바일 버튼 */}
        <div className="flex items-center gap-4">
          {/* 방문자 배지 */}
          <div className="hidden items-center gap-3 rounded-full border border-slate-100 bg-slate-50 px-3 py-1.5 shadow-sm sm:flex">
            <div className="flex flex-col items-end leading-none">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Today
              </span>
              <span className="text-sm font-black text-slate-900">1,284</span>
            </div>
            <TrendingUp className="text-green-500" size={16} />
          </div>

          {/* 모바일 메뉴 토글 버튼 */}
          <button
            className="p-2 text-slate-600 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* 4. 모바일 메뉴 드롭다운 */}
      {isMenuOpen && (
        <div className="animate-fade-in-down absolute top-16 left-0 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md md:hidden">
          <nav className="flex flex-col space-y-2 p-6 text-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMenu}
                target={item.isExternal ? '_blank' : undefined}
                className="rounded-lg py-3 text-lg font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
