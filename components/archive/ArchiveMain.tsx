'use client';

import React, { useState } from 'react';
import SearchHeader from './SearchHeader';
import ArchiveList from './ArchiveList';
import { PostItem } from '@/lib/posts';

interface ArchiveMainProps {
  currentFiles: PostItem[];
  allFiles: PostItem[];
}

export default function ArchiveMain({
  currentFiles,
  allFiles,
}: ArchiveMainProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // [핵심] 검색어가 있으면 '전체 파일'에서 찾고, 없으면 '현재 폴더'만 보여줌
  const displayFiles = searchTerm
    ? allFiles.filter(
        (file) =>
          file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          file.slug.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : currentFiles;

  return (
    <div className="flex h-full flex-col font-sans text-gray-800">
      <SearchHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className="scrollbar-hide flex-1 overflow-y-auto px-8 py-6">
        {displayFiles.length > 0 ? (
          <ArchiveList files={displayFiles} />
        ) : (
          <div className="flex h-64 flex-col items-center justify-center text-gray-400 select-none">
            <p className="text-sm font-medium">No files found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
