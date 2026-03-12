import React, { Suspense } from 'react';
import ArchiveBasic from '@/components/archive/ArchiveBasic';
import TopicBar from '@/components/archive/TopicBar';
import RequestPill from '@/components/archive/RequestPill';
import TopButton from '@/components/common/TopButton';
import { getAllItems } from '@/lib/notion';

export const revalidate = 60;

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>; // topic은 여기서 안 씀!
}) {
  // 1. 노션 데이터 전체를 "딱 한 번만" 가져옴
  const allData = await getAllItems();
  const params = await searchParams;
  const query = params.q;

  // 2. Folder ID:이름 매핑 맵 생성
  const folders = allData.reduce((acc: Record<string, string>, item) => {
    if (item.type === 'Folder') acc[item.id] = item.title;
    return acc;
  }, {});

  // 3. 상단 TopicBar에 보여줄 폴더 이름들
  const dynamicTopics = allData
    .filter((item) => item.type === 'Folder')
    .map((folder) => folder.title);

  // 4. 필터링하지 않은 "전체" 포스트 목록
  // 서버에서 거르지 않고 클라이언트(ArchiveBasic)로 다 보냅니다.
  const allPosts = allData.filter((item) => item.type === 'Post');

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-40">
      <div className="mx-auto max-w-5xl px-6">
        {/* [1. 헤더] */}
        <div className="mb-20 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-baseline gap-2">
            <h1 className="font-isyun text-4xl font-black tracking-tighter text-white">
              Dechive:
            </h1>
            <span className="font-isyun text-2xl font-black tracking-tighter text-white">
              Brain
            </span>
          </div>
          <RequestPill />
        </div>

        {/* [2. 주제바] - 클라이언트 컴포넌트 */}
        <TopicBar topics={dynamicTopics} />

        {/* [3. 리스트 영역] */}
        <Suspense
          fallback={
            <div className="py-20 text-center font-mono text-xs text-slate-600 italic">
              INITIALIZING_BRAIN...
            </div>
          }
        >
          <ArchiveBasic
            posts={allPosts}
            folders={folders}
            initialQuery={query || ''}
          />
        </Suspense>
      </div>
      <TopButton />
    </div>
  );
}
