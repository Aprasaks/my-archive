'use client';

import React, { useState } from 'react';

// 디스코드 아이콘 (동일)
const DiscordIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.5151.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.8156 8.18 1.8156 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
  </svg>
);

export default function RequestPill() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

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

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setStatus('idle'), 300);
  };

  return (
    <div className="font-main">
      {/* 1. 알약 버튼 (다크 유리 질감 튜닝) */}
      <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/3 px-6 py-2.5 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-blue-500/30 hover:bg-white/5 md:gap-5">
        <span className="text-[13px] font-bold tracking-tight text-slate-400">
          원하시는 정보가 없으신가요?
        </span>
        <div className="h-3 w-px bg-white/10"></div>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-[13px] font-black text-[#5865F2] transition-all hover:scale-105 hover:text-[#7289da]"
        >
          <DiscordIcon />
          <span>요청하기</span>
        </button>
      </div>

      {/* 2. 모달 창 (다크 테마 튜닝) */}
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={closeModal}
          ></div>

          <div className="relative w-full max-w-md transform overflow-hidden rounded-4xl border border-white/10 bg-[#0f0f11] p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-slate-500 transition-colors hover:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {status === 'success' ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                  <svg
                    className="h-10 w-10"
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
                <h3 className="mb-3 text-2xl font-black text-white">
                  전송 완료!
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-slate-400">
                  형의 소중한 의견이 지식 창고로 전달됐어. <br />
                  빠르게 정리해서 아카이브에 올려줄게! 🚀
                </p>
                <button
                  onClick={closeModal}
                  className="w-full rounded-xl bg-white/5 py-4 font-bold text-white transition-all hover:bg-white/10"
                >
                  확인
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5865F2]/20 text-[#5865F2] shadow-[0_0_15px_rgba(88,101,242,0.2)]">
                    <DiscordIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">
                      정보 추가 요청
                    </h3>
                    <p className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                      Request System
                    </p>
                  </div>
                </div>

                <p className="mb-6 text-sm leading-relaxed text-slate-400">
                  창고에 없는 지식이 있다면 언제든 말해줘. <br />
                  형의 요청을 최우선으로 기록할게!
                </p>

                <textarea
                  className="mb-6 h-40 w-full resize-none rounded-2xl border border-white/5 bg-white/2 p-5 text-slate-200 transition-all outline-none placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-white/4"
                  placeholder="예: 리액트 상태 관리 라이브러리 비교 정리!"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={status === 'sending'}
                ></textarea>

                <button
                  onClick={handleSubmit}
                  disabled={!message.trim() || status === 'sending'}
                  className={`w-full rounded-2xl py-4 font-black tracking-widest text-white transition-all ${
                    status === 'sending'
                      ? 'cursor-not-allowed bg-white/5 text-slate-500'
                      : 'bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                  } `}
                >
                  {status === 'sending' ? '보내는 중...' : '지식 추가 요청'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
