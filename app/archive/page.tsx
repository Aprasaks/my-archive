import React, { Suspense } from 'react';
import ArchiveBasic from '@/components/archive/ArchiveBasic';
import RequestPill from '@/components/archive/RequestPill';
import { getAllItems } from '@/lib/notion';

export const revalidate = 60; // 노션 글 쓰면 1분 뒤 반영

export default async function ArchivePage() {
  const posts = await getAllItems();

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-40">
      <div className="mx-auto mb-16 max-w-4xl px-6 text-center md:text-left">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">
          Archive
        </h1>
        <p className="mt-2 text-sm font-medium text-slate-500">
          기록된 모든 지식의 인덱스
        </p>
      </div>

      <Suspense
        fallback={
          <div className="py-20 text-center font-mono text-xs text-slate-400">
            Loading Index...
          </div>
        }
      >
        <ArchiveBasic posts={posts} />
      </Suspense>

      <div className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2">
        <RequestPill />
      </div>
    </div>
  );
}
