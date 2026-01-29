// app/archive/layout.tsx

import React from 'react';

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 배경: 격자무늬 (Grid Pattern)
    // 사이드바 없이 children만 렌더링함
    <div className="bg-size[:4rem_4rem] min-h-screen bg-white bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)]">
      {children}
    </div>
  );
}
