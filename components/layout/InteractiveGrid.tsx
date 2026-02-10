'use client';

import React, { useEffect, useRef } from 'react';

export default function InteractiveGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      container.style.setProperty('--mouse-x', `${e.clientX}px`);
      container.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="dot-grid bg-bg-main fixed inset-0 -z-50 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(59, 130, 246, 0.12), transparent 40%)`,
        }}
      />
    </div>
  );
}
