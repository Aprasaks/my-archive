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
    // 1. 배경 및 전체 레이아웃: Archive와 동일하게 bg-transparent 및 패딩 설정
    <div className="min-h-screen bg-transparent pt-16 pb-40">
      <div className="mx-auto max-w-5xl px-6">
        {/* 2. 헤더 영역: Archive의 6xl 폰트와 tracking-tighter 스타일 적용 */}
        <div className="flex flex-col justify-between gap-8 border-b border-white/5 pb-12 md:flex-row md:items-end">
          <div className="flex-1">
            <h1 className="font-isyun text-6xl font-black tracking-tighter text-white">
              Lab
            </h1>
            <p className="font-isyun mt-2 text-sm font-medium tracking-[0.4em] text-slate-500 uppercase">
              Project & Experiment System
            </p>
          </div>
          {/* 필요시 Archive처럼 오른쪽에 Pill 컴포넌트 추가 가능 */}
        </div>

        {/* 3. 프로젝트 리스트 영역: Glassmorphism 적용 */}
        <div className="mt-16 space-y-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col gap-8 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all hover:border-blue-500/50 hover:bg-white/10 md:flex-row md:items-start"
              >
                {/* 썸네일 (메인 페이지 Selection 느낌으로) */}
                <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl border border-white/5 bg-white/5 md:w-64">
                  {project.cover !== '/no-image.png' ? (
                    <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-white/5 to-white/10 text-slate-600">
                      <span className="text-[10px] font-black tracking-widest uppercase">
                        No Image
                      </span>
                    </div>
                  )}
                </div>

                {/* 내용 섹션 */}
                <div className="flex flex-1 flex-col">
                  <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white transition-colors group-hover:text-blue-400">
                      {project.title}
                    </h2>
                    <div className="flex gap-4 text-xl">
                      {project.github && (
                        <Link
                          href={project.github}
                          target="_blank"
                          className="text-slate-500 transition-colors hover:text-white"
                        >
                          <SiGithub />
                        </Link>
                      )}
                      {project.demo && (
                        <Link
                          href={project.demo}
                          className="text-slate-500 transition-colors hover:text-blue-400"
                        >
                          <FiArrowUpRight />
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="mb-4 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                    <FiCalendar className="text-blue-500/50" />
                    <span>2024.02 ~ 진행중</span>
                  </div>

                  <p className="mb-6 text-base leading-relaxed text-slate-400">
                    {project.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold text-slate-500 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {project.demo && (
                  <Link href={project.demo} className="absolute inset-0 z-10" />
                )}
              </div>
            ))
          ) : (
            <div className="py-40 text-center">
              <p className="font-isyun text-slate-600">Loading Projects...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
