import React from 'react';

export default function PrivacyPolicy() {
  const domain = 'demian.dev'; // 형 도메인으로 수정!

  return (
    <main className="mx-auto max-w-3xl px-6 py-32">
      <h1 className="mb-8 text-3xl font-bold text-slate-800">
        개인정보처리방침
      </h1>

      <div className="prose prose-slate prose-sm max-w-none space-y-8 leading-relaxed text-slate-600">
        <section>
          <h2 className="text-lg font-bold text-slate-700">
            1. 개인정보 수집 항목
          </h2>
          <p>
            {domain} (이하 `본 사이트`)은(는) 별도의 회원가입 없이 컨텐츠를
            이용할 수 있습니다. 다만, 서비스 이용 과정에서 쿠키, 방문 기록, 접속
            IP 정보 등이 자동으로 생성되어 수집될 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-700 underline decoration-blue-500/30">
            2. Google AdSense 및 쿠키 사용
          </h2>
          <p className="rounded-lg border-l-4 border-blue-500 bg-blue-50/50 p-4">
            본 사이트는 <strong>Google AdSense</strong>를 사용하여 광고를
            게재합니다. Google은 쿠키를 사용하여 사용자가 본 사이트 또는 다른
            사이트를 방문한 기록을 바탕으로 맞춤형 광고를 제공합니다. 사용자는{' '}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              className="text-blue-600 underline"
            >
              Google 광고 설정
            </a>
            을 통해 맞춤형 광고를 해제할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-700">
            3. 개인정보의 이용 목적
          </h2>
          <p>
            수집된 정보는 서비스 개선, 방문 통계 분석, 맞춤형 광고 제공 등을
            위해서만 사용됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-700">
            4. 개인정보의 보유 및 이용기간
          </h2>
          <p>
            이용자의 개인정보는 원칙적으로 이용 목적이 달성되면 지체 없이
            파기합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-700">5. 문의처</h2>
          <p>
            개인정보와 관련한 문의사항은 heavenin24@naver.com 로 연락주시기
            바랍니다.
          </p>
        </section>

        <p className="mt-20 text-[11px] text-slate-400">
          최종 수정일: 2026. 02. 11
        </p>
      </div>
    </main>
  );
}
