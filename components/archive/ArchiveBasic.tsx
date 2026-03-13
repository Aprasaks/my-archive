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

// [핵심] 서버와 클라이언트 상태를 안전하게 동기화하는 도우미 함수
function subscribe() {
  return () => {}; // 주소창 변경은 useEffect에서 따로 잡으므로 여기선 빈 함수
}

export default function ArchiveBasic({
  posts,
  folders,
}: {
  posts: Post[];
  folders: Record<string, string>;
}) {
  // [수정] useEffect + setState 대신 이 방식을 쓰면 린트 경고가 원천 차단됨
  const isClient = useSyncExternalStore(
    subscribe,
    () => true, // 클라이언트(브라우저)일 때 값
    () => false // 서버(빌드 타임)일 때 값
  );

  const [currentTopic, setCurrentTopic] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // 이제 isClient는 위에서 잡았으니, 여기선 주소창 로직만 신경 씀
    const updateFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setCurrentTopic(params.get('topic') || 'ALL');
      setSearchQuery(params.get('q') || '');
    };

    updateFromUrl();
    window.addEventListener('popstate', updateFromUrl);
    return () => window.removeEventListener('popstate', updateFromUrl);
  }, []);

  const groupedData = useMemo(() => {
    if (!isClient) return {}; // 빌드 시에는 빈 객체

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

  // 마운트 전(서버) 레이아웃 껍데기
  if (!isClient) return <div className="min-h-96 w-full" />;

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
