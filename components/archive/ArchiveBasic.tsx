'use client';

import React, {
  useMemo,
  useState,
  useEffect,
  useSyncExternalStore,
} from 'react';
import Link from 'next/link';
import { Post } from '@/lib/notion';
import TopicAccordion from './TopicAccordion';
import SearchBar from './SearchBar';

// 서버/클라이언트 체크용 빈 함수
const subscribe = () => () => {};

export default function ArchiveBasic({
  posts,
  folders,
}: {
  posts: Post[];
  folders: Record<string, string>;
}) {
  // [핵심] 빌드 로봇에게 "넌 거짓말쟁이야!"라고 안 하고, 아주 세련되게 "지금은 서버야"라고 알려주는 법
  const isClient = useSyncExternalStore(
    subscribe,
    () => true, // 브라우저일 땐 true
    () => false // 서버(빌드)일 땐 false
  );

  const [currentTopic, setCurrentTopic] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isClient) return;

    const updateFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setCurrentTopic(params.get('topic') || 'ALL');
      setSearchQuery(params.get('q') || '');
    };

    updateFromUrl();
    window.addEventListener('popstate', updateFromUrl);
    return () => window.removeEventListener('popstate', updateFromUrl);
  }, [isClient]);

  const groupedData = useMemo(() => {
    // 빌드 로봇이 여길 지나갈 땐 아예 리스트를 안 그리게 해서 에러 방지
    if (!isClient) return {};

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
  }, [isClient, posts, currentTopic, searchQuery, folders]);

  // 서버(빌드)일 때는 아무것도 안 보여주고 틀만 유지 (에러 0% 보장)
  if (!isClient) return <div className="min-h-screen" />;

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
