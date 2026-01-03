'use client';

import { motion } from 'framer-motion';

interface TagProps {
  children: string;
  delay?: number;
  variant?: 'default' | 'bordered';
  size?: 'sm' | 'md';
}

export function Tag({
  children,
  delay = 0,
  variant = 'default',
  size = 'sm',
}: TagProps) {
  const variants = {
    default: 'bg-secondary text-secondary-foreground border-transparent',
    bordered: 'bg-secondary text-foreground border-border',
  };

  const sizes = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.05, y: -2 }}
      className={`${sizes[size]} font-medium rounded-full border transition-all duration-300 cursor-default ${variants[variant]}`}
    >
      {children}
    </motion.span>
  );
}
