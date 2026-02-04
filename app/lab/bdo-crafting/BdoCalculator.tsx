'use client';

import React, { useState } from 'react';
import {
  FiSearch,
  FiBox,
  FiInfo,
  FiCheckCircle,
  FiTrendingUp,
  FiArrowLeft,
  FiLink,
} from 'react-icons/fi';

type Recipe = {
  id: string;
  name: string;
  tag: string;
  materials: { name: string; count: number }[];
  tip: string;
};

export default function BdoCalculator({ recipes }: { recipes: Recipe[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [craftCount, setCraftCount] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // 🧭 히스토리 스택 (뒤로가기 기능용)
  const [history, setHistory] = useState<Recipe[]>([]);

  const filteredRecipes = recipes.filter((r) => r.name.includes(searchTerm));

  // 국룰 평균값 계산
  const getExpectedOutput = (count: number) => Math.floor(count * 2.5);
  const getExpectedRare = (count: number) => Math.floor(count * 0.3);

  // 🔗 레시피 이동 처리 (드릴다운)
  const handleRecipeClick = (recipe: Recipe) => {
    if (selectedRecipe) {
      setHistory((prev) => [...prev, selectedRecipe]); // 현재 레시피를 역사책에 저장
    }
    setSelectedRecipe(recipe);
    setCraftCount(1); // 하위 재료 볼 때는 1개 기준으로 초기화 (원하면 변경 가능)
    setSearchTerm(''); // 검색어 비우기 (선택사항)
  };

  // 🔙 뒤로 가기 처리
  const handleBack = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    const newHistory = history.slice(0, -1);

    setSelectedRecipe(previous);
    setHistory(newHistory);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* 왼쪽: 검색 및 목록 */}
      <div className="space-y-4 lg:col-span-4">
        <div className="relative">
          <FiSearch className="absolute top-3.5 left-3 text-slate-400" />
          <input
            type="text"
            placeholder="레시피 검색 (예: 분노)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-10 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div className="h-125 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => {
                  setSelectedRecipe(recipe);
                  setCraftCount(1);
                  setHistory([]); // 목록에서 직접 누르면 히스토리 초기화
                }}
                className={`mb-1 flex w-full items-center justify-between rounded-lg p-3 text-left transition-all ${
                  selectedRecipe?.id === recipe.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="font-bold">{recipe.name}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${selectedRecipe?.id === recipe.id ? 'bg-white/20 text-white' : recipe.tag === '연금' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}
                >
                  {recipe.tag}
                </span>
              </button>
            ))
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              <div className="text-center">
                <FiSearch className="mx-auto mb-2 text-2xl opacity-50" />
                검색 결과가 없습니다.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 오른쪽: 상세 정보 및 계산 결과 */}
      <div className="lg:col-span-8">
        {selectedRecipe ? (
          <div className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-lg md:p-8">
            {/* 🔙 뒤로 가기 버튼 (히스토리가 있을 때만 등장) */}
            {history.length > 0 && (
              <button
                onClick={handleBack}
                className="absolute top-6 left-6 flex items-center gap-1 text-sm font-bold text-slate-400 transition-colors hover:text-slate-600"
              >
                <FiArrowLeft /> 뒤로 ({history[history.length - 1].name})
              </button>
            )}

            {/* 헤더 */}
            <div className="mt-6 mb-8 flex flex-col gap-4 border-b border-slate-100 pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span
                  className={`mb-2 inline-block rounded px-2 py-1 text-xs font-bold ${selectedRecipe.tag === '연금' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}
                >
                  {selectedRecipe.tag}
                </span>
                <h2 className="text-3xl font-black text-slate-900">
                  {selectedRecipe.name}
                </h2>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-2 shadow-inner">
                <span className="pl-2 text-sm font-bold text-slate-500">
                  제작 횟수
                </span>
                <input
                  type="number"
                  min="1"
                  value={craftCount}
                  onChange={(e) =>
                    setCraftCount(Math.max(1, Number(e.target.value)))
                  }
                  className="w-24 rounded-lg border border-slate-200 bg-white px-3 py-2 text-right text-lg font-black text-slate-900 outline-none focus:border-blue-500"
                />
                <span className="pr-2 text-sm font-bold text-slate-500">
                  회
                </span>
              </div>
            </div>

            {/* 예상 결과물 패널 */}
            <div className="mb-8 rounded-xl border border-blue-100 bg-blue-50 p-5">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wider text-blue-800 uppercase">
                <FiTrendingUp /> 예상 획득량 (평균치)
              </h3>
              <div className="flex gap-8">
                <div>
                  <span className="mb-1 block text-xs font-medium text-blue-500">
                    일반 결과물 (x2.5)
                  </span>
                  <span className="text-2xl font-black text-blue-700">
                    {getExpectedOutput(craftCount).toLocaleString()}
                    <span className="ml-1 text-sm font-normal">개</span>
                  </span>
                </div>
                <div>
                  <span className="mb-1 block text-xs font-medium text-blue-500">
                    상위 등급 (x0.3)
                  </span>
                  <span className="text-2xl font-black text-blue-700">
                    {getExpectedRare(craftCount).toLocaleString()}
                    <span className="ml-1 text-sm font-normal">개</span>
                  </span>
                </div>
              </div>
            </div>

            {/* 재료 목록 (링크 기능 포함!) */}
            <div className="flex-1">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wider text-slate-400 uppercase">
                <FiBox /> 필요 재료
              </h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {selectedRecipe.materials.map((mat, idx) => {
                  // ⭐ 핵심 로직: 재료 이름과 똑같은 레시피가 있는지 찾는다!
                  const subRecipe = recipes.find((r) => r.name === mat.name);

                  return (
                    <li
                      key={idx}
                      className={`flex items-center justify-between rounded-xl border p-4 transition-all ${subRecipe ? 'group cursor-pointer border-blue-100 bg-blue-50/50 hover:border-blue-300 hover:bg-blue-50' : 'border-slate-100 bg-slate-50'}`}
                      onClick={() => subRecipe && handleRecipeClick(subRecipe)} // 있으면 이동!
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold ${subRecipe ? 'text-blue-700 underline decoration-blue-300 underline-offset-4' : 'text-slate-700'}`}
                        >
                          {mat.name}
                        </span>
                        {subRecipe && (
                          <FiLink className="text-blue-400 opacity-50 group-hover:opacity-100" />
                        )}
                      </div>
                      <div className="text-right">
                        <span className="block text-xl font-black text-slate-900">
                          {(mat.count * craftCount).toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400">
                          (1회당 {mat.count}개)
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {selectedRecipe.tip && (
              <div className="mt-8 flex items-start gap-3 rounded-xl border border-yellow-100 bg-yellow-50 p-4 text-sm text-yellow-800">
                <FiInfo className="mt-0.5 shrink-0 text-lg" />
                <p className="font-medium">{selectedRecipe.tip}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-full min-h-100 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400">
            <FiCheckCircle className="mb-4 text-6xl opacity-20" />
            <p className="font-medium">
              왼쪽 목록에서 제작할 아이템을 선택해주세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
