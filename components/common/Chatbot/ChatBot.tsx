'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useChat } from '@/hooks/useChat';
import { ChatMode } from '@/types/chat';

// 앞으로 우리가 만들 하위 컴포넌트 3인방
import ChatInitialMenu from './ChatInitialMenu';
import ChatConversation from './ChatConversation';
import ChatRequestForm from './ChatRequestForm';

export default function ChatBot() {
  // 기존에 쓰던 useChat 훅에서 필요한 것만 빼오기
  const chatProps = useChat();
  const { isOpen, setIsOpen } = chatProps;

  // 🌟 화면 전환을 위한 상태 관리
  const [chatMode, setChatMode] = useState<ChatMode>('initial');

  // 모달 창 닫을 때 무조건 초기 화면으로 리셋되게 하는 함수
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setChatMode('initial'), 300);
  };

  return (
    <div className="fixed right-6 bottom-24 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            style={{ height: '500px' }}
            className="mb-4 flex w-80 flex-col overflow-hidden rounded-2xl border border-white/5 bg-black/60 backdrop-blur-md sm:w-96"
          >
            {/* 공통 헤더 */}
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
              <span className="text-xs font-medium tracking-widest text-amber-200/40 uppercase">
                Archive Librarian
              </span>
              <button
                onClick={handleClose}
                className="ml-auto text-lg text-white/20 transition-colors hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* 조건부 렌더링 (모드에 따라 화면 교체) */}
            {chatMode === 'initial' && (
              <ChatInitialMenu setChatMode={setChatMode} />
            )}
            {chatMode === 'chat' && (
              <ChatConversation {...chatProps} setChatMode={setChatMode} />
            )}
            {chatMode === 'request' && (
              <ChatRequestForm setChatMode={setChatMode} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 트리거 버튼 (동일) */}
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
