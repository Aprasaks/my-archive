'use client';

import { useSearchParams } from 'next/navigation';

interface TopicBarProps {
  topics: string[];
}

export default function TopicBar({ topics }: TopicBarProps) {
  const searchParams = useSearchParams();
  const currentTopic = searchParams.get('topic') || 'ALL';

  const handleTopicClick = (topic: string) => {
    const params = new URLSearchParams(window.location.search);

    if (topic === 'ALL') {
      params.delete('topic');
    } else {
      params.set('topic', topic);
    }

    // [핵심] router.push 대신 history를 사용하여 서버 리렌더링(SSR)을 방지
    const newUrl = params.toString()
      ? `/archive?${params.toString()}`
      : '/archive';
    window.history.pushState({}, '', newUrl);

    // 주소창 변화를 리액트가 감지하도록 커스텀 이벤트 발생 (필요시)
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <div className="mb-16 border-y border-white/10 py-5">
      <div className="scrollbar-hide flex items-center justify-between gap-8 overflow-x-auto px-2">
        <button
          onClick={() => handleTopicClick('ALL')}
          className={`shrink-0 text-sm font-black tracking-widest transition-all ${
            currentTopic === 'ALL'
              ? 'text-blue-500'
              : 'text-slate-500 hover:text-white'
          }`}
        >
          ALL
        </button>
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => handleTopicClick(topic)}
            className={`shrink-0 text-sm font-medium transition-all ${
              currentTopic === topic
                ? 'font-bold text-blue-500'
                : 'text-slate-500 hover:text-white'
            }`}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}
