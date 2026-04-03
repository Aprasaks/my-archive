import React from 'react';

export default function PrivacyPolicy() {
  const domain = 'demian.dev';

  return (
    <main className="mx-auto max-w-3xl px-6 py-32 text-zinc-400">
      <h1 className="mb-12 text-4xl font-bold text-white">개인정보처리방침</h1>

      <div className="space-y-12 leading-relaxed text-zinc-400">
        <section>
          <h2 className="mb-4 text-xl font-bold text-zinc-100">
            1. 개인정보 수집 항목
          </h2>
          <p>
            {domain} (이하 본 사이트)은(는) 별도의 회원가입 없이 컨텐츠를 이용할
            수 있습니다. 다만, 서비스 이용 과정에서 쿠키, 방문 기록, 접속 IP
            정보 등이 자동으로 생성되어 수집될 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-zinc-100 underline decoration-blue-500/30">
            2. Google AdSense 및 쿠키 사용
          </h2>
          {/* 다크 모드에 어울리는 딥 블루 강조 박스 */}
          <p className="rounded-xl border-l-4 border-blue-500 bg-blue-500/10 p-6 text-zinc-300">
            본 사이트는 <strong>Google AdSense</strong>를 사용하여 광고를
            게재합니다. Google은 쿠키를 사용하여 사용자가 본 사이트 또는 다른
            사이트를 방문한 기록을 바탕으로 맞춤형 광고를 제공합니다. 사용자는{' '}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              className="font-medium text-blue-400 underline underline-offset-4 hover:text-blue-300"
            >
              Google 광고 설정
            </a>
            을 통해 맞춤형 광고를 해제할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-zinc-100">
            3. 개인정보의 이용 목적
          </h2>
          <p>
            수집된 정보는 서비스 개선, 방문 통계 분석, 맞춤형 광고 제공 등을
            위해서만 사용됩니다.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-zinc-100">
            4. 개인정보의 보유 및 이용기간
          </h2>
          <p>
            이용자의 개인정보는 원칙적으로 이용 목적이 달성되면 지체 없이
            파기합니다.
          </p>
        </section>

        <p className="mt-20 text-xs text-zinc-600">최종 수정일: 2026. 04. 03</p>
      </div>
    </main>
  );
}
