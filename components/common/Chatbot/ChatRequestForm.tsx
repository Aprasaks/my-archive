'use client';

import React, { useState } from 'react';
import { ChatMode, RequestStatus } from '@/types/chat';

interface Props {
  setChatMode: (mode: ChatMode) => void;
}

// 디스코드 아이콘 (오라버니 코드 그대로!)
const DiscordIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.5151.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.8156 8.18 1.8156 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
  </svg>
);

export default function ChatRequestForm({ setChatMode }: Props) {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<RequestStatus>('idle');

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setStatus('sending');

    try {
      const response = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error('전송 실패');

      setStatus('success');
      setMessage('');
    } catch (error) {
      console.error(error);
      alert('전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
      setStatus('idle');
    }
  };

  // 🌟 성공 화면 UI (오라버니가 짰던 모달 성공 UI를 챗봇 규격에 맞게 축소)
  if (status === 'success') {
    return (
      <div className="animate-in fade-in zoom-in flex flex-1 flex-col items-center justify-center p-6 text-center duration-300">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-black text-white">전송 완료!</h3>
        <p className="mb-8 text-xs leading-relaxed text-slate-400">
          오라버니의 소중한 의견이 창고로 전달됐어요.
          <br />
          빠르게 검토 후 업데이트할게요! 🚀
        </p>
        <button
          onClick={() => {
            setStatus('idle');
            setChatMode('initial');
          }}
          className="w-full rounded-xl bg-white/10 py-3 text-sm font-bold text-white transition-all hover:bg-white/20"
        >
          처음으로 돌아가기
        </button>
      </div>
    );
  }

  // 📝 기본 폼 입력 화면
  return (
    <div className="animate-in fade-in flex flex-1 flex-col gap-4 p-6 duration-300">
      <div className="self-start rounded-2xl rounded-tl-none bg-[#5865F2]/10 px-4 py-3 text-sm leading-relaxed text-[#5865F2]">
        원하는 지식이 없다면 말씀해주세요!
        <br />
        최우선으로 기록할게요.
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={status === 'sending'}
        placeholder="예: tailwind 정리본 요청드려요"
        className="h-32 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white placeholder-white/30 transition-colors focus:border-[#5865F2]/50 focus:outline-none"
      />

      <div className="mt-auto flex flex-col gap-2">
        <button
          onClick={handleSubmit}
          disabled={!message.trim() || status === 'sending'}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all ${
            status === 'sending'
              ? 'cursor-not-allowed bg-white/5 text-slate-500'
              : 'bg-[#5865F2] hover:bg-[#4752C4] hover:shadow-[0_0_15px_rgba(88,101,242,0.4)]'
          }`}
        >
          {status === 'idle' && <DiscordIcon />}
          {status === 'sending' ? '보내는 중...' : '지식 추가 요청'}
        </button>
        <button
          onClick={() => setChatMode('initial')}
          className="py-2 text-[10px] tracking-wider text-white/30 uppercase transition-colors hover:text-white/60"
        >
          ← Back to Menu
        </button>
      </div>
    </div>
  );
}
