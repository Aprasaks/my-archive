import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/layout/Header'; // components가 app과 같은 위치(루트)에 있으므로 ..로 나갑니다

export const metadata: Metadata = {
  title: '정보집합체 (My Archive)',
  description: 'PM & 안전관리자 지식 아카이브',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-slate-50 text-slate-900 antialiased">
        {/* 1. 헤더 (항상 위에 고정) */}
        <Header />

        {/* 2. 본문 내용 (헤더 높이만큼 띄우고 시작) */}
        <main className="min-h-screen pt-16">{children}</main>
      </body>
    </html>
  );
}
