'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useChat } from '@/hooks/useChat';

export default function ChatBot() {
  const {
    isOpen,
    setIsOpen,
    inputValue,
    setInputValue,
    messages,
    handleSend,
    handleKeyDown,
  } = useChat();

  return (
    <div className="fixed right-6 bottom-24 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            // 🌟 괄호 클래스 제거! width는 테일윈드 표준(w-80, sm:w-96), height는 명확하게 style로 분리
            style={{ height: '500px' }}
            className="mb-4 flex w-80 flex-col overflow-hidden rounded-2xl border border-white/5 bg-black/60 backdrop-blur-md sm:w-96"
          >
            {/* 헤더 */}
            <div className="flex items-center gap-3 bg-white/5 px-4 py-3">
              <div className="relative h-8 w-8 shrink-0">
                <Image
                  src="/images/aiheader.webp"
                  alt="Librarian"
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </div>
              {/* text-[10px] 대신 text-xs 적용 */}
              <span className="text-xs font-medium tracking-widest text-amber-200/40 uppercase">
                Archive Librarian
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto text-lg text-white/20 transition-colors hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* 메시지 영역 */}
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  // 🌟 max-w-[85%] 대신 테일윈드 표준 max-w-4/5 (80%) 사용
                  className={`max-w-4/5 px-4 py-3 text-sm leading-relaxed ${
                    msg.sender === 'bot'
                      ? 'self-start rounded-2xl rounded-tl-none bg-white/5 text-white/70'
                      : 'self-end rounded-2xl rounded-tr-none border border-amber-500/20 bg-amber-900/30 text-amber-50/90'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* 입력창 */}
            <div className="bg-black/40 p-4">
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* 트리거 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-16 w-32 transition-transform active:scale-95"
      >
        <Image
          src="/images/aiheader.webp"
          alt="Chat Trigger"
          fill
          priority
          sizes="128px"
          className="object-contain opacity-80 transition-opacity hover:opacity-100"
        />
      </button>
    </div>
  );
}
