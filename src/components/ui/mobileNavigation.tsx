'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';
import type { Navigation } from '../../../sanity.types';
import { useEffect } from 'react';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Navigation['navItems'];
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const menuVariants = {
  hidden: { y: '-100%' },
  visible: {
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 20,
    },
  },
  exit: {
    y: '-100%',
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 20,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
    },
  }),
};

export function MobileNavigation({
  isOpen,
  onClose,
  navItems,
}: MobileNavigationProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${
        window.innerWidth - document.documentElement.clientWidth
      }px`; // Prevent layout shift
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={onClose}
            className='fixed inset-0 bg-background/95 backdrop-blur-md z-50'
            aria-hidden='true'
          />

          {/* Menu Panel */}
          <motion.div
            variants={menuVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            role='dialog'
            aria-modal='true'
            aria-label='Mobile navigation'
            className='fixed inset-0 z-50 flex flex-col bg-linear-to-b from-card via-background to-background'
          >
            {/* Header */}
            <div className='flex items-center justify-between p-6 border-b border-border'>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className='text-xl font-bold tracking-tight'
              >
                <span className='text-foreground'>Menu</span>
              </motion.div>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className='p-2 rounded-full bg-secondary text-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background'
                aria-label='Close navigation menu'
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Navigation Items */}
            <nav
              className='flex-1 flex flex-col justify-center px-6 py-8 space-y-2'
              aria-label='Mobile navigation links'
            >
              {navItems?.map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  variants={itemVariants}
                  initial='hidden'
                  animate='visible'
                >
                  <Link
                    href={item.href ?? ''}
                    onClick={onClose}
                    className='block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-2xl'
                    tabIndex={0}
                  >
                    <motion.div
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      className='group relative overflow-hidden rounded-2xl border border-border bg-linear-to-br from-card to-secondary/30 p-6 transition-all duration-500'
                    >
                      {/* Hover glow effect */}
                      <div className='absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                      <div className='relative z-10 flex items-center justify-between'>
                        <span className='text-2xl font-semibold text-foreground group-hover:text-primary transition-colors'>
                          {item.label}
                        </span>
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          whileHover={{ x: 0, opacity: 1 }}
                          className='text-muted-foreground'
                          aria-hidden='true'
                        >
                          →
                        </motion.div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
