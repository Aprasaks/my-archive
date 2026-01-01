import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PipelineNodeProps {
  isActive: boolean;
  label: string;
  subLabel: string;
  icon: LucideIcon;
  color: string; // 아이콘 색상 (Tailwind 클래스)
  bgColor?: string; // 배경 색상 (기본값 white)
}

export default function PipelineNode({
  isActive,
  label,
  subLabel,
  icon: Icon,
  color,
  bgColor = 'bg-white',
}: PipelineNodeProps) {
  return (
    <div className="relative z-10 flex flex-col items-center gap-4 transition-all duration-500">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-2xl border shadow-lg transition-all duration-500 ${isActive ? '-translate-y-2 scale-110 shadow-xl' : 'scale-100 shadow-sm'} ${isActive && bgColor !== 'bg-white' ? `${bgColor} border-transparent` : 'border-gray-100 bg-white'} `}
      >
        <Icon
          className={`h-8 w-8 transition-colors duration-300 ${isActive && bgColor !== 'bg-white' ? 'text-white' : color} ${isActive ? 'animate-pulse' : 'opacity-80'} `}
        />

        {/* 활성 상태일 때 우측 상단 초록불 점등 */}
        {isActive && (
          <div className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </div>
        )}
      </div>

      <div className="text-center">
        <span
          className={`block text-sm font-bold transition-colors ${isActive ? 'text-gray-900' : 'text-gray-400'}`}
        >
          {label}
        </span>
        <span className="font-mono text-[10px] tracking-wider text-gray-400 uppercase">
          {subLabel}
        </span>
      </div>
    </div>
  );
}
