'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="group relative mb-12 w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-1 text-slate-500 transition-colors group-focus-within:text-blue-500">
        <Search size={18} strokeWidth={2.5} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search in your knowledge..."
        className="w-full border-b border-white/10 bg-transparent py-4 pr-4 pl-10 text-xl font-medium text-white transition-all outline-none placeholder:text-slate-700 focus:border-blue-500/40"
      />
    </div>
  );
}
