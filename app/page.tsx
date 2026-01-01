import React from 'react';
import McpMainDisplay from '@/components/mcp/McpMainDisplay';

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage:
            'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(to right, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      ></div>

      <div className="bg-radial-gradient pointer-events-none absolute inset-0 from-transparent via-transparent to-white/60"></div>

      <div className="mx-auto w-full max-w-7xl p-4">
        <McpMainDisplay />
      </div>
    </main>
  );
}
