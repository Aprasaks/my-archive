import React from 'react';
import Image from 'next/image';

export default function CubeLogo() {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center">
      <Image
        src="/cubelogo.png" // 투명 배경으로 만든 파일명
        alt="Dechive Knowledge Cube"
        width={40}
        height={40}
        className="object-contain"
      />
    </div>
  );
}
