'use client';

import {
  LazyMotion,
  domAnimation,
  m,
  type Variants,
  useReducedMotion,
} from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { memo } from 'react';
import { Experience } from '../../../sanity.types';
import { AnimatedCard } from '@/components/ui/animatedCard';
import { Section } from '@/components/ui/section';

interface ExperienceSectionProps {
  experiences?: Experience[];
}

type ExperienceItemData = Pick<
  Experience,
  | '_id'
  | 'company'
  | 'role'
  | 'startDate'
  | 'endDate'
  | 'location'
  | 'description'
  | 'techStack'
  | 'achievements'
>;

function formatPeriod(startDate: string | undefined, endDate?: string) {
  if (!startDate) return 'Present';
  const start = new Date(startDate).getFullYear();
  const end = endDate ? new Date(endDate).getFullYear() : 'Present';
  return `${start} - ${end}`;
}

const TIMELINE_ITEM_VARIANTS: Variants = {
  hiddenLeft: { opacity: 0, x: -50 },
  hiddenRight: { opacity: 0, x: 50 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: index * 0.12 },
  }),
  visibleReduced: {
    opacity: 1,
    x: 0,
    transition: { duration: 0 },
  },
};

const ITEM_VIEWPORT = { once: true };

const DEFAULT_EXPERIENCES = [
  {
    _id: '1',
    company: 'TechCorp Inc.',
    role: 'Senior Frontend Developer',
    startDate: '2022-01-01',
    endDate: undefined,
    location: 'San Francisco, CA',
    description:
      'Leading frontend architecture and development for enterprise-scale applications. Mentoring junior developers and establishing coding standards.',
    techStack: [
      'Next.js',
      'TypeScript',
      'React',
      'GraphQL',
      'Tailwind CSS',
      'Framer Motion',
    ],
    achievements: [
      'Reduced bundle size by 40% through code splitting',
      'Implemented design system used across 5 products',
      'Led migration from Vue to React for main platform',
    ],
  },
  {
    _id: '2',
    company: 'StartupXYZ',
    role: 'Frontend Developer',
    startDate: '2020-01-01',
    endDate: '2022-12-31',
    location: 'Remote',
    description:
      'Built and maintained customer-facing web applications. Collaborated with design team to implement pixel-perfect interfaces.',
    techStack: ['React', 'Redux', 'Node.js', 'PostgreSQL', 'SCSS', 'Jest'],
    achievements: [
      'Shipped 3 major product features from concept to production',
      'Improved Core Web Vitals scores by 60%',
      'Built reusable component library with 50+ components',
    ],
  },
  {
    _id: '3',
    company: 'Digital Agency Co.',
    role: 'Junior Developer',
    startDate: '2018-01-01',
    endDate: '2020-12-31',
    location: 'New York, NY',
    description:
      'Developed responsive websites and web applications for various clients across industries including e-commerce, healthcare, and fintech.',
    techStack: [
      'JavaScript',
      'Vue.js',
      'HTML/CSS',
      'WordPress',
      'PHP',
      'MySQL',
    ],
    achievements: [
      'Delivered 20+ client projects on time and budget',
      'Introduced automated testing, reducing bugs by 30%',
      "Won 'Rising Star' award in first year",
    ],
  },
] satisfies ExperienceItemData[];

interface ExperienceItemProps {
  exp: ExperienceItemData;
  index: number;
  reduceMotion: boolean;
}

const ExperienceItem = memo(function ExperienceItem({
  exp,
  index,
  reduceMotion,
}: ExperienceItemProps) {
  const isEven = index % 2 === 0;
  const experienceId = exp._id ?? `fallback-${index}`;
  const roleId = `experience-role-${experienceId}`;
  const descId = `experience-desc-${experienceId}`;

  return (
    <m.li
      custom={index}
      initial={
        reduceMotion ? 'visibleReduced' : isEven ? 'hiddenLeft' : 'hiddenRight'
      }
      whileInView={reduceMotion ? 'visibleReduced' : 'visible'}
      variants={TIMELINE_ITEM_VARIANTS}
      viewport={ITEM_VIEWPORT}
      className={`relative flex flex-col gap-8 mb-12 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      <div
        aria-hidden='true'
        className='absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full transform md:-translate-x-1/2 -translate-x-1/2 mt-8 z-10'
      >
        <div className='absolute inset-0 bg-primary rounded-full animate-ping opacity-20' />
      </div>

      <div
        className={`flex-1 ${isEven ? 'md:pr-12' : 'md:pl-12'} pl-8 md:pl-0`}
      >
        <AnimatedCard
          hover
          tabIndex={0}
          aria-labelledby={roleId}
          aria-describedby={descId}
          className='focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
        >
          <div>
            <div className='flex flex-wrap items-start justify-between gap-4 mb-4'>
              <div>
                <h3 id={roleId} className='text-xl font-bold text-foreground'>
                  {exp.role}
                </h3>
                <div className='flex items-center gap-2 text-primary mt-1'>
                  <Briefcase size={16} />
                  <span className='font-medium'>{exp.company}</span>
                </div>
              </div>
              <div className='flex flex-col items-end gap-1 text-sm text-muted-foreground'>
                <div className='flex items-center gap-1'>
                  <Calendar size={14} />
                  <span>{formatPeriod(exp.startDate, exp.endDate)}</span>
                </div>
                <div className='flex items-center gap-1'>
                  <MapPin size={14} />
                  <span>{exp.location}</span>
                </div>
              </div>
            </div>

            <p
              id={descId}
              className='text-muted-foreground text-sm mb-4 leading-relaxed'
            >
              {exp.description}
            </p>

            <ul
              className='flex flex-wrap gap-2'
              aria-label={`Teknologier brugt som ${exp.role}`}
            >
              {exp.techStack?.map((tech) => (
                <li
                  key={`${experienceId}-${tech}`}
                  className='px-3 py-1 text-xs font-medium bg-secondary rounded-full text-foreground border border-border'
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedCard>
      </div>

      <div aria-hidden='true' className='hidden md:block flex-1' />
    </m.li>
  );
});

export function ExperienceSection({
  experiences: sanityExperiences,
}: ExperienceSectionProps) {
  const experiences: ExperienceItemData[] =
    sanityExperiences && sanityExperiences.length > 0
      ? sanityExperiences
      : DEFAULT_EXPERIENCES;
  const reduceMotion = useReducedMotion();

  return (
    <Section
      id='work'
      title='Arbejdserfaring'
      description='En rejse gennem min professionelle karriere, hvor jeg har bygget produkter der betyder noget.'
      tabIndex={0}
      aria-label='Arbejdserfaring'
    >
      <div className='max-w-7xl mx-auto relative z-10'>
        <LazyMotion features={domAnimation}>
          <ul className='relative' aria-label='Liste over arbejdserfaring'>
            {experiences.map((exp, index) => (
              <ExperienceItem
                key={exp._id ?? `experience-${index}`}
                exp={exp}
                index={index}
                reduceMotion={Boolean(reduceMotion)}
              />
            ))}
          </ul>
        </LazyMotion>
      </div>
    </Section>
  );
}
