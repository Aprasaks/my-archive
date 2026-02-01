'use client';

import { useEffect, useState } from 'react';

// 목차 데이터 타입 정의
export interface TocItem {
  id: string;
  text: string;
  level: number; // 1, 2, 3 (h1, h2, h3)
}

interface Props {
  toc: TocItem[];
}

export default function TableOfContents({ toc }: Props) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // 스크롤 감지 로직 (IntersectionObserver 사용)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px' } // 화면 상단 100px 밑에 오면 활성화
    );

    // 모든 제목 요소 관찰 시작
    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <nav className="text-sm">
      <h4 className="mb-4 font-bold text-slate-900">목차</h4>
      <ul className="space-y-2 border-l border-slate-200">
        {toc.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block border-l-2 pl-4 transition-all duration-200 ${
                activeId === item.id
                  ? '-ml-0.5 border-blue-500 font-medium text-blue-600' // 활성화 스타일
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
              style={{
                marginLeft: item.level === 3 ? '1rem' : '0', // h3는 들여쓰기
              }}
              onClick={(e) => {
                e.preventDefault();
                // 부드럽게 스크롤 이동
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
    </nav>
  );
}
