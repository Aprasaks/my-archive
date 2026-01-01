import React from 'react';
import { FolderOpen, Folder, ChevronRight, ChevronDown } from 'lucide-react';
import { categoryTree } from './mockData';

interface ArchiveSidebarProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  expandedFolders: string[];
  onToggleFolder: (id: string) => void;
}

export default function ArchiveSidebar({
  selectedCategory,
  onSelectCategory,
  expandedFolders,
  onToggleFolder,
}: ArchiveSidebarProps) {
  return (
    <aside className="sticky top-0 z-20 flex h-auto w-full flex-col border-r border-gray-200 bg-gray-50/90 p-6 backdrop-blur md:h-screen md:w-64">
      <div className="mb-8 flex items-center gap-2 text-gray-900">
        <div className="rounded-md bg-gray-900 p-1.5">
          <FolderOpen className="h-4 w-4 text-white" />
        </div>
        <span className="font-bold tracking-tight">DIRECTORY</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto">
        {/* Root Button */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors ${selectedCategory === 'all' ? 'border border-cyan-100 bg-cyan-50 font-bold text-cyan-700' : 'border border-transparent text-gray-600 hover:bg-gray-100'}`}
        >
          <Folder className="h-4 w-4" />
          <span>ROOT</span>
        </button>

        {/* Category Tree */}
        <div className="space-y-4 pt-4">
          {categoryTree.map((group) => (
            <div key={group.id}>
              {/* Parent Folder */}
              <div
                className="mb-1 flex cursor-pointer items-center gap-1 text-xs font-bold tracking-wider text-gray-400 uppercase transition-colors hover:text-gray-600"
                onClick={() => {
                  onToggleFolder(group.id);
                  onSelectCategory(group.id);
                }}
              >
                {expandedFolders.includes(group.id) ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
                {group.name}
              </div>

              {/* Sub Folders */}
              {expandedFolders.includes(group.id) && (
                <div className="ml-2 space-y-0.5 border-l border-gray-200 pl-2">
                  {group.subCategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => onSelectCategory(sub.id)}
                      className={`flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-sm transition-all ${
                        selectedCategory === sub.id
                          ? 'border border-gray-100 bg-white font-semibold text-cyan-600 shadow-sm'
                          : 'border border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                      } `}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${selectedCategory === sub.id ? 'bg-cyan-400' : 'bg-gray-300'}`}
                      ></span>
                      {sub.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}
