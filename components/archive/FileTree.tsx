'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Post } from '@/lib/notion';

// ---------------------------------------------------------
// [아이콘 모음] (따로 파일 안 만들고 여기에 포함시켰어)
// ---------------------------------------------------------
const Icons = {
  Folder: () => (
    <svg
      className="mr-2 h-5 w-5 text-yellow-400"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
    </svg>
  ),
  File: () => (
    <svg
      className="mr-2 h-5 w-5 text-slate-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  ),
  Search: () => (
    <svg
      className="h-4 w-4 text-slate-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  ),
  ChevronRight: ({ isOpen }: { isOpen: boolean }) => (
    <svg
      className={`mr-1 h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  ),
};

// ---------------------------------------------------------
// [트리 아이템] 폴더나 파일을 그리는 부품
// ---------------------------------------------------------
function TreeItem({
  item,
  allPosts,
  depth = 0,
}: {
  item: Post;
  allPosts: Post[];
  depth?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // 내 자식(하위 항목)들 찾기
  const children = allPosts.filter((p) => p.parentId === item.id);
  const hasChildren = children.length > 0;

  // 1. 폴더인 경우
  if (item.type === 'Folder') {
    return (
      <div className="select-none">
        <div
          className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm transition-colors hover:bg-slate-100/80"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* 화살표 (자식 있을 때만) */}
          <div className="mr-1 flex h-4 w-4 shrink-0 items-center justify-center">
            {hasChildren && <Icons.ChevronRight isOpen={isOpen} />}
          </div>
          <Icons.Folder />
          <span className="truncate font-medium text-slate-700">
            {item.title}
          </span>
        </div>

        {/* 자식 목록 (열렸을 때만 보임) */}
        {isOpen && (
          <div>
            {children.map((child) => (
              <TreeItem
                key={child.id}
                item={child}
                allPosts={allPosts}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // 2. 파일(글)인 경우
  return (
    <Link href={`/archive/${item.slug}`} className="block">
      <div
        className="group flex cursor-pointer items-center rounded-md px-2 py-2 text-sm transition-colors hover:bg-blue-50"
        style={{ paddingLeft: `${depth * 12 + 28}px` }}
      >
        <Icons.File />
        <span className="truncate text-slate-600 transition-colors group-hover:text-blue-600">
          {item.title}
        </span>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------
// [메인] FileTree 컴포넌트
// ---------------------------------------------------------
// 👇 [핵심 수정] posts = [] 기본값을 줘서 에러를 원천 차단!
export default function FileTree({ posts = [] }: { posts: Post[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  // 1. 최상위 폴더/파일만 추려내기 (부모가 없는 애들)
  const rootItems = posts.filter((p) => !p.parentId);

  // 2. 검색 로직 (검색어가 있으면 필터링)
  const filteredPosts = searchTerm
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          p.type === 'Post'
      )
    : [];

  return (
    <div className="w-full">
      {/* 🔍 검색창 영역 */}
      <div className="group relative mb-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icons.Search />
        </div>
        <input
          type="text"
          placeholder="검색하기..."
          className="w-full rounded-lg border border-transparent bg-slate-100 py-2 pr-4 pl-9 text-sm transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 🌲 목록 영역 */}
      <div className="space-y-1">
        {/* Case A: 검색 중일 때 */}
        {searchTerm ? (
          <div>
            <h3 className="mb-2 px-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Search Results
            </h3>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/archive/${post.slug}`}
                  className="block"
                >
                  <div className="flex items-center rounded-md px-2 py-2 transition-colors hover:bg-blue-50">
                    <Icons.File />
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-sm font-medium text-slate-700">
                        {post.title}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {post.date.slice(0, 10)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-slate-400">
                검색 결과가 없어요 😅
              </div>
            )}
          </div>
        ) : (
          /* Case B: 기본 트리 구조 */
          <div>
            {rootItems.length > 0 ? (
              rootItems.map((item) => (
                <TreeItem key={item.id} item={item} allPosts={posts} />
              ))
            ) : (
              <div className="px-2 text-xs text-slate-400">
                목록을 불러오는 중...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
