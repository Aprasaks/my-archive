'use client';

import React, { useState } from 'react';

// 디스코드 아이콘
const DiscordIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.5151.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.8156 8.18 1.8156 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
  </svg>
);

export default function RequestPill() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  // 전송 버튼 눌렀을 때
  const handleSubmit = async () => {
    if (!message.trim()) return;

    setStatus('sending');

    // 👇 [나중에] 여기에 디스코드 웹훅 연결 코드를 넣으면 진짜로 날아감!
    // 지금은 1.5초 뒤에 성공했다고 치자.
    setTimeout(() => {
      setStatus('success');
      setMessage(''); // 입력창 초기화
    }, 1500);
  };

  // 모달 닫기 (성공 상태 초기화)
  const closeModal = () => {
    setIsOpen(false);
    // 닫힐 때 애니메이션 고려해서 약간 딜레이 후 상태 리셋
    setTimeout(() => setStatus('idle'), 300);
  };

  return (
    <>
      {/* 1. 알약 버튼 (클릭 시 모달 오픈) */}
      <div className="inline-flex items-center gap-3 rounded-full border border-slate-200/60 bg-white/60 px-5 py-2 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-md md:gap-4 md:py-3">
        <span className="pl-2 text-sm font-medium text-slate-600 md:text-base">
          원하시는 정보가 없으신가요?
        </span>
        <div className="h-4 w-px bg-slate-300"></div>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-sm font-bold text-[#5865F2] transition-colors hover:text-[#4752C4] hover:underline md:text-base"
        >
          <DiscordIcon />
          <span>요청하기</span>
        </button>
      </div>

      {/* 2. 모달 창 (isOpen일 때만 등장) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 배경 어둡게 (클릭하면 닫힘) */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          ></div>

          {/* 모달 컨텐츠 */}
          <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all">
            {/* 닫기 버튼 (X) */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
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

            {/* 상태별 화면 */}
            {status === 'success' ? (
              // ✅ 성공 화면
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-500">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-800">
                  전송되었습니다!
                </h3>
                <p className="mb-6 text-sm text-slate-500">
                  요청하신 내용이 디스코드 서버로 전달되었습니다.
                  <br />
                  빠르게 확인하고 반영할게요! 🚀
                </p>
                <button
                  onClick={closeModal}
                  className="w-full rounded-xl bg-slate-100 py-3 font-bold text-slate-700 transition-colors hover:bg-slate-200"
                >
                  닫기
                </button>
              </div>
            ) : (
              // 📝 입력 화면
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5865F2]/10 text-[#5865F2]">
                    <DiscordIcon />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">
                    정보 추가 요청
                  </h3>
                </div>

                <p className="mb-4 text-sm text-slate-500">
                  찾으시는 내용이 없나요? <br />
                  원하는 주제를 남겨주시면 정리해서 올려드릴게요!
                </p>

                <textarea
                  className="mb-4 h-32 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700 outline-none placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-[#5865F2]"
                  placeholder="예: 김치볶음밥 만드는 방법!"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={status === 'sending'}
                ></textarea>

                <button
                  onClick={handleSubmit}
                  disabled={!message.trim() || status === 'sending'}
                  className={`w-full rounded-xl py-3 font-bold text-white transition-all ${
                    status === 'sending'
                      ? 'cursor-not-allowed bg-slate-300'
                      : 'bg-[#5865F2] hover:bg-[#4752C4] hover:shadow-lg hover:shadow-indigo-500/30'
                  } `}
                >
                  {status === 'sending' ? '전송 중...' : '요청하기'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
