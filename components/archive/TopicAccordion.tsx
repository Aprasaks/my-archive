'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface TopicAccordionProps {
  title: string;
  count: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function TopicAccordion({
  title,
  count,
  children,
  defaultOpen = true,
}: TopicAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-4 overflow-hidden rounded-lg border border-white/5 bg-white/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-white/10"
      >
        <div className="flex items-center gap-3">
          <ChevronRight
            size={18}
            className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-90 text-blue-500' : ''}`}
          />
          <span
            className={`text-sm font-bold tracking-widest uppercase ${isOpen ? 'text-white' : 'text-slate-400'}`}
          >
            {title}
          </span>
        </div>
        <span className="rounded bg-white/10 px-2 py-1 font-mono text-[10px] font-bold text-slate-600">
          {count} POSTS
        </span>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-250 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="border-t border-white/5 p-2 px-5 pb-5">{children}</div>
      </div>
    </div>
  );
}
