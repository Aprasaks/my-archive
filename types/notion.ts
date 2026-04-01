// src/types/notion.ts

// =========================================================
// 1. [Page/Post] 페이지 및 블록 렌더링 타입
// =========================================================
export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

// 🌟 블록 내부의 순수 텍스트
export interface NotionRichText {
  plain_text: string;
  annotations: Annotations;
  href?: string | null;
}

export interface BlockValue {
  rich_text: NotionRichText[];
  language?: string;
  icon?: { emoji?: string };
  caption?: NotionRichText[];
}

export interface TableValue {
  has_column_header: boolean;
  has_row_header: boolean;
  table_width: number;
}

export interface TableRowValue {
  cells: NotionRichText[][];
}

export interface ImageValue {
  type: 'external' | 'file';
  external?: { url: string };
  file?: { url: string };
  caption?: NotionRichText[];
}

export interface NotionBlock {
  id: string;
  type: string;
  heading_1?: BlockValue;
  heading_2?: BlockValue;
  heading_3?: BlockValue;
  paragraph?: BlockValue;
  bulleted_list_item?: BlockValue;
  numbered_list_item?: BlockValue;
  code?: BlockValue;
  quote?: BlockValue;
  callout?: BlockValue;
  divider?: Record<string, never>;
  table?: TableValue;
  table_row?: TableRowValue;
  image?: ImageValue;
  has_children?: boolean;
  children?: NotionBlock[];
}

// =========================================================
// 2. [Database] 최종 결과물 데이터 규격
// =========================================================
export type Post = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  type: 'Post' | 'Folder';
  tags: string[];
  date: string;
  parentId: string | null;
};

export type ProjectItem = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  cover: string;
};

export type BdoRecipe = {
  id: string;
  name: string;
  tag: string;
  materials: { name: string; count: number }[];
  tip: string;
};

// =========================================================
// 3. [Interface] 노션 프로퍼티 원본 타입 정의 (Prop 추가!)
// =========================================================
export type NotionTitleProp = {
  type: 'title';
  title: Array<{ plain_text: string }>;
};
// 🌟 여기서 충돌이 났던 거야! NotionRichTextProp으로 이름 변경 완료!
export type NotionRichTextProp = {
  type: 'rich_text';
  rich_text: Array<{ plain_text: string }>;
};
export type NotionNumberProp = { type: 'number'; number: number | null };
export type NotionSelectProp = {
  type: 'select';
  select: { name: string } | null;
};
export type NotionMultiSelectProp = {
  type: 'multi_select';
  multi_select: Array<{ name: string }>;
};
export type NotionUrlProp = { type: 'url'; url: string | null };
export type NotionRelationProp = {
  type: 'relation';
  relation: Array<{ id: string }>;
};
export type NotionStatusProp = {
  type: 'status';
  status: { name: string } | null;
};

export type NotionProperty =
  | NotionTitleProp
  | NotionRichTextProp
  | NotionNumberProp
  | NotionSelectProp
  | NotionMultiSelectProp
  | NotionUrlProp
  | NotionRelationProp
  | NotionStatusProp
  | undefined;

export interface BlogDatabaseProps {
  Name: NotionTitleProp;
  Slug: NotionRichTextProp;
  Subtitle: NotionRichTextProp;
  Description: NotionRichTextProp;
  Type: NotionSelectProp;
  Tag: NotionMultiSelectProp;
  'Parent Item': NotionRelationProp;
  Status: NotionStatusProp;
}

export interface ProjectDatabaseProps {
  Name: NotionTitleProp;
  Description: NotionRichTextProp;
  Tags: NotionMultiSelectProp;
  Github: NotionUrlProp;
  Demo: NotionUrlProp;
}

export interface BdoDatabaseProps {
  Name: NotionTitleProp;
  Tag: NotionSelectProp;
  Tip: NotionRichTextProp;
  [key: string]: NotionProperty;
}
