'use client';

import { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface Props {
  toc: TocItem[];
}

export default function TableOfContents({ toc }: Props) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <nav className="font-main scrollbar-hide sticky top-32 max-h-[calc(100vh-160px)] overflow-y-auto pr-4">
      {/* 목차 제목: 더 크고 진하게 */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-4 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
        <h4 className="text-[13px] font-black tracking-widest text-white uppercase">
          INDEX
        </h4>
      </div>

      {/* 목차 리스트 */}
      <ul className="relative space-y-3 border-l border-white/10">
        {toc.map((item) => (
          <li
            key={item.id}
            className="transition-transform duration-200"
            style={{ paddingLeft: `${(item.level - 1) * 0.8}rem` }}
          >
            <a
              href={`#${item.id}`}
              className={`block border-l-2 py-1.5 pl-5 text-[14px] leading-snug transition-all duration-300 ${
                activeId === item.id
                  ? '-ml-[1.5px] scale-105 border-blue-500 font-black text-blue-400' // 활성: 완전 굵게
                  : 'border-transparent font-bold text-slate-400 hover:border-white/30 hover:text-white' // 비활성: 굵기 유지
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>

      {/* 하단 시스템 정보 */}
      <div className="mt-10 border-t border-white/5 pt-5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500"></span>
          </span>
          <p className="text-[10px] font-black tracking-tighter text-slate-600 uppercase">
            Active Knowledge Tracking
          </p>
        </div>
      </div>
    </nav>
  );
}
