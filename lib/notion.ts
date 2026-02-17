import { Client } from '@notionhq/client';
import {
  PageObjectResponse,
  PartialPageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID as string;

// =========================================================
// [Type Definition] 1. 결과물 데이터 타입
// =========================================================

export type Post = {
  id: string;
  title: string;
  slug: string;
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
// [Interface] 2. 노션 데이터 구조 "팩트" 정의 (Strict Typing)
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

// (1) [검은사막 DB] 구조
interface BdoDatabaseProps {
  Name: NotionTitle;
  Tag: NotionSelect;
  Tip: NotionRichText;
  [key: string]:
    | NotionTitle
    | NotionSelect
    | NotionRichText
    | NotionNumber
    | undefined;
}

// (2) [프로젝트 DB] 구조
interface ProjectDatabaseProps {
  Name: NotionTitle;
  Description: NotionRichText;
  Tags: NotionMultiSelect;
  Github: NotionUrl;
  Demo: NotionUrl;
  [key: string]:
    | NotionTitle
    | NotionSelect
    | NotionRichText
    | NotionNumber
    | NotionUrl
    | NotionMultiSelect
    | undefined;
}

// (3) [블로그 DB] 구조
interface BlogDatabaseProps {
  Name: NotionTitle;
  Slug: NotionRichText;
  Type: NotionSelect;
  Tag: NotionMultiSelect;
  'Parent Item': NotionRelation;
  Status: NotionStatus;
}

// =========================================================
// [Core Fix] V5 API 호환용 Client 및 Helper
// =========================================================

interface CustomQueryResponse {
  results: (PageObjectResponse | PartialPageObjectResponse)[];
  next_cursor: string | null;
  has_more: boolean;
}

interface StrictNotionClient {
  databases: {
    // DB 정보 조회 (Data Source ID 얻기용)
    retrieve: (args: {
      database_id: string;
    }) => Promise<{ id: string; data_sources?: { id: string }[] }>;
  };
  dataSources: {
    // 실제 쿼리 (이게 형 환경의 유일한 조회 방법!)
    query: (args: {
      data_source_id: string;
      filter?: object;
      sorts?: object;
    }) => Promise<CustomQueryResponse>;
  };
  blocks: {
    children: {
      list: (args: { block_id: string }) => Promise<{
        results: (PageObjectResponse | PartialPageObjectResponse)[];
      }>;
    };
  };
}

const strictNotion = notion as unknown as StrictNotionClient;

// ⭐ [Helper] V5 방식 쿼리 함수 (Retrieve -> Get ID -> Query)
async function queryV5Database(
  databaseId: string,
  sorts?: object[],
  filter?: object
) {
  // 1. DB 정보 가져와서 Data Source ID 찾기
  const db = await strictNotion.databases.retrieve({ database_id: databaseId });
  const dataSourceId = db.data_sources?.[0]?.id;

  if (!dataSourceId)
    throw new Error(`No Data Source ID found for DB: ${databaseId}`);

  // 2. Data Source ID로 쿼리 실행
  return await strictNotion.dataSources.query({
    data_source_id: dataSourceId,
    sorts,
    filter,
  });
}

// =========================================================
// [Function 1] 블로그 글 가져오기
// =========================================================

export async function getAllItems(): Promise<Post[]> {
  // 👇 헬퍼 함수로 교체!
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
      type: (props.Type?.select?.name === 'Folder' ? 'Folder' : 'Post') as
        | 'Post'
        | 'Folder',
      tags: props.Tag?.multi_select?.map((tag) => tag.name) || [],
      date: item.created_time,
      // [중요] 관계형 데이터에서 ID가 아니라 '연결된 폴더명'을 유추할 수 있도록 수정
      // 일단 ID를 넘기되, 컴포넌트에서 이 ID를 슬러그와 매칭하게 할 거야.
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
    type: 'Post',
    tags: [],
    date: '',
    parentId: null,
  };
}

// =========================================================
// [Function 2] LAB 프로젝트 목록
// =========================================================

export const getProjectList = async (): Promise<ProjectItem[]> => {
  if (!process.env.NOTION_PROJECT_ID) return [];

  // 👇 헬퍼 함수로 교체! (databases.query -> dataSources.query)
  const response = await queryV5Database(process.env.NOTION_PROJECT_ID, [
    { property: 'Name', direction: 'ascending' },
  ]);

  const validPages = response.results.filter(
    (item): item is PageObjectResponse => 'properties' in item
  );

  return validPages.map((item) => {
    const props = item.properties as unknown as ProjectDatabaseProps;

    let coverUrl = '/no-image.png';
    if (item.cover) {
      if (item.cover.type === 'external') coverUrl = item.cover.external.url;
      else if (item.cover.type === 'file') coverUrl = item.cover.file.url;
    }

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

// =========================================================
// [Function 3] 검은사막 레시피
// =========================================================

export const getBdoRecipes = async (): Promise<BdoRecipe[]> => {
  if (!process.env.NOTION_RECIPE_ID) return [];

  // 👇 헬퍼 함수로 교체! (여기도 문제였음!)
  const response = await queryV5Database(process.env.NOTION_RECIPE_ID, [
    { property: 'Name', direction: 'ascending' },
  ]);

  const validPages = response.results.filter(
    (item): item is PageObjectResponse => 'properties' in item
  );

  return validPages.map((item) => {
    const props = item.properties as unknown as BdoDatabaseProps;
    const materials: { name: string; count: number }[] = [];

    for (let i = 1; i <= 5; i++) {
      const textKey = `Stuff${i}_T`;
      const numKey = `Stuff${i}_N`;

      const textProp = props[textKey];
      const numProp = props[numKey];

      if (textProp?.type === 'rich_text' && numProp?.type === 'number') {
        const name = textProp.rich_text[0]?.plain_text;
        const count = numProp.number;

        if (name && count) {
          materials.push({ name, count });
        }
      }
    }

    return {
      id: item.id,
      name: props.Name?.title?.[0]?.plain_text || '이름 없음',
      tag: props.Tag?.select?.name || '기타',
      materials: materials,
      tip: props.Tip?.rich_text?.[0]?.plain_text || '',
    };
  });
};
