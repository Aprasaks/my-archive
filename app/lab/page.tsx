import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectList } from '@/lib/notion';
import { SiGithub } from 'react-icons/si';
import { FiArrowUpRight, FiCalendar } from 'react-icons/fi';

export const metadata = {
  title: 'Projects | Dechive',
  description: 'Dechive Project Archives',
};

export const revalidate = 60;

export default async function LabPage() {
  const projects = await getProjectList();

  return (
    // 1. 배경: demian.dev 스타일의 정교한 모눈종이 그리드
    <div className="min-h-screen w-full bg-white text-slate-900">
      {/* 그리드 패턴 (배경) */}
      <div className="bg-size:24px_24px] absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]"></div>

      <div className="relative mx-auto max-w-4xl px-4 py-24">
        {/* 2. 헤더: 이모티콘 싹 빼고 담백하게 */}
        <div className="mb-16 border-b border-slate-200 pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            PROJECTS
          </h1>
          <p className="mt-2 text-slate-500">Side projects and Lab</p>
        </div>

        {/* 3. 프로젝트 리스트 (가로형 배치) */}
        <div className="space-y-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col gap-6 rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-lg md:flex-row md:items-start"
              >
                {/* (1) 썸네일 (작고 예쁘게) */}
                <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-50 md:w-48">
                  {project.cover !== '/no-image.png' ? (
                    <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    // 이미지가 없을 때: 예쁜 그라디언트 박스
                    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 text-slate-400">
                      <span className="text-xs font-bold tracking-widest uppercase opacity-50">
                        No Image
                      </span>
                    </div>
                  )}
                </div>

                {/* (2) 내용 (설명 + 기간) */}
                <div className="flex flex-1 flex-col">
                  <div className="mb-1 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">
                      {project.title}
                    </h2>

                    {/* 링크 아이콘들 */}
                    <div className="flex gap-2">
                      {project.github && (
                        <Link
                          href={project.github}
                          target="_blank"
                          className="text-slate-400 transition-colors hover:text-slate-900"
                        >
                          <SiGithub />
                        </Link>
                      )}
                      {project.demo && (
                        <Link
                          href={project.demo}
                          className="text-slate-400 transition-colors hover:text-blue-600"
                        >
                          <FiArrowUpRight />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* 기간 표시 (임시) */}
                  <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-400">
                    <FiCalendar className="text-slate-300" />
                    <span>2024.02 ~ 진행중</span>
                    {/* 💡 팁: 나중에 노션에 'Date' 컬럼 만들어서 여기 연동하면 됨! */}
                  </div>

                  <p className="mb-4 text-sm leading-relaxed text-slate-600">
                    {project.description}
                  </p>

                  {/* 태그 (작고 심플하게) */}
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 카드 전체 클릭 가능하게 만드는 투명 링크 (UX) */}
                {project.demo && (
                  <Link href={project.demo} className="absolute inset-0 z-10" />
                )}
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-slate-400">
              <p>프로젝트 준비 중입니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
