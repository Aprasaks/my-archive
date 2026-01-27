import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/layout/Header';

export const metadata: Metadata = {
  // 브라우저 탭에 표시될 이름 (템플릿 설정)
  title: {
    template: '%s | Dechive',
    default: "Dechive - Demian's Archive",
  },
  // 검색엔진이나 카톡 공유 시 나올 설명
  description:
    'Code, Life, and Knowledge. 기록하는 개발자 Demian의 모든 지식을 담은 저장소입니다.',
  // 검색 키워드
  keywords: [
    // 1. 브랜드 (나를 알리는 것)
    'Dechive',
    'Demian',
    '데카이브',

    // 2. 직무 & 정체성 (신뢰도 상승)
    'Product Manager',
    'Web Developer',
    'PM',
    'AI 활용',
    'TIL',
    '회고',

    // 3. 트래픽 & 수익화 (사람을 끌어오는 미끼)
    '산업안전기사',
    'CBT',
    '기출문제',
    '정보처리기사',
    'IT 기술 블로그',
    '지식 아카이브',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-slate-50 font-sans text-slate-900 antialiased">
        {/* 1. 헤더 (항상 위에 고정) */}
        <Header />

        {/* 2. 본문 내용 (헤더 높이 16 = 64px 만큼 띄우고 시작) */}
        <main className="min-h-screen pt-16">{children}</main>
      </body>
    </html>
  );
}
