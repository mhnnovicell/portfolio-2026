'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    let timeAccumulated = 0; // Use local variable instead

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

      if (distanceFromBottom < 500) {
        if (!intervalId) {
          intervalId = setInterval(() => {
            timeAccumulated += 100;
            if (timeAccumulated >= 3000) {
              setIsVisible(true);
              if (intervalId) clearInterval(intervalId);
            }
          }, 100);
        }
      } else {
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }

      if (scrollTop < 100) {
        setIsVisible(false);
        timeAccumulated = 0; // Reset
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    // Set focus back to the top of the body
    document.body.focus();
  };

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className='fixed bottom-8 right-8 z-40 p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-primary/20 transition-shadow border border-primary/20 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          aria-label='Tilbage til toppen af siden'
          title='Tilbage til toppen'
        >
          <div className='relative' aria-hidden='true'>
            <ArrowUp size={24} />
            {/* Animated glow effect */}
            <motion.div
              className='absolute inset-0 rounded-full bg-primary opacity-20'
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
