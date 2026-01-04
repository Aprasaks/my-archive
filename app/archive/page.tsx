import React from 'react';
import { getFilesFromPath, getAllFiles } from '@/lib/posts'; // getAllFiles 추가
import ArchiveMain from '@/components/archive/ArchiveMain';

type SearchParams = Promise<{ path?: string }>;

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const resolvedParams = await searchParams;
  const currentPath = resolvedParams.path || '';

  // 1. 현재 폴더에 있는 파일 (평소에 보여줄 거)
  const currentFiles = getFilesFromPath(currentPath);

  // 2. 전체 파일 (검색할 때 쓸 거)
  const allFiles = getAllFiles();

  return (
    // 두 데이터를 모두 전달
    <ArchiveMain currentFiles={currentFiles} allFiles={allFiles} />
  );
}
