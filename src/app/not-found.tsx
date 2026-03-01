'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home } from 'lucide-react';

// Hoisted outside component to avoid object recreation on every render
const MotionLink = motion(Link);

const containerAnim = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
} as const;

const numberAnim = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { delay: 0.2, type: 'spring', stiffness: 100 },
} as const;

const messageAnim = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay: 0.3 },
} as const;

const buttonsAnim = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.5 },
} as const;

const buttonHover = { scale: 1.05 } as const;
const buttonTap = { scale: 0.95 } as const;

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center px-6 bg-linear-to-b from-background via-secondary/20 to-background'>
      <motion.div {...containerAnim} className='max-w-2xl w-full text-center'>
        {/* 404 Number */}
        <motion.div {...numberAnim} className='mb-8'>
          <h1 className='text-[150px] md:text-[200px] font-bold leading-none bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent'>
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div {...messageAnim} className='mb-8'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4 text-foreground'>
            Siden blev ikke fundet
          </h2>
          <p className='text-lg text-muted-foreground mb-2'>
            Den side du leder efter eksisterer ikke eller er blevet flyttet.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          {...buttonsAnim}
          className='flex flex-col sm:flex-row gap-4 justify-center'
        >
          <MotionLink
            href='/'
            whileHover={buttonHover}
            whileTap={buttonTap}
            className='px-6 py-3 bg-primary text-primary-foreground cursor-pointer rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 w-full sm:w-auto'
          >
            <Home size={18} />
            Gå til forsiden
          </MotionLink>
        </motion.div>
      </motion.div>
    </div>
  );
}
