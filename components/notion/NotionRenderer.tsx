import React from 'react';
import Link from 'next/link';
import { NotionBlock, NotionRichText } from '@/types/notion';

// --- 1. 텍스트 렌더러 (글자 속성, 링크 처리) ---
function TextRenderer({ richText }: { richText: NotionRichText[] }) {
  if (!richText || richText.length === 0) return null;

  return (
    <>
      {richText.map((text, index) => {
        const { annotations } = text;
        let className = '';

        if (annotations.bold) className += ' font-extrabold text-white';

        if (annotations.italic) className += ' italic text-slate-300';
        if (annotations.strikethrough) className += ' line-through opacity-40';
        if (annotations.underline)
          className += ' underline underline-offset-4 decoration-white/30';
        if (annotations.code)
          className +=
            ' mx-1 rounded border border-white/10 bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-blue-300';

        if (text.href) {
          return (
            <Link
              key={index}
              href={text.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${className} text-blue-400 underline transition-colors hover:text-blue-300 hover:decoration-blue-300/50`}
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

// --- 2. 개별 블록 렌더러 (타입별 태그 분기) ---
function BlockRenderer({ block }: { block: NotionBlock }) {
  const { type } = block;
  const normalizedId = block.id.replace(/-/g, '');

  if (type === 'divider') return <hr className="my-16 border-white/10" />;

  switch (type) {
    case 'heading_1':
      return (
        <h1
          id={normalizedId}
          className="font-main mt-16 mb-10 text-4xl leading-[1.3] font-black break-keep text-white"
        >
          <TextRenderer richText={block.heading_1?.rich_text || []} />
        </h1>
      );
    case 'heading_2':
      return (
        <h2
          id={normalizedId}
          /* ✅ pb-4와 border-b를 삭제해서 하단 선을 없앴어! */
          className="font-main mt-16 mb-8 text-2xl font-bold break-keep text-slate-100"
        >
          <TextRenderer richText={block.heading_2?.rich_text || []} />
        </h2>
      );

    case 'heading_3':
      return (
        <h3
          id={normalizedId}
          className="font-main mt-12 mb-6 text-xl font-bold break-keep text-slate-200"
        >
          <TextRenderer richText={block.heading_3?.rich_text || []} />
        </h3>
      );
    case 'paragraph':
      return (
        <p className="mb-8 text-[18px] leading-[2.1] font-normal tracking-tight text-white/85">
          <TextRenderer richText={block.paragraph?.rich_text || []} />
        </p>
      );
    case 'bulleted_list_item':
      return (
        <li className="mb-3 ml-6 list-disc pl-2 text-[18px] leading-[2.1] text-white/85">
          <TextRenderer richText={block.bulleted_list_item?.rich_text || []} />
        </li>
      );
    case 'numbered_list_item':
      return (
        <li className="mb-3 ml-6 list-decimal pl-2 text-[18px] leading-[2.1] text-white/85">
          <TextRenderer richText={block.numbered_list_item?.rich_text || []} />
        </li>
      );
    case 'code':
      return (
        <pre className="my-10 overflow-x-auto rounded-2xl border border-white/10 bg-black/50 p-8 font-mono text-sm text-blue-200/90 shadow-2xl backdrop-blur-md">
          <code>{block.code?.rich_text[0]?.plain_text}</code>
        </pre>
      );
    case 'quote':
      return (
        <blockquote className="my-10 rounded-r-2xl border-l-4 border-white/20 bg-white/5 px-8 py-6 font-serif text-slate-200 italic">
          <TextRenderer richText={block.quote?.rich_text || []} />
        </blockquote>
      );

    case 'image':
      const imageUrl =
        block.image?.type === 'file'
          ? block.image.file?.url
          : block.image?.external?.url;
      if (!imageUrl) return null;
      return (
        <figure className="my-12 flex flex-col items-center">
          <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Notion Image"
              className="h-auto w-full object-contain"
              loading="lazy"
            />
          </div>
          {block.image?.caption && block.image.caption.length > 0 && (
            <figcaption className="mt-4 text-center text-[13px] font-light tracking-wide text-white/40">
              <TextRenderer richText={block.image.caption} />
            </figcaption>
          )}
        </figure>
      );

    case 'table':
      return (
        /* ✅ bg-white/[0.02]를 bg-white/2로 수정해서 린트 경고 해결! */
        <div className="my-12 overflow-x-auto rounded-xl border border-white/10 bg-white/2 shadow-lg backdrop-blur-sm">
          <table className="w-full text-left text-[16px] text-white/80">
            <tbody className="divide-y divide-white/10">
              {block.children?.map((child) => (
                <BlockRenderer key={child.id} block={child} />
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'table_row':
      return (
        <tr className="transition-colors hover:bg-white/5">
          {block.table_row?.cells.map((cell, idx) => (
            <td
              key={idx}
              className="border-r border-white/10 p-4 leading-relaxed last:border-0"
            >
              <TextRenderer richText={cell} />
            </td>
          ))}
        </tr>
      );

    default:
      return null;
  }
}

// --- 3. 🌟 최종 내보내기 컴포넌트 🌟 ---
export default function NotionRenderer({ blocks }: { blocks: NotionBlock[] }) {
  if (!blocks || blocks.length === 0)
    return (
      <div className="py-20 text-center text-white/50">
        데이터를 불러올 수 없습니다.
      </div>
    );

  return (
    <article className="max-w-none">
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </article>
  );
}
