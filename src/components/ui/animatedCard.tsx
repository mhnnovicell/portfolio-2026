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
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { scale: 1.02, y: -5 } : undefined}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${gradient} p-6 transition-all duration-500 ${className}`}
    >
      {/* Hover glow effect */}
      <div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

      <div className='relative z-10'>{children}</div>
    </motion.div>
  );
}
