'use client';

import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="animate-fade-in-up mx-auto mt-4 w-full max-w-2xl px-4 delay-100">
      {/* 1. 검색창 Wrapper (group으로 묶어서 내부 포커스 감지) */}
      <div className="group relative w-full">
        {/* 2. 오로라 글로우 효과 (배경) */}
        {/* 평소엔 opacity-30, 포커스되면 opacity-100 + 애니메이션 시작 */}
        <div className="group-focus-within:animate-aurora-flow absolute -inset-0.5 rounded-full bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-40 blur transition duration-500 group-focus-within:opacity-100 group-focus-within:blur-md group-hover:opacity-70"></div>

        {/* 3. 실제 입력창 (흰색 배경) */}
        <div className="relative flex items-center rounded-full bg-white p-4 pl-6 shadow-sm ring-1 ring-slate-100 transition-all duration-300 group-focus-within:shadow-none group-focus-within:ring-transparent">
          {/* 돋보기 아이콘 (포커스시 색상 변경) */}
          <Search className="mr-3 h-5 w-5 text-slate-400 transition-colors duration-300 group-focus-within:text-purple-500" />

          {/* Input 필드 (화살표 버튼 제거됨) */}
          <input
            type="text"
            placeholder="무엇이 궁금한가요? 지식 저장소에서 검색하세요."
            className="w-full bg-transparent text-lg text-slate-800 placeholder:text-slate-400 focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // 나중에 검색 기능 연결할 곳
                console.log('Search Triggered');
              }
            }}
          />
        </div>
      </div>

      {/* 4. 오로라 흐름 애니메이션 정의 (Tailwind config 없이 바로 적용) */}
      <style jsx>{`
        @keyframes aurora-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-aurora-flow {
          background-size: 200% 200%;
          animation: aurora-flow 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
