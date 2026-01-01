import React from 'react';

interface LogTerminalProps {
  stage: number;
}

export default function LogTerminal({ stage }: LogTerminalProps) {
  const getLogContent = () => {
    switch (stage) {
      case 1:
        return (
          <>
            <span className="font-bold text-blue-500">[INFO]</span> New Commit
            detected on main branch.
          </>
        );
      case 2:
        return (
          <>
            <span className="font-bold text-cyan-500">[PROC]</span> Parsing
            markdown data... Updating DB.
          </>
        );
      case 3:
        return (
          <>
            <span className="font-bold text-yellow-600">[SENT]</span>{' '}
            Notification dispatched to User (Kakao).
          </>
        );
      default:
        return (
          <>
            <span className="font-bold text-emerald-500">[IDLE]</span> System
            monitoring... Waiting for events.
          </>
        );
    }
  };

  return (
    <div className="absolute bottom-12 w-full max-w-2xl px-6">
      <div className="flex h-32 flex-col justify-end rounded-xl border border-gray-200 bg-white/80 p-4 font-mono text-xs text-gray-500 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col gap-1.5">
          <div className="opacity-40">[12:42:10] Connection established.</div>
          <div className="opacity-60">[12:42:15] Daily briefing completed.</div>
          <div className="flex animate-pulse items-center gap-2 rounded bg-gray-50 p-1.5">
            <span className="animate-blink block h-3 w-1.5 bg-gray-400"></span>
            {getLogContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
