import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';

// 구글 인증 클라이언트 설정
const client = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

export async function GET() {
  const propertyId = process.env.GA_PROPERTY_ID;
  console.log('GA_CLIENT_EMAIL:', process.env.GA_CLIENT_EMAIL); // 이메일이 잘 나오나?
  console.log('GA_PROPERTY_ID:', process.env.GA_PROPERTY_ID); // ID가 잘 나오나?

  try {
    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: 'today', endDate: 'today' }], // 오늘 데이터
      metrics: [{ name: 'activeUsers' }], // 오늘 활성 사용자 수
    });
    console.log('GA4 Response:', response); // 구글에서 뭐라고 대답하나?

    // 데이터가 없을 경우를 대비해 기본값 0 설정
    const activeUsers = response.rows?.[0]?.metricValues?.[0]?.value || '0';

    return NextResponse.json({ activeUsers });
  } catch (error) {
    console.error('GA4 API Error:', error);
    return NextResponse.json({ activeUsers: '0' }, { status: 500 });
  }
}
