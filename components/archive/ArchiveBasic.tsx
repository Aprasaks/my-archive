'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Post } from '@/lib/notion';

interface ArchiveBasicProps {
  posts: Post[];
  folders: Record<string, string>; // 폴더 ID와 이름을 매칭한 맵 추가
  initialQuery?: string;
}

export default function ArchiveBasic({
  posts,
  folders,
  initialQuery = '',
}: ArchiveBasicProps) {
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
      {initialQuery && (
        <div className="mb-8 border-l-2 border-blue-500 py-1 pl-4 text-sm text-slate-500">
          <span className="font-bold text-blue-500">
            &apos;{initialQuery}&apos;
          </span>{' '}
          키워드로 필터링된 결과입니다.
        </div>
      )}

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
                  {/* [핵심 수정] post.category 대신 folders 맵에서 parentId로 이름을 찾아옴 */}
                  <div className="mb-2 text-[10px] font-bold tracking-widest text-blue-500/60 uppercase">
                    {post.parentId
                      ? folders[post.parentId] || 'Knowledge'
                      : 'Knowledge'}
                  </div>

                  <h2 className="text-xl font-bold text-slate-200 transition-colors group-hover:text-white">
                    {post.title}
                  </h2>
                  <div className="mt-3 flex items-center gap-3 text-[11px] font-medium tracking-tighter text-slate-500">
                    <span className="font-mono">
                      {post.date.split('T')[0].replace(/-/g, '.')}
                    </span>
                    <span className="h-3 w-px bg-white/10" />
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
