'use client'; // 👈 필수: 상태 관리(useState)를 위해 추가

import React, { useState } from 'react';
import Link from 'next/link';
import CubeLogo from '../ui/CubeLogo';
import { User, Menu, X } from 'lucide-react'; // Menu(햄버거), X(닫기) 아이콘 추가

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 메뉴 닫기 핸들러 (링크 클릭 시 닫힘)
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* 1. 좌측: 로고 */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <CubeLogo />
          <span className="font-cookie pt-1 text-2xl tracking-tight text-slate-800">
            정보집합체
          </span>
        </Link>

        {/* 2. 중앙: 데스크탑 네비게이션 (모바일 숨김) */}
        <nav className="hidden md:absolute md:left-1/2 md:flex md:-translate-x-1/2 md:items-center md:gap-8">
          <Link
            href="/archive"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-sky-600"
          >
            Archive
          </Link>
          <Link
            href="/exam"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-sky-600"
          >
            Exam
          </Link>
          <Link
            href="/as"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-sky-600"
          >
            AS
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-sky-600"
          >
            About
          </Link>
        </nav>

        {/* 3. 우측: 로그인 아이콘 & 모바일 메뉴 버튼 */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-sky-600"
            aria-label="Login"
          >
            <User className="h-6 w-6" strokeWidth={2} />
          </button>

          {/* 모바일 햄버거 버튼 (md 이상 숨김) */}
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

      {/* 4. 모바일 메뉴 드롭다운 (isMenuOpen일 때만 보임) */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md md:hidden">
          <nav className="flex flex-col space-y-4 p-4 text-center">
            <Link
              href="/archive"
              onClick={closeMenu}
              className="py-2 text-base font-medium text-slate-600 hover:text-sky-600"
            >
              Archive
            </Link>
            <Link
              href="/as"
              onClick={closeMenu}
              className="py-2 text-base font-medium text-slate-600 hover:text-sky-600"
            >
              AS
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className="py-2 text-base font-medium text-slate-600 hover:text-sky-600"
            >
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
