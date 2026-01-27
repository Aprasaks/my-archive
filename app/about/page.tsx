import React from 'react';
import Link from 'next/link';
// react-icons 임포트 (npm install react-icons 필요)
import { SiDiscord, SiKakaotalk, SiInstagram, SiGithub } from 'react-icons/si';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-white px-6">
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

          {/* ▼▼▼ 오로라 텍스트 효과 (v4 문법 적용) ▼▼▼ */}
          <div className="space-y-4">
            {/* ✅ 수정됨: bg-linear-to-r, bg-size-[200%_auto] */}
            <h1 className="animate-aurora-text bg-linear-to-r from-slate-400 via-slate-900 to-slate-400 bg-size-[200%_auto] bg-clip-text pb-1 text-3xl leading-tight font-bold text-transparent md:text-5xl">
              세상 모든 지식을 공유하고 리뷰하는
            </h1>
            {/* ✅ 수정됨: bg-linear-to-r, bg-size-[200%_auto] */}
            <h1 className="animate-aurora-text bg-linear-to-r from-slate-400 via-slate-900 to-slate-400 bg-size-[200%_auto] bg-clip-text pb-1 text-5xl font-black tracking-tight text-transparent md:text-7xl">
              Dechive의 탄생!
            </h1>
          </div>
        </div>

        {/* 소셜 아이콘 */}
        <div className="flex items-center justify-center gap-6 md:gap-10">
          {/* Discord */}
          <Link href="#" className="group">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-slate-400 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-[#5865F2] group-hover:text-white group-hover:shadow-lg">
              <SiDiscord className="h-8 w-8" />
            </div>
          </Link>

          {/* KakaoTalk */}
          <Link href="#" className="group">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-slate-400 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-[#FEE500] group-hover:text-[#371D1E] group-hover:shadow-lg">
              <SiKakaotalk className="h-8 w-8" />
            </div>
          </Link>

          {/* Instagram */}
          <Link href="#" className="group">
            {/* ✅ 수정됨: bg-linear-to-tr (v4 그라데이션) */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-slate-400 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-linear-to-tr group-hover:from-[#f09433] group-hover:via-[#dc2743] group-hover:to-[#bc1888] group-hover:text-white group-hover:shadow-lg">
              <SiInstagram className="h-8 w-8" />
            </div>
          </Link>

          {/* GitHub */}
          <Link href="https://github.com" target="_blank" className="group">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-slate-400 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-[#181717] group-hover:text-white group-hover:shadow-lg">
              <SiGithub className="h-8 w-8" />
            </div>
          </Link>
        </div>

        {/* Footer (Designed & Developed by Demian) */}
        <div className="mt-24 text-xs font-medium tracking-widest text-slate-300 uppercase">
          Designed & Developed by{' '}
          <span className="font-bold text-slate-500">Demian</span>
        </div>
      </div>
    </main>
  );
}
