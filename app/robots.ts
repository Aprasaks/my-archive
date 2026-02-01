import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // 모든 로봇(Google, Bing, Yeti...) 허용
      allow: '/', // 모든 페이지 접근 허용
    },
    sitemap: 'https://demian.dev/sitemap.xml', // 사이트맵 위치 알려주기
  };
}
