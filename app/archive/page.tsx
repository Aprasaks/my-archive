// app/archive/page.tsx
import React from 'react';
import { getAllItems } from '@/lib/notion';
import FileTree from '@/components/archive/FileTree';

export const revalidate = 60; // 60초마다 데이터 갱신 (ISR)

export default async function ArchivePage() {
  const items = await getAllItems();

  return (
    <div className="min-h-screen bg-slate-50 px-6 pt-24 pb-20">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* 헤더 */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Knowledge Archive
          </h1>
          <p className="text-lg text-slate-500">
            노션에 기록된 지식의 파편들을 탐험해보세요.
          </p>
        </div>

        {/* 트리 컴포넌트 */}
        <FileTree items={items} />
      </div>
    </div>
  );
}
