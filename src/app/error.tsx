'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className='min-h-screen flex items-center justify-center px-6 bg-linear-to-b from-background via-card/30 to-background'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='max-w-2xl w-full text-center'
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className='flex justify-center mb-8'
        >
          <div className='relative'>
            <div className='w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center'>
              <AlertCircle className='w-12 h-12 text-destructive' />
            </div>
            <motion.div
              className='absolute inset-0 rounded-full bg-destructive/20'
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='mb-8'
        >
          <h1 className='text-4xl md:text-5xl font-bold mb-4 text-foreground'>
            Noget gik galt
          </h1>
          <p className='text-lg text-muted-foreground mb-2'>
            Vi beklager, men der opstod en uventet fejl.
          </p>
          {error.digest && (
            <p className='text-sm text-muted-foreground/60 font-mono'>
              Error ID: {error.digest}
            </p>
          )}
        </motion.div>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === 'development' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className='mb-8 p-4 bg-card border border-border rounded-2xl text-left overflow-auto max-h-48'
          >
            <p className='text-sm text-muted-foreground font-mono break-all'>
              {error.message}
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='flex flex-col sm:flex-row gap-4 justify-center'
        >
          <motion.button
            onClick={reset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20'
          >
            <RefreshCw size={18} />
            Prøv igen
          </motion.button>

          <Link href='/'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-6 py-3 bg-secondary text-foreground rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:bg-muted w-full sm:w-auto'
            >
              <Home size={18} />
              Gå til forsiden
            </motion.button>
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ delay: 0.6 }}
          className='absolute inset-0 pointer-events-none'
          aria-hidden='true'
        >
          <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl' />
          <div className='absolute bottom-1/4 right-1/4 w-64 h-64 bg-destructive rounded-full blur-3xl' />
        </motion.div>
      </motion.div>
    </div>
  );
}
