export interface TrendItem {
  rank: number;
  keyword: string;
  traffic: string;
}

export async function getGoogleTrends(): Promise<TrendItem[]> {
  try {
    // 🔥 형이 직접 찾아낸 구글 트렌드 공식 최신 RSS 주소!
    const response = await fetch(
      'https://trends.google.co.kr/trending/rss?geo=KR',
      {
        next: { revalidate: 3600 }, // 1시간 캐싱
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          Accept: 'application/rss+xml, application/xml, text/xml',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Google Trends RSS fetch failed: ${response.status}`);
    }

    const xmlText = await response.text();

    // <item> 태그 단위로 텍스트를 나눔
    const items = xmlText.split('<item>').slice(1);

    // Top 10 데이터만 추출
    const trends: TrendItem[] = items.slice(0, 10).map((item, index) => {
      // 제목(키워드) 추출
      const titleMatch = item.match(/<title>(.*?)<\/title>/);

      // 트래픽(검색량) 추출 - 최신 RSS 양식에 맞게 확인
      const trafficMatch = item.match(
        /<ht:approx_traffic>(.*?)<\/ht:approx_traffic>/
      );

      let keyword = titleMatch ? titleMatch[1] : '알 수 없음';
      // 구글 RSS 특성상 CDATA 태그가 붙어있을 수 있으므로 제거
      keyword = keyword
        .replace('<!\\[CDATA\\[', '')
        .replace('\\]\\]>', '')
        .trim();

      let traffic = trafficMatch ? trafficMatch[1] : '';
      traffic = traffic
        .replace('<!\\[CDATA\\[', '')
        .replace('\\]\\]>', '')
        .trim();

      return {
        rank: index + 1,
        keyword,
        traffic,
      };
    });

    return trends;
  } catch (error) {
    console.error('구글 트렌드 RSS 로딩 에러:', error);
    return [];
  }
}
