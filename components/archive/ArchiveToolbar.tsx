'use client';

import React from 'react';
import TopicDropdown from './TopicDropdown';
import SearchBar from './SearchBar';

interface ArchiveToolbarProps {
  topics: string[];
  // 🌟 부모(ArchiveClient)로부터 검색 상태와 함수를 받아옴
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
}

export default function ArchiveToolbar({
  topics,
  searchTerm,
  onSearchChange,
  onClear,
  selectedTopic,
  onTopicChange,
}: ArchiveToolbarProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-4 px-4 sm:flex-row sm:gap-6">
      {/* 1. 토픽 드롭다운: 이제 부모가 준 상태를 사용함 */}
      <div className="w-full sm:w-auto">
        <TopicDropdown
          topics={topics}
          selectedTopic={selectedTopic}
          onTopicChange={onTopicChange}
        />
      </div>

      {/* 2. 구분선 */}
      <div className="hidden h-8 w-px bg-white/20 sm:block" />

      {/* 3. 검색바: 검색어와 변경 함수를 그대로 토스! */}
      <div className="w-full flex-1">
        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          onClear={onClear}
        />
      </div>
    </div>
  );
}
