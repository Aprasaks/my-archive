'use client';

import React, { useState } from 'react';
import {
  Folder,
  FolderOpen,
  FileText,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import type { Post } from '@/lib/notion'; // 우리가 만든 타입 가져오기

// 트리 구조를 위한 타입 정의
interface TreeItem extends Post {
  children: TreeItem[];
}

// 1. 평평한 데이터를 트리로 바꾸는 마법 함수
function buildTree(items: Post[]): TreeItem[] {
  const itemMap: { [key: string]: TreeItem } = {};
  const roots: TreeItem[] = [];

  // 모든 아이템을 맵에 등록 (children 배열 추가)
  items.forEach((item) => {
    itemMap[item.id] = { ...item, children: [] };
  });

  // 부모-자식 연결하기
  items.forEach((item) => {
    const node = itemMap[item.id];
    if (item.parentId && itemMap[item.parentId]) {
      // 부모가 있으면 부모의 children에 들어감
      itemMap[item.parentId].children.push(node);
    } else {
      // 부모가 없으면 최상위(Root)임
      roots.push(node);
    }
  });

  return roots;
}

// 2. 재귀적으로 폴더/파일을 그리는 컴포넌트
function TreeNode({ item, depth = 0 }: { item: TreeItem; depth?: number }) {
  const [isOpen, setIsOpen] = useState(false); // 폴더 열림/닫힘 상태
  const isFolder = item.type === 'Folder';

  // 들여쓰기 (깊어질수록 오른쪽으로 밀림)
  const paddingLeft = depth * 20 + 12;

  if (isFolder) {
    return (
      <div className="select-none">
        {/* 폴더 클릭 영역 */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex cursor-pointer items-center rounded-lg py-2 text-slate-700 transition-colors hover:bg-slate-50"
          style={{ paddingLeft: `${paddingLeft}px` }}
        >
          <span className="mr-2 text-slate-400">
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
          <span className="mr-2 text-yellow-500">
            {isOpen ? <FolderOpen size={18} /> : <Folder size={18} />}
          </span>
          <span className="text-sm font-semibold">{item.title}</span>
        </div>

        {/* 자식 아이템들 (열렸을 때만 보임) */}
        {isOpen && (
          <div className="animate-fade-in-down">
            {item.children.length > 0 ? (
              item.children.map((child) => (
                <TreeNode key={child.id} item={child} depth={depth + 1} />
              ))
            ) : (
              <div className="py-1 pl-10 text-xs text-slate-400 italic">
                (비어있음)
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // 파일(Post)인 경우
  return (
    <Link
      href={`/archive/${item.slug}`}
      className="group flex cursor-pointer items-center rounded-lg py-2 text-slate-600 transition-colors hover:bg-blue-50"
      style={{ paddingLeft: `${paddingLeft + 22}px` }} // 폴더보다 조금 더 들어감
    >
      <FileText
        size={16}
        className="mr-2 text-slate-400 group-hover:text-blue-500"
      />
      <span className="text-sm font-medium group-hover:text-blue-600">
        {item.title}
      </span>
    </Link>
  );
}

// 3. 메인 컴포넌트
export default function FileTree({ items }: { items: Post[] }) {
  const treeData = buildTree(items);

  return (
    <div className="mx-auto min-h-96 w-full max-w-3xl rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <h2 className="mb-6 border-b border-slate-100 px-2 pb-4 text-lg font-bold text-slate-800">
        📂 Dechive Explorer
      </h2>
      <div className="flex flex-col gap-1">
        {treeData.map((node) => (
          <TreeNode key={node.id} item={node} />
        ))}
        {treeData.length === 0 && (
          <div className="py-10 text-center text-slate-400">
            아직 노션에 발행된 글이 없습니다. 텅 비었어요! 🗑️
          </div>
        )}
      </div>
    </div>
  );
}
