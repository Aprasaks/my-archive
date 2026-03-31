import React from 'react';

export default function Home() {
  return (
    /* 배경이 빠졌으므로, 단순히 화면 전체 높이를 차지하며 중앙 정렬만 수행 */
    <div className="flex h-screen w-full flex-col items-center justify-center text-center">
      {/* 타이틀을 시각적 중앙(살짝 위)으로 올리기 위한 여백(mb-32) 유지 */}
      <div className="mb-32 flex flex-col items-center md:mb-40">
        <h1 className="font-serif text-5xl font-light tracking-[0.4em] text-white/90 md:text-7xl lg:text-8xl">
          DECHIVE
        </h1>
        <p className="mt-6 font-sans text-[10px] font-light tracking-[0.6em] text-white/50 uppercase md:text-xs">
          Infinite Knowledge, Finite Brain
        </p>
      </div>
    </div>
  );
}
