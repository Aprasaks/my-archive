'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 bg-transparent px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row md:items-start">
        {/* 좌측: 브랜딩 */}
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="font-cookie text-xl text-slate-800">Dechive</span>
          <p className="text-[10px] tracking-widest text-slate-400 uppercase">
            © {currentYear} Dechive Archive. All rights reserved.
          </p>
        </div>

        {/* 우측: 필수 링크 (여기가 포인트!) */}
        <div className="flex gap-8 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
          <Link
            href="/privacy"
            className="transition-colors hover:text-blue-500"
          >
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-blue-500">
            Terms
          </Link>
          <Link href="/about" className="transition-colors hover:text-blue-500">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
