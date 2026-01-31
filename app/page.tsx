import React from 'react';
import DateQuote from '@/components/home/DateQuote';
import SearchBar from '@/components/home/SearchBar';
import RecentLogs from '@/components/home/RecentLogs';
import { getAllItems } from '@/lib/notion'; // 👈 데이터 함수 가져오기

// Next.js 13+ 서버 컴포넌트는 async 가능!
export default async function Home() {
  // 1. 노션에서 데이터 싹 가져오기 (서버에서 실행되니 빠름)
  const allPosts = await getAllItems();

  return (
    <main className="relative flex min-h-[calc(100vh-64px)] flex-col items-center justify-center overflow-hidden bg-white px-6">
      {/* 배경 패턴 */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.4]"
        style={{
          backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(to right, #e5e7eb 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      ></div>

      {/* 메인 콘텐츠 */}
      <div className="animate-fade-in-up relative z-10 flex w-full max-w-4xl flex-col items-center gap-12">
        <DateQuote />

        {/* 2. 데이터를 SearchBar에게 Props로 전달! 📦 */}
        <SearchBar posts={allPosts} />

        <RecentLogs />
      </div>

      {/* 푸터 */}
      <div className="absolute bottom-6 text-xs font-medium tracking-widest text-slate-300 uppercase">
        Designed & Developed by{' '}
        <span className="font-bold text-slate-500">Demian</span>
      </div>
    </main>
  );
}
