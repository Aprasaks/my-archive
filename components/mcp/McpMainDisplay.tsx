'use client';

import React, { useState, useEffect } from 'react';
import { Github, MessageCircle } from 'lucide-react';
import PipelineNode from './PipelineNode';
import FlowParticle from './FlowParticle';
import CoreReactor from './CoreReactor';
import LogTerminal from './LogTerminal';

export default function McpMainDisplay() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    // [수정] h-[600px] -> h-150 (Tailwind 권장 클래스)
    <div className="relative z-10 flex h-150 w-full flex-col items-center justify-start pt-32 select-none">
      {/* Title / Header */}
      <div className="absolute top-6 flex flex-col items-center">
        <div className="mb-2 flex items-center gap-2 rounded-full border border-gray-100 bg-white/50 px-3 py-1">
          <div className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
          </div>
          <span className="text-xs font-bold tracking-widest text-gray-700">
            SYSTEM ONLINE
          </span>
        </div>
      </div>

      {/* --- Main Pipeline Flow --- */}
      <div className="relative flex w-full max-w-5xl items-center justify-center px-4">
        {/* Background Line */}
        <div className="absolute top-1/2 right-20 left-20 -z-10 h-0.5 rounded-full bg-gray-200 opacity-50"></div>

        {/* 1. GitHub Node */}
        <PipelineNode
          isActive={activeStage === 1}
          label="GitHub"
          subLabel="Input Source"
          icon={Github}
          color="text-gray-900"
        />

        {/* Flow 1 (Git -> Core) */}
        <FlowParticle isActive={activeStage === 1} />

        {/* 2. Central Core */}
        <CoreReactor isActive={activeStage === 2} />

        {/* Flow 2 (Core -> Kakao) */}
        <FlowParticle isActive={activeStage === 2} delay={0.2} />

        {/* 3. Kakao Node */}
        <PipelineNode
          isActive={activeStage === 3}
          label="KakaoTalk"
          subLabel="Alert System"
          icon={MessageCircle}
          color="text-[#391B1B]"
          bgColor="bg-[#FEE500]"
        />
      </div>

      {/* --- Log Terminal --- */}
      <LogTerminal stage={activeStage} />
    </div>
  );
}
