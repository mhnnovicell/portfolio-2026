'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  background?: 'default' | 'gradient' | 'accent';
}

export function Section({
  id,
  title,
  description,
  children,
  className = '',
  background = 'default',
}: SectionProps) {
  const backgrounds = {
    default: 'bg-background',
    gradient: 'bg-linear-to-b from-background via-card/30 to-background',
    accent: 'bg-linear-to-b from-background via-secondary/20 to-background',
  };

  return (
    <section
      id={id}
      className={`py-24 px-6 min-h-screen flex flex-col justify-center md:px-6 pt-24 pb-16 relative overflow-hidden ${backgrounds[background]} ${className}`}
    >
      <div className='max-w-7xl mx-auto relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>{title}</h2>
          {description && (
            <p className='text-muted-foreground max-w-2xl mx-auto'>
              {description}
            </p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
