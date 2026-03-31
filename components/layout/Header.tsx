'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === '/';

  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { name: 'Archive', href: '/archive' },
    { name: 'Lab', href: '/lab' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header
      className={`fixed top-0 z-100 w-full transition-all duration-700 ${
        isHome
          ? 'bg-linear-to-b from-black/95 via-black/60 to-transparent'
          : 'border-b border-white/10 bg-black/60 backdrop-blur-md'
      }`}
    >
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          onClick={closeMenu}
          className="group flex w-24 items-center justify-start py-2"
        >
          <div className="transition-transform duration-500 ease-out group-hover:scale-110">
            <Image
              src="/images/logo-icon2.png"
              alt="Dechive Logo"
              width={48}
              height={48}
              priority
              className="object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]"
            />
          </div>
        </Link>

        <nav className="hidden md:absolute md:left-1/2 md:flex md:-translate-x-1/2 md:items-center md:gap-16">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative py-2 text-sm font-medium tracking-[0.25em] text-white/80 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,1)] transition-all duration-300 hover:text-white"
            >
              {item.name}
              <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-white/80 transition-all duration-500 ease-out group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="flex w-24 items-center justify-end">
          <button
            className="relative z-110 p-2 text-slate-300 drop-shadow-md hover:text-white md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-x-0 top-0 h-screen w-full transform bg-black/95 backdrop-blur-2xl transition-all duration-500 ease-in-out md:hidden ${
          isMenuOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0'
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center space-y-12">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMenu}
              className="text-lg font-light tracking-[0.3em] text-slate-400 uppercase transition-colors hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
