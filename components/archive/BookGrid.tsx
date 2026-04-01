'use client';

import React from 'react';
import BookCard from './BookCard';
import { Post, FolderMap } from '@/types/archive';

interface BookGridProps {
  posts: Post[];
  folders?: FolderMap;
}

export default function BookGrid({ posts }: BookGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="py-32 text-center">
        <p className="font-mono text-[10px] tracking-[0.2em] text-slate-500 italic opacity-40">
          NO_MATCHING_KNOWLEDGE_FOUND_IN_DECHIVE...
        </p>
      </div>
    );
  }

  return (
    <div className="relative z-10 mt-10 grid grid-cols-1 gap-x-6 gap-y-10 px-4 pb-20 sm:grid-cols-2 lg:grid-cols-4">
      {posts.map((post) => (
        <BookCard key={post.id} post={post} />
      ))}
    </div>
  );
}
