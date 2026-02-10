import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '@/components/layout/Footer';
import InteractiveGrid from '../components/layout/InteractiveGrid'; // 👈 배경 추가
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://demian.dev'),
  title: {
    template: '%s | Dechive',
    default: "Dechive - Demian's Archive",
  },
  description: '모든 지식을 기록하고 공유하는 지식 아카이브, Dechive입니다.',
  keywords: [
    'Dechive',
    'Demian',
    'IT 기술 블로그',
    '지식 아카이브',
    'AI 활용',
    'TIL',
  ], // 핵심만 유지
  openGraph: {
    title: "Dechive - Demian's Archive",
    description: '모든 지식을 기록하고 공유하는 지식 아카이브',
    url: 'https://demian.dev',
    siteName: 'Dechive',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || '';

  return (
    <html lang="ko">
      {/* body에서 bg-slate-50 삭제 -> globals.css의 배경이 보이게 함 */}
      <body className="font-sans text-slate-900 antialiased">
        {/* 1. 인터랙티브 도트 배경 (가장 밑바닥) */}
        <InteractiveGrid />

        {/* 2. 헤더 (상단 고정) */}
        <Header />

        {/* 3. 본문 레이어 */}
        <main className="relative z-10 min-h-screen pt-16">{children}</main>

        {/* 4. 애드센스 스크립트 (After Interactive로 속도 최적화) */}
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4611005224374273"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Footer />
      </body>

      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
