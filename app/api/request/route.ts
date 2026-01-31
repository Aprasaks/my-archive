import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. 프론트엔드에서 보낸 메시지 받기
    const body = await request.json();
    const { message } = body;

    // 로그 찍어서 확인해보기 (터미널에 뜸)
    console.log('📨 요청 도착:', message);

    // 2. 환경변수에서 웹훅 주소 가져오기
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    // 주소가 없으면 에러!
    if (!webhookUrl) {
      console.error('❌ DISCORD_WEBHOOK_URL 환경변수가 없습니다.');
      return NextResponse.json(
        { error: 'Server Config Error' },
        { status: 500 }
      );
    }

    // 3. 디스코드에 보낼 편지 포장하기 (이쁘게 꾸미기)
    const payload = {
      username: 'Dechive 알림봇',
      embeds: [
        {
          title: '📢 새로운 정보 요청이 도착했습니다!',
          description: message, // 형이 쓴 내용이 여기에 들어감
          color: 0x5865f2, // 디스코드 보라색
          fields: [
            {
              name: '요청 시간',
              value: new Date().toLocaleString('ko-KR', {
                timeZone: 'Asia/Seoul',
              }),
              inline: true,
            },
          ],
          footer: {
            text: 'Dechive Knowledge Archive',
          },
        },
      ],
    };

    // 4. 진짜로 디스코드에 전송 (fetch)
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // 전송 실패 시
    if (!response.ok) {
      console.error('❌ 디스코드 전송 실패:', response.statusText);
      return NextResponse.json({ error: 'Discord Error' }, { status: 500 });
    }

    // 성공!
    console.log('✅ 디스코드 전송 성공!');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ 서버 내부 오류:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
