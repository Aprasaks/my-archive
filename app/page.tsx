import React from 'react';
import Link from 'next/link';
import { getGoogleTrends } from '@/lib/trends';
import { getAllItems } from '@/lib/notion'; // 🛠️ 사용하지 않는 Post 타입 제거 (린트 에러 방지)

export const revalidate = 3600;

export default async function Home() {
  const [trends, allItems] = await Promise.all([
    getGoogleTrends(),
    getAllItems(),
  ]);

  const allPosts = allItems.filter((item) => item.type === 'Post');

  const trendsWithMatch = trends.map((trend) => {
    const keyword = trend.keyword.toLowerCase();

    const matchedPosts = allPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(keyword) ||
        p.tags.some((t) => t.toLowerCase().includes(keyword))
    );

    const matchCount = matchedPosts.length;
    let targetUrl = `/archive?q=${encodeURIComponent(trend.keyword)}`;
    let badgeText = null;

    if (matchCount > 0) {
      targetUrl = `/archive/${matchedPosts[0].slug}`;
      badgeText = matchCount === 1 ? '1 POST' : `${matchCount} POSTS`;
    }

    return {
      ...trend,
      targetUrl,
      badgeText,
    };
  });

  return (
    <div className="relative flex h-[calc(100vh-6rem)] w-full flex-col items-center justify-center overflow-hidden px-6">
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-12 md:flex-row md:items-center md:justify-center lg:justify-between">
        {/* 🚀 왼쪽 섹션: 구글 트렌드 보드 */}
        <div className="flex w-full flex-1 flex-col items-center lg:items-start">
          {/* 💎 형이 요청한 존재감 있는 타이틀 */}
          <div className="mb-6 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="h-6 w-0.75 bg-blue-500"></div>{' '}
              {/* w-[3px] 대신 표준 w-0.75 사용 */}
              <h2 className="font-main text-3xl font-black tracking-tighter text-white md:text-4xl">
                실시간 급상승 검색어
              </h2>
            </div>
          </div>

          <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-md">
            <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
              {trendsWithMatch.length > 0 ? (
                trendsWithMatch.map((trend) => (
                  <Link
                    key={trend.rank}
                    href={trend.targetUrl}
                    className="group flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors hover:bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-sm font-bold ${
                          trend.rank === 1
                            ? 'text-blue-400'
                            : trend.rank === 2
                              ? 'text-emerald-400'
                              : trend.rank === 3
                                ? 'text-amber-400'
                                : 'text-slate-600'
                        }`}
                      >
                        {String(trend.rank).padStart(2, '0')}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {/* max-w-[120px] 대신 표준 max-w-30 사용 */}
                        <span className="max-w-30 truncate text-[13px] font-medium text-slate-200 transition-colors group-hover:text-white group-hover:underline group-hover:decoration-blue-500/50 group-hover:underline-offset-4">
                          {trend.keyword}
                        </span>
                        {trend.badgeText && (
                          <span className="rounded border border-blue-500/30 bg-blue-500/20 px-1 py-0.5 text-[7px] font-bold whitespace-nowrap text-blue-400">
                            {trend.badgeText}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="font-mono text-[9px] text-slate-500">
                      {trend.traffic}
                    </span>
                  </Link>
                ))
              ) : (
                <div className="col-span-2 py-8 text-center font-mono text-xs text-slate-500">
                  데이터를 불러오는 중입니다...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 🚧 오른쪽 섹션: My Archive 예약 공간 */}
        <div className="flex w-full flex-col items-center opacity-40 transition-opacity hover:opacity-100 md:w-80 lg:items-end">
          {/* h-[280px] 대신 표준 h-70 사용 */}
          <div className="flex h-70 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-transparent p-6 text-center backdrop-blur-md">
            <span className="font-main mb-2 text-2xl tracking-widest text-slate-600">
              My Archive
            </span>
            <p className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
              Coming Next...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
