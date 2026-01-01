'use client';

import React, { useState } from 'react';
import { categoryTree, allPosts } from '@/components/archive/mockData';
import ArchiveSidebar from '@/components/archive/ArchiveSidebar';
import ArchiveHeader from '@/components/archive/ArchiveHeader';
import ArchiveList from '@/components/archive/ArchiveList';

export default function ArchivePage() {
  // State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFolders, setExpandedFolders] = useState<string[]>([
    'dev',
    'cert',
    'project',
  ]);

  // Logic: Toggle Folders
  const toggleFolder = (id: string) => {
    setExpandedFolders((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Logic: Filter Posts
  const filteredPosts =
    selectedCategory === 'all'
      ? allPosts
      : allPosts.filter((post) => {
          // 1. 하위 카테고리 직접 일치
          if (post.categoryId === selectedCategory) return true;
          // 2. 상위 카테고리 선택 시 하위 포함
          const parentCategory = categoryTree.find(
            (c) => c.id === selectedCategory
          );
          if (parentCategory) {
            return parentCategory.subCategories.some(
              (sub) => sub.id === post.categoryId
            );
          }
          return false;
        });

  return (
    <div className="relative flex min-h-screen flex-col bg-white font-sans text-gray-800 md:flex-row">
      {/* Background Grid */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.6]"
        style={{
          backgroundImage:
            'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(to right, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      ></div>

      {/* Left Sidebar */}
      <ArchiveSidebar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        expandedFolders={expandedFolders}
        onToggleFolder={toggleFolder}
      />

      {/* Right Main Content */}
      <main className="relative z-10 flex h-screen flex-1 flex-col overflow-y-auto p-6 md:p-12">
        <ArchiveHeader
          selectedCategory={selectedCategory}
          fileCount={filteredPosts.length}
        />

        <ArchiveList posts={filteredPosts} />

        {/* Footer Info */}
        <div className="mt-4 text-right font-mono text-xs text-gray-400">
          Total Files: {filteredPosts.length} (Mock)
        </div>
      </main>
    </div>
  );
}
