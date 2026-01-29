'use client';

import React from 'react';

export default function DateQuote() {
  // 오늘 날짜 포맷팅
  const today = new Date()
    .toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    .toUpperCase();

  return (
    <div className="animate-fade-in-up flex flex-col items-center gap-3 text-center">
      {/* 날짜 */}
      <div className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
        {today}
      </div>

      {/* 명언: 둥근 따옴표(“ ”)를 사용해서 에러 해결 & 디자인 업그레이드 */}
      <p className="text-sm font-medium text-slate-600 italic md:text-base">
        “기록하지 않는 것은 기억되지 않는다.”
      </p>
    </div>
  );
}
