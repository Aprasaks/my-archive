'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '@/components/layout/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const gaId = process.env.NEXT_PUBLIC_GA_ID || '';

  return (
    <html lang="ko">
      <body className="relative flex min-h-screen flex-col overflow-x-hidden bg-black font-sans text-slate-900 antialiased">
        {/* 1. 🌟 전역 고정 배경 레이어 (가장 밑바닥) 🌟 */}
        <div className="pointer-events-none fixed inset-0 z-0 flex h-full w-full justify-center bg-black">
          <div className="relative h-full w-full max-w-480">
            <Image
              src="/images/library-main.webp"
              alt="Dechive Library Background"
              fill
              priority
              className={`object-cover object-center transition-all duration-700 ease-in-out ${
                isHome
                  ? 'blur-0 scale-100 opacity-85'
                  : 'scale-105 opacity-30 blur-md'
              }`}
            />
            <div className="absolute inset-y-0 left-0 w-40 bg-linear-to-r from-black to-transparent" />
            <div className="absolute inset-y-0 right-0 w-40 bg-linear-to-l from-black to-transparent" />
            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/80" />
          </div>
        </div>

        <Header />

        <main
          className={`relative z-10 flex w-full flex-1 flex-col ${isHome ? 'pt-0' : 'mx-auto max-w-7xl px-6 pt-24'}`}
        >
          {children}
        </main>

        <div
          className={
            isHome
              ? 'absolute bottom-0 left-0 z-50 w-full'
              : 'relative z-10 mt-auto w-full'
          }
        >
          <Footer />
        </div>

        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4611005224374273"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
