'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Post } from '@/lib/notion';
import CommentCount from '@/components/archive/CommentCount';

// ---------------------------------------------------------
// [아이콘 모음]
// ---------------------------------------------------------
const Icons = {
  Folder: () => (
    <svg
      className="mr-2 h-5 w-5 shrink-0 text-yellow-400"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
    </svg>
  ),
  File: () => (
    <svg
      className="mr-2 h-5 w-5 shrink-0 text-slate-400"
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
// [트리 아이템]
// ---------------------------------------------------------
interface TreeItemProps {
  item: Post;
  allPosts: Post[];
  depth?: number;
  visibleIds: Set<string> | null;
  expandedIds: Set<string>;
}

function TreeItem({
  item,
  allPosts,
  depth = 0,
  visibleIds,
  expandedIds,
}: TreeItemProps) {
  // ✅ [수정 1] useEffect 삭제하고, useState 초기값에 바로 로직 적용!
  // expandedIds에 내 아이디가 있으면 처음부터 열린 상태(true)로 시작
  const [isOpen, setIsOpen] = useState(expandedIds.has(item.id));

  const children = allPosts.filter((p) => p.parentId === item.id);
  const hasChildren = children.length > 0;
  const isVisible = visibleIds === null || visibleIds.has(item.id);

  // ❌ [삭제됨] 에러를 유발하던 useEffect 제거
  // useEffect(() => { ... }, [expandedIds])

  if (!isVisible) return null;

  if (item.type === 'Folder') {
    return (
      <div className="animate-in fade-in slide-in-from-left-1 duration-200 select-none">
        <div
          className="flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-slate-100/80"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="mr-1 flex h-4 w-4 shrink-0 items-center justify-center">
            {hasChildren && <Icons.ChevronRight isOpen={isOpen} />}
          </div>
          <Icons.Folder />
          <span className="truncate font-medium text-slate-700">
            {item.title}
          </span>
        </div>

        {isOpen && (
          <div>
            {children.map((child) => (
              <TreeItem
                key={child.id}
                item={child}
                allPosts={allPosts}
                depth={depth + 1}
                visibleIds={visibleIds}
                expandedIds={expandedIds}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={`/archive/${item.slug}`}
      className="animate-in fade-in slide-in-from-left-1 block duration-200"
    >
      <div
        className="group flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-blue-50"
        style={{ paddingLeft: `${depth * 12 + 28}px` }}
      >
        <Icons.File />
        <span className="truncate text-slate-600 transition-colors group-hover:font-medium group-hover:text-blue-600">
          {item.title}
        </span>
        <CommentCount slug={item.slug} className="ml-2" />
      </div>
    </Link>
  );
}

// ---------------------------------------------------------
// [메인] FileTree 컴포넌트
// ---------------------------------------------------------
export default function FileTree({ posts = [] }: { posts: Post[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const { visibleIds, expandedIds } = useMemo(() => {
    if (!query.trim()) {
      return { visibleIds: null, expandedIds: new Set<string>() };
    }

    const lowerQuery = query.toLowerCase();
    const visible = new Set<string>();
    const expanded = new Set<string>();

    const targets = posts.filter((p) =>
      p.title.toLowerCase().includes(lowerQuery)
    );

    targets.forEach((target) => {
      let current: Post | undefined = target;
      while (current) {
        visible.add(current.id);
        if (current.type === 'Folder') expanded.add(current.id);
        if (current.parentId) expanded.add(current.parentId);
        current = posts.find((p) => p.id === current?.parentId);
      }
    });

    return { visibleIds: visible, expandedIds: expanded };
  }, [query, posts]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputValue.trim()) {
        router.push(`/archive?q=${encodeURIComponent(inputValue)}`);
      } else {
        router.push('/archive');
      }
    }
  };

  const rootItems = posts.filter((p) => !p.parentId);

  return (
    <div className="w-full">
      <div className="group relative mb-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icons.Search />
        </div>
        <input
          type="text"
          placeholder="검색하기... (Enter)"
          className="w-full rounded-lg border border-transparent bg-slate-100 py-2 pr-4 pl-9 text-sm transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <div className="space-y-1">
        {visibleIds !== null && visibleIds.size === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <span className="text-2xl">😅</span>
            <div className="text-sm text-slate-500">
              <span className="font-bold text-slate-700">
                &apos;{query}&apos;
              </span>
              와 일치하는 파일이 없어요.
            </div>
            <button
              onClick={() => {
                setInputValue('');
                router.push('/archive');
              }}
              className="mt-2 text-xs text-blue-500 hover:underline"
            >
              전체 목록으로 돌아가기
            </button>
          </div>
        ) : (
          rootItems.map((item) => (
            <TreeItem
              // ✅ [수정 2] Key에 query를 섞어줌!
              // -> 검색어가 바뀌면 컴포넌트가 새로 태어나면서(Remount)
              // -> useState 초기값이 새로운 expandedIds로 다시 세팅됨!
              key={`${item.id}-${query}`}
              item={item}
              allPosts={posts}
              visibleIds={visibleIds}
              expandedIds={expandedIds}
            />
          ))
        )}
      </div>
    </div>
  );
}
