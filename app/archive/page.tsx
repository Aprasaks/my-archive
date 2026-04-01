import React, { Suspense } from 'react';
import ArchiveClient from '@/components/archive/ArchiveClient';
import { getAllItems } from '@/lib/notion';
import { NotionItem, Post, FolderMap } from '@/types/archive'; // 🌟 타입들 총동원

export const revalidate = 60;

export default async function ArchivePage() {
  // 🌟 getAllItems 결과가 NotionItem 배열이라고 명시!
  const allData: NotionItem[] = await getAllItems();

  // 1. 폴더 데이터 매핑 (any 삭제)
  const folders: FolderMap = allData.reduce(
    (acc: FolderMap, item: NotionItem) => {
      if (item.type === 'Folder') acc[item.id] = item.title;
      return acc;
    },
    {}
  );

  // 2. 카테고리 목록 추출 (any 삭제)
  const dynamicTopics: string[] = allData
    .filter((item: NotionItem) => item.type === 'Folder')
    .map((folder: NotionItem) => folder.title);

  // 3. 실제 포스트 추출 (any 삭제)
  const allPosts: Post[] = allData.filter(
    (item: NotionItem) => item.type === 'Post'
  );

  return (
    <div className="min-h-screen pt-24 pb-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Suspense
          fallback={
            <div className="py-20 text-center font-mono text-xs text-slate-400 italic">
              INITIALIZING_DECHIVE...
            </div>
          }
        >
          <ArchiveClient
            initialPosts={allPosts}
            folders={folders}
            topics={dynamicTopics}
          />
        </Suspense>
      </div>
    </div>
  );
}
