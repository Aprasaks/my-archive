'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Post } from '@/lib/notion';

export default function ArchiveBasic({ posts }: { posts: Post[] }) {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  const onlyPosts = posts.filter((p) => p.type === 'Post');
  const filtered = selectedFolderId
    ? onlyPosts.filter((p) => p.parentId === selectedFolderId)
    : onlyPosts;

  return (
    <div className="font-isyun mx-auto">
      {/* 1. 폴더 탭: 하단 여백 축소 (mb-14 -> mb-8) 및 패딩 조절 */}
      <div className="mb-8 flex flex-wrap gap-x-5 gap-y-2 border-b border-white/5 pb-3">
        <button
          onClick={() => setSelectedFolderId(null)}
          className={`py-1 text-[13px] font-black tracking-widest transition-all ${
            selectedFolderId === null
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-slate-600 hover:text-slate-300'
          }`}
        >
          ALL.INDEX
        </button>
        {posts
          .filter((p) => p.type === 'Folder')
          .map((folder) => (
            <button
              key={folder.id}
              onClick={() => setSelectedFolderId(folder.id)}
              className={`py-1 text-[13px] font-black tracking-widest transition-all ${
                selectedFolderId === folder.id
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-slate-600 hover:text-slate-300'
              }`}
            >
              {folder.title.toUpperCase()}
            </button>
          ))}
      </div>

      {/* 2. 글 리스트: 카드 간격 축소 (space-y-6 -> space-y-3) */}
      <div className="space-y-3">
        {filtered.map((post) => (
          <Link
            key={post.id}
            href={`/archive/${post.slug}`}
            // [수정] p-8 -> p-5 로 줄여서 카드 높이를 타이트하게 조절
            className="group block rounded-xl border border-white/5 bg-white/1 p-5 backdrop-blur-md transition-all hover:border-blue-500/30 hover:bg-white/3"
          >
            <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
              <div className="flex-1">
                {/* 제목 크기 유지하되 줄간격 조정 */}
                <h2 className="text-[17px] leading-snug font-bold text-slate-100 transition-colors group-hover:text-blue-400">
                  {post.title}
                </h2>
                <div className="mt-2 flex items-center gap-3 text-[10px] font-medium tracking-widest text-slate-500 uppercase">
                  <span className="font-mono text-slate-600 transition-colors group-hover:text-blue-500/50">
                    {post.date.split('T')[0].replace(/-/g, '.')}
                  </span>
                  <span className="h-0.5 w-0.5 rounded-full bg-slate-800" />
                  <span className="font-black text-blue-500/40">UNIT</span>
                </div>
              </div>
              <div className="hidden text-slate-800 transition-all group-hover:translate-x-1 group-hover:text-blue-500 md:block">
                →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
