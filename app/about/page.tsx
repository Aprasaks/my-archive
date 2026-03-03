'use client';

import React from 'react';
import Link from 'next/link';
import { SiGithub } from 'react-icons/si';

export default function AboutPage(): React.ReactElement {
  return (
    <div className="relative flex min-h-[calc(100vh-16rem)] flex-col items-center px-6 pt-32 pb-40">
      <div className="w-full max-w-4xl">
        {/* Header: Pure Typography */}
        <header className="mb-24 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 md:text-6xl">
            Dechive{' '}
            <span className="text-xl font-light tracking-tight text-slate-300 italic md:text-2xl">
              : Documenting the Undocumented
            </span>
          </h1>
          <p className="pb-2 text-[10px] font-bold tracking-[0.4em] text-blue-500 uppercase">
            Shared with You
          </p>
        </header>

        {/* Content Section: Editorial Style */}
        <div className="grid grid-cols-1 gap-12 border-t border-slate-100 pt-12 md:grid-cols-2 md:gap-24">
          {/* Left: Identity & Perspective */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black tracking-[0.3em] text-slate-300 uppercase italic">
              / Perspectives
            </h3>
            <p className="text-lg leading-relaxed font-medium text-slate-600">
              We do not simply replicate information. <br />
              At the intersection of <br className="hidden md:block" />
              <strong>Product Management</strong> and{' '}
              <strong>Engineering</strong>, <br />
              we restructure verified knowledge into a private archive.
            </p>
          </div>

          {/* Right: The Goal of Archiving */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black tracking-[0.3em] text-slate-300 uppercase italic">
              / Mission
            </h3>
            <div className="space-y-6">
              <p className="text-sm leading-relaxed text-slate-500">
                In an era of AI-generated noise, <br />
                we believe in the power of{' '}
                <strong>human-curated records</strong>. <br />
                From deep-tech insights to daily wellness, <br />
                we accumulate data that actually matters to your life.
              </p>
            </div>
          </div>
        </div>

        {/* Categories: Minimalist List */}
        <section className="mt-24 grid grid-cols-1 gap-8 border-t border-slate-50 pt-12 md:grid-cols-2">
          <div className="group flex items-center gap-4">
            <span className="text-xs font-black text-slate-200 italic transition-colors group-hover:text-blue-500">
              01
            </span>
            <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
              IT Tech & Infrastructure
            </span>
          </div>
          <div className="group flex items-center gap-4">
            <span className="text-xs font-black text-slate-200 italic transition-colors group-hover:text-green-500">
              02
            </span>
            <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
              Healthcare & Life-log
            </span>
          </div>
        </section>

        {/* Footer: Minimal & Clean */}
        <footer className="mt-32 flex items-center justify-between opacity-30 transition-all hover:opacity-100">
          <Link href="https://github.com/Aprasaks" target="_blank">
            <SiGithub size={20} className="text-slate-900" />
          </Link>
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-bold tracking-widest text-slate-300 uppercase">
              Connect with Demian
            </span>
            <a
              href="mailto:heavenin24@naver.com"
              className="text-[10px] font-bold tracking-widest text-slate-900 uppercase underline decoration-slate-200 underline-offset-4"
            >
              heavenin24@naver.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
