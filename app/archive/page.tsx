import React, { Suspense } from 'react';
import ArchiveBasic from '@/components/archive/ArchiveBasic';
import RequestPill from '@/components/archive/RequestPill';
import { getAllItems } from '@/lib/notion';

export const revalidate = 60;

export default async function ArchivePage() {
  const posts = await getAllItems();

  return (
    <div className="min-h-screen bg-transparent pt-16 pb-40">
      <div className="mx-auto mb-16 max-w-5xl px-6">
        {/* [수정] 타이틀과 요청 카드를 가로로 배치 (모바일은 세로) */}
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

        <Suspense
          fallback={
            <div className="text-center text-white">Loading Index...</div>
          }
        >
          <ArchiveBasic posts={posts} />
        </Suspense>
      </div>
    </div>
  );
}
