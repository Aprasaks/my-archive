'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`w-full px-6 transition-all duration-300 ${
        isHome
          ? 'border-none bg-transparent py-6' // 메인: 투명, 테두리 없음, 여백 축소
          : 'border-t border-white/5 bg-transparent py-12' // 서브: 상단 테두리, 기본 여백
      }`}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row md:items-end">
        {/* 좌측: 브랜딩 및 카피라이트 */}
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span
            className={`font-serif text-xl ${
              isHome ? 'text-white/80' : 'text-slate-800'
            }`}
          >
            Dechive
          </span>
          <p
            className={`text-[10px] tracking-widest uppercase ${
              isHome ? 'text-white/30' : 'text-slate-400'
            }`}
          >
            © {currentYear} Dechive Archive. All rights reserved.
          </p>
        </div>

        {/* 우측: 필수 링크 */}
        <div
          className={`flex gap-8 text-[11px] font-bold tracking-wider uppercase ${
            isHome ? 'text-white/40' : 'text-slate-400'
          }`}
        >
          <Link
            href="/privacy"
            className={`transition-colors ${
              isHome ? 'hover:text-white' : 'hover:text-blue-500'
            }`}
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className={`transition-colors ${
              isHome ? 'hover:text-white' : 'hover:text-blue-500'
            }`}
          >
            Terms
          </Link>
          <Link
            href="/about"
            className={`transition-colors ${
              isHome ? 'hover:text-white' : 'hover:text-blue-500'
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
