import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/layout/Header';
// 👇 [중요] GoogleAdSense는 지우고, GoogleAnalytics만 남김 (에러 해결)
import { GoogleAnalytics } from '@next/third-parties/google';
// 👇 [중요] Next.js 내장 Script 기능 가져오기
import Script from 'next/script';

// 👇 SEO 최적화된 메타데이터 (형이 설정한 그대로 유지)
export const metadata: Metadata = {
  metadataBase: new URL('https://demian.dev'),
  title: {
    template: '%s | Dechive',
    default: "Dechive - Demian's Archive",
  },
  description: '모든 지식을 기록하고 공유하는 dechive 저장소입니다',
  keywords: [
    'Dechive',
    'Demian',
    '데카이브',
    'Product Manager',
    'Web Developer',
    'PM',
    'AI 활용',
    'TIL',
    '회고',
    '산업안전기사',
    'CBT',
    '기출문제',
    '정보처리기사',
    'IT 기술 블로그',
    '지식 아카이브',
  ],
  openGraph: {
    title: "Dechive - Demian's Archive",
    description: '모든 지식을 기록하고 공유하는 dechive 저장소',
    url: 'https://demian.dev',
    siteName: 'Dechive',
    locale: 'ko_KR',
    type: 'website',
  },
  verification: {
    google: '나중에_구글_서치콘솔_코드_넣기',
    other: {
      'naver-site-verification': '나중에_네이버_코드_넣기',
    },
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
      <body className="bg-slate-50 font-sans text-slate-900 antialiased">
        {/* 헤더 */}
        <Header />

        {/* 본문 (헤더 높이만큼 띄움) */}
        <main className="min-h-screen pt-16">{children}</main>

        {/* 👇 [핵심] 라이브러리 대신 직접 넣은 애드센스 코드 (빨간 줄 절대 안 뜸) */}
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4611005224374273"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>

      {/* 구글 애널리틱스 (환경변수 있으면 작동) */}
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
