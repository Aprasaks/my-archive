import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 게시물 최상위 경로 (프로젝트 루트/posts)
const postsDirectory = path.join(process.cwd(), 'posts');

// === Types ===

// 1. 사이드바 트리 노드 타입
export interface FileNode {
  name: string;
  path: string; // 상대 경로 (예: 'DEV/React')
  type: 'folder' | 'file';
  children?: FileNode[];
}

// 2. 목록 화면용 파일 정보 타입
export interface PostItem {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  category: string;
  type: 'Markdown';
}

// 3. 상세 뷰어용 포스트 데이터 타입
export interface PostDetail extends PostItem {
  content: string; // 본문 내용 포함
}

// === Functions ===

/**
 * 1. 전체 디렉토리 트리 스캔 (재귀)
 * 사이드바(Explorer)에 표시할 폴더/파일 구조를 가져옵니다.
 */
export function getDirectoryTree(
  dirPath: string = postsDirectory,
  relativePath: string = ''
): FileNode[] {
  // 폴더가 없으면 빈 배열 반환
  if (!fs.existsSync(dirPath)) return [];

  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  const nodes: FileNode[] = [];

  items.forEach((item) => {
    // 숨김 파일/폴더(.git, .DS_Store 등) 제외
    if (item.name.startsWith('.')) return;

    const fullPath = path.join(dirPath, item.name);
    const itemRelativePath = path.join(relativePath, item.name);

    if (item.isDirectory()) {
      // 폴더인 경우 재귀 호출
      const children = getDirectoryTree(fullPath, itemRelativePath);
      nodes.push({
        name: item.name,
        path: itemRelativePath,
        type: 'folder',
        children: children,
      });
    } else if (item.isFile() && item.name.endsWith('.md')) {
      // 파일인 경우
      nodes.push({
        name: item.name.replace('.md', ''),
        path: itemRelativePath.replace('.md', ''),
        type: 'file',
      });
    }
  });

  return nodes;
}

/**
 * 2. 특정 경로의 파일 목록 가져오기
 * 메인 화면 리스트에서 특정 폴더를 클릭했을 때 해당 폴더 안의 파일들만 보여줍니다.
 */
export function getFilesFromPath(currentPath: string): PostItem[] {
  // currentPath가 없으면 빈 문자열(루트)
  const targetDir = path.join(postsDirectory, currentPath);

  // 경로가 존재하지 않거나 폴더가 아니면 빈 배열
  if (!fs.existsSync(targetDir)) return [];
  const stat = fs.statSync(targetDir);
  if (!stat.isDirectory()) return [];

  const items = fs.readdirSync(targetDir, { withFileTypes: true });

  return items
    .filter((item) => item.isFile() && item.name.endsWith('.md'))
    .map((item) => {
      const fullPath = path.join(targetDir, item.name);
      const content = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(content);

      return {
        slug: item.name.replace('.md', ''),
        title: data.title || item.name.replace('.md', ''),
        date: data.date ? data.date.toString() : '-',
        tags: data.tags || [],
        category: currentPath || 'Root', // 현재 폴더명을 카테고리로 사용
        type: 'Markdown',
      };
    });
}

/**
 * 3. 특정 슬러그(파일명)로 포스트 찾기
 * 뷰어 페이지에서 사용. slug만으로 posts 폴더 전체를 뒤져서 파일을 찾습니다.
 */
export async function getPostData(slug: string): Promise<PostDetail> {
  // 재귀적으로 파일을 찾는 내부 함수
  const findFilePath = (dir: string): string | null => {
    if (!fs.existsSync(dir)) return null;

    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);

      if (item.isDirectory()) {
        // 폴더면 내부 탐색
        const found = findFilePath(fullPath);
        if (found) return found;
      } else if (item.name === `${slug}.md`) {
        // 파일명이 일치하면 경로 반환
        return fullPath;
      }
    }
    return null;
  };

  // posts 폴더 내에서 해당 slug를 가진 파일 탐색
  const filePath = findFilePath(postsDirectory);

  if (!filePath) {
    throw new Error(`Post not found: ${slug}`);
  }

  // 파일 읽기 및 파싱
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents);

  // 파일이 위치한 폴더명을 카테고리로 추출
  const category = path.basename(path.dirname(filePath));

  return {
    slug,
    content,
    title: data.title || slug,
    date: data.date ? data.date.toString() : '-',
    tags: data.tags || [],
    category: category === 'posts' ? 'Root' : category, // posts 바로 아래면 Root
    type: 'Markdown',
  };
}
