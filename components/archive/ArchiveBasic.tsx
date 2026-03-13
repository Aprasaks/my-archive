'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Post } from '@/lib/notion';
import TopicAccordion from './TopicAccordion';
import SearchBar from './SearchBar';

interface ArchiveBasicProps {
  posts: Post[];
  folders: Record<string, string>;
}

export default function ArchiveBasic({ posts, folders }: ArchiveBasicProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. [핵심] Topic은 useState를 쓰지 않고 주소창에서 바로 읽습니다. (경고 원천 차단)
  const currentTopic = searchParams.get('topic') || 'ALL';

  // 2. 검색어는 '타이핑 칼반응'을 위해 로컬 State로 둡니다.
  const urlQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);

  // 3. [핵심] useEffect 대신 렌더링 중에 상태 업데이트 (리액트 공식 문서 권장 패턴)
  // 뒤로가기 등 외부 요인으로 주소창의 'q'가 바뀌면 로컬 검색창 상태도 동기화
  if (urlQuery !== prevUrlQuery) {
    setPrevUrlQuery(urlQuery);
    setSearchQuery(urlQuery);
  }

  // 4. 검색창 타이핑 시 URL 조용히 업데이트 (디바운스 0.3초)
  useEffect(() => {
    // 이미 주소창과 입력값이 같으면 무한루프 방지를 위해 스킵
    if (searchQuery === urlQuery) return;

    const timer = setTimeout(() => {
      // 기존 파라미터(topic 등)를 복사한 뒤 검색어만 교체
      const params = new URLSearchParams(searchParams.toString());

      if (searchQuery) {
        params.set('q', searchQuery);
      } else {
        params.delete('q'); // 검색어 지우면 URL에서도 깔끔하게 삭제
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, urlQuery, pathname, router, searchParams]);

  // 5. 필터링 로직 (그대로 유지!)
  const groupedData = useMemo(() => {
    let filtered = posts;

    if (currentTopic !== 'ALL') {
      filtered = filtered.filter(
        (p) => folders[p.parentId || ''] === currentTopic
      );
    }

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
    <div className="font-main mx-auto">
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
          <div className="py-20 text-center text-sm tracking-widest text-slate-600 italic">
            NO MATCHING DATA FOUND.
          </div>
        )}
      </div>
    </div>
  );
}
