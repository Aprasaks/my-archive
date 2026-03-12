'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { Post } from '@/lib/notion';

interface ArchiveBasicProps {
  posts: Post[];
  folders: Record<string, string>;
  initialQuery?: string;
}

export default function ArchiveBasic({
  posts,
  folders,
  initialQuery = '',
}: ArchiveBasicProps) {
  // [핵심] window.location을 직접 감시하여 서버 요청 없이 상태 업데이트
  const [currentTopic, setCurrentTopic] = useState('ALL');

  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      setCurrentTopic(params.get('topic') || 'ALL');
    };

    // 초기 로드 시 확인
    handleUrlChange();

    // 주소창 변화 이벤트 리스너 등록
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const filtered = useMemo(() => {
    let result = posts;

    // 1. 주제 필터링 (메모리 내 계산)
    if (currentTopic !== 'ALL') {
      result = result.filter((post) => {
        const folderName = post.parentId ? folders[post.parentId] : 'Knowledge';
        return folderName === currentTopic;
      });
    }

    // 2. 검색어 필터링
    if (initialQuery) {
      const lowerQuery = initialQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(lowerQuery) ||
          p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    }

    return result;
  }, [posts, currentTopic, initialQuery, folders]);

  return (
    <div className="font-isyun mx-auto">
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
                    <span className="text-slate-600 uppercase group-hover:text-slate-400">
                      Read More
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
            NO DATA FOUND.
          </div>
        )}
      </div>
    </div>
  );
}
