import { Client } from '@notionhq/client';
import {
  PageObjectResponse,
  PartialPageObjectResponse,
  BlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID as string;

// =========================================================
// [Type Definition] 최종 결과물 데이터 규격
// =========================================================

export type Post = {
  id: string;
  title: string;
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
// [Interface] 노션 프로퍼티 타입 정의 (Strict)
// =========================================================

type NotionTitle = { type: 'title'; title: Array<{ plain_text: string }> };
type NotionRichText = {
  type: 'rich_text';
  rich_text: Array<{ plain_text: string }>;
};
type NotionNumber = { type: 'number'; number: number | null };
type NotionSelect = { type: 'select'; select: { name: string } | null };
type NotionMultiSelect = {
  type: 'multi_select';
  multi_select: Array<{ name: string }>;
};
type NotionUrl = { type: 'url'; url: string | null };
type NotionRelation = { type: 'relation'; relation: Array<{ id: string }> };
type NotionStatus = { type: 'status'; status: { name: string } | null };

type NotionProperty =
  | NotionTitle
  | NotionRichText
  | NotionNumber
  | NotionSelect
  | NotionMultiSelect
  | NotionUrl
  | NotionRelation
  | NotionStatus
  | undefined;

interface BlogDatabaseProps {
  Name: NotionTitle;
  Slug: NotionRichText;
  Description: NotionRichText;
  Type: NotionSelect;
  Tag: NotionMultiSelect;
  'Parent Item': NotionRelation;
  Status: NotionStatus;
}

interface ProjectDatabaseProps {
  Name: NotionTitle;
  Description: NotionRichText;
  Tags: NotionMultiSelect;
  Github: NotionUrl;
  Demo: NotionUrl;
}

interface BdoDatabaseProps {
  Name: NotionTitle;
  Tag: NotionSelect;
  Tip: NotionRichText;
  [key: string]: NotionProperty;
}

// =========================================================
// [Core] V5 API 대응 및 타입 캐스팅 (No Any!)
// =========================================================

interface StrictNotionClient {
  databases: {
    retrieve: (args: {
      database_id: string;
    }) => Promise<{ id: string; data_sources?: { id: string }[] }>;
  };
  dataSources: {
    query: (args: {
      data_source_id: string;
      filter?: object;
      sorts?: object;
    }) => Promise<{
      results: (PageObjectResponse | PartialPageObjectResponse)[];
    }>;
  };
  blocks: {
    children: {
      list: (args: { block_id: string }) => Promise<{
        results: (BlockObjectResponse | PartialPageObjectResponse)[]; // ✨ any 제거 완료!
      }>;
    };
  };
}

const strictNotion = notion as unknown as StrictNotionClient;

async function queryV5Database(
  databaseId: string,
  sorts?: object[],
  filter?: object
) {
  const db = await strictNotion.databases.retrieve({ database_id: databaseId });
  const dataSourceId = db.data_sources?.[0]?.id;

  if (!dataSourceId) throw new Error(`Data Source ID missing: ${databaseId}`);

  return await strictNotion.dataSources.query({
    data_source_id: dataSourceId,
    sorts,
    filter,
  });
}

// =========================================================
// [Functions] 데이터 연동 함수
// =========================================================

export async function getAllItems(): Promise<Post[]> {
  const response = await queryV5Database(
    DATABASE_ID,
    [{ property: 'Date', direction: 'descending' }],
    { property: 'Status', status: { equals: '완료' } }
  );

  return response.results.map((item) => {
    if (!('properties' in item)) return createEmptyPost(item.id);
    const props = item.properties as unknown as BlogDatabaseProps;

    return {
      id: item.id,
      title: props.Name?.title?.[0]?.plain_text || '제목 없음',
      slug: props.Slug?.rich_text?.[0]?.plain_text || '',
      description: props.Description?.rich_text?.[0]?.plain_text || '',
      type: (props.Type?.select?.name === 'Folder' ? 'Folder' : 'Post') as
        | 'Post'
        | 'Folder',
      tags: props.Tag?.multi_select?.map((tag) => tag.name) || [],
      date: item.created_time,
      parentId: props['Parent Item']?.relation?.[0]?.id || null,
    };
  });
}

export async function getPageBySlug(slug: string): Promise<Post | null> {
  const allPosts = await getAllItems();
  return allPosts.find((p) => p.slug === slug) || null;
}

export async function getPageContent(pageId: string) {
  const response = await strictNotion.blocks.children.list({
    block_id: pageId,
  });
  return response.results;
}

function createEmptyPost(id: string): Post {
  return {
    id,
    title: '접근 불가',
    slug: '',
    description: '',
    type: 'Post',
    tags: [],
    date: '',
    parentId: null,
  };
}

export const getProjectList = async (): Promise<ProjectItem[]> => {
  if (!process.env.NOTION_PROJECT_ID) return [];
  const response = await queryV5Database(process.env.NOTION_PROJECT_ID, [
    { property: 'Name', direction: 'ascending' },
  ]);

  return response.results
    .filter((item): item is PageObjectResponse => 'properties' in item)
    .map((item) => {
      const props = item.properties as unknown as ProjectDatabaseProps;
      let coverUrl = '/no-image.png';

      if (item.cover?.type === 'external') coverUrl = item.cover.external.url;
      else if (item.cover?.type === 'file') coverUrl = item.cover.file.url;

      return {
        id: item.id,
        title: props.Name?.title?.[0]?.plain_text || '제목 없음',
        description: props.Description?.rich_text?.[0]?.plain_text || '',
        tags: props.Tags?.multi_select?.map((tag) => tag.name) || [],
        github: props.Github?.url || '',
        demo: props.Demo?.url || '',
        cover: coverUrl,
      };
    });
};

export const getBdoRecipes = async (): Promise<BdoRecipe[]> => {
  if (!process.env.NOTION_RECIPE_ID) return [];
  const response = await queryV5Database(process.env.NOTION_RECIPE_ID, [
    { property: 'Name', direction: 'ascending' },
  ]);

  return response.results
    .filter((item): item is PageObjectResponse => 'properties' in item)
    .map((item) => {
      const props = item.properties as unknown as BdoDatabaseProps;
      const materials: { name: string; count: number }[] = [];

      for (let i = 1; i <= 5; i++) {
        const textProp = props[`Stuff${i}_T`];
        const numProp = props[`Stuff${i}_N`];

        if (textProp?.type === 'rich_text' && numProp?.type === 'number') {
          const name = textProp.rich_text[0]?.plain_text;
          const count = numProp.number;
          if (name && count) materials.push({ name, count });
        }
      }

      return {
        id: item.id,
        name: props.Name?.title?.[0]?.plain_text || '이름 없음',
        tag: props.Tag?.select?.name || '기타',
        materials,
        tip: props.Tip?.rich_text?.[0]?.plain_text || '',
      };
    });
};
