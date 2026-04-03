'use client';

import React, { useEffect, useRef } from 'react';
import { ChatMode, Message } from '@/types/chat';

interface Props {
  inputValue: string;
  setInputValue: (val: string) => void;
  messages: Message[];
  handleSend: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;

  setChatMode: (mode: ChatMode) => void;
}

export default function ChatConversation({
  inputValue,
  setInputValue,
  messages,
  handleSend,
  handleKeyDown,
  setChatMode,
}: Props) {
  // 💡 센스 추가: 메시지가 길어지면 자동으로 맨 아래로 스크롤되도록 ref 하나 달았어!
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {/* 채팅 메시지 영역 */}
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-4 overflow-y-auto scroll-smooth p-6"
      >
        {/* 최초 안내 말풍선 */}
        <div className="self-start rounded-2xl rounded-tl-none bg-white/5 px-4 py-3 text-sm leading-relaxed text-white/70">
          궁금한 키워드를 입력해주세요!
        </div>

        {/* 메시지 맵핑 */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
              msg.sender === 'bot'
                ? 'self-start rounded-2xl rounded-tl-none bg-white/5 text-white/70'
                : 'self-end rounded-2xl rounded-tr-none border border-amber-500/20 bg-amber-900/30 text-amber-50/90'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* 입력창 영역 */}
      <div className="bg-black/40 p-4">
        {/* 뒤로 가기 버튼 */}
        <div className="mb-2">
          <button
            onClick={() => setChatMode('initial')}
            className="text-[10px] tracking-wider text-white/30 uppercase transition-colors hover:text-white/60"
          >
            ← Back to Menu
          </button>
        </div>

        {/* 실제 입력 폼 */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question..."
            className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-white/20 transition-colors focus:border-amber-500/50 focus:ring-0 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="shrink-0 rounded-lg bg-amber-900/40 px-4 py-2 text-xs font-medium text-amber-200/70 transition-colors hover:bg-amber-800/60"
          >
            전송
          </button>
        </div>
      </div>
    </>
  );
}
