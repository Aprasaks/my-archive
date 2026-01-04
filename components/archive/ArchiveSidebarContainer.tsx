'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface FileNode {
  name: string;
  path: string;
  type: 'folder' | 'file';
  children?: FileNode[];
}

// === 아이콘 컴포넌트 ===
const ChevronDown = () => (
  <svg
    className="h-3 w-3 shrink-0 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);
const ChevronRight = () => (
  <svg
    className="h-3 w-3 shrink-0 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);
const FolderIcon = () => (
  <svg
    className="mr-2 h-4 w-4 shrink-0 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
    />
  </svg>
);

export default function ArchiveSidebarContainer({
  tree,
}: {
  tree: FileNode[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname(); // window 대신 usePathname 사용 (안전)

  // 1. 현재 경로 (폴더 열기 및 폴더 하이라이트용)
  const currentPath = searchParams.get('path') || '';

  // 2. 현재 파일명 (파일 하이라이트용)
  // URL에서 마지막 부분을 가져오고, 한글 깨짐 방지를 위해 decodeURIComponent 사용
  const currentSlug = decodeURIComponent(pathname?.split('/').pop() || '');

  // 폴더 클릭 (목록 이동)
  const handleNavigate = (path: string) => {
    router.push(`/archive?path=${path}`);
  };

  // 파일 클릭 (상세 이동 + 경로 유지)
  const handleFileClick = (slug: string, fullPath: string) => {
    router.push(`/archive/${slug}?path=${fullPath}`);
  };

  const TreeNode = ({ node, level }: { node: FileNode; level: number }) => {
    const hasChildren = node.children && node.children.length > 0;

    // 현재 보고 있는 파일/폴더의 경로가 내 경로 안에 있으면 자동으로 열기
    const isActivePath =
      currentPath === node.path || currentPath.startsWith(node.path + '/');
    const [isOpen, setIsOpen] = useState(isActivePath);

    // === [핵심 수정] 하이라이트 로직 분리 ===
    // 파일은 오직 '파일명(Slug)'이 일치할 때만 켜짐 (Path 무시)
    const isSelectedFile = node.type === 'file' && node.name === currentSlug;

    // 폴더는 오직 '경로(Path)'가 일치하고, 현재 파일을 보고 있지 않을 때(목록보기)만 켜짐
    // (만약 파일을 보고 있어도 폴더를 켜고 싶으면 && 뒤 조건 제거)
    const isSelectedFolder =
      node.type === 'folder' && node.path === currentPath;

    // 최종 선택 상태
    const isSelected = isSelectedFile || isSelectedFolder;

    const paddingLeftValue = `${level * 16 + 16}px`;

    const onToggle = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsOpen(!isOpen);
    };

    const onFolderClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      handleNavigate(node.path);
      if (!isOpen && hasChildren) setIsOpen(true);
    };

    const onFileClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      handleFileClick(node.name, node.path);
    };

    // 1. 헤더 (1뎁스)
    if (level === 0) {
      return (
        <div className="mb-1 select-none">
          <div
            onClick={onFolderClick}
            className="group flex cursor-pointer items-center py-2 pr-4 text-xs font-bold tracking-wider text-gray-500 uppercase transition-colors hover:bg-gray-100 hover:text-black"
            style={{ paddingLeft: '24px' }}
          >
            <span
              onClick={onToggle}
              className="mr-2 flex h-4 w-4 shrink-0 items-center justify-center rounded hover:bg-gray-200"
            >
              {hasChildren ? isOpen ? <ChevronDown /> : <ChevronRight /> : null}
            </span>
            <span className="truncate">{node.name}</span>
          </div>

          <div
            className={`overflow-hidden transition-all duration-200 ${isOpen ? 'opacity-100' : 'max-h-0 opacity-0'}`}
          >
            {node.children?.map((child) => (
              <TreeNode key={child.path} node={child} level={level + 1} />
            ))}
          </div>
        </div>
      );
    }

    // 2. 리스트 아이템
    return (
      <div className="select-none">
        <div
          onClick={node.type === 'folder' ? onFolderClick : onFileClick}
          className={`group relative flex cursor-pointer items-center border-l-2 py-1.5 pr-4 text-sm transition-all ${
            isSelected
              ? 'border-cyan-400 bg-cyan-50 font-medium text-cyan-700'
              : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900'
          } `}
          style={{ paddingLeft: paddingLeftValue }}
        >
          <span
            onClick={(e) => {
              if (node.type === 'folder' && hasChildren) onToggle(e);
            }}
            className="mr-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded hover:bg-black/5"
          >
            {node.type === 'folder' && hasChildren ? (
              isOpen ? (
                <ChevronDown />
              ) : (
                <ChevronRight />
              )
            ) : (
              <span
                className={`h-1 w-1 rounded-full ${isSelected ? 'bg-cyan-400' : 'bg-gray-300 group-hover:bg-gray-400'}`}
              />
            )}
          </span>

          <span className="truncate">{node.name}</span>
        </div>

        {hasChildren && isOpen && (
          <div>
            {node.children?.map((child) => (
              <TreeNode key={child.path} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full min-w-full bg-gray-50/30 pt-8 pb-10">
      <div className="mb-6 flex items-center px-6 text-gray-800">
        <FolderIcon />
        <h2 className="text-sm font-extrabold tracking-tight">DIRECTORY</h2>
      </div>

      <div className="flex flex-col">
        {tree.length > 0 ? (
          tree.map((node) => <TreeNode key={node.path} node={node} level={0} />)
        ) : (
          <div className="mt-4 px-6 text-xs text-gray-400">
            No folders found.
          </div>
        )}
      </div>
    </div>
  );
}
