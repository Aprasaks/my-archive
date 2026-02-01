import React from 'react';
import FileTree from '@/components/archive/FileTree';
import RequestPill from '@/components/archive/RequestPill'; // 👈 방금 만든 거 import
import { getAllItems } from '@/lib/notion';
import { Suspense } from 'react'; // 👈 [1. 추가] 이거 불러와!

export default async function ArchivePage() {
  const posts = await getAllItems();

  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center p-4 md:p-8">
      {/* 🌟 1. 오오라 카드 (트리) */}
      <div className="mb-10 w-full max-w-2xl rounded-3xl border-2 border-blue-400/20 bg-white/80 p-6 shadow-[0_0_40px_-10px_rgba(96,165,255,0.3)] backdrop-blur-xl transition-all duration-500 hover:border-blue-400/40 hover:shadow-[0_0_60px_-5px_rgba(96,165,255,0.5)] md:p-8">
        <Suspense
          fallback={
            <div className="p-4 text-sm text-slate-500">
              목록을 불러오는 중...
            </div>
          }
        >
          <FileTree posts={posts} />
        </Suspense>
      </div>

      {/* 💊 2. 요청하기 알약 (여기에 기능이 다 들어있음!) */}
      <div>
        <RequestPill />
      </div>
    </div>
  );
}
