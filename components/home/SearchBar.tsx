'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react'; // 👈 useMemo 추가
import { useRouter } from 'next/navigation';
import { Search, FileText, Folder, ArrowRight } from 'lucide-react';
import { Post } from '@/lib/notion';

interface SearchBarProps {
  posts: Post[];
}

export default function SearchBar({ posts }: SearchBarProps) {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // ❌ 삭제: [filteredResults, setFilteredResults] state는 필요 없어!
  // ❌ 삭제: filtering 로직이 있던 useEffect도 필요 없어!

  // ✅ 추가: 렌더링 될 때 실시간으로 계산 (Derived State)
  // useMemo를 쓰면 keyword나 posts가 바뀔 때만 다시 계산해서 성능도 챙김
  const filteredResults = useMemo(() => {
    if (!keyword.trim()) return [];

    return posts
      .filter((post) => {
        const lowerKeyword = keyword.toLowerCase();
        return (
          post.title.toLowerCase().includes(lowerKeyword) ||
          post.tags.some((tag) => tag.toLowerCase().includes(lowerKeyword))
        );
      })
      .slice(0, 5); // Top 5
  }, [keyword, posts]);

  // 🖱️ 바깥 클릭하면 드롭다운 닫기 (이건 유지)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMoveToArchive = () => {
    if (!keyword.trim()) return;
    router.push(`/archive?q=${encodeURIComponent(keyword)}`);
    setShowDropdown(false);
  };

  const handleMoveToPost = (slug: string) => {
    router.push(`/archive/${slug}`);
  };

  return (
    <div
      ref={wrapperRef}
      className="animate-fade-in-up relative z-50 mx-auto mt-4 w-full max-w-2xl px-4 delay-100"
    >
      {/* 검색창 UI */}
      <div className="group relative w-full">
        <div className="group-focus-within:animate-aurora-flow absolute -inset-0.5 rounded-3xl bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-40 blur transition duration-500 group-focus-within:opacity-100 group-focus-within:blur-md group-hover:opacity-70"></div>
        <div className="relative flex items-center rounded-3xl bg-white p-4 pl-6 shadow-sm ring-1 ring-slate-100 transition-all duration-300 group-focus-within:shadow-none group-focus-within:ring-transparent">
          <Search
            onClick={handleMoveToArchive}
            className="mr-3 h-5 w-5 cursor-pointer text-slate-400 transition-colors duration-300 group-focus-within:text-purple-500 hover:text-purple-600"
          />
          <input
            type="text"
            placeholder="무엇이 궁금한가요? (예: Next.js, 회고)"
            className="w-full bg-transparent text-lg text-slate-800 placeholder:text-slate-400 focus:outline-none"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              // 입력 시작하면 드롭다운 열기
              if (e.target.value.trim()) setShowDropdown(true);
            }}
            onFocus={() => keyword.trim() && setShowDropdown(true)}
            onKeyDown={(e) => e.key === 'Enter' && handleMoveToArchive()}
          />
        </div>
      </div>

      {/* 스포트라이트 드롭다운 */}
      {/* filteredResults가 있고 + showDropdown이 true일 때만 표시 */}
      {showDropdown && keyword.trim() && (
        <div className="absolute top-full right-4 left-4 mt-2 overflow-hidden rounded-2xl border border-slate-100 bg-white/90 shadow-xl backdrop-blur-md">
          {filteredResults.length > 0 ? (
            <div className="flex flex-col">
              {filteredResults.map((post) => (
                <button
                  key={post.id}
                  onClick={() => handleMoveToPost(post.slug)}
                  className="flex items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-slate-100/80"
                >
                  {post.type === 'Folder' ? (
                    <Folder size={18} className="shrink-0 text-yellow-500" />
                  ) : (
                    <FileText size={18} className="shrink-0 text-blue-500" />
                  )}

                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-semibold text-slate-700">
                      {post.title}
                    </span>
                    {post.tags.length > 0 && (
                      <span className="truncate text-xs text-slate-400">
                        {post.tags.map((t) => `#${t}`).join(' ')}
                      </span>
                    )}
                  </div>
                </button>
              ))}

              <button
                onClick={handleMoveToArchive}
                className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-5 py-3 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-purple-600"
              >
                <span>&apos;{keyword}&apos; 검색 결과 더 보기...</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="px-5 py-8 text-center text-sm text-slate-400">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes aurora-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-aurora-flow {
          background-size: 200% 200%;
          animation: aurora-flow 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
