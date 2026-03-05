import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    <div className="relative flex min-h-[calc(100vh-16rem)] flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-40 md:flex-row">
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-12 md:flex-row md:items-start">
        {/* 왼쪽 섹션: 브랜딩 & 검색바 */}
        <div className="flex w-full flex-1 flex-col items-center md:items-start">
          <div className="mb-8 flex flex-col items-center gap-2 md:items-start">
            <h1 className="font-isyun text-5xl tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] md:text-6xl">
              Demian Archive
            </h1>
            <p className="font-isyun mt-1 text-base font-medium text-slate-400 md:text-xl">
              지식과 경험의 모든 것을 기록하다
            </p>
          </div>

          <div className="w-full max-w-2xl">
            <SearchBar posts={allPosts} />
          </div>

          {/* 💡 검색창 밑은 비워두어 드롭다운 가독성 확보 */}
        </div>

        {/* 오른쪽 섹션: Today's Selection */}
        <div className="flex w-full flex-col gap-4 md:w-80">
          <p className="mb-1 ml-1 text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
            Today&apos;s Selection
          </p>

          <Link
            href={itLatestPost ? `/archive/${itLatestPost.slug}` : '#'}
            className="group cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all hover:border-blue-500/50 hover:bg-white/10"
          >
            <span className="text-[10px] font-black tracking-tighter text-blue-500 uppercase">
              # IT_TECH
            </span>
            <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-slate-200 group-hover:text-blue-400">
              {itLatestPost?.title || 'IT 소식을 준비 중입니다.'}
            </h3>
          </Link>

          <Link
            href={healthLatestPost ? `/archive/${healthLatestPost.slug}` : '#'}
            className="group cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all hover:border-green-500/50 hover:bg-white/10"
          >
            <span className="text-[10px] font-black tracking-tighter text-green-500 uppercase">
              # HEALTH_CARE
            </span>
            <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-slate-200 group-hover:text-green-400">
              {healthLatestPost?.title || '건강 정보를 준비 중입니다.'}
            </h3>
          </Link>
        </div>
      </div>

      {/* 💡 [핵심] 푸터 구분선 바로 위에 얹히는 소셜 큐알 레이어 */}
      <div className="absolute bottom-2 left-0 w-full px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-end gap-6">
          <div className="flex gap-4">
            {/* Kakao QR */}
            <Link
              href="https://open.kakao.com/o/soGGFUji"
              target="_blank"
              className="group flex flex-col items-center gap-2"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/5 bg-white/3 backdrop-blur-md transition-all group-hover:border-yellow-400/30 group-hover:bg-white/10">
                <Image
                  src="/images/qr/kakao.png"
                  alt="Kakao"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="font-isyun text-[10px] font-bold text-slate-500 transition-colors group-hover:text-white">
                Kakao
              </span>
            </Link>

            {/* Insta QR */}
            <Link
              href="https://www.instagram.com/dechive13"
              target="_blank"
              className="group flex flex-col items-center gap-2"
            >
              <div className="bg-white/3backdrop-blur-md flex h-16 w-16 items-center justify-center rounded-xl border border-white/5 transition-all group-hover:border-pink-500/30 group-hover:bg-white/10">
                <Image
                  src="/images/qr/insta.png"
                  alt="Insta"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="font-isyun text-[10px] font-bold text-slate-500 transition-colors group-hover:text-white">
                Instagram
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
