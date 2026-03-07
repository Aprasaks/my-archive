import React, { Suspense } from 'react';
import ArchiveBasic from '@/components/archive/ArchiveBasic';
import RequestPill from '@/components/archive/RequestPill';
import { getAllItems } from '@/lib/notion';

export const revalidate = 60;

/**
 * [검토 결과]
 * Next.js 서버 컴포넌트에서 searchParams는 Props로 직접 전달됩니다.
 * 메인 검색창에서 넘겨준 ?q=키워드 값을 읽어서 ArchiveBasic에 전달하는 구조입니다.
 */
export default async function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>; // Next.js 최신 규격에 따라 Promise로 정의
}) {
  // 1. 노션에서 전체 포스트 데이터 가져오기
  const posts = await getAllItems();

  // 2. searchParams에서 검색어(q) 추출 (await 필요)
  const { q: query } = await searchParams;

  return (
    <div className="min-h-screen bg-transparent pt-16 pb-40">
      <div className="mx-auto mb-16 max-w-5xl px-6">
        {/* 헤더 영역: 타이틀과 요청 카드 배치 */}
        <div className="flex flex-col justify-between gap-8 border-white/5 pb-12 md:flex-row md:items-end">
          <div className="flex-1">
            <h1 className="font-isyun text-6xl font-black tracking-tighter text-white">
              Archive
            </h1>
            <p className="font-isyun mt-2 text-sm font-medium tracking-[0.4em] text-slate-500 uppercase">
              Knowledge Index System
            </p>
          </div>

          <div className="w-full md:w-100">
            <RequestPill />
          </div>
        </div>

        {/* 게시글 리스트 영역: Suspense로 로딩 처리 */}
        <Suspense
          fallback={
            <div className="text-center text-white">Loading Index...</div>
          }
        >
          {/* [핵심 수정] 
            메인에서 넘어온 검색어(query)를 initialQuery로 ArchiveBasic에 넘겨줍니다. 
          */}
          <ArchiveBasic posts={posts} initialQuery={query || ''} />
        </Suspense>
      </div>
    </div>
  );
}
