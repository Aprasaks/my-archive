import React from 'react';
import { getBdoRecipes } from '@/lib/notion';
import BdoCalculator from './BdoCalculator';

export const revalidate = 60;

export const metadata = {
  title: '검은사막 제작노트 | Dechive Lab',
  description: '검은사막 요리/연금 황납 재료 계산기',
};

export default async function BdoCraftingPage() {
  const recipes = await getBdoRecipes();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-3xl font-black text-slate-900 md:text-4xl">
          BDO NOTEBOOK
        </h1>
        <p className="text-slate-500">
          인게임 제작노트와 동일 그 자체!
          <br className="hidden md:block" />
          원하는 아이템을 선택하고 수량을 입력하세요.
        </p>
      </div>
      <BdoCalculator recipes={recipes} />
    </div>
  );
}
