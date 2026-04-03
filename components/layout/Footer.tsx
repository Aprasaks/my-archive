'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-none bg-transparent px-6 py-6 transition-all duration-300">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row md:items-end">
        {/* 좌측: 브랜딩 및 카피라이트 */}
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="font-serif text-xl text-white/80">Dechive</span>
          <p className="text-[10px] tracking-widest text-white/30 uppercase">
            © {currentYear} Dechive Archive. All rights reserved.
          </p>
        </div>

        {/* 우측: 필수 링크 */}
        <div className="flex gap-8 text-[11px] font-bold tracking-wider text-white/40 uppercase">
          <Link href="/privacy" className="transition-colors hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-white">
            Terms
          </Link>
          <Link href="/contact" className="transition-colors hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
