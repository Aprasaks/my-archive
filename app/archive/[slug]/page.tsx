import React from 'react';
import { getPageBySlug, getPageContent } from '@/lib/notion';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// ---------------------------------------------------------
// [0. 타입 정의]
// ---------------------------------------------------------

// 1. 텍스트 스타일(Annotations) 타입
interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

// 2. 리치 텍스트(RichText) 타입
interface NotionRichText {
  plain_text: string;
  annotations: Annotations;
  href?: string | null;
}

// 3. 블록(Block) 타입
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

        // 기본 스타일
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

        // 색상 처리
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

  // 1. 이미지 처리
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

  // 2. 구분선 처리
  if (type === 'divider') {
    return <hr className="my-8 border-slate-200" />;
  }

  // 3. 텍스트 블록 처리
  // TypeScript에게 타입을 단언하여 접근
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value = (block as any)[type];
  if (!value || !value.rich_text) return null;

  switch (type) {
    case 'heading_1':
      return (
        <h1 className="mt-10 mb-4 text-3xl font-bold text-slate-900">
          <TextRenderer richText={value.rich_text} />
        </h1>
      );
    case 'heading_2':
      return (
        <h2 className="mt-8 mb-3 border-b pb-2 text-2xl font-semibold text-slate-800">
          <TextRenderer richText={value.rich_text} />
        </h2>
      );
    case 'heading_3':
      return (
        <h3 className="mt-6 mb-2 text-xl font-medium text-slate-800">
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

    // 👉 [수정됨] pl-[40px] -> pl-10 (Tailwind 표준 클래스 사용)
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
// [3. 메인 페이지] Page Component
// ---------------------------------------------------------
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPageBySlug(slug);

  if (!post) notFound();

  // 👉 [수정됨] 불필요한 eslint-disable 주석 제거됨
  const rawBlocks = await getPageContent(post.id);
  const blocks = rawBlocks as unknown as NotionBlock[];

  return (
    <div className="min-h-screen bg-white px-6 pt-24 pb-20">
      <div className="mx-auto max-w-3xl">
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

        {/* 👉 [수정됨] min-h-[400px] -> min-h-96 (384px, 표준 클래스)로 변경하여 경고 제거 */}
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
      </div>
    </div>
  );
}
