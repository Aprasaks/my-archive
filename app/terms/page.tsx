import React from 'react';

export default function TermsOfService() {
  const domain = 'demian.dev';

  return (
    <main className="mx-auto max-w-3xl px-6 py-32 text-zinc-400">
      <h1 className="mb-12 text-4xl font-bold tracking-tight text-white">
        이용약관 (Terms of Service)
      </h1>

      <div className="space-y-12 leading-relaxed">
        {/* 1. 목적 - 오라버니 코드 + 전문성 강화 */}
        <section>
          <h2 className="mb-4 font-sans text-xl font-bold text-zinc-100">
            1. 목적
          </h2>
          <p>
            본 약관은{' '}
            <span className="font-medium text-zinc-200">{domain}</span> (이하 본
            사이트)에서 제공하는 지식 정보 서비스 및 관련 제반 서비스의 이용
            조건 및 절차에 관한 사항을 규정함을 목적으로 합니다. 본 사이트의
            모든 콘텐츠는 정보 전달 및 지식 공유를 위해 제공됩니다.
          </p>
        </section>

        {/* 2. 저작권 - Dechive의 핵심 가치 반영 */}
        <section>
          <h2 className="mb-4 font-sans text-xl font-bold text-zinc-100">
            2. 저작권 및 콘텐츠 이용 규칙
          </h2>
          <p className="mb-4">
            본 사이트에 게시된 모든 포스트, 이미지, 소스 코드 등(이하 콘텐츠)의
            저작권은 별도의 표기가 없는 한 원저작자(Demian)에게 귀속됩니다.
            사용자는 본 사이트의 정보를 다음과 같은 조건 하에 이용할 수
            있습니다.
          </p>
          <ul className="ml-2 list-inside list-disc space-y-2 rounded-xl border border-zinc-800 bg-zinc-800/30 p-5 text-zinc-300">
            <li>
              <strong>비영리적 목적:</strong> 모든 정보는 개인적인 학습 및
              비영리 목적으로만 사용 가능합니다.
            </li>
            <li>
              <strong>출처 명시 필수:</strong> 콘텐츠 인용 시 반드시 본 사이트의
              URL을 포함한 출처를 명확히 밝혀야 합니다.
            </li>
            <li>
              <strong>무단 배포 금지:</strong> 사전 협의 없는 대량의 무단 전재
              및 재배포는 엄격히 금지됩니다.
            </li>
          </ul>
        </section>

        {/* 3. 책임의 한계 - 법적 방어막 강화 */}
        <section>
          <h2 className="mb-4 font-sans text-xl font-bold text-zinc-100 underline decoration-zinc-800 underline-offset-8">
            3. 책임의 한계와 면책 조항
          </h2>
          <div className="rounded-xl border-l-4 border-zinc-700 bg-zinc-900/50 p-6 text-zinc-300 italic">
            <p className="mb-2">
              본 사이트에서 제공하는 모든 정보는 정보 전달을 목적으로 하며, 그
              내용의 최신성, 정확성이나 완전성을 100% 보장하지 않습니다. 특히
              코드 및 기술적 가이드의 경우, 실행 환경에 따라 결과가 다를 수
              있습니다.
            </p>
            <p>
              따라서 제공된 정보를 이용함에 따라 발생하는 직접적, 간접적
              손실이나 손해에 대해 본 사이트는 어떠한 법적 책임도 지지 않음을
              명시합니다. 모든 결정의 최종 책임은 사용자 본인에게 있습니다.
            </p>
          </div>
        </section>

        {/* 4. 약관의 개정 및 공지 */}
        <section>
          <h2 className="mb-4 font-sans text-xl font-bold text-zinc-100">
            4. 약관의 개정
          </h2>
          <p>
            본 사이트는 관련 법령을 위배하지 않는 범위 내에서 본 약관을 개정할
            수 있습니다. 약관이 개정될 경우, 시행일 7일 전부터 사이트 하단을
            통해 공지하며, 시행일 이후 서비스를 이용하는 경우 개정된 약관에
            동의한 것으로 간주합니다.
          </p>
        </section>

        <p className="mt-20 text-xs text-zinc-600">시행일자: 2026. 04. 03</p>
      </div>
    </main>
  );
}
