import React from 'react';
import { getPostData } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc'; // 서버 컴포넌트용 MDX 렌더러
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Next.js 15: params는 Promise
type Params = Promise<{ slug: string }>;

export default async function PostViewerPage({ params }: { params: Params }) {
  const { slug } = await params; // await 필수

  let post;
  try {
    post = await getPostData(slug);
  } catch (err) {
    notFound();
  }

  return (
    <div className="flex h-full flex-col font-sans text-gray-800">
      {/* 1. 뷰어 헤더 (리스트 헤더와 높이/스타일 통일감 유지) */}
      <div className="sticky top-0 z-10 flex-none border-b border-gray-100 bg-white/50 px-8 py-6 backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between">
          {/* 뒤로 가기 (현재 폴더 목록으로 돌아가기) */}
          {/* post.category가 폴더명이므로, 해당 폴더 경로를 추정하여 링크 */}
          <Link
            href="/archive"
            className="flex items-center text-xs font-bold tracking-wider text-gray-400 uppercase transition-colors hover:text-black"
          >
            <svg
              className="mr-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to List
          </Link>

          {/* 메타 정보 */}
          <div className="flex gap-2">
            <span className="rounded-full border border-cyan-100 bg-cyan-50 px-2 py-0.5 text-[10px] font-bold text-cyan-700 uppercase">
              {post.category}
            </span>
          </div>
        </div>

        <h1 className="text-3xl leading-tight font-black tracking-tight text-gray-900">
          {post.title}
        </h1>

        <div className="mt-2 flex items-center gap-4 font-mono text-xs text-gray-400">
          <span>Date: {post.date}</span>
          <span>Author: System</span>
          {post.tags.length > 0 && (
            <span>Tags: {post.tags.map((t) => `#${t}`).join(' ')}</span>
          )}
        </div>
      </div>

      {/* 2. 본문 영역 (스크롤바 숨김 적용) */}
      <article className="scrollbar-hide flex-1 overflow-y-auto bg-white/30 p-8 md:p-12">
        <div className="prose prose-slate prose-headings:font-bold prose-headings:tracking-tight prose-a:text-cyan-600 prose-code:text-pink-600 prose-pre:bg-gray-900 prose-pre:rounded-lg mx-auto max-w-3xl">
          {/* MDX 렌더링 */}
          <MDXRemote source={post.content} />
        </div>

        {/* 하단 여백 */}
        <div className="h-20"></div>
      </article>
    </div>
  );
}
