import React, { Suspense } from 'react';
import { getFilesFromPath, getAllFiles } from '@/lib/posts';
import ArchiveMain from '@/components/archive/ArchiveMain';

// ✅ 이 한 줄이 배포 에러를 없애주는 핵심 치트키야!
// "이 페이지는 들어올 때마다 새로 그려줘 (미리 빌드 X)" 라는 뜻
export const dynamic = 'force-dynamic';

// Next.js 15: searchParams는 Promise
type SearchParams = Promise<{ path?: string }>;

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const resolvedParams = await searchParams;
  const currentPath = resolvedParams.path || '';

  const currentFiles = getFilesFromPath(currentPath);
  const allFiles = getAllFiles();

  return (
    <div className="h-full font-sans text-gray-800">
      <Suspense fallback={<div className="p-8 text-gray-400">Loading...</div>}>
        <ArchiveMain currentFiles={currentFiles} allFiles={allFiles} />
      </Suspense>
    </div>
  );
}
