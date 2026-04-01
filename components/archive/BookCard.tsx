'use client';

import React from 'react';
import Link from 'next/link'; // 🌟 링크 컴포넌트 소환!
import { Post } from '@/types/archive';

interface BookCardProps {
  post: Post;
}

export default function BookCard({ post }: BookCardProps) {
  const bookNumber = (post.title.length % 5) + 1;
  const bgImage = `/covers/book${bookNumber}.webp`;

  return (
    /* 🌟 1. 전체를 Link로 감싸서 클릭 가능하게 만듦 */
    <Link
      href={`/archive/${post.slug}`} // 오라버니의 상세 페이지 경로에 맞춰줘! (예: /archive/slug)
      className="group relative mx-auto block aspect-[3/4.2] w-full max-w-64 cursor-pointer sm:max-w-72"
    >
      <div className="relative h-full w-full overflow-hidden rounded-sm transition-all duration-500 group-hover:-translate-y-2">
        {/* 배경 이미지 */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center brightness-[0.9] transition-all duration-700 group-hover:scale-110 group-hover:brightness-100"
          style={{ backgroundImage: `url(${bgImage})` }}
        />

        {/* ✍️ 오라버니의 황금 비율 제목 레이어 */}
        <div
          className="absolute z-20 flex flex-col items-center justify-center text-center transition-opacity"
          style={{
            left: '28%',
            right: '23%',
            top: '0%',
            bottom: '15%',
            mixBlendMode: 'color-dodge',
          }}
        >
          <h3 className="line-clamp-6 w-full font-serif text-[9.5px] leading-[1.35] font-extrabold tracking-tight text-white/50 sm:text-[11px] md:text-[12px]">
            {post.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
