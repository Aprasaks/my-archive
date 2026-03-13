'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // [핵심] Next.js 공식 주소창 훅
import { Post } from '@/lib/notion';
import TopicAccordion from './TopicAccordion';
import SearchBar from './SearchBar';

interface ArchiveBasicProps {
  posts: Post[];
  folders: Record<string, string>;
}

export default function ArchiveBasic({ posts, folders }: ArchiveBasicProps) {
  // 1. Next.js 공식 훅으로 주소창 정보를 안전하게 가져옴
  const searchParams = useSearchParams();
  const currentTopic = searchParams.get('topic') || 'ALL';
  const initialQ = searchParams.get('q') || '';

  // 2. 검색창 칼반응을 위한 로컬 State (초기값은 주소창의 q)
  const [searchQuery, setSearchQuery] = useState(initialQ);

  const groupedData = useMemo(() => {
    let filtered = posts;

    // 3. 토픽 필터링 (주소창 기준)
    if (currentTopic !== 'ALL') {
      filtered = filtered.filter(
        (p) => folders[p.parentId || ''] === currentTopic
      );
    }

    // 4. 검색어 필터링 (입력창 기준)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    const groups: Record<string, Post[]> = {};
    filtered.forEach((post) => {
      const folderName = post.parentId ? folders[post.parentId] : 'Knowledge';
      if (!groups[folderName]) groups[folderName] = [];
      groups[folderName].push(post);
    });

    return groups;
  }, [posts, currentTopic, searchQuery, folders]);

  return (
    <div className="font-isyun mx-auto">
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <div className="mt-8 space-y-6">
        {Object.keys(groupedData).length > 0 ? (
          Object.entries(groupedData).map(([folderName, folderPosts]) => (
            <TopicAccordion
              key={folderName}
              title={folderName}
              count={folderPosts.length}
            >
              <div className="divide-y divide-white/5">
                {folderPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/archive/${post.slug}`}
                    className="group block py-4 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium text-slate-300 group-hover:text-blue-400">
                        {post.title}
                      </h2>
                      <span className="font-mono text-[11px] text-slate-600">
                        {post.date.split('T')[0].replace(/-/g, '.')}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </TopicAccordion>
          ))
        ) : (
          <div className="py-20 text-center text-sm text-slate-600 italic">
            NO DATA FOUND.
          </div>
        )}
      </div>
    </div>
  );
}
