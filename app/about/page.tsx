'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-200px)] w-full flex-col items-center justify-start overflow-x-hidden px-6 pt-10 pb-20">
      <div className="flex w-full max-w-6xl flex-col items-center text-center">
        {/* 🏛️ [섹션 1] 브랜드 타이틀 */}
        <div className="mb-10">
          <h1 className="font-serif text-5xl font-light tracking-[0.3em] text-white/90 uppercase drop-shadow-2xl md:text-7xl lg:text-8xl">
            DECHIVE
          </h1>
          <p className="mt-4 text-xl font-medium tracking-tighter text-amber-500/90 sm:text-2xl md:text-3xl">
            기록된 지식은 무한한 가치를 지닌다
          </p>
        </div>

        {/* 📜 [섹션 2] 소개 문구 */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <p className="text-base leading-relaxed font-light break-keep text-white/90 italic sm:text-lg md:text-xl">
            모두가 AI의 가짜 정보(Hallucination)에 휩쓸리는 시대,
            <br className="hidden md:block" />
            직접 찾아보고 경험한 것들을 재정립하여 기록하는{' '}
            <span className="font-medium text-white underline decoration-amber-500/30 underline-offset-8">
              무결점 지식 아카이브
            </span>
            입니다.
          </p>
        </div>

        {/* 🖼️ [섹션 3] 이미지 섹션 (가로 3열) */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {/* 📚 Archive 섹션 */}
          <div className="group flex flex-col items-center rounded-2xl border border-white/5 bg-white/5 p-6 text-center transition-all duration-300 hover:border-amber-500/30">
            <div className="relative mb-5 h-20 w-20 overflow-hidden rounded-xl border border-white/10 bg-black/50">
              <Image
                src="/images/header.webp"
                alt="Archive"
                fill
                priority={true} // LCP 경고 해결
                sizes="80px" // 성능 최적화 (콘솔 경고 해결)
                className="object-cover p-2 opacity-80 transition-opacity group-hover:opacity-100"
              />
            </div>
            <h3 className="mb-3 text-lg font-bold tracking-widest text-amber-500/90 uppercase">
              Archive
            </h3>
            <p className="text-xs leading-relaxed break-keep text-white/60">
              제가 쌓아온 무결점 지식 서가입니다. <br /> 이곳에서 오라버니의
              정제된 기록들을 모두 볼 수 있어요.
            </p>
          </div>

          {/* 🔬 Lab 섹션 */}
          <div className="group flex flex-col items-center rounded-2xl border border-white/5 bg-white/5 p-6 text-center transition-all duration-300 hover:border-amber-500/30">
            <div className="relative mb-5 h-20 w-20 overflow-hidden rounded-xl border border-white/10 bg-black/50">
              <Image
                src="/images/lab.webp"
                alt="Lab"
                fill
                priority={true}
                sizes="80px"
                className="object-cover p-2 opacity-80 transition-opacity group-hover:opacity-100"
              />
            </div>
            <h3 className="mb-3 text-lg font-bold tracking-widest text-amber-500/90 uppercase">
              Lab
            </h3>
            <p className="text-xs leading-relaxed break-keep text-white/60">
              지식을 활용한 실험 공간입니다. <br /> 여기서 제가 진행하는 다양한
              프로젝트들을 구경할 수 있어요.
            </p>
          </div>

          {/* 🤖 Librarian 섹션 */}
          <div className="group flex flex-col items-center rounded-2xl border border-white/5 bg-white/5 p-6 text-center transition-all duration-300 hover:border-amber-500/30">
            <div className="relative mb-5 h-20 w-20 overflow-hidden rounded-xl border border-white/10 bg-black/50">
              <Image
                src="/images/aiheader.webp"
                alt="Librarian"
                fill
                priority={true}
                sizes="80px"
                className="object-cover p-2 opacity-80 transition-opacity group-hover:opacity-100"
              />
            </div>
            <h3 className="mb-3 text-lg font-bold tracking-widest text-amber-500/90 uppercase">
              Librarian
            </h3>
            <p className="text-center text-xs leading-relaxed break-keep text-white/60">
              지능형 지식 사서 서비스입니다. <br /> 궁금한 게 있다면 여기서
              사서와 직접 대화를 나눠보세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
