import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/layout/Header';

// 👇 SEO 최적화된 메타데이터 설정
export const metadata: Metadata = {
  // 1. 기본 도메인 설정 (필수! 이걸 해야 이미지가 제대로 뜸)
  metadataBase: new URL('https://demian.dev'),

  // 2. 브라우저 탭 이름
  title: {
    template: '%s | Dechive',
    default: "Dechive - Demian's Archive",
  },

  // 3. 설명 (검색 결과용)
  description: '모든 지식을 기록하고 공유하는 dechive 저장소입니다',

  // 4. 키워드 (형이 작성한 전략 키워드 유지!)
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

  // 5. SNS 공유 설정 (Open Graph) - 카톡, 슬랙용
  openGraph: {
    title: "Dechive - Demian's Archive",
    description: '모든 지식을 기록하고 공유하는 dechive 저장소',
    url: 'https://demian.dev',
    siteName: 'Dechive',
    locale: 'ko_KR',
    type: 'website',
  },

  // 6. 구글/네이버 검색 등록용 (나중에 값만 넣으면 됨)
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
  return (
    <html lang="ko">
      <body className="bg-slate-50 font-sans text-slate-900 antialiased">
        {/* 헤더 (고정) */}
        <Header />

        {/* 본문 (헤더 높이만큼 띄움) */}
        <main className="min-h-screen pt-16">{children}</main>
      </body>
    </html>
  );
}
