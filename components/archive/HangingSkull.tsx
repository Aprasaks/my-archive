// components/archive/HangingSkull.tsx

'use client';

import React from 'react';
import Image from 'next/image';

// 🌟 fixed를 absolute로 바꾸고, 간격을 조절하는 props를 추가하자.
interface HangingSkullProps {
  topOffset?: string; // 오라버니가 말한 '적정 거리'를 조절할 숨겨진 키!
}

export default function HangingSkull({
  topOffset = '-210px',
}: HangingSkullProps) {
  return (
    /* 🌟 fixed -> absolute로 변경. 본문 보더 맨 오른쪽에 맞춤 */
    <div
      className="pointer-events-auto absolute right-0 z-50 cursor-pointer"
      /* 엉덩이를 보더에 붙이기 위해 topOffset만큼 위로 올림 */
      style={{ top: topOffset }}
    >
      <div className="relative h-64 w-24">
        <Image
          src="/images/wire.webp"
          alt="Dechive Skull on Border"
          fill
          /* 🌟 object-top이 아니라 object-contain으로 해골 전체를 보여줌 */
          className="object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
          priority
        />
      </div>
    </div>
  );
}
