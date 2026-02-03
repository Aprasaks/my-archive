import React from 'react';
import { getPageBySlug, getPageContent } from '@/lib/notion';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
// 👇 [추가] 목차 컴포넌트 불러오기 (Step 2에서 만든 파일)
import TableOfContents, { TocItem } from '@/components/archive/TableOfContents';
import Comments from '@/components/archive/Comments';
import CommentCount from '@/components/archive/CommentCount';
// ---------------------------------------------------------
// [0-1. SEO 메타데이터 생성기]
// ---------------------------------------------------------
type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPageBySlug(slug);

  if (!post) {
    return { title: '페이지를 찾을 수 없음' };
  }

  return {
    title: post.title,
    description: `Demian's Archive: ${post.title} - ${post.tags.join(', ')}`,
    openGraph: {
      title: post.title,
      description: `Demian의 지식 저장소에서 ${post.title}에 대해 알아보세요.`,
      url: `https://demian.dev/archive/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: ['Demian'],
      tags: post.tags,
    },
    keywords: [...post.tags, 'Demian', 'Tech Blog'],
  };
}

// ---------------------------------------------------------
// [0. 타입 정의]
// ---------------------------------------------------------
interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

interface NotionRichText {
  plain_text: string;
  annotations: Annotations;
  href?: string | null;
}

interface NotionBlock {
  id: string;
  type: string;
  heading_1?: { rich_text: NotionRichText[] };
  heading_2?: { rich_text: NotionRichText[] };
  heading_3?: { rich_text: NotionRichText[] };
  paragraph?: { rich_text: NotionRichText[] };
  bulleted_list_item?: { rich_text: NotionRichText[] };
  numbered_list_item?: { rich_text: NotionRichText[] };
  code?: { rich_text: NotionRichText[]; language: string };
  quote?: { rich_text: NotionRichText[] };
  callout?: { rich_text: NotionRichText[]; icon?: { emoji?: string } };
  image?: {
    type: 'external' | 'file';
    external?: { url: string };
    file?: { url: string };
    caption?: NotionRichText[];
  };
  divider?: Record<string, never>;
}

// ---------------------------------------------------------
// [1. 스타일 변환기] TextRenderer
// ---------------------------------------------------------
function TextRenderer({ richText }: { richText: NotionRichText[] }) {
  if (!richText) return null;

  return (
    <>
      {richText.map((text, index) => {
        const { annotations } = text;
        const content = text.plain_text;
        let className = '';

        if (annotations.bold) className += ' font-bold';
        if (annotations.italic) className += ' italic';
        if (annotations.strikethrough)
          className += ' line-through text-slate-400';
        if (annotations.underline)
          className += ' underline decoration-slate-300 underline-offset-4';
        if (annotations.code) {
          className +=
            ' bg-slate-100 text-red-500 font-mono px-1.5 py-0.5 rounded text-sm mx-0.5 border border-slate-200';
        }

        switch (annotations.color) {
          case 'gray':
            className += ' text-gray-500';
            break;
          case 'brown':
            className += ' text-amber-700';
            break;
          case 'orange':
            className += ' text-orange-600';
            break;
          case 'yellow':
            className += ' text-yellow-600';
            break;
          case 'green':
            className += ' text-green-600';
            break;
          case 'blue':
            className += ' text-blue-600';
            break;
          case 'purple':
            className += ' text-purple-600';
            break;
          case 'pink':
            className += ' text-pink-600';
            break;
          case 'red':
            className += ' text-red-600';
            break;
          case 'gray_background':
            className += ' bg-gray-100 px-1 rounded';
            break;
          case 'brown_background':
            className += ' bg-amber-100 px-1 rounded';
            break;
          case 'orange_background':
            className += ' bg-orange-100 px-1 rounded';
            break;
          case 'yellow_background':
            className += ' bg-yellow-100 px-1 rounded';
            break;
          case 'green_background':
            className += ' bg-green-100 px-1 rounded';
            break;
          case 'blue_background':
            className += ' bg-blue-100 px-1 rounded';
            break;
          case 'purple_background':
            className += ' bg-purple-100 px-1 rounded';
            break;
          case 'pink_background':
            className += ' bg-pink-100 px-1 rounded';
            break;
          case 'red_background':
            className += ' bg-red-100 px-1 rounded';
            break;
        }

        return (
          <span key={index} className={className}>
            {content}
          </span>
        );
      })}
    </>
  );
}

// ---------------------------------------------------------
// [2. 블록 렌더러] BlockRenderer
// ---------------------------------------------------------
function BlockRenderer({ block }: { block: NotionBlock }) {
  const { type } = block;

  if (type === 'image' && block.image) {
    const image = block.image;
    const src =
      image.type === 'external' ? image.external?.url : image.file?.url;
    const caption = image.caption?.[0]?.plain_text || '';

    if (!src) return null;

    return (
      <figure className="my-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={caption || 'Notion Image'}
          className="h-auto w-full rounded-xl border border-slate-100 object-cover shadow-lg"
        />
        {caption && (
          <figcaption className="mt-3 text-center text-sm text-slate-500 italic">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (type === 'divider') return <hr className="my-8 border-slate-200" />;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value = (block as any)[type];
  if (!value || !value.rich_text) return null;

  switch (type) {
    case 'heading_1':
      return (
        <h1
          id={block.id}
          className="mt-10 mb-4 scroll-mt-24 text-3xl font-bold text-slate-900"
        >
          <TextRenderer richText={value.rich_text} />
        </h1>
      );
    case 'heading_2':
      return (
        <h2
          id={block.id}
          className="mt-8 mb-3 scroll-mt-24 border-b pb-2 text-2xl font-semibold text-slate-800"
        >
          <TextRenderer richText={value.rich_text} />
        </h2>
      );
    case 'heading_3':
      return (
        <h3
          id={block.id}
          className="mt-6 mb-2 scroll-mt-24 text-xl font-medium text-slate-800"
        >
          <TextRenderer richText={value.rich_text} />
        </h3>
      );
    case 'paragraph':
      if (value.rich_text.length === 0) return <div className="h-4" />;
      return (
        <p className="mb-2 text-lg leading-relaxed text-slate-700">
          <TextRenderer richText={value.rich_text} />
        </p>
      );
    case 'bulleted_list_item':
      return (
        <li className="mb-1 list-disc pl-10 leading-relaxed text-slate-700">
          <TextRenderer richText={value.rich_text} />
        </li>
      );
    case 'numbered_list_item':
      return (
        <li className="mb-1 list-decimal pl-10 leading-relaxed text-slate-700">
          <TextRenderer richText={value.rich_text} />
        </li>
      );
    case 'code':
      return (
        <div className="group relative my-6">
          <div className="absolute top-2 right-2 rounded bg-slate-800 px-2 py-1 text-xs text-slate-400 select-none">
            {value.language}
          </div>
          <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 font-mono text-sm leading-relaxed text-slate-50">
            <code>{value.rich_text[0]?.plain_text}</code>
          </pre>
        </div>
      );
    case 'quote':
      return (
        <blockquote className="my-4 rounded-r border-l-4 border-blue-500 bg-blue-50 py-2 pl-4 text-slate-700 italic">
          <TextRenderer richText={value.rich_text} />
        </blockquote>
      );
    case 'callout':
      return (
        <div className="my-4 flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-700">
          <span className="text-xl select-none">
            {value.icon?.emoji || '💡'}
          </span>
          <div className="flex-1">
            <TextRenderer richText={value.rich_text} />
          </div>
        </div>
      );
    default:
      return null;
  }
}

// ---------------------------------------------------------
// [3. 목차 추출 함수] extractToc (새로 추가됨!)
// ---------------------------------------------------------
function extractToc(blocks: NotionBlock[]): TocItem[] {
  const toc: TocItem[] = [];

  blocks.forEach((block) => {
    if (block.type === 'heading_1' && block.heading_1) {
      toc.push({
        id: block.id,
        text: block.heading_1.rich_text[0]?.plain_text || '',
        level: 1,
      });
    } else if (block.type === 'heading_2' && block.heading_2) {
      toc.push({
        id: block.id,
        text: block.heading_2.rich_text[0]?.plain_text || '',
        level: 2,
      });
    } else if (block.type === 'heading_3' && block.heading_3) {
      toc.push({
        id: block.id,
        text: block.heading_3.rich_text[0]?.plain_text || '',
        level: 3,
      });
    }
  });

  return toc;
}

// ---------------------------------------------------------
// [4. 메인 페이지] Page Component (레이아웃 변경됨!)
// ---------------------------------------------------------
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await getPageBySlug(slug);

  if (!post) notFound();

  // Notion 블록 가져오기
  const rawBlocks = await getPageContent(post.id);
  const blocks = rawBlocks as unknown as NotionBlock[];

  // 👉 목차 데이터 추출!
  const toc = extractToc(blocks);

  return (
    <div className="min-h-screen bg-white px-6 pt-24 pb-20">
      {/* 👇 레이아웃 변경: flex로 좌우 배치 (최대 너비 7xl) */}
      <div className="mx-auto flex max-w-7xl gap-10">
        {/* 1. 왼쪽 본문 영역 (flex-1로 남은 공간 다 차지) */}
        <main className="min-w-0 flex-1">
          {/* 네비게이션 */}
          <Link
            href="/archive"
            className="mb-8 inline-flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
          >
            <span className="mr-1">←</span> 목차로 돌아가기
          </Link>

          {/* 헤더 */}
          <header className="mb-12 border-b border-slate-100 pb-8">
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-bold tracking-wider text-blue-700 uppercase">
                {post.type}
              </span>
              <span className="text-sm text-slate-400">
                {post.date.slice(0, 10)}
              </span>
              <CommentCount slug={post.slug} className="ml-1" />
            </div>
            <h1 className="mb-4 text-4xl leading-tight font-black text-slate-900 md:text-5xl">
              {post.title}
            </h1>
            {post.tags.length > 0 && (
              <div className="mt-4 flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* 본문 콘텐츠 */}
          <article className="prose prose-slate min-h-96 max-w-none">
            {blocks.length === 0 ? (
              <div className="rounded-xl bg-slate-50 p-8 text-center text-slate-500">
                <p>📝 아직 작성된 내용이 없습니다.</p>
              </div>
            ) : (
              blocks.map((block) => (
                <BlockRenderer key={block.id} block={block} />
              ))
            )}
          </article>
          <Comments slug={post.slug} />
        </main>

        {/* 2. 오른쪽 TOC 영역 (PC에서만 보임 / w-64 고정) */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">
            <TableOfContents toc={toc} />

            {/* 👇 나중에 여기가 광고 명당 자리! */}
            {/* <div className="mt-8 h-64 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 text-sm">광고 영역</div> */}
          </div>
        </aside>
      </div>
    </div>
  );
}
