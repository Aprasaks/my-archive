import React from 'react';
import { Search } from 'lucide-react';

interface ArchiveHeaderProps {
  selectedCategory: string;
  fileCount: number; // 여기서 타입을 받아서
}

export default function ArchiveHeader({
  selectedCategory,
  fileCount,
}: ArchiveHeaderProps) {
  return (
    <header className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="mb-1 flex items-center gap-2 text-2xl font-black text-gray-900">
          DATA ARCHIVE
        </h1>
        <p className="font-mono text-sm text-gray-500">
          {/* [수정] fileCount를 여기서 사용합니다! */}
          path:{' '}
          <span className="font-bold text-cyan-600">
            root/{selectedCategory}
          </span>
          <span className="ml-2 text-gray-400">:: {fileCount} items found</span>
        </p>
      </div>

      <div className="relative w-full md:w-72">
        <input
          type="text"
          placeholder="Search files..."
          className="w-full rounded-lg border border-gray-200 bg-white py-2 pr-4 pl-10 text-sm shadow-sm transition-all focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
        />
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>
    </header>
  );
}
