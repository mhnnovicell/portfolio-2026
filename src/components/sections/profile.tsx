'use client';

import { motion } from 'framer-motion';
import { MapPin, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import Image from 'next/image';
import { Profile } from '../../../sanity.types';

interface ProfileSectionProps {
  data?: Profile | null;
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
  const profile = data || {
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
  };

  return (
    <section
      className='min-h-screen flex flex-col justify-center px-4 md:px-6 pt-24 pb-16 relative overflow-hidden'
      id='about'
    >
      {/* Background gradient */}
      <div className='absolute inset-0 bg-linear-to-b from-card/50 via-background to-background' />

      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto'
      >
        {/* Profile Image Card - spans 1 col on md, 1 col on lg */}
        <motion.div
          variants={itemVariants}
          className='md:row-span-2 bg-linear-to-br from-card to-card/50 border border-border rounded-3xl p-6 flex flex-col items-center justify-center'
        >
          <div className='relative mb-4'>
            <div className='relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-background'>
              <Image
                src={
                  typeof profile.profileImage === 'string'
                    ? profile.profileImage
                    : '/placeholder.svg'
                }
                alt={`${profile.name} - ${profile.title}`}
                fill
                className='object-cover'
                priority
                fetchPriority='high'
                sizes='100vw'
              />
            </div>
            {profile.availableForHire && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                className='absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-background'
                role='status'
                aria-label='Available for work'
                title='Available for work'
              />
            )}
          </div>
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <MapPin size={14} />
            <span>{profile.location}</span>
          </div>
        </motion.div>

        {/* Main Intro Card - spans 2 cols on md, 3 cols on lg */}
        <motion.div
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
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={itemVariants}
          className='bg-linear-to-br from-card to-card/50 border border-border rounded-3xl p-5 flex flex-col items-center justify-center text-center'
          role='group'
          aria-label='Projects delivered statistic'
        >
          <span className='text-3xl md:text-4xl font-bold text-foreground'>
            {profile?.stats?.projects}
          </span>
          <span className='text-muted-foreground text-sm'>
            Projekter leveret
          </span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className='bg-linear-to-br from-card to-card/50 border border-border rounded-3xl p-5 flex flex-col items-center justify-center text-center'
          role='group'
          aria-label='Years of experience statistic'
        >
          <span className='text-3xl md:text-4xl font-bold text-foreground'>
            {profile?.stats?.yearsExperience}
          </span>
          <span className='text-muted-foreground text-sm'>Årserfaring</span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className='bg-linear-to-br from-card to-card/50 border border-border rounded-3xl p-5 flex flex-col items-center justify-center text-center'
          role='group'
          aria-label='Happy clients statistic'
        >
          <span className='text-3xl md:text-4xl font-bold text-foreground'>
            {profile?.stats?.clients}
          </span>
          <span className='text-muted-foreground text-sm'>Glade kunder</span>
        </motion.div>

        {/* CTA Card */}
        <motion.div
          variants={itemVariants}
          className='bg-linear-to-br from-primary/10 to-card border border-border rounded-3xl p-5 flex flex-col items-center justify-center gap-3'
        >
          {profile.availableForHire && (
            <span className='text-green-500 text-xs font-medium uppercase tracking-wider'>
              Available for hire
            </span>
          )}
          <div className='flex gap-2 w-full'>
            <motion.a
              href={`mailto:${profile?.social?.email || ''}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className='flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-full font-medium text-sm text-center transition-all duration-300 hover:shadow-lg hover:shadow-primary/20'
              aria-label={`Contact me via email at ${profile?.social?.email || 'email'}`}
            >
              Kontakt mig
            </motion.a>
          </div>
        </motion.div>

        {/* Work Button Card */}
        <motion.div
          variants={itemVariants}
          className='md:col-span-2 lg:col-span-2 bg-linear-to-br from-card to-card/50 border border-border rounded-3xl p-5 flex items-center justify-between gap-4'
        >
          <p className='text-sm text-muted-foreground'>
            Se mine seneste projekter
          </p>
          <motion.a
            href='#projects'
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className='px-6 py-2.5 border border-border text-foreground rounded-full font-medium text-sm transition-all duration-300 hover:bg-card hover:border-muted-foreground whitespace-nowrap'
            aria-label='Navigate to projects section'
          >
            Se mit arbejde
          </motion.a>
        </motion.div>

        {/* Social Links Card */}
        <motion.div
          variants={itemVariants}
          className='bg-linear-to-br from-card to-card/50 border border-border rounded-3xl p-5 flex items-center justify-center gap-4'
        >
          {profile?.social?.github && (
            <motion.a
              href={profile.social.github}
              target='_blank'
              rel='noopener noreferrer'
              whileHover={{ scale: 1.1, y: -2 }}
              className='p-2.5 rounded-full bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors'
              aria-label='Visit my GitHub profile'
            >
              <Github size={20} aria-hidden='true' />
            </motion.a>
          )}
          {profile?.social?.linkedin && (
            <motion.a
              href={profile.social.linkedin}
              target='_blank'
              rel='noopener noreferrer'
              whileHover={{ scale: 1.1, y: -2 }}
              className='p-2.5 rounded-full bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors'
              aria-label='Connect with me on LinkedIn'
            >
              <Linkedin size={20} aria-hidden='true' />
            </motion.a>
          )}
          {profile?.social?.twitter && (
            <motion.a
              href={profile.social.twitter}
              target='_blank'
              rel='noopener noreferrer'
              whileHover={{ scale: 1.1, y: -2 }}
              className='p-2.5 rounded-full bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors'
              aria-label='Follow me on Twitter'
            >
              <Twitter size={20} aria-hidden='true' />
            </motion.a>
          )}
          {profile?.social?.email && (
            <motion.a
              href={`mailto:${profile.social.email}`}
              whileHover={{ scale: 1.1, y: -2 }}
              className='p-2.5 rounded-full bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors'
              aria-label={`Send me an email at ${profile.social.email}`}
            >
              <Mail size={20} aria-hidden='true' />
            </motion.a>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
