'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CubeLogo from '../ui/CubeLogo'; // 기존 큐브 로고 유지
import { User, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  // 메뉴 아이템 정의 (나중에 수정하기 편하게 배열로 관리)
  const navItems = [
    { name: 'Archive', href: '/archive', isExternal: false },
    { name: 'Study', href: '/exam', isExternal: false }, // Exam -> Study로 표기
    { name: 'Notion', href: 'https://www.notion.so', isExternal: true }, // 형 노션 주소 나중에 넣기
    { name: 'About', href: '/about', isExternal: false },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* 1. 좌측: 로고 (쿠키 폰트 + 큐브 로고 복구) */}
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
              target={item.isExternal ? '_blank' : undefined} // 노션은 새 창으로
              rel={item.isExternal ? 'noopener noreferrer' : undefined}
              className="group relative py-1 text-sm font-medium text-slate-600 transition-colors"
            >
              {item.name}
              {/* 호버 시 나타나는 밑줄 애니메이션 (회색) */}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-slate-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* 3. 우측: 로그인 & 모바일 버튼 */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100"
            aria-label="Login"
          >
            <User className="h-5 w-5" strokeWidth={2} />
          </button>

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
