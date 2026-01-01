import React from 'react';
import Image from 'next/image';

export default function CubeLogo() {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center">
      {/* unoptimized: GIF 애니메이션이 멈추지 않고 잘 돌게 해주는 옵션 */}
      <Image
        src="/cube.gif"
        alt="Knowledge Cube"
        width={40}
        height={40}
        className="object-contain"
        unoptimized
      />
    </div>
  );
}
