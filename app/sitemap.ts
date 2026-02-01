import { MetadataRoute } from 'next';
import { getAllItems } from '@/lib/notion'; // Notion 데이터 가져오기

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. 노션에서 모든 글 가져오기
  const posts = await getAllItems();
  const baseUrl = 'https://demian.dev';

  // 2. 블로그 글 URL 생성
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/archive/${post.slug}`,
    lastModified: new Date(post.date), // 글 작성일/수정일
    changeFrequency: 'daily' as const,
    priority: 0.7, // 우선순위 (0~1)
  }));

  // 3. 정적 페이지(메인, 아카이브) + 글 URL 합치기
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...postUrls,
  ];
}
