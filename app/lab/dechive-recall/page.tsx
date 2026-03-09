import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiShoppingCart, FiCheckCircle } from 'react-icons/fi';

export const metadata = {
  title: 'Dechive: Recall | Project Lab',
  description: '몰입의 순간을 기록하는 원터치 노션 세션 타이머',
};

export default function DechiveRecallPage() {
  const GUMROAD_LINK = 'https://heavenly687.gumroad.com/l/zqcnsg';

  return (
    <div className="min-h-screen bg-transparent pt-16 pb-40">
      <div className="mx-auto max-w-5xl px-6">
        {/* 1. 뒤로가기 버튼 */}
        <Link
          href="/lab"
          className="group mb-12 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-white"
        >
          <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
          BACK TO LAB
        </Link>

        {/* 2. 헤더 섹션 (Archive 스타일) */}
        <div className="mb-20 border-b border-white/5 pb-16">
          <span className="text-[10px] font-black tracking-[0.3em] text-blue-500 uppercase">
            # NOTION_TEMPLATE_01
          </span>
          <h1 className="font-isyun mt-4 text-6xl font-black tracking-tighter text-white md:text-7xl">
            Dechive: Recall
          </h1>
          <p className="font-isyun mt-4 text-xl font-medium text-slate-400">
            복잡한 기록은 그만. 버튼 하나로 완성하는 당신의 몰입 아카이브.
          </p>
        </div>

        {/* 3. 콘텐츠 영역 (2단 구성) */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
          {/* 왼쪽: 상세 설명 (2컬럼 차지) */}
          <div className="space-y-12 md:col-span-2">
            <section>
              <h2 className="mb-6 text-xl font-bold text-white">
                Why Dechive: Recall?
              </h2>
              <p className="mb-6 leading-relaxed text-slate-400">
                공부나 작업의 흐름을 깨지 않는 것이 가장 중요합니다. <br />
                기록을 위해 도구와 씨름하는 시간을 줄이고, 오직 당신의 성장에만
                집중하세요.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  '원터치 세션 기록 시스템',
                  '자동 순공 시간 합산 기능',
                  '미니멀한 대시보드 디자인',
                  '모바일/데스크탑 완벽 최적화',
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/3 p-4"
                  >
                    <FiCheckCircle className="shrink-0 text-blue-500" />
                    <span className="text-sm font-medium text-slate-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                <Image
                  src="/recall.png" // public 폴더 바로 아래에 있으니까 이렇게만 써도 돼!
                  alt="Dechive Recall Screenshot"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>
            </section>
          </div>

          {/* 오른쪽: 구매 카드 (Sticky) */}
          <div className="md:col-span-1">
            <div className="sticky top-32 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <div className="mb-6">
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                  Price
                </span>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">$3</span>
                  <span className="text-sm text-slate-500">USD</span>
                </div>
              </div>

              <Link
                href={GUMROAD_LINK}
                target="_blank"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 text-sm font-bold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
              >
                <FiShoppingCart />
                GET THE TEMPLATE
              </Link>

              <div className="mt-6 space-y-3">
                <p className="text-center text-[10px] leading-relaxed text-slate-500">
                  결제 즉시 노션 템플릿 복제 링크가 포함된 <br />
                  영수증이 이메일로 발송됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
