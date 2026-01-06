import React, { Suspense } from 'react'; // 1. Suspense 불러오기
import { getFilesFromPath, getAllFiles } from '@/lib/posts';
import ArchiveMain from '@/components/archive/ArchiveMain';

// Next.js 15: searchParams는 Promise
type SearchParams = Promise<{ path?: string }>;

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const resolvedParams = await searchParams;
  const currentPath = resolvedParams.path || '';

  // 1. 현재 폴더에 있는 파일
  const currentFiles = getFilesFromPath(currentPath);

  // 2. 전체 파일 (검색용)
  const allFiles = getAllFiles();

  return (
    // 3. Suspense로 감싸서 빌드 에러 방지 (fallback은 로딩 중에 보여줄 UI)
    <div className="h-full font-sans text-gray-800">
      <Suspense fallback={<div className="p-8 text-gray-400">Loading...</div>}>
        <ArchiveMain currentFiles={currentFiles} allFiles={allFiles} />
      </Suspense>
    </div>
  );
}
