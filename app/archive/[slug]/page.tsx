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

/**
 * [이슈 31, 32] 동적 메타데이터 생성 및 도메인 정규화
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPageBySlug(slug);

  if (!post) {
    return {
      title: '페이지를 찾을 수 없음 | Dechive',
    };
  }

  const title = `${post.title} | Dechive`;
  const description = `인생 최적화 지식저장소 데카이브: ${post.title}에 대한 깊이 있는 기록입니다.`;
  const siteUrl = 'https://demian.dev'; // 도메인 통일

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/archive/${slug}`,
      siteName: 'Dechive',
      locale: 'ko_KR',
      type: 'article',
      images: [
        {
          url: '/icon.png', // public/icon.png (Recall Engine 크롭 버전)
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
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
  video?: {
    type: 'external' | 'file';
    external?: { url: string };
    file?: { url: string };
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
        if (annotations.bold)
          className +=
            ' font-bold text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]';
        if (annotations.italic) className += ' italic text-slate-50';
        if (annotations.strikethrough) className += ' line-through opacity-40';
        if (annotations.underline)
          className += ' underline underline-offset-4 decoration-blue-500/60';
        if (annotations.code)
          className +=
            ' bg-white/15 text-blue-300 font-mono px-1.5 py-0.5 rounded text-[0.85em] border border-white/10';

        if (text.href) {
          return (
            <Link
              key={index}
              href={text.href}
              className={`${className} text-blue-400 underline decoration-blue-400/30 transition-colors hover:text-blue-300 hover:decoration-blue-300`}
            >
              {text.plain_text}
            </Link>
          );
        }

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
  const normalizedId = block.id.replace(/-/g, '');

  if (type === 'video' && block.video) {
    const src =
      block.video.type === 'external'
        ? block.video.external?.url
        : block.video.file?.url;
    if (!src) return null;

    if (src.includes('youtube.com') || src.includes('youtu.be')) {
      const videoId = src.includes('youtu.be')
        ? src.split('/').pop()
        : new URL(src).searchParams.get('v');
      return (
        <div className="my-14 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
    return (
      <video
        controls
        className="my-14 w-full rounded-2xl border border-white/10 shadow-2xl"
      >
        <source src={src} />
      </video>
    );
  }

  if (type === 'image' && block.image) {
    const src =
      block.image.type === 'external'
        ? block.image.external?.url
        : block.image.file?.url;
    if (!src) return null;
    return (
      <figure className="my-14 flex flex-col items-center justify-center">
        <div className="relative w-full overflow-hidden rounded-2xl border border-white/5 shadow-2xl">
          <Image
            src={src}
            alt="Post content"
            width={1000}
            height={600}
            className="h-auto w-full object-contain"
            unoptimized
          />
        </div>
      </figure>
    );
  }

  if (type === 'divider') return <hr className="my-12 border-white/10" />;

  const value = block[
    type as keyof Omit<NotionBlock, 'id' | 'type'>
  ] as BlockValue;
  if (!value?.rich_text) return null;

  switch (type) {
    case 'heading_1':
      return (
        <h1
          id={normalizedId}
          className="font-main mt-20 mb-10 scroll-mt-32 text-4xl leading-tight font-black text-white"
        >
          <TextRenderer richText={value.rich_text} />
        </h1>
      );
    case 'heading_2':
      return (
        <h2
          id={normalizedId}
          className="font-main mt-16 mb-8 scroll-mt-32 border-b border-white/15 pb-4 text-2xl font-bold text-slate-50"
        >
          <TextRenderer richText={value.rich_text} />
        </h2>
      );
    case 'heading_3':
      return (
        <h3
          id={normalizedId}
          className="font-main mt-12 mb-6 scroll-mt-32 text-xl font-bold text-slate-100"
        >
          <TextRenderer richText={value.rich_text} />
        </h3>
      );
    case 'paragraph':
      return (
        <p className="mb-8 text-[18px] leading-[1.85] font-normal tracking-tight text-slate-50">
          <TextRenderer richText={value.rich_text} />
        </p>
      );
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li
          className={`mb-4 ml-6 ${type === 'bulleted_list_item' ? 'list-disc' : 'list-decimal'} pl-3 text-[17px] leading-relaxed text-slate-50`}
        >
          <TextRenderer richText={value.rich_text} />
        </li>
      );
    case 'code':
      return (
        <pre className="my-10 overflow-x-auto rounded-2xl border border-white/10 bg-black/60 p-8 font-mono text-sm text-blue-200 shadow-inner">
          <code className="leading-relaxed">
            {value.rich_text[0]?.plain_text}
          </code>
        </pre>
      );
    case 'quote':
      return (
        <blockquote className="my-10 rounded-r-2xl border-l-4 border-blue-500/50 bg-blue-500/10 px-8 py-6 text-slate-50 italic">
          <TextRenderer richText={value.rich_text} />
        </blockquote>
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

  // --- [이슈 33] JSON-LD 구조화 데이터 정의 ---
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: `인생 최적화 지식저장소 데카이브: ${post.title}에 대한 깊이 있는 기록입니다.`,
    image: 'https://demian.dev/icon.png',
    datePublished: new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: 'Demian',
      url: 'https://demian.dev',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dechive',
      logo: {
        '@type': 'ImageObject',
        url: 'https://demian.dev/icon.png',
      },
    },
  };

  const rawBlocks = await getPageContent(post.id);
  const blocks = rawBlocks as unknown as NotionBlock[];
  const toc = extractToc(blocks);

  return (
    <div className="min-h-screen bg-transparent px-6 pt-32 pb-40 font-sans selection:bg-blue-500/40">
      {/* JSON-LD 삽입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto flex max-w-6xl gap-16">
        <main className="min-w-0 flex-1">
          <div className="mb-14 flex items-center justify-between border-b border-white/10 pb-8">
            <Link
              href="/archive"
              className="font-main text-xs font-black tracking-widest text-slate-300 transition-all hover:text-blue-400"
            >
              ← BACK TO INDEX
            </Link>
            <div className="flex items-center gap-5 text-[10px] font-black tracking-widest text-slate-400 uppercase">
              <time>{new Date(post.date).toLocaleDateString('ko-KR')}</time>
              <div className="h-1 w-1 rounded-full bg-slate-600" />
              <CommentCount slug={post.slug} />
            </div>
          </div>

          <header className="mb-20">
            <h1 className="font-main text-5xl leading-[1.2] font-black tracking-tighter text-white drop-shadow-lg md:text-6xl">
              {post.title}
            </h1>
          </header>

          <article className="prose prose-invert max-w-none">
            {blocks.map((block) => (
              <BlockRenderer key={block.id} block={block} />
            ))}
          </article>

          {post.tags.length > 0 && (
            <section className="mt-24 border-t border-white/10 pt-10">
              <div className="flex flex-wrap gap-2.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[10px] font-black tracking-wider text-slate-400 transition-colors hover:border-blue-500/50 hover:text-blue-300"
                  >
                    #{tag.toUpperCase()}
                  </span>
                ))}
              </div>
            </section>
          )}

          <div className="mt-24">
            <Comments slug={post.slug} />
          </div>
        </main>

        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-32">
            <TableOfContents toc={toc} />
          </div>
        </aside>
      </div>
    </div>
  );
}
