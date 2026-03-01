'use client';

import { LazyMotion, domAnimation, m } from 'framer-motion';
import { MapPin, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import Image from 'next/image';
import { useMemo, type ReactElement } from 'react';
import { Profile } from '../../../sanity.types';

interface ProfileSectionProps {
  data?: Profile | null;
}

interface SocialItemCandidate {
  href?: string;
  label: string;
  icon: ReactElement;
  external: boolean;
}

interface SocialItem extends SocialItemCandidate {
  href: string;
}

const FALLBACK_PROFILE = {
  name: 'Alex Morgan',
  title: 'Frontend Developer',
  tagline: 'Crafting digital experiences that inspire',
  bio: 'Passionate frontend developer with 5+ years of experience building accessible, pixel-perfect web applications.',
  location: 'San Francisco, CA',
  availableForHire: true,
  profileImage: '/professional-developer-portrait-headshot.jpg',
  social: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    email: 'hello@alexmorgan.dev',
  },
  stats: {
    projects: '50+',
    yearsExperience: '5+',
    clients: '30+',
  },
} as const;

function mergeProfile(data?: Profile | null) {
  return {
    ...FALLBACK_PROFILE,
    ...data,
    social: {
      ...FALLBACK_PROFILE.social,
      ...(data?.social ?? {}),
    },
    stats: {
      ...FALLBACK_PROFILE.stats,
      ...(data?.stats ?? {}),
    },
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ProfileSection({ data }: ProfileSectionProps) {
  const profile = useMemo(() => mergeProfile(data), [data]);
  const profileImageSrc =
    typeof profile.profileImage === 'string'
      ? profile.profileImage
      : '/placeholder.svg';

  const statItems = [
    {
      value: profile.stats?.projects,
      label: 'Projekter leveret',
      ariaLabel: 'Projects delivered statistic',
    },
    {
      value: profile.stats?.yearsExperience,
      label: 'Årserfaring',
      ariaLabel: 'Years of experience statistic',
    },
    {
      value: profile.stats?.clients,
      label: 'Glade kunder',
      ariaLabel: 'Happy clients statistic',
    },
  ];

  const socialItems = [
    {
      href: profile.social?.github,
      label: 'Min GitHub profil (opens in new tab)',
      icon: <Github size={20} aria-hidden='true' />,
      external: true,
    },
    {
      href: profile.social?.linkedin,
      label: 'Min LinkedIn profil (opens in new tab)',
      icon: <Linkedin size={20} aria-hidden='true' />,
      external: true,
    },
    {
      href: profile.social?.twitter,
      label: 'Min Twitter profil (opens in new tab)',
      icon: <Twitter size={20} aria-hidden='true' />,
      external: true,
    },
    {
      href: profile.social?.email
        ? `mailto:${profile.social.email}`
        : undefined,
      label: profile.social?.email
        ? `Send mig en email på ${profile.social.email}`
        : 'Send mig en email',
      icon: <Mail size={20} aria-hidden='true' />,
      external: false,
    },
  ].filter(
    (item: SocialItemCandidate): item is SocialItem =>
      typeof item.href === 'string' && item.href.length > 0,
  );

  return (
    <section
      className='min-h-screen flex flex-col justify-center px-4 md:px-6 pt-24 pb-16 relative overflow-hidden'
      id='about'
    >
      {/* Background gradient */}
      <div className='absolute inset-0 bg-linear-to-b from-card/50 via-background to-background' />

      <LazyMotion features={domAnimation}>
        <m.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto'
        >
          {/* Profile Image Card - spans 1 col on md, 1 col on lg */}
          <m.div
            variants={itemVariants}
            className='md:row-span-2 bg-linear-to-br from-card to-card/50 border border-border rounded-3xl p-6 flex flex-col items-center justify-center'
          >
            <div className='relative mb-4'>
              <div className='relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-background'>
                <Image
                  src={profileImageSrc}
                  alt={`${profile.name} - ${profile.title}`}
                  fill
                  className='object-cover'
                  priority
                  fetchPriority='high'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
              </div>
              {profile.availableForHire ? (
                <m.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                  className='absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-background'
                  role='status'
                  aria-label='Available for work'
                  title='Available for work'
                />
              ) : null}
            </div>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <MapPin size={14} />
              <span>{profile.location}</span>
            </div>
          </m.div>

          {/* Main Intro Card - spans 2 cols on md, 3 cols on lg */}
          <m.div
            variants={itemVariants}
            className='md:col-span-2 lg:col-span-3 bg-linear-to-br from-card to-card/50 border border-border rounded-3xl p-6 md:p-8 flex flex-col justify-center'
          >
            <p className='text-muted-foreground text-xs md:text-sm tracking-widest uppercase mb-2'>
              {profile.title}
            </p>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 text-balance'>
              {profile.name}
            </h1>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight mb-4 text-balance'>
              {profile.tagline}
            </h2>
            <p className='text-muted-foreground text-sm md:text-base max-w-xl text-pretty'>
              {profile.bio}
            </p>
          </m.div>

          {/* Stats Cards */}
          {statItems.map((stat) => (
            <m.div
              key={stat.label}
              variants={itemVariants}
              className='bg-linear-to-br from-card to-card/50 border border-border rounded-3xl p-5 flex flex-col items-center justify-center text-center'
              role='group'
              aria-label={stat.ariaLabel}
            >
              <span className='text-3xl md:text-4xl font-bold text-foreground'>
                {stat.value}
              </span>
              <span className='text-muted-foreground text-sm'>
                {stat.label}
              </span>
            </m.div>
          ))}

          {/* CTA Card */}
          <m.div
            variants={itemVariants}
            className='bg-linear-to-br hidden from-primary/10 to-card border border-border rounded-3xl p-5 md:flex flex-col items-center justify-center gap-3'
          >
            {profile.availableForHire ? (
              <span className='text-green-500 text-xs font-medium uppercase tracking-wider'>
                Available for hire
              </span>
            ) : null}
            <div className='flex gap-2 w-full'>
              <m.a
                href={`mailto:${profile?.social?.email || ''}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className='flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-full font-medium text-sm text-center transition-all duration-300 hover:shadow-lg hover:shadow-primary/20'
                aria-label={`Kontakt mig via email ${profile?.social?.email || 'email'}`}
              >
                Kontakt mig
              </m.a>
            </div>
          </m.div>

          {/* Work Button Card */}
          <m.div
            variants={itemVariants}
            className='md:col-span-2 lg:col-span-2 bg-linear-to-br from-card to-card/50 border border-border rounded-3xl p-5 flex items-center justify-between gap-4'
          >
            <p className='text-sm text-muted-foreground'>
              Se mine seneste projekter
            </p>
            <m.a
              href='#projects'
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className='px-6 py-2.5 border border-border text-foreground rounded-full font-medium text-sm transition-all duration-300 hover:bg-card hover:border-muted-foreground whitespace-nowrap'
              aria-label='Navigate to projects section'
            >
              Se mit arbejde
            </m.a>
          </m.div>

          {/* Social Links Card */}
          <m.ul
            variants={itemVariants}
            className='bg-linear-to-br from-card to-card/50 border border-border rounded-3xl p-5 flex items-center justify-center gap-4'
            aria-label='Social media profiles'
          >
            {socialItems.map((item) => (
              <li key={item.label}>
                <m.a
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className='flex p-2.5 rounded-full bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors'
                  aria-label={item.label}
                >
                  {item.icon}
                </m.a>
              </li>
            ))}
          </m.ul>
        </m.div>
      </LazyMotion>
    </section>
  );
}
