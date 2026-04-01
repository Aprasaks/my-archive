'use client';

import React from 'react';
// 🌟 공통 타입 적용 (잊지 않았지?)
import { Post } from '@/types/archive';

interface BookCardProps {
  post: Post;
}

export default function BookCard({ post }: BookCardProps) {
  // 📚 5가지 커버 랜덤 배분
  const bookNumber = (post.title.length % 5) + 1;
  const bgImage = `/covers/book${bookNumber}.webp`;

  return (
    <div className="group relative mx-auto aspect-[3/4.2] w-full max-w-64 cursor-pointer sm:max-w-72">
      <div className="relative h-full w-full overflow-hidden rounded-sm transition-all duration-500 group-hover:-translate-y-2">
        {/* 1. 배경 이미지: 오버레이 주석 및 중복된 속성 정리 */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center brightness-[0.9] transition-all duration-700 group-hover:scale-110 group-hover:brightness-100"
          style={{ backgroundImage: `url(${bgImage})` }}
        />

        <div
          className="absolute z-20 flex flex-col items-center justify-center text-center transition-opacity"
          style={{
            left: '28%',
            right: '23%',
            top: '0%',
            bottom: '15%',
            mixBlendMode: 'color-dodge', // 오라버니가 선택한 블렌딩 모드 유지
          }}
        >
          <h3 className="line-clamp-6 w-full font-serif text-[9.5px] leading-[1.35] font-extrabold tracking-tight text-white/50 sm:text-[11px] md:text-[12px]">
            {post.title}
          </h3>
        </div>
      </div>
    </div>
  );
}
