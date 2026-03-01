'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  gradient?: string;
}

export function AnimatedCard({
  children,
  className = '',
  delay = 0,
  hover = true,
  gradient = 'from-card to-secondary/30',
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.4,
        delay,
        ease: 'easeOut',
      }}
      whileHover={
        hover
          ? {
              scale: 1.02,
              y: -5,
              transition: { duration: 0.2, ease: 'easeOut' },
            }
          : undefined
      }
      className={`group relative overflow-hidden rounded-2xl border border-border bg-linear-to-br ${gradient} p-6 transition-all duration-300 ${className}`}
      style={{ willChange: hover ? 'transform' : 'auto' }}
    >
      {/* Simplified hover glow effect */}
      {hover ? (
        <div className='absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      ) : null}

      <div className='relative z-10'>{children}</div>
    </motion.div>
  );
}
