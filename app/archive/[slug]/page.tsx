import React from 'react';
import { getPageBySlug, getPageContent } from '@/lib/notion';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
// ✅ Comments, CommentCount 임포트 삭제됨

// 🌟 1. 렌더러 컴포넌트와 타입 임포트
import NotionRenderer from '@/components/notion/NotionRenderer';
import { NotionBlock } from '@/types/notion';

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

/**
 * [이슈 38] 동적 메타데이터 생성
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPageBySlug(slug);
  if (!post) return { title: '페이지를 찾을 수 없음 | Dechive' };

  const title = `${post.title} | Dechive`;
  const description =
    post.description ||
    `인생 최적화 지식저장소 데카이브: ${post.title}에 대한 기록입니다.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://demian.dev/archive/${slug}`,
      siteName: 'Dechive',
      locale: 'ko_KR',
      type: 'article',
    },
  };
}

// --- 🏛️ 메인 페이지 컴포넌트 ---
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await getPageBySlug(slug);
  if (!post) notFound();

  // 노션에서 블록 데이터 가져오기 (타입 캐스팅)
  const rawBlocks = await getPageContent(post.id);
  const blocks = rawBlocks as unknown as NotionBlock[];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-transparent">
      {/* 🌟 1. 배경 어두움 처리 */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-black/40" />

      {/* 🌟 2. 메인 컨텐츠 컨테이너 */}
      <div className="relative z-10 mx-auto flex max-w-275 flex-col items-center px-6 pt-16 pb-60">
        {/* 🌟 3. 본문: 글래스모피즘 플레이트 */}
        <main className="relative w-full rounded-[40px] border border-white/10 bg-black/20 px-8 py-12 shadow-[0_50px_150px_rgba(0,0,0,0.8)] backdrop-blur-xs selection:bg-amber-500/30 selection:text-amber-100 md:px-20 md:py-16">
          {/* 🌟 [수정] 상단 네비게이션 & 메인 제목(Title) 영역 🌟 */}
          <div className="mb-12 flex items-center justify-between font-bold tracking-tight">
            <Link
              href="/archive"
              className="group flex items-center gap-2 text-[11px] tracking-[0.2em] text-white/30 uppercase transition-all hover:text-white"
            >
              <span className="transition-transform group-hover:-translate-x-1">
                ←
              </span>
              <span>서재로 돌아가기</span>
            </Link>

            <span className="max-w-[60%] text-right text-[11px] tracking-widest break-keep text-white/40 uppercase">
              {post.title}
            </span>
          </div>

          <header className="mb-16 text-left">
            <h1 className="font-main text-3xl leading-tight font-black tracking-tighter break-keep text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] md:text-4xl">
              {post.subtitle || post.title}
            </h1>

            {/* ✅ 날짜만 남기고 댓글 수(CommentCount) 삭제 */}
            <div className="mt-6 flex items-center gap-4 text-[10px] font-bold tracking-widest text-white/20 uppercase">
              <time>{new Date(post.date).toLocaleDateString('ko-KR')}</time>
            </div>
          </header>

          <NotionRenderer blocks={blocks} />

          {/* ✅ 하단 댓글 섹션(Comments) 전체 삭제됨 */}
        </main>
      </div>
    </div>
  );
}
