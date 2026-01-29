'use client';

import React from 'react';
// 분리해둔 컴포넌트들 가져오기
import DateQuote from '@/components/home/DateQuote';
import SearchBar from '@/components/home/SearchBar';
import RecentLogs from '@/components/home/RecentLogs';

export default function Home() {
  return (
    // 레이아웃: 형이 준 코드 그대로 (flex center, bg-white)
    // 높이: 헤더(64px) 제외하고 꽉 채우기 위해 min-h-[calc(100vh-64px)] 사용
    <main className="relative flex min-h-[calc(100vh-64px)] flex-col items-center justify-center overflow-hidden bg-white px-6">
      {/* --- [1. 배경 패턴] (형이 준 코드 100% 동일) --- */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.4]"
        style={{
          backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(to right, #e5e7eb 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      ></div>

      {/* --- [2. 메인 콘텐츠] --- */}
      <div className="animate-fade-in-up relative z-10 flex w-full max-w-4xl flex-col items-center gap-12">
        {/* ① 날짜 & 명언 */}
        <DateQuote />

        {/* ② 검색창 (주인공) */}
        <SearchBar />

        {/* ③ 최근 지식 로그 */}
        <RecentLogs />
      </div>

      {/* --- [3. 하단 푸터] (형 감성 살려서 추가) --- */}
      <div className="absolute bottom-6 text-xs font-medium tracking-widest text-slate-300 uppercase">
        Designed & Developed by{' '}
        <span className="font-bold text-slate-500">Demian</span>
      </div>
    </main>
  );
}
