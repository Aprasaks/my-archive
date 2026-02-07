import React from 'react';
import { getPageBySlug, getPageContent } from '@/lib/notion';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import TableOfContents, { TocItem } from '@/components/archive/TableOfContents';
import Comments from '@/components/archive/Comments';
import CommentCount from '@/components/archive/CommentCount';

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPageBySlug(slug);
  if (!post) return { title: '페이지를 찾을 수 없음' };
  return { title: post.title, description: `Demian's Archive: ${post.title}` };
}

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

interface BlockValue {
  rich_text: NotionRichText[];
  language?: string;
  icon?: { emoji?: string };
}

interface NotionBlock {
  id: string;
  type: string;
  heading_1?: BlockValue;
  heading_2?: BlockValue;
  heading_3?: BlockValue;
  paragraph?: BlockValue;
  bulleted_list_item?: BlockValue;
  numbered_list_item?: BlockValue;
  code?: BlockValue;
  quote?: BlockValue;
  callout?: BlockValue;
  image?: {
    type: 'external' | 'file';
    external?: { url: string };
    file?: { url: string };
    caption?: NotionRichText[];
  };
  divider?: Record<string, never>;
}

function TextRenderer({ richText }: { richText: NotionRichText[] }) {
  if (!richText) return null;
  return (
    <>
      {richText.map((text, index) => {
        const { annotations } = text;
        let className = '';
        if (annotations.bold) className += ' font-bold text-slate-900';
        if (annotations.italic) className += ' italic';
        if (annotations.strikethrough) className += ' line-through opacity-50';
        if (annotations.underline) className += ' underline underline-offset-4';
        if (annotations.code)
          className +=
            ' bg-slate-100 text-blue-600 font-mono px-1 rounded text-[0.9em] border border-slate-200';
        return (
          <span key={index} className={className}>
            {text.plain_text}
          </span>
        );
      })}
    </>
  );
}

function BlockRenderer({ block }: { block: NotionBlock }) {
  const { type } = block;
  // ID 정규화: 하이픈을 제거하여 TOC의 href와 일치시킵니다.
  const normalizedId = block.id.replace(/-/g, '');

  if (type === 'image' && block.image) {
    const src =
      block.image.type === 'external'
        ? block.image.external?.url
        : block.image.file?.url;
    if (!src) return null;
    return (
      <figure className="my-10 flex flex-col items-center justify-center">
        <div className="relative w-full max-w-150 overflow-hidden rounded-xl border border-slate-100 shadow-md">
          <Image
            src={src}
            alt="Notion Image"
            width={600}
            height={400}
            className="h-auto w-full object-contain"
            unoptimized
          />
        </div>
      </figure>
    );
  }

  if (type === 'divider') return <hr className="my-8 border-slate-100" />;

  const value = block[
    type as keyof Omit<NotionBlock, 'id' | 'type'>
  ] as BlockValue;
  if (!value?.rich_text) return null;

  switch (type) {
    case 'heading_1':
      return (
        <h1
          id={normalizedId}
          className="mt-12 mb-6 scroll-mt-24 text-3xl font-black text-slate-900"
        >
          <TextRenderer richText={value.rich_text} />
        </h1>
      );
    case 'heading_2':
      return (
        <h2
          id={normalizedId}
          className="mt-10 mb-4 scroll-mt-24 border-b pb-2 text-2xl font-bold text-slate-800"
        >
          <TextRenderer richText={value.rich_text} />
        </h2>
      );
    case 'heading_3':
      return (
        <h3
          id={normalizedId}
          className="mt-8 mb-3 scroll-mt-24 text-xl font-bold text-slate-800"
        >
          <TextRenderer richText={value.rich_text} />
        </h3>
      );
    case 'paragraph':
      return (
        <p className="mb-4 text-lg leading-relaxed text-slate-700">
          <TextRenderer richText={value.rich_text} />
        </p>
      );
    case 'bulleted_list_item':
      return (
        <li className="mb-2 ml-6 list-disc pl-1 text-slate-700">
          <TextRenderer richText={value.rich_text} />
        </li>
      );
    case 'numbered_list_item':
      return (
        <li className="mb-2 ml-6 list-decimal pl-1 text-slate-700">
          <TextRenderer richText={value.rich_text} />
        </li>
      );
    case 'code':
      return (
        <pre className="my-6 overflow-x-auto rounded-lg bg-slate-900 p-4 font-mono text-sm text-slate-50">
          <code>{value.rich_text[0]?.plain_text}</code>
        </pre>
      );
    default:
      return null;
  }
}

function extractToc(blocks: NotionBlock[]): TocItem[] {
  return blocks
    .filter((b) => b.type.startsWith('heading_'))
    .map((b) => {
      const val = b[b.type as keyof NotionBlock] as BlockValue;
      return {
        // 본문의 ID 정규화 규칙과 동일하게 하이픈을 제거합니다.
        id: b.id.replace(/-/g, ''),
        text: val?.rich_text[0]?.plain_text || '',
        level: parseInt(b.type.split('_')[1]),
      };
    });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await getPageBySlug(slug);
  if (!post) notFound();

  const rawBlocks = await getPageContent(post.id);
  const blocks = rawBlocks as unknown as NotionBlock[];
  const toc = extractToc(blocks);

  return (
    <div className="min-h-screen bg-white px-6 pt-12 pb-20 font-sans">
      <div className="mx-auto flex max-w-7xl gap-10">
        <main className="min-w-0 flex-1">
          <div className="mb-10 flex items-center justify-between">
            <Link
              href="/archive"
              className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-600"
            >
              ← 목차로 돌아가기
            </Link>

            <div className="flex items-center gap-2 text-[11px] font-bold tracking-tight text-slate-400 uppercase">
              <span>Published at</span>
              <time>
                {new Date(post.date).toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </time>
              <CommentCount slug={post.slug} />
            </div>
          </div>

          <header className="mb-10">
            <h1 className="text-4xl leading-[1.2] font-black tracking-tight text-slate-900 md:text-5xl">
              {post.title}
            </h1>
          </header>

          <article className="prose prose-slate max-w-none border-b border-slate-100 pb-10">
            {blocks.map((block) => (
              <BlockRenderer key={block.id} block={block} />
            ))}
          </article>

          {post.tags.length > 0 && (
            <section className="mt-8 mb-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-slate-100 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-500"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12">
            <Comments slug={post.slug} />
          </div>
        </main>

        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-12">
            <TableOfContents toc={toc} />
          </div>
        </aside>
      </div>
    </div>
  );
}
