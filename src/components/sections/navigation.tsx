'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import type { Navigation } from '../../../sanity.types';

interface NavigationProps {
  data?: Navigation;
}

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'github':
      return Github;
    case 'linkedin':
      return Linkedin;
    case 'twitter':
      return Twitter;
    case 'email':
      return Mail;
    default:
      return Github;
  }
};

export function Navigation({ data }: NavigationProps) {
  const logo = data?.logo || 'mikkelraev';
  const logoSuffix = data?.logoSuffix || '.dk';
  const navItems = data?.navItems || [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];
  const socialLinks = data?.socialLinks || [
    { platform: 'github', url: 'https://github.com' },
    { platform: 'linkedin', url: 'https://linkedin.com' },
    { platform: 'twitter', url: 'https://twitter.com' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border'
    >
      <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className='text-xl font-bold tracking-tight'
        >
          <Link href='/' className='text-foreground'>
            {logo}
            <span className='text-muted-foreground'>{logoSuffix}</span>
          </Link>
        </motion.div>

        <nav className='hidden md:flex items-center gap-8'>
          {navItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
            >
              <Link
                href={item.href ?? ''}
                className='text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium'
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className='flex items-center gap-4'>
          {socialLinks.map(({ platform, url }, i) => {
            const Icon = getSocialIcon(platform ?? '');
            return (
              <motion.a
                key={platform}
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + 0.1 * i, duration: 0.3 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                <Icon size={20} />
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.header>
  );
}
