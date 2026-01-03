'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface IconBoxProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
}

export function IconBox({
  icon: Icon,
  size = 24,
  className = '',
}: IconBoxProps) {
  return (
    <motion.div
      whileHover={{ rotate: 10, scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center ${className}`}
    >
      <Icon className='text-foreground' size={size} />
    </motion.div>
  );
}
