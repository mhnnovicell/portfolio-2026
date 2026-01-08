'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Menu } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import type { Navigation } from '../../../sanity.types';
import { MobileNavigation } from '@/components/ui/mobileNavigation';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const logo = data?.logo || 'mikkelraev';
  const logoSuffix = data?.logoSuffix || '.dk';
  const navItems = useMemo(
    () =>
      data?.navItems || [
        { label: 'About', href: '#about', _key: 'about' },
        { label: 'Projects', href: '#projects', _key: 'projects' },
        { label: 'Skills', href: '#skills', _key: 'skills' },
        { label: 'Contact', href: '#contact', _key: 'contact' },
      ],
    [data?.navItems]
  );

  const socialLinks = useMemo(
    () =>
      data?.socialLinks || [
        { platform: 'github', url: 'https://github.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' },
        { platform: 'twitter', url: 'https://twitter.com' },
      ],
    [data?.socialLinks]
  );

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .map((item) => {
          const id = item.href?.replace('#', '');
          return document.getElementById(id ?? '');
        })
        .filter(Boolean) as HTMLElement[];

      // Find the section currently in view
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          const newHash = `#${section.id}`;
          setActiveSection(newHash);

          // Update URL hash without triggering scroll
          if (window.location.hash !== newHash) {
            window.history.replaceState(null, '', newHash);
          }
          break;
        }
      }
    };

    // Initial check
    handleScroll();

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border'
        role='banner'
      >
        <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className='text-xl font-bold tracking-tight'
          >
            <Link
              href='/'
              className='text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm'
              aria-label='Go to homepage'
            >
              {logo}
              <span className='text-muted-foreground'>{logoSuffix}</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav
            className='hidden md:flex items-center gap-8'
            aria-label='Main navigation'
          >
            {navItems.map((item, i) => {
              const isActive = activeSection === item.href;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                >
                  <Link
                    href={item.href ?? ''}
                    className={`relative text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-1 py-0.5 ${
                      isActive
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId='activeSection'
                        className='absolute -bottom-1 left-0 right-0 h-0.5 bg-primary'
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                        aria-hidden='true'
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Social Links & Mobile Menu Button */}
          <div className='flex items-center gap-4'>
            {/* Desktop Social Links */}
            <div
              className='hidden md:flex items-center gap-4'
              role='navigation'
              aria-label='Social media links'
            >
              {socialLinks.map(({ platform, url }, i) => {
                const Icon = getSocialIcon(platform ?? '');
                const platformName = platform
                  ? platform.charAt(0).toUpperCase() + platform.slice(1)
                  : 'Social';
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
                    aria-label={`${platformName} (opens in new tab)`}
                    className='text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm p-1'
                  >
                    <Icon size={20} aria-hidden='true' />
                    <span className='sr-only'>
                      {platformName} (opens in new tab)
                    </span>
                  </motion.a>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='md:hidden p-2 rounded-full bg-secondary text-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
              aria-label='Open menu'
              aria-expanded={isMobileMenuOpen}
              aria-controls='mobile-navigation'
            >
              <Menu size={24} aria-hidden='true' />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        activeSection={activeSection}
      />
    </>
  );
}
