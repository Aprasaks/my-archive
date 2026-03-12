import React, { Suspense } from 'react';
import ArchiveBasic from '@/components/archive/ArchiveBasic';
import RequestPill from '@/components/archive/RequestPill';
import TopButton from '@/components/common/TopButton';
import { getAllItems } from '@/lib/notion';

export const revalidate = 60;

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const allData = await getAllItems();
  const { q: query } = await searchParams;

  // 1. Folder 타입인 데이터만 모아서 { ID: 이름 } 형태의 지도 만들기
  const folders = allData.reduce((acc: Record<string, string>, item) => {
    if (item.type === 'Folder') {
      acc[item.id] = item.title;
    }
    return acc;
  }, {});

  // 2. 주제바에 표시할 동적 토픽 리스트 (Folder 이름들)
  const dynamicTopics = allData
    .filter((item) => item.type === 'Folder')
    .map((folder) => folder.title);

  // 3. 실제 포스트들만 분리
  const posts = allData.filter((item) => item.type === 'Post');

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-40">
      <div className="mx-auto max-w-5xl px-6">
        {/* [1. 헤더] */}
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

        {/* [2. 노션 폴더 기반 주제바] */}
        <div className="mb-16 border-y border-white/10 py-5">
          <div className="scrollbar-hide flex items-center justify-between overflow-x-auto px-2">
            <button className="shrink-0 text-sm font-black tracking-widest text-blue-500">
              ALL
            </button>
            {dynamicTopics.map((topic) => (
              <button
                key={topic}
                className="shrink-0 text-sm font-medium text-slate-500 transition-all hover:text-white"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* [3. 리스트 영역] */}
        <Suspense
          fallback={
            <div className="py-20 text-center font-mono text-xs text-slate-600 italic">
              LOADING_BRAIN...
            </div>
          }
        >
          <ArchiveBasic
            posts={posts}
            folders={folders}
            initialQuery={query || ''}
          />
        </Suspense>
      </div>
      <TopButton />
    </div>
  );
}
