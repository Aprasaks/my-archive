import React from 'react';
import { motion } from 'framer-motion';
import { Server } from 'lucide-react';

interface CoreReactorProps {
  isActive: boolean;
}

export default function CoreReactor({ isActive }: CoreReactorProps) {
  return (
    <div className="relative mx-8 md:mx-16">
      <div className="relative flex h-32 w-32 items-center justify-center">
        {/* Ring 1: Outer Dashed (천천히 회전) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className={`absolute inset-0 rounded-full border-2 border-dashed transition-colors duration-500 ${isActive ? 'border-cyan-400 opacity-100' : 'border-gray-200 opacity-50'} `}
        />

        {/* Ring 2: Inner Arc (빠르게 역회전) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className={`absolute inset-3 rounded-full border-[3px] border-t-transparent border-l-transparent transition-colors duration-500 ${isActive ? 'border-cyan-500 opacity-100' : 'border-gray-300 opacity-30'} `}
        />

        {/* Center Core */}
        <div
          className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border bg-white transition-all duration-500 ${isActive ? 'scale-110 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'scale-100 border-gray-100 shadow-sm'} `}
        >
          <Server
            className={`h-8 w-8 transition-colors duration-300 ${isActive ? 'text-cyan-500' : 'text-gray-300'}`}
          />
        </div>

        {/* Status Label */}
        <div className="absolute -bottom-12 text-center whitespace-nowrap">
          <span
            className={`block text-sm font-bold transition-colors ${isActive ? 'text-cyan-600' : 'text-gray-400'}`}
          >
            MCP Core
          </span>
          <span className="font-mono text-[10px] text-gray-400 uppercase">
            {isActive ? 'Processing...' : 'Standby'}
          </span>
        </div>
      </div>
    </div>
  );
}
