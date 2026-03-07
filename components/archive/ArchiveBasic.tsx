'use client';

import React, { useState, useMemo } from 'react'; // 👈 useMemo 추가
import Link from 'next/link';
import { Post } from '@/lib/notion';

// 1. Props 인터페이스에 initialQuery 추가
interface ArchiveBasicProps {
  posts: Post[];
  initialQuery?: string;
}

export default function ArchiveBasic({
  posts,
  initialQuery = '',
}: ArchiveBasicProps) {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  // 2. 검색 필터링 로직 추가
  // 폴더 선택 상태와 메인에서 넘어온 검색어를 동시에 고려합니다.
  const filtered = useMemo(() => {
    let result = posts.filter((p) => p.type === 'Post');

    // 폴더가 선택되었다면 해당 폴더 글만 필터링
    if (selectedFolderId) {
      result = result.filter((p) => p.parentId === selectedFolderId);
    }

    // 메인 검색창에서 넘어온 쿼리가 있다면 제목이나 태그에서 필터링
    if (initialQuery) {
      const lowerQuery = initialQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(lowerQuery) ||
          p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    }

    return result;
  }, [posts, selectedFolderId, initialQuery]);

  return (
    <div className="font-isyun mx-auto">
      {/* 검색어가 있을 때 보여주는 안내 메시지 (선택 사항) */}
      {initialQuery && (
        <div className="mb-6 text-sm text-slate-400">
          <span className="font-bold text-blue-500">
            &apos;{initialQuery}&apos;
          </span>{' '}
          검색 결과입니다.
        </div>
      )}

      {/* 1. 폴더 탭 영역 */}
      <div className="mb-8 flex flex-wrap gap-x-5 gap-y-2 border-b border-white/5 pb-3">
        <button
          onClick={() => setSelectedFolderId(null)}
          className={`py-1 text-[13px] font-black tracking-widest transition-all ${
            selectedFolderId === null && !initialQuery // 검색 중이 아닐 때만 ALL에 파란 줄
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

      {/* 2. 글 리스트 영역 */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((post) => (
            <Link
              key={post.id}
              href={`/archive/${post.slug}`}
              className="group block rounded-xl border border-white/5 bg-white/1 p-5 backdrop-blur-md transition-all hover:border-blue-500/30 hover:bg-white/3"
            >
              <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                <div className="flex-1">
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
          ))
        ) : (
          <div className="py-20 text-center text-sm text-slate-500">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
