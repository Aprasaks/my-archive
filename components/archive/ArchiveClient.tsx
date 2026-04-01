'use client';

import React, { useState, useMemo } from 'react';
import ArchiveToolbar from '@/components/archive/ArchiveToolbar';
import BookGrid from '@/components/archive/BookGrid';
import { Post, FolderMap } from '@/types/archive';

interface ArchiveClientProps {
  initialPosts: Post[];
  folders: FolderMap;
  topics: string[];
}

export default function ArchiveClient({
  initialPosts,
  folders,
  topics,
}: ArchiveClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Topics');

  // 🌟 실시간 필터링 엔진 수정 버전
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      // 1. 제목 검색 필터 (대소문자 무시)
      const matchesSearch = post.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // 2. 🌟 토픽(주제) 필터 🌟
      if (selectedTopic === 'All Topics') return matchesSearch;

      // notion.ts에서 정의한 parentId를 사용하여 폴더 이름을 찾음
      const folderId = post.parentId;
      const postTopicName = folderId ? folders[folderId] : null;

      // 찾은 폴더 이름이 드롭다운에서 선택한 이름과 같은지 확인
      const matchesTopic = postTopicName === selectedTopic;

      return matchesSearch && matchesTopic;
    });
  }, [searchTerm, selectedTopic, initialPosts, folders]);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-20 flex w-full justify-center">
        <ArchiveToolbar
          topics={topics}
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
          selectedTopic={selectedTopic}
          onTopicChange={setSelectedTopic}
        />
      </div>

      <div className="relative w-full">
        <BookGrid posts={filteredPosts} />
      </div>
    </div>
  );
}
