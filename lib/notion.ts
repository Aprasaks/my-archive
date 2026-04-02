// src/lib/notion.ts

import { Client } from '@notionhq/client';
// 🌟 1. Next.js 강력한 캐시 함수 임포트
import { unstable_cache } from 'next/cache';
import {
  PageObjectResponse,
  PartialPageObjectResponse,
  BlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

import {
  Post,
  ProjectItem,
  BdoRecipe,
  BlogDatabaseProps,
  ProjectDatabaseProps,
  BdoDatabaseProps,
} from '@/types/notion';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID as string;

// =========================================================
// [Core] V5 API 대응 및 타입 캐스팅
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
        results: (BlockObjectResponse | PartialPageObjectResponse)[];
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
// [Functions] 데이터 연동 함수들 (🚀 캐싱 적용 완료)
// =========================================================

// 🌟 2. 전체 글 목록 캐싱 (60초 유지)
export const getAllItems = unstable_cache(
  async (): Promise<Post[]> => {
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
        subtitle: props.Subtitle?.rich_text?.[0]?.plain_text || '',
        slug: props.Slug?.rich_text?.[0]?.plain_text || '',
        description: props.Description?.rich_text?.[0]?.plain_text || '',
        type: (props.Type?.select?.name === 'Folder' ? 'Folder' : 'Post') as
          | 'Post'
          | 'Folder',
        tags: props.Tag?.multi_select?.map((tag) => tag.name) || [],
        date: 'created_time' in item ? item.created_time : '',
        parentId: props['Parent Item']?.relation?.[0]?.id || null,
      };
    });
  },
  ['all-items-cache'], // 캐시 이름표
  { revalidate: 60, tags: ['posts'] }
);

// getPageBySlug는 getAllItems를 호출하므로 알아서 캐싱 효과를 봅니다.
export async function getPageBySlug(slug: string): Promise<Post | null> {
  const allPosts = await getAllItems();
  return allPosts.find((p) => p.slug === slug) || null;
}

// 🌟 3. 포스트 본문 캐싱 (13초 주범 잡기!)
export const getPageContent = unstable_cache(
  async (pageId: string) => {
    const response = await strictNotion.blocks.children.list({
      block_id: pageId,
    });
    return response.results;
  },
  ['page-content-cache'], // Next.js가 파라미터(pageId)별로 알아서 캐시 분리함
  { revalidate: 60 }
);

function createEmptyPost(id: string): Post {
  return {
    id,
    title: '접근 불가',
    subtitle: '',
    slug: '',
    description: '',
    type: 'Post',
    tags: [],
    date: '',
    parentId: null,
  };
}

// 🌟 4. 프로젝트 목록 캐싱
export const getProjectList = unstable_cache(
  async (): Promise<ProjectItem[]> => {
    if (!process.env.NOTION_PROJECT_ID) return [];
    const response = await queryV5Database(process.env.NOTION_PROJECT_ID, [
      { property: 'Name', direction: 'ascending' },
    ]);

    return response.results
      .filter((item): item is PageObjectResponse => 'properties' in item)
      .map((item) => {
        const props = item.properties as unknown as ProjectDatabaseProps;
        let coverUrl = '/no-image.png';

        if ('cover' in item && item.cover?.type === 'external')
          coverUrl = item.cover.external.url;
        else if ('cover' in item && item.cover?.type === 'file')
          coverUrl = item.cover.file.url;

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
  },
  ['project-list-cache'],
  { revalidate: 60 }
);

// 🌟 5. 레시피 목록 캐싱
export const getBdoRecipes = unstable_cache(
  async (): Promise<BdoRecipe[]> => {
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
  },
  ['bdo-recipes-cache'],
  { revalidate: 60 }
);
