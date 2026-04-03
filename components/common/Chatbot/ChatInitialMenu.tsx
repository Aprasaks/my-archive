'use client';

import React from 'react';
import { ChatMode } from '@/types/chat';

interface Props {
  setChatMode: (mode: ChatMode) => void;
}

export default function ChatInitialMenu({ setChatMode }: Props) {
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
      {/* 챗봇의 인사말 (말풍선 스타일) */}
      <div className="self-start rounded-2xl rounded-tl-none bg-white/5 px-4 py-3 text-sm leading-relaxed text-white/70">
        안녕하세요 오늘도 좋은 하루에요.
        <br />
        무엇을 도와드릴까요?
      </div>

      {/* 선택지 버튼 영역 */}
      <div className="mt-2 flex flex-col gap-3">
        {/* 1. 일반 검색/채팅 모드로 이동 */}
        <button
          onClick={() => setChatMode('chat')}
          className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition-all hover:bg-white/10 hover:text-white"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🔍</span>
            <span>어떤 내용을 찾고 계신가요?</span>
          </div>
          <span className="text-white/30 transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>

        {/* 2. 디스코드 정보 요청 모드로 이동 (디스코드 블루 포인트 컬러) */}
        <button
          onClick={() => setChatMode('request')}
          className="group flex w-full items-center justify-between rounded-xl border border-[#5865F2]/20 bg-[#5865F2]/10 px-4 py-3 text-sm text-[#5865F2] transition-all hover:bg-[#5865F2]/20"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">📝</span>
            <span className="font-medium">찾는 정보가 없으신가요?</span>
          </div>
          <span className="text-[#5865F2]/50 transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </div>
  );
}
