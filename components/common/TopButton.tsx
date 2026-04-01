'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function TopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // 200px 이상 스크롤하면 나타나게 설정
      if (window.scrollY > 200) setIsVisible(true);
      else setIsVisible(false);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    // 이벤트 전파 방지 (혹시 모를 간섭 차단)
    e.preventDefault();
    e.stopPropagation();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    /* z-[9999]: 그 어떤 레이어보다 위에 있게 함
       pointer-events-auto: 부모가 클릭을 막아도 이 버튼은 클릭되게 함
    */
    <div
      className={`pointer-events-auto fixed right-10 bottom-10 z-9999 transition-all duration-500 ease-out ${
        isVisible
          ? 'translate-y-0 scale-100 opacity-100'
          : 'translate-y-20 scale-50 opacity-0'
      }`}
    >
      <button
        onClick={scrollToTop}
        className="group relative flex cursor-pointer flex-col items-center gap-2 transition-transform outline-none hover:scale-110 active:scale-90"
        aria-label="Scroll to top"
      >
        {/* 귀여운 해골 마스코트 */}
        <div className="relative h-20 w-20 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
          <Image
            src="/images/dechive-mascot.webp"
            alt="Back to top"
            fill
            priority // 버튼도 중요하니까 빨리 로드
            className="object-contain"
          />
        </div>

        {/* 안내 텍스트 */}
        <span className="rounded-full border border-blue-500/30 bg-blue-500/20 px-3 py-1 font-mono text-[10px] font-bold text-blue-400 opacity-0 shadow-xl backdrop-blur-md transition-opacity group-hover:opacity-100">
          TOP
        </span>
      </button>
    </div>
  );
}
