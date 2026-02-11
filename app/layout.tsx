import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '@/components/layout/Footer';
import InteractiveGrid from '../components/layout/InteractiveGrid';
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
  ],
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
      {/* 1. min-h-screen과 flex-col로 전체 높이를 화면에 맞추고 수직 구조 생성 */}
      <body className="flex min-h-screen flex-col font-sans text-slate-900 antialiased">
        <InteractiveGrid />
        <Header />

        {/* 2. flex-1: 헤더와 푸터를 제외한 나머지 모든 공간을 main이 차지함 */}
        {/* pt-16: 헤더 높이만큼 상단 여백 확보 */}
        <main className="relative z-10 flex-1 pt-16">{children}</main>

        {/* 3. 이제 푸터는 내용이 짧으면 바닥에, 길면 내용 끝에 붙음 */}
        <Footer />

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
