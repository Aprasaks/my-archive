'use client';

import React, { useState } from 'react';
import { Clock, Flame, Eye, ArrowUpRight } from 'lucide-react';

// [수정 1] 데이터 타입을 정의해서 @ts-ignore를 쓸 필요 없게 만듦
interface LogData {
  id: number;
  category: string;
  title: string;
  time?: string; // 최근 글에만 있음 (선택적)
  views?: string; // 인기 글에만 있음 (선택적)
}

const recentPosts: LogData[] = [
  {
    id: 1,
    category: 'Dev',
    title: 'Next.js 14: Server Actions 데이터 페칭 전략',
    time: '12 mins ago',
  },
  {
    id: 2,
    category: 'Bugfix',
    title: 'Search component hydration error 해결 과정',
    time: '45 mins ago',
  },
  {
    id: 3,
    category: 'Life',
    title: '맛있는 김치찌개 끓이는 법 (어머니 레시피)',
    time: '2 hours ago',
  },
];

const trendingPosts: LogData[] = [
  {
    id: 1,
    category: 'Insight',
    title: '2026년 개발자가 꼭 알아야 할 AI 툴 5선',
    views: '2.4k',
  },
  {
    id: 2,
    category: 'Productivity',
    title: '효율적인 기록을 위한 옵시디언 vs 노션 비교',
    views: '1.8k',
  },
  {
    id: 3,
    category: 'Study',
    title: '정보처리기사 실기: 자주 나오는 SQL 패턴',
    views: '1.2k',
  },
];

export default function RecentLogs() {
  const [activeTab, setActiveTab] = useState<'recent' | 'trending'>('recent');

  return (
    <div className="animate-fade-in-up mt-12 w-full max-w-2xl px-4 delay-200 md:px-0">
      {/* 1. 탭 메뉴 */}
      <div className="mb-4 flex items-center gap-6 border-b border-slate-100 px-2">
        <button
          onClick={() => setActiveTab('recent')}
          className={`relative pb-3 text-sm font-bold transition-all duration-300 ${
            activeTab === 'recent'
              ? 'text-slate-900'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          최근 등록된 글
          <span
            className={`absolute bottom-0 left-0 h-0.5 w-full bg-slate-900 transition-transform duration-300 ${activeTab === 'recent' ? 'scale-x-100' : 'scale-x-0'}`}
          />
        </button>

        <button
          onClick={() => setActiveTab('trending')}
          className={`relative flex items-center gap-1.5 pb-3 text-sm font-bold transition-all duration-300 ${
            activeTab === 'trending'
              ? 'text-slate-900'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          요즘 뜨는 글
          <Flame
            size={14}
            className={`${activeTab === 'trending' ? 'text-red-500' : 'text-slate-300'}`}
          />
          <span
            className={`absolute bottom-0 left-0 h-0.5 w-full bg-slate-900 transition-transform duration-300 ${activeTab === 'trending' ? 'scale-x-100' : 'scale-x-0'}`}
          />
        </button>
      </div>

      {/* 2. 리스트 목록 */}
      {/* [수정 2] min-h-[220px] -> min-h-55 (Tailwind 표준) */}
      <div className="grid min-h-55 gap-2">
        {(activeTab === 'recent' ? recentPosts : trendingPosts).map(
          (post, index) => (
            <div
              key={post.id}
              className="group relative flex cursor-pointer items-center justify-between rounded-xl border border-transparent bg-white p-4 transition-all hover:border-slate-100 hover:bg-slate-50 hover:shadow-sm"
            >
              <div className="flex items-center gap-4 overflow-hidden">
                {/* 랭킹 (인기글 탭일 때만 표시) */}
                {/* [수정 3] flex-shrink-0 -> shrink-0 (Tailwind 최신 문법) */}
                {activeTab === 'trending' && (
                  <div className="w-6 shrink-0 text-center text-lg font-black text-slate-200 italic transition-colors group-hover:text-purple-400">
                    {index + 1}
                  </div>
                )}

                <div className="flex min-w-0 flex-col gap-0.5">
                  {/* 카테고리 태그 */}
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase transition-colors group-hover:text-blue-500">
                    {post.category}
                  </span>
                  {/* 제목 */}
                  <span className="truncate text-sm font-bold text-slate-800 group-hover:text-slate-900">
                    {post.title}
                  </span>
                </div>
              </div>

              {/* 우측 정보 (시간/조회수 -> 호버시 화살표) */}
              <div className="flex items-center pl-4">
                {/* 평소엔 시간/조회수 보임 */}
                <div className="flex items-center gap-1 text-[10px] font-medium whitespace-nowrap text-slate-400 group-hover:hidden">
                  {activeTab === 'recent' ? (
                    <>
                      <Clock size={10} />
                      {/* [수정 1의 결과] 타입을 정의했으므로 @ts-ignore 불필요 */}
                      {post.time}
                    </>
                  ) : (
                    <>
                      <Eye size={12} />
                      {/* [수정 1의 결과] 타입을 정의했으므로 @ts-ignore 불필요 */}
                      {post.views}
                    </>
                  )}
                </div>

                {/* 호버하면 화살표 등장 */}
                <div className="animate-in fade-in zoom-in hidden text-slate-400 duration-200 group-hover:block">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
