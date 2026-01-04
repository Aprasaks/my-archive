// app/archive/layout.tsx
import React from 'react';
import ArchiveSidebarContainer from '@/components/archive/ArchiveSidebarContainer';
import { getDirectoryTree } from '@/lib/posts';

export default function ArchiveLayout({
  children, // 여기가 'page.tsx(목록)' 또는 '[slug]/page.tsx(뷰어)'로 바뀜
}: {
  children: React.ReactNode;
}) {
  // 실제 사이드바 데이터 로드
  const tree = getDirectoryTree();

  return (
    // 전체 화면 컨테이너 (h-screen)
    <div className="flex h-screen w-full overflow-hidden bg-white font-sans text-gray-800">
      {/* === [왼쪽] 사이드바 (고정) === */}
      {/* 페이지가 바뀌어도 이 부분은 절대 사라지지 않음 */}
      <aside className="scrollbar-hide relative z-20 h-full w-64 overflow-y-auto border-r border-gray-100 bg-gray-50/80 backdrop-blur-sm">
        <ArchiveSidebarContainer tree={tree} />
      </aside>

      {/* === [오른쪽] 메인 영역 (가변) === */}
      {/* children 부분이 URL에 따라 List <-> Viewer로 교체됨 */}
      <main className="relative z-10 flex h-full flex-1 flex-col bg-white/30">
        {children}
      </main>
    </div>
  );
}
