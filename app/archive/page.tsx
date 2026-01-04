import React from 'react';
import ArchiveList from '@/components/archive/ArchiveList';
import { getFilesFromPath } from '@/lib/posts';

// Next.js 15: searchParams는 Promise
type SearchParams = Promise<{ path?: string }>;

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const resolvedParams = await searchParams;
  const currentPath = resolvedParams.path || '';

  // 사이드바용 트리 데이터(getDirectoryTree)는 여기서 필요 없음! (레이아웃이 함)
  // 여기서는 '현재 경로의 파일 목록'만 있으면 됨
  const files = getFilesFromPath(currentPath);

  return (
    // 레이아웃이 이미 flex와 사이드바를 잡고 있으므로,
    // 여기서는 꽉 채우는 h-full과 flex-col만 있으면 됨
    <div className="flex h-full flex-col font-sans text-gray-800">
      {/* 상단 헤더 영역 */}
      <header className="sticky top-0 z-10 flex flex-none items-end justify-between bg-white/30 px-8 pt-10 pb-2 backdrop-blur-sm">
        {/* 타이틀 */}
        <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase">
          Data Archive
        </h1>

        {/* 검색창 */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search files..."
            className="w-64 rounded-lg border border-gray-200 bg-white py-2 pr-4 pl-9 text-sm shadow-sm transition-all focus:border-cyan-400 focus:outline-none"
          />
          <svg
            className="absolute top-2.5 left-3 h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </header>

      {/* 파일 리스트 영역 */}
      <div className="scrollbar-hide flex-1 overflow-y-auto px-8 py-6">
        <ArchiveList files={files} />
      </div>
    </div>
  );
}
