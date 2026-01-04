import React from 'react';
import Link from 'next/link';

interface FileItem {
  slug: string;
  title: string;
  type: string;
  tags: string[];
  date: string;
}

export default function ArchiveList({ files }: { files: FileItem[] }) {
  // === Empty State (이미지처럼 구현) ===
  if (files.length === 0) {
    return (
      <div className="flex h-full w-full flex-col">
        {/* Table Header */}
        <div className="flex w-full border-y border-gray-200 bg-gray-50/50 py-3 text-xs font-bold tracking-wider text-gray-500 uppercase">
          <div className="flex-1 px-4">Name</div>
          <div className="w-24 px-4 text-center">Type</div>
          <div className="w-32 px-4">Tags</div>
          <div className="w-24 px-4 text-right">Date</div>
        </div>

        {/* Empty Content */}
        <div className="flex flex-1 flex-col items-center justify-center pb-20 text-gray-400">
          <svg
            className="mb-4 h-16 w-16 text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
          <p className="text-sm">No files found in this directory.</p>
        </div>
      </div>
    );
  }

  // === File List ===
  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="sticky top-0 z-10 flex w-full border-y border-gray-200 bg-gray-50 py-3 text-xs font-bold tracking-wider text-gray-500 uppercase">
        <div className="flex flex-1 cursor-pointer items-center gap-1 px-4 hover:text-black">
          Name <span className="text-[10px]">↓</span>
        </div>
        <div className="w-24 px-4 text-center">Type</div>
        <div className="w-32 px-4">Tags</div>
        <div className="w-24 px-4 text-right">Date</div>
      </div>

      {/* Rows */}
      <div className="bg-white">
        {files.map((file) => (
          <Link
            key={file.slug}
            href={`/archive/${file.slug}`}
            className="group flex w-full items-center border-b border-gray-100 py-4 transition-colors hover:bg-cyan-50/30"
          >
            {/* Name */}
            <div className="flex flex-1 items-center gap-3 truncate px-4 font-medium text-gray-700 group-hover:text-cyan-700">
              <svg
                className="h-4 w-4 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {file.title}
            </div>

            {/* Type */}
            <div className="w-24 px-4 text-center">
              <span className="rounded-full border border-gray-200 bg-gray-100 px-2 py-1 text-[10px] font-bold text-gray-500">
                MD
              </span>
            </div>

            {/* Tags (첫 번째 태그만 표시 등) */}
            <div className="w-32 truncate px-4 text-xs text-gray-400">
              {file.tags.length > 0 ? `#${file.tags[0]}` : '-'}
            </div>

            {/* Date */}
            <div className="w-24 px-4 text-right font-mono text-xs text-gray-400">
              {file.date}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
