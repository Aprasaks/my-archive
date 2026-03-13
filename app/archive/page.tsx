import React, { Suspense } from 'react';
import ArchiveBasic from '@/components/archive/ArchiveBasic';
import TopicBar from '@/components/archive/TopicBar';
import RequestPill from '@/components/archive/RequestPill';
import TopButton from '@/components/common/TopButton';
import { getAllItems } from '@/lib/notion';

export const revalidate = 60;

export default async function ArchivePage() {
  // 1. 노션 데이터 전체를 서버 사이드에서 딱 한 번 가져옴
  const allData = await getAllItems();

  // 2. Folder ID:이름 매핑 맵 생성
  const folders = allData.reduce((acc: Record<string, string>, item) => {
    if (item.type === 'Folder') acc[item.id] = item.title;
    return acc;
  }, {});

  // 3. 상단 TopicBar에 보여줄 폴더 이름들
  const dynamicTopics = allData
    .filter((item) => item.type === 'Folder')
    .map((folder) => folder.title);

  // 4. 전체 포스트 목록 (필터링 없이 전송)
  const allPosts = allData.filter((item) => item.type === 'Post');

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-40">
      <div className="mx-auto max-w-5xl px-6">
        {/* 헤더 섹션 */}
        <div className="mb-12 flex flex-col gap-6 border-b border-white/5 pb-12 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <h1 className="font-isyun text-5xl font-black tracking-tighter text-white">
                Dechive:
              </h1>
              <span className="font-isyun text-3xl font-black tracking-tighter text-blue-500">
                Brain
              </span>
            </div>
            <p className="text-sm font-medium tracking-tight text-slate-500">
              지식의 파편들을 기록하고 연결합니다.
            </p>
          </div>
          <RequestPill />
        </div>

        {/* 주제 섹션바 */}
        <TopicBar topics={dynamicTopics} />

        {/* 검색 및 아코디언 리스트 섹션 */}
        <Suspense
          fallback={
            <div className="py-20 text-center font-mono text-xs text-slate-600 italic">
              LOADING_BRAIN_ASSETS...
            </div>
          }
        >
          <ArchiveBasic posts={allPosts} folders={folders} />
        </Suspense>
      </div>
      <TopButton />
    </div>
  );
}
