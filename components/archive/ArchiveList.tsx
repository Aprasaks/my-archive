import React from 'react';
import { ArrowUpDown, Hash, FolderOpen } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  categoryId: string;
  date: string;
  tags: string[];
}

interface ArchiveListProps {
  posts: Post[];
}

export default function ArchiveList({ posts }: ArchiveListProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* --- Table Header --- */}
      <div className="flex items-center border-b border-gray-200 bg-gray-50 px-6 py-3 text-xs font-bold tracking-wider text-gray-500 uppercase">
        <div className="flex flex-1 cursor-pointer items-center gap-2 hover:text-gray-700">
          NAME <ArrowUpDown className="h-3 w-3" />
        </div>

        {/* [수정] md:block -> lg:block (화면이 꽤 커야만 보임) */}
        <div className="hidden w-32 lg:block">TYPE</div>
        <div className="hidden w-40 lg:block">TAGS</div>

        {/* 날짜는 중요하니까 md(태블릿)부터 보여줌 */}
        <div className="hidden w-32 md:block">DATE</div>
      </div>

      {/* --- Table Body --- */}
      <div className="divide-y divide-gray-100 overflow-y-auto">
        {posts.map((post) => (
          <div
            key={post.id}
            className="group flex cursor-pointer items-center px-6 py-3.5 transition-colors duration-200 hover:bg-cyan-50/30"
          >
            {/* 1. Name Column (가장 중요) */}
            <div className="min-w-0 flex-1 pr-4">
              <h3 className="truncate text-sm font-bold text-gray-800 group-hover:text-cyan-700">
                {post.title}
              </h3>

              {/* [수정] md:hidden -> lg:hidden */}
              {/* 화면이 lg보다 작아져서 컬럼이 숨겨지면, 이 정보가 나타납니다 */}
              <div className="mt-1 flex items-center gap-2 font-mono text-[10px] text-gray-400 lg:hidden">
                <span className="rounded border border-gray-200 bg-gray-100 px-1.5 py-0.5 text-gray-500 uppercase">
                  {post.categoryId}
                </span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
            </div>

            {/* 2. Type Column */}
            {/* [수정] lg:flex로 변경하여 좁을 땐 숨김 */}
            <div className="hidden w-32 items-center lg:flex">
              <span className="rounded border border-gray-200 bg-gray-50 px-2 py-1 text-[10px] font-bold text-gray-500 uppercase transition-colors group-hover:border-cyan-200 group-hover:bg-white">
                {post.categoryId}
              </span>
            </div>

            {/* 3. Tags Column */}
            {/* [수정] lg:flex로 변경 */}
            <div className="hidden w-40 items-center gap-1.5 overflow-hidden lg:flex">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-0.5 text-xs text-gray-500"
                >
                  <Hash className="h-3 w-3 text-gray-300" />
                  {tag}
                </span>
              ))}
            </div>

            {/* 4. Date Column */}
            <div className="hidden w-32 font-mono text-xs text-gray-400 md:block">
              {post.date}
            </div>
          </div>
        ))}

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <FolderOpen className="mb-4 h-12 w-12 opacity-20" />
            <p>No files found in this directory.</p>
          </div>
        )}
      </div>
    </div>
  );
}
