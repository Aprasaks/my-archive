import React from 'react';
import Link from 'next/link';
import SearchBar from '@/components/home/SearchBar';
import { getAllItems, Post } from '@/lib/notion';

export default async function Home() {
  const allPosts: Post[] = await getAllItems();

  const IT_FOLDER_ID = '2fb1e4d7ba508084b29bcc7d523da266';
  const HEALTH_FOLDER_ID = '3001e4d7ba5080328b6cc76ae2f1f55f';

  const cleanId = (id: string | null) => (id ? id.replace(/-/g, '') : '');

  const itLatestPost = allPosts.find(
    (post) =>
      cleanId(post.parentId) === cleanId(IT_FOLDER_ID) && post.type === 'Post'
  );

  const healthLatestPost = allPosts.find(
    (post) =>
      cleanId(post.parentId) === cleanId(HEALTH_FOLDER_ID) &&
      post.type === 'Post'
  );

  return (
    /* 1. main 태그를 div로 변경 (이미 layout.tsx에 main이 있음)
       2. min-h-screen 삭제 -> h-full로 변경하여 layout이 준 공간에 딱 맞춤
       3. overflow-hidden은 유지 (배경 도트 등이 삐져나오는 것 방지)
    */
    <div className="relative flex min-h-[calc(100vh-16rem)] flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-40 md:flex-row">
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-12 md:flex-row">
        {/* 왼쪽: 브랜딩 & 검색창 */}
        <div className="flex w-full flex-1 flex-col items-center md:items-start">
          <div className="mb-8 flex flex-col items-center gap-3 md:items-start">
            <h1 className="text-sm font-medium tracking-[0.5em] text-slate-400 uppercase">
              Dechive Archive
            </h1>
            <div className="h-px w-12 bg-blue-500/50" />
          </div>

          <div className="w-full max-w-2xl">
            <SearchBar posts={allPosts} />
          </div>

          <div className="mt-8 flex gap-6 text-[10px] font-medium tracking-widest text-slate-400 uppercase">
            <button className="underline decoration-slate-200 underline-offset-4 transition-colors hover:text-blue-500">
              Kakao
            </button>
            <button className="underline decoration-slate-200 underline-offset-4 transition-colors hover:text-blue-500">
              Instagram
            </button>
          </div>
        </div>

        {/* 오른쪽: Today's Selection */}
        <div className="flex w-full flex-col gap-4 md:w-72">
          <p className="mb-1 ml-1 text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
            Today&apos;s Selection
          </p>

          <Link
            href={itLatestPost ? `/archive/${itLatestPost.slug}` : '#'}
            className={`group cursor-pointer rounded-xl border border-slate-200 bg-white/40 p-4 backdrop-blur-md transition-all hover:border-blue-400 ${!itLatestPost && 'pointer-events-none opacity-50'}`}
          >
            <span className="text-[9px] font-black tracking-tighter text-blue-500 uppercase">
              # IT_TECH
            </span>
            <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-slate-700 group-hover:text-blue-600">
              {itLatestPost?.title || 'IT 소식을 준비 중입니다.'}
            </h3>
          </Link>

          <Link
            href={healthLatestPost ? `/archive/${healthLatestPost.slug}` : '#'}
            className={`group cursor-pointer rounded-xl border border-slate-200 bg-white/40 p-4 backdrop-blur-md transition-all hover:border-green-400 ${!healthLatestPost && 'pointer-events-none opacity-50'}`}
          >
            <span className="text-[9px] font-black tracking-tighter text-green-600 uppercase">
              # HEALTH_CARE
            </span>
            <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-slate-700 group-hover:text-green-700">
              {healthLatestPost?.title || '건강 정보를 준비 중입니다.'}
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
}
