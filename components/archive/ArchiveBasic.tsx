'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Post } from '@/lib/notion';

interface ArchiveBasicProps {
  posts: Post[];
  initialQuery?: string;
}

export default function ArchiveBasic({
  posts,
  initialQuery = '',
}: ArchiveBasicProps) {
  // 검색 필터링 로직 (폴더 선택 기능은 상단 대분류로 대체될 예정이므로 쿼리 중심 유지)
  const filtered = useMemo(() => {
    let result = posts.filter((p) => p.type === 'Post');

    if (initialQuery) {
      const lowerQuery = initialQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(lowerQuery) ||
          p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    }

    return result;
  }, [posts, initialQuery]);

  return (
    <div className="font-isyun mx-auto">
      {/* 검색어가 있을 때만 보여주는 안내 메시지 */}
      {initialQuery && (
        <div className="mb-8 border-l-2 border-blue-500 py-1 pl-4 text-sm text-slate-500">
          <span className="font-bold text-blue-500">
            &apos;{initialQuery}&apos;
          </span>{' '}
          키워드로 필터링된 결과입니다.
        </div>
      )}

      {/* [수정] 1. 기존 폴더 탭 영역 삭제 (상단 주제바로 일원화) */}

      {/* 2. 글 리스트 영역: 사각형 느낌을 줄이기 위해 선 위주로 디자인 */}
      <div className="divide-y divide-white/5">
        {filtered.length > 0 ? (
          filtered.map((post) => (
            <Link
              key={post.id}
              href={`/archive/${post.slug}`}
              className="group block py-6 transition-all"
            >
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div className="flex-1">
                  {/* 카테고리 태그 - 제목 위에 작게 표시 */}
                  <div className="mb-2 text-[10px] font-bold tracking-widest text-blue-500/60 uppercase">
                    {post.category || 'General'}
                  </div>
                  <h2 className="text-xl font-bold text-slate-200 transition-colors group-hover:text-white">
                    {post.title}
                  </h2>
                  <div className="mt-3 flex items-center gap-3 text-[11px] font-medium tracking-tighter text-slate-500">
                    <span className="font-mono">
                      {post.date.split('T')[0].replace(/-/g, '.')}
                    </span>
                    <span className="h-3 w-[1px] bg-white/10" />
                    <span className="text-slate-600 group-hover:text-slate-400">
                      READ MORE
                    </span>
                  </div>
                </div>
                <div className="hidden text-2xl font-light text-slate-800 transition-all group-hover:translate-x-2 group-hover:text-blue-500 md:block">
                  →
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="py-20 text-center text-sm tracking-widest text-slate-600 italic">
            NO KNOWLEDGE FOUND.
          </div>
        )}
      </div>
    </div>
  );
}
