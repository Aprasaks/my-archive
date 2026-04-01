// types/archive.ts

// 1. 노션 원본 데이터 (notion.ts의 규격과 일치)
export interface NotionItem {
  id: string;
  type: 'Post' | 'Folder';
  title: string;
  slug: string;
  description: string;
  tags: string[];
  date: string;
  parentId: string | null; // 🌟 핵심: Parent Item ID
}

// 2. 아카이브에서 공통으로 쓸 포스트 타입
export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: 'Post' | 'Folder';
  tags: string[];
  date: string;
  parentId: string | null; // 🌟 핵심: 이 녀석이 있어야 ArchiveClient에서 필터링 가능!
}

// 3. 폴더 ID -> 폴더 이름 매핑용
export interface FolderMap {
  [key: string]: string;
}
