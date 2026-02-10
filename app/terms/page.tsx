import React from 'react';

export default function TermsOfService() {
  const domain = 'demian.dev';

  return (
    <main className="mx-auto max-w-3xl px-6 py-32">
      <h1 className="mb-8 text-3xl font-bold text-slate-800">이용약관</h1>

      <div className="prose prose-slate prose-sm max-w-none space-y-8 leading-relaxed text-slate-600">
        <section>
          <h2 className="font-sans text-lg font-bold text-slate-700">
            1. 목적
          </h2>
          <p>
            본 약관은 {domain} (이하 `본 사이트`)에서 제공하는 정보 서비스의
            이용 조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-lg font-bold text-slate-700">
            2. 저작권 및 컨텐츠 이용
          </h2>
          <p>
            본 사이트에 게시된 모든 포스트, 이미지, 소스 코드 등의 저작권은
            별도의 표기가 없는 한 원저작자에게 귀속됩니다. 사용자는 본 사이트의
            정보를 비영리적 목적으로만 사용 할 수 있으며, 출처를 명시하지 않은
            무단 전재 및 재배포는 금지됩니다.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-lg font-bold text-slate-700">
            3. 책임의 한계
          </h2>
          <p className="rounded-lg border-l-4 border-slate-300 bg-slate-50 p-4 italic">
            본 사이트에서 제공하는 정보는 정보 전달을 목적으로 하며, 그 내용의
            정확성이나 완전성을 보장하지 않습니다. 제공된 정보를 이용함에 따라
            발생하는 직접적, 간접적 손실에 대해 본 사이트는 어떠한 책임도 지지
            않습니다.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-lg font-bold text-slate-700">
            4. 약관의 개정
          </h2>
          <p>
            본 사이트는 관련 법령을 위배하지 않는 범위 내에서 본 약관을 개정할
            수 있으며, 개정 시 사이트 하단에 공지합니다.
          </p>
        </section>

        <p className="mt-20 text-[11px] text-slate-400">
          시행일자: 2026. 02. 11
        </p>
      </div>
    </main>
  );
}
