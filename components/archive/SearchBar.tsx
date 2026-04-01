'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

// 🌟 1. 부모로부터 받을 값들의 타입을 정의해 (any 금지!)
interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

export default function SearchBar({
  value,
  onChange,
  onClear,
}: SearchBarProps) {
  return (
    <div className="group relative w-full flex-1">
      <input
        type="text"
        // 🌟 2. 이제 본인의 state가 아니라 부모가 준 value를 써
        value={value}
        onChange={onChange}
        placeholder="어떤 지식을 찾고 있나요?"
        // 💡 오라버니의 디자인 설정 (bg-black/60, backdrop-blur-xl 등) 그대로 유지!
        className="w-full rounded-2xl border border-white/20 bg-black/60 py-3.5 pr-12 pl-12 text-sm text-white shadow-lg backdrop-blur-xl transition-all duration-300 outline-none placeholder:text-white/40 hover:border-white/40 focus:border-blue-500/60 focus:bg-black/80 focus:ring-4 focus:ring-blue-500/10"
      />

      {/* 왼쪽 돋보기 아이콘 */}
      <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-white/40 transition-colors group-focus-within:text-blue-400" />

      {/* 오른쪽 지우기(X) 버튼 */}
      {value && (
        <button
          type="button"
          // 🌟 3. X 버튼 누르면 부모한테 "지워줘!"라고 알려줌
          onClick={onClear}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1.5 text-white/40 transition-colors hover:bg-white/20 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
