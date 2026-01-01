import React from 'react';
import Link from 'next/link';
import CubeLogo from '../ui/CubeLogo';
import { User } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* 1. 로고 영역 (큐브 + 타이틀) */}
        <Link href="/" className="group flex items-center gap-1">
          <div className="transition-transform duration-500 group-hover:scale-110">
            <CubeLogo />
          </div>
          <span className="font-cookie pt-1 text-2xl font-bold tracking-tight text-slate-800">
            정보집합체
          </span>
        </Link>

        {/* 2. 네비게이션 */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          <Link
            href="/archive"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-sky-600"
          >
            Archive
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

        {/* 3. 우측: 로그인 아이콘 */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-sky-600"
            aria-label="Login"
          >
            {/* 아이콘 크기 24px (w-6 h-6) */}
            <User className="h-6 w-6" strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
}
