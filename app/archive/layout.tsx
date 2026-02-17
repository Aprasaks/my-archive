// app/archive/layout.tsx
import React from 'react';

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // bg-white와 그라디언트 배경을 지우고 투명하게(bg-transparent) 설정
    <div className="min-h-screen bg-transparent">{children}</div>
  );
}
