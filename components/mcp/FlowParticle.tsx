import React from 'react';
import { motion } from 'framer-motion';

interface FlowParticleProps {
  isActive: boolean;
  delay?: number;
}

export default function FlowParticle({
  isActive,
  delay = 0,
}: FlowParticleProps) {
  return (
    <div className="relative mx-4 h-1 flex-1 overflow-hidden rounded-full bg-gray-100/50">
      {isActive && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 1.5,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: delay,
          }}
          className="absolute inset-y-0 w-1/2 bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-80"
        />
      )}
    </div>
  );
}
