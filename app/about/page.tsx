'use client';

import React from 'react';
import Link from 'next/link';
import { SiDiscord, SiKakaotalk, SiInstagram, SiGithub } from 'react-icons/si';

export default function AboutPage() {
  return (
    // [수정 1] main -> div (레이아웃에 이미 main이 있어서 중복 방지)
    // [수정 2] min-h-screen -> min-h-[calc(100vh-64px)] (헤더 높이 64px 뺌)
    <div className="relative flex min-h-[calc(100vh-64px)] flex-col items-center justify-center overflow-hidden bg-white px-6">
      {/* 배경 패턴 */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.4]"
        style={{
          backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(to right, #e5e7eb 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      ></div>

      {/* 메인 콘텐츠 */}
      <div className="animate-fade-in-up relative z-10 w-full max-w-4xl text-center">
        {/* 텍스트 영역 */}
        <div className="mb-24 space-y-12">
          <p className="text-sm font-bold tracking-[0.15em] text-slate-500 uppercase md:text-base">
            PM의 시선 <span className="mx-2 text-slate-300">|</span> Developer의
            기술 <span className="mx-2 text-slate-300">|</span> AI의 도움
          </p>

          <div className="space-y-4">
            <h1 className="animate-aurora-text bg-linear-to-r from-slate-400 via-slate-900 to-slate-400 bg-size-[200%_auto] bg-clip-text pb-1 text-3xl leading-tight font-bold text-transparent md:text-5xl">
              세상 모든 지식을 공유하고 리뷰하는
            </h1>
            <h1 className="animate-aurora-text bg-linear-to-r from-slate-400 via-slate-900 to-slate-400 bg-size-[200%_auto] bg-clip-text pb-1 text-5xl font-black tracking-tight text-transparent md:text-7xl">
              Dechive의 탄생!
            </h1>
          </div>
        </div>

        {/* 소셜 아이콘 */}
        <div className="flex items-center justify-center gap-6 md:gap-10">
          <Link href="#" className="group">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-slate-400 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-[#5865F2] group-hover:text-white group-hover:shadow-lg">
              <SiDiscord className="h-8 w-8" />
            </div>
          </Link>

          <Link href="#" className="group">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-slate-400 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-[#FEE500] group-hover:text-[#371D1E] group-hover:shadow-lg">
              <SiKakaotalk className="h-8 w-8" />
            </div>
          </Link>

          <Link href="#" className="group">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-slate-400 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-linear-to-tr group-hover:from-[#f09433] group-hover:via-[#dc2743] group-hover:to-[#bc1888] group-hover:text-white group-hover:shadow-lg">
              <SiInstagram className="h-8 w-8" />
            </div>
          </Link>

          <Link href="https://github.com" target="_blank" className="group">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-slate-400 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-[#181717] group-hover:text-white group-hover:shadow-lg">
              <SiGithub className="h-8 w-8" />
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-24 text-xs font-medium tracking-widest text-slate-300 uppercase">
          Designed & Developed by{' '}
          <span className="font-bold text-slate-500">Demian</span>
        </div>
      </div>
    </div>
  );
}
