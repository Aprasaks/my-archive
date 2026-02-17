'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Post } from '@/lib/notion'; // 타입 엄격하게!

export default function ArchiveBasic({ posts }: { posts: Post[] }) {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  // 1. 진짜 '글(Post)'만 보여주기
  const onlyPosts = posts.filter((p) => p.type === 'Post');

  // 2. 카테고리 필터링
  const filtered = selectedFolderId
    ? onlyPosts.filter((p) => p.parentId === selectedFolderId)
    : onlyPosts;

  return (
    <div className="mx-auto max-w-4xl px-6">
      {/* 폴더 탭: posts 데이터에서 직접 폴더 목록을 뽑아내면 형이 코드를 수정할 필요가 없어! */}
      <div className="mb-10 flex gap-2">
        <button
          onClick={() => setSelectedFolderId(null)}
          className="rounded-full border px-4 py-2 text-xs font-bold"
        >
          ALL
        </button>
        {posts
          .filter((p) => p.type === 'Folder')
          .map((folder) => (
            <button
              key={folder.id}
              onClick={() => setSelectedFolderId(folder.id)}
              className={`rounded-full border px-4 py-2 text-xs font-bold ${selectedFolderId === folder.id ? 'bg-black text-white' : ''}`}
            >
              {folder.title}{' '}
              {/* 노션에 적은 'IT', 'Notion' 이름이 그대로 나옴 */}
            </button>
          ))}
      </div>

      {/* 글 리스트 */}
      <div className="space-y-4">
        {filtered.map((post) => (
          <Link
            key={post.id}
            href={`/archive/${post.slug}`}
            className="block rounded-2xl border p-6 transition-all hover:bg-slate-50"
          >
            <h2 className="text-lg font-bold">{post.title}</h2>
            <p className="mt-2 text-xs text-slate-400">
              {post.date.split('T')[0]}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
