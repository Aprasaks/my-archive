'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { Post } from '@/lib/notion';
import TopicAccordion from './TopicAccordion';
import SearchBar from './SearchBar';

interface ArchiveBasicProps {
  posts: Post[];
  folders: Record<string, string>;
}

export default function ArchiveBasic({ posts, folders }: ArchiveBasicProps) {
  const [currentTopic, setCurrentTopic] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // 빌드 타임이 아닌 브라우저 환경에서만 실행됨
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      setCurrentTopic(params.get('topic') || 'ALL');
      setSearchQuery(params.get('q') || '');
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

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
                    className="group block py-4"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium text-slate-300 transition-colors group-hover:text-blue-400">
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
