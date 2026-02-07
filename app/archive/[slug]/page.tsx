import React from 'react';
import { getPageBySlug, getPageContent } from '@/lib/notion';
import { notFound } from 'next/navigation';
import Link from 'next/link';
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
        if (annotations.bold) className += ' font-bold';
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
  if (type === 'image' && block.image) {
    const src =
      block.image.type === 'external'
        ? block.image.external?.url
        : block.image.file?.url;
    if (!src) return null;
    return (
      <figure className="my-10">
        <img
          src={src}
          alt="Notion Image"
          className="mx-auto max-w-[90%] rounded-xl shadow-md"
        />
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
          id={block.id}
          className="mt-10 mb-4 text-3xl font-black text-slate-900"
        >
          <TextRenderer richText={value.rich_text} />
        </h1>
      );
    case 'heading_2':
      return (
        <h2
          id={block.id}
          className="mt-8 mb-3 border-b pb-2 text-2xl font-bold text-slate-800"
        >
          <TextRenderer richText={value.rich_text} />
        </h2>
      );
    case 'paragraph':
      return (
        <p className="mb-3 text-lg leading-relaxed text-slate-700">
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
        id: b.id,
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
          <Link
            href="/archive"
            className="mb-6 inline-block text-sm font-medium text-slate-400 transition-colors hover:text-blue-600"
          >
            ← 목차로 돌아가기
          </Link>

          <header className="mb-10 border-b border-slate-100 pb-8">
            <div className="mb-4 flex items-center gap-3">
              {/* Type 뱃지만 남기고 날짜와 Post 텍스트 제거 */}
              {/* <span className="rounded bg-blue-600 px-2 py-0.5 text-[10px] font-black tracking-tighter text-white uppercase">
                {post.type}
              </span> */}
              <CommentCount
                slug={post.slug}
                className="text-xs text-slate-400"
              />
            </div>

            <h1 className="mb-6 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="cursor-default rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-500 transition-colors hover:bg-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <article className="prose prose-slate max-w-none">
            {blocks.map((block) => (
              <BlockRenderer key={block.id} block={block} />
            ))}
          </article>

          <div className="mt-16">
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
