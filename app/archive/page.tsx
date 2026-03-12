import React, { Suspense } from 'react';
import ArchiveBasic from '@/components/archive/ArchiveBasic';
import RequestPill from '@/components/archive/RequestPill';
import TopButton from '@/components/common/TopButton';
import { getAllItems } from '@/lib/notion';

export const revalidate = 60;

const TOPICS = [
  '정치',
  '경제',
  '사회',
  '생활/건강',
  'IT',
  '스포츠',
  '게임',
  '세계',
];

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const posts = await getAllItems();
  const { q: query } = await searchParams;

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-40">
      <div className="mx-auto max-w-5xl px-6">
        {/* [1. 헤더] Dechive: Brain (크기 대비 확실하게) */}
        <div className="mb-20 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-baseline gap-2">
            <h1 className="font-isyun text-4xl font-black tracking-tighter text-white">
              Dechive:
            </h1>
            <span className="font-isyun text-2xl font-black tracking-tighter text-white">
              Brain
            </span>
          </div>
          <RequestPill />
        </div>

        {/* [2. 뉴스형 주제바] 
            - shrink-0 적용 (Tailwind 권장 클래스)
            - justify-between과 적절한 gap으로 시원한 거리감 확보
        */}
        <div className="mb-16 border-y border-white/10 py-5">
          <div className="scrollbar-hide flex items-center justify-between overflow-x-auto px-2">
            <button className="shrink-0 text-sm font-black tracking-widest text-blue-500">
              ALL
            </button>
            {TOPICS.map((topic) => (
              <button
                key={topic}
                className="shrink-0 text-sm font-medium text-slate-500 transition-all hover:text-white"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* [3. 지식 리스트 영역] */}
        <Suspense
          fallback={
            <div className="py-20 text-center font-mono text-xs tracking-widest text-slate-600 italic">
              INITIALIZING_CORE...
            </div>
          }
        >
          <ArchiveBasic posts={posts} initialQuery={query || ''} />
        </Suspense>
      </div>

      <TopButton />
    </div>
  );
}
