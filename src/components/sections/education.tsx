'use client';

import { memo } from 'react';
import { GraduationCap, BookOpen, Calendar } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { AnimatedCard } from '@/components/ui/animatedCard';
import { IconBox } from '@/components/ui/iconBox';
import { Tag } from '@/components/ui/tag';
import type { Education, Certification } from '../../../sanity.types';

interface EducationSectionProps {
  education?: Education[];
  certifications?: Certification[];
}

type EducationCardData = Pick<
  Education,
  | '_id'
  | 'degree'
  | 'institution'
  | 'startDate'
  | 'endDate'
  | 'description'
  | 'achievements'
>;

const FALLBACK_EDUCATION: EducationCardData[] = [
  {
    _id: '1',
    degree: 'Master of Science in Computer Science',
    institution: 'Stanford University',
    startDate: '2016-01-01',
    endDate: '2018-12-31',
    description:
      'Specialized in Human-Computer Interaction and Software Engineering. Thesis on improving web accessibility through AI-assisted development tools.',
    achievements: [
      'GPA: 3.9/4.0',
      'Teaching Assistant for Web Development',
      'Published 2 research papers',
    ],
  },
  {
    _id: '2',
    degree: 'Bachelor of Science in Software Engineering',
    institution: 'MIT',
    startDate: '2012-01-01',
    endDate: '2016-12-31',
    description:
      'Comprehensive foundation in software development, algorithms, and system design. Active member of the web development club.',
    achievements: [
      'Magna Cum Laude',
      "Dean's List all semesters",
      'Hackathon winner (2015)',
    ],
  },
];

function formatPeriod(startDate?: string, endDate?: string) {
  const startYear = startDate ? new Date(startDate).getFullYear() : NaN;
  const endYear = endDate ? new Date(endDate).getFullYear() : NaN;
  const start = Number.isNaN(startYear) ? 'Unknown' : startYear;
  const end = Number.isNaN(endYear) ? 'Present' : endYear;
  return `${start} - ${end}`;
}

const EducationCard = memo(function EducationCard({
  education,
  index,
}: {
  education: EducationCardData;
  index: number;
}) {
  const Icon = index === 0 ? GraduationCap : BookOpen;

  return (
    <li className='list-none' role='listitem'>
      <AnimatedCard
        delay={index * 0.1}
        gradient='from-card to-secondary/20'
        tabIndex={0}
        aria-labelledby={`edu-title-${education._id}`}
        className='focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl'
      >
        <div className='flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4'>
          <div className='flex items-start gap-4'>
            <IconBox icon={Icon} aria-hidden='true' />
            <div>
              <h3
                id={`edu-title-${education._id}`}
                className='text-xl font-bold text-foreground'
              >
                {education.degree}
              </h3>
              <p className='text-primary font-medium'>
                {education.institution}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-1 text-sm text-muted-foreground'>
            <Calendar size={14} aria-hidden='true' />
            <span className='sr-only'>Periode:</span>
            <span>{formatPeriod(education.startDate, education.endDate)}</span>
          </div>
        </div>

        <p className='text-muted-foreground text-sm mb-4 leading-relaxed'>
          {education.description}
        </p>

        <ul
          className='flex flex-wrap gap-2'
          role='list'
          aria-label={`Præstationer for ${education.degree}`}
        >
          {education.achievements?.map((achievement, achievementIndex) => (
            <li
              key={`${education._id}-${achievementIndex}`}
              tabIndex={0}
              role='listitem'
              className='focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md'
            >
              <Tag variant='bordered'>{achievement}</Tag>
            </li>
          ))}
        </ul>
      </AnimatedCard>
    </li>
  );
});

export function EducationSection({
  education: sanityEducation,
}: EducationSectionProps) {
  const education = sanityEducation ?? FALLBACK_EDUCATION;

  return (
    <Section
      id='education'
      title='Uddannelse'
      description='Min akademiske baggrund og certificeringer inden for teknologi og udvikling.'
      background='accent'
      tabIndex={0}
      aria-label='Uddannelse og akademisk baggrund'
    >
      {/* Bento grid layout */}
      <div className='relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <ul
          className='lg:col-span-2 space-y-6 w-full'
          role='list'
          aria-label='Liste over uddannelser'
        >
          {education.map((edu, index) => (
            <EducationCard key={edu._id} education={edu} index={index} />
          ))}
        </ul>
      </div>
    </Section>
  );
}
