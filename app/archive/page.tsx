import React, { Suspense } from 'react';
import ArchiveBasic from '@/components/archive/ArchiveBasic';
import TopicBar from '@/components/archive/TopicBar';
import RequestPill from '@/components/archive/RequestPill';
import TopButton from '@/components/common/TopButton';
import { getAllItems } from '@/lib/notion';

export const revalidate = 60;

export default async function ArchivePage() {
  const allData = await getAllItems();

  const folders = allData.reduce((acc: Record<string, string>, item) => {
    if (item.type === 'Folder') acc[item.id] = item.title;
    return acc;
  }, {});

  const dynamicTopics = allData
    .filter((item) => item.type === 'Folder')
    .map((folder) => folder.title);

  const allPosts = allData.filter((item) => item.type === 'Post');

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-40">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 flex flex-col gap-6 border-b border-white/5 pb-12 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <h1 className="font-main text-5xl font-black tracking-tighter text-white">
                Dechive:
              </h1>
              <span className="font-main text-3xl font-black tracking-tighter text-blue-500">
                Brain
              </span>
            </div>
          </div>
          <RequestPill />
        </div>

        {/* 🔥🔥🔥 여기가 핵심! TopicBar도 Suspense 안으로 쏙 넣었어 🔥🔥🔥 */}
        <Suspense
          fallback={
            <div className="py-20 text-center font-mono text-xs text-slate-600 italic">
              LOADING_BRAIN_ASSETS...
            </div>
          }
        >
          <TopicBar topics={dynamicTopics} />
          <ArchiveBasic posts={allPosts} folders={folders} />
        </Suspense>
      </div>
      <TopButton />
    </div>
  );
}
