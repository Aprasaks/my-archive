import { Client } from '@notionhq/client';
import {
  PageObjectResponse,
  PartialPageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

// 1. 노션 클라이언트 초기화
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  // 라이브러리 타입 정의에는 없지만, 실제로는 존재하는 옵션임
  notionVersion: '2025-09-03',
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID as string;

// ---------------------------------------------------------
// [Type Definition] 라이브러리가 지원하지 않는 v5 타입 직접 정의
// ---------------------------------------------------------

// 1. 우리가 사용할 포스트 데이터 타입
export type Post = {
  id: string;
  title: string;
  slug: string;
  type: 'Post' | 'Folder';
  tags: string[];
  date: string;
  parentId: string | null;
};

// 2. 노션 데이터베이스 속성(Properties) 강제 정의 (any 방지용)
interface DechiveDatabaseProperties {
  Name: {
    type: 'title';
    title: Array<{ plain_text: string }>;
  };
  Slug: {
    type: 'rich_text';
    rich_text: Array<{ plain_text: string }>;
  };
  Type: {
    type: 'select';
    select: { name: string } | null;
  };
  Tag: {
    type: 'multi_select';
    multi_select: Array<{ name: string }>;
  };
  'Parent Item': {
    type: 'relation';
    relation: Array<{ id: string }>;
  };
  Status: {
    type: 'status';
    status: { name: string } | null;
  };
}

// 3. v5 API (DataSources)를 위한 커스텀 클라이언트 인터페이스
interface NotionClientV5 {
  databases: {
    retrieve: (args: { database_id: string }) => Promise<{
      id: string;
      // v5에서 추가된 data_sources 속성 정의
      data_sources?: Array<{ id: string }>;
    }>;
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
}

// ---------------------------------------------------------
// [Function] 데이터 가져오기 로직
// ---------------------------------------------------------

export async function getAllItems(): Promise<Post[]> {
  // 1. 기존 Client를 우리가 만든 V5 인터페이스로 '안전하게' 변환 (Casting)
  // unknown을 거쳐서 캐스팅하면 any 없이도 타입 변경 가능
  const v5Notion = notion as unknown as NotionClientV5;

  // [단계 1] Data Source ID 찾기
  const database = await v5Notion.databases.retrieve({
    database_id: DATABASE_ID,
  });

  const dataSourceId = database.data_sources?.[0]?.id;

  if (!dataSourceId) {
    throw new Error(
      'Data Source ID를 찾을 수 없습니다. 데이터베이스가 올바른지 확인해주세요.'
    );
  }

  // [단계 2] 찾은 dataSourceId로 쿼리 날리기 (이제 자동완성 지원됨!)
  const response = await v5Notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: 'Status',
      status: {
        equals: '완료',
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  });

  // [단계 3] 데이터 매핑 (Type Guard & Casting 활용)
  const items = response.results.map((item) => {
    // PartialPageObjectResponse 처리
    if (!('properties' in item)) {
      return {
        id: item.id,
        title: '접근 불가',
        slug: '',
        type: 'Post' as const, // 여기도 as const 붙여두면 좋아
        tags: [],
        date: '',
        parentId: null,
      };
    }

    const props = item.properties as unknown as DechiveDatabaseProperties;

    return {
      id: item.id,
      title: props.Name?.title?.[0]?.plain_text || '제목 없음',
      slug: props.Slug?.rich_text?.[0]?.plain_text || '',

      // 👇 [수정] 여기가 핵심이야! "이건 무조건 Post 아니면 Folder야"라고 강제 지정(as)
      type: (props.Type?.select?.name === 'Folder' ? 'Folder' : 'Post') as
        | 'Post'
        | 'Folder',

      tags: props.Tag?.multi_select?.map((tag) => tag.name) || [],
      date: item.created_time,
      parentId: props['Parent Item']?.relation?.[0]?.id || null,
    };
  });

  return items;
}

export async function getPageBySlug(slug: string): Promise<Post | null> {
  const allPosts = await getAllItems();
  const post = allPosts.find((p) => p.slug === slug);
  return post || null;
}

// ---------------------------------------------------------
// [추가 기능] 페이지의 본문(블록) 내용 가져오기
// ---------------------------------------------------------
export async function getPageContent(pageId: string) {
  // 노션 페이지는 '블록'들의 집합이야. (문단, 제목, 코드 등)
  // v5 버전 호환을 위해 any로 우회해서 호출
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await (notion as any).blocks.children.list({
    block_id: pageId,
  });

  return response.results;
}
