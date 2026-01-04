'use client';

import React from 'react';

interface SearchHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function SearchHeader({
  searchTerm,
  onSearchChange,
}: SearchHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex flex-none items-end justify-between bg-white/30 px-8 pt-10 pb-2 backdrop-blur-sm">
      {/* 타이틀 */}
      <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase">
        Data Archive
      </h1>

      {/* 검색창 (기능 연결됨) */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search files..."
          className="w-64 rounded-lg border border-gray-200 bg-white py-2 pr-4 pl-9 text-sm shadow-sm transition-all focus:border-cyan-400 focus:outline-none"
        />
        <svg
          className="absolute top-2.5 left-3 h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </header>
  );
}
