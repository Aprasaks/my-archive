'use client';

import React, { useState, useRef, useEffect } from 'react';

interface TopicDropdownProps {
  topics: string[];
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
}

export default function TopicDropdown({
  topics,
  selectedTopic,
  onTopicChange,
}: TopicDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const allTopics = ['All Topics', ...topics];

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    // 💡 v4 호환: 임의 값 제거 (z-50, min-w-48 사용)
    <div ref={dropdownRef} className="relative z-50 w-full min-w-48 sm:w-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-3.5 shadow-lg backdrop-blur-xl transition-all duration-300 ${
          isOpen
            ? 'border-blue-500/60 bg-black/80 ring-4 ring-blue-500/10'
            : 'border-white/20 bg-black/60 hover:border-white/40 hover:bg-black/80'
        }`}
      >
        <span
          className={`text-sm font-semibold tracking-tight transition-colors ${isOpen ? 'text-blue-400' : 'text-slate-100'}`}
        >
          {selectedTopic}
        </span>
        <svg
          className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-400' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* 펼쳐지는 메뉴 영역 */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 w-full overflow-hidden rounded-2xl border border-white/20 bg-neutral-950/95 p-1.5 shadow-2xl backdrop-blur-3xl">
          <ul className="custom-scrollbar max-h-60 overflow-x-hidden overflow-y-auto rounded-xl">
            {allTopics.map((topic, idx) => (
              <li key={idx} className="mb-0.5 last:mb-0">
                <button
                  onClick={() => {
                    onTopicChange(topic);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center rounded-lg px-4 py-2.5 text-left text-sm transition-all ${
                    selectedTopic === topic
                      ? 'bg-blue-600/20 font-bold text-blue-400'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {topic}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
