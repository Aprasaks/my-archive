'use client'; // 상태 관리(클릭)가 필요해서 추가

import React, { useState } from 'react';
import { examDatabase } from '@/data/examList';
import { BookOpen, ChevronRight, Folder, FolderOpen } from 'lucide-react';

export default function ExamPage() {
  // 기본 선택: 첫 번째 자격증(산업안전기사)
  const [selectedCategory, setSelectedCategory] = useState(examDatabase[0]);

  return (
    <div className="flex h-full min-h-screen bg-gray-50">
      {/* 1. 좌측 사이드바: 자격증 선택 (Tree/Menu) */}
      <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-white">
        <div className="border-b border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800">자격증 목록</h2>
          <p className="mt-1 text-xs text-gray-400">학습할 과목을 선택하세요</p>
        </div>
        <div className="space-y-2 p-4">
          {examDatabase.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-all ${
                selectedCategory.id === category.id
                  ? 'border border-blue-100 bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {selectedCategory.id === category.id ? (
                <FolderOpen size={20} className="text-blue-500" />
              ) : (
                <Folder size={20} className="text-gray-400" />
              )}
              <span className="text-sm font-medium">{category.title}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* 2. 우측 메인: 선택된 자격증의 기출 리스트 */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-5xl">
          {/* 헤더 부분 */}
          <div className="mb-8">
            <h1 className="mb-2 flex items-center gap-3 text-3xl font-bold text-gray-900">
              {selectedCategory.title}
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                Study Ops
              </span>
            </h1>
            <p className="text-gray-500">{selectedCategory.description}</p>
          </div>

          {/* 기출문제 그리드 */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {selectedCategory.exams.map((exam) => (
              <div
                key={exam.year}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                {/* 연도 헤더 */}
                <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 p-4 transition-colors group-hover:bg-blue-50/50">
                  <span className="flex items-center gap-2 text-lg font-bold text-gray-800">
                    <BookOpen size={18} className="text-blue-600" />
                    {exam.year}년
                  </span>
                  <span className="rounded border bg-white px-2 py-1 text-xs font-medium text-gray-400">
                    총 {exam.rounds.length}회분
                  </span>
                </div>

                {/* 회차 리스트 */}
                <div className="space-y-2 p-4">
                  {exam.rounds.map((round) => (
                    <div
                      key={round}
                      className="group/item flex cursor-pointer items-center justify-between rounded-lg border border-transparent bg-white p-3 text-gray-600 transition-all hover:border-blue-100 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <span className="text-sm font-medium">
                        제{round}회 기출문제
                      </span>
                      <ChevronRight
                        size={16}
                        className="text-gray-300 group-hover/item:text-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
