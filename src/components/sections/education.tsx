'use client';

import { GraduationCap, BookOpen, Calendar } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { AnimatedCard } from '@/components/ui/animatedCard';
import { IconBox } from '@/components/ui/iconBox';
import { Tag } from '@/components/ui/tag';
import { Education, Certification } from '../../../sanity.types';

interface EducationSectionProps {
  education?: Education[];
  certifications?: Certification[];
}

function formatPeriod(startDate?: string, endDate?: string) {
  const start = startDate ? new Date(startDate).getFullYear() : 'Unknown';
  const end = endDate ? new Date(endDate).getFullYear() : 'Present';
  return `${start} - ${end}`;
}

export function EducationSection({
  education: sanityEducation,
}: EducationSectionProps) {
  const education = sanityEducation || [
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
          {education.map((edu, i) => {
            const Icon = i === 0 ? GraduationCap : BookOpen;
            return (
              <li key={edu._id} className='list-none' role='listitem'>
                <AnimatedCard
                  delay={i * 0.1}
                  gradient='from-card to-secondary/20'
                  tabIndex={0}
                  aria-labelledby={`edu-title-${edu._id}`}
                  className='focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl'
                >
                  <div className='flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4'>
                    <div className='flex items-start gap-4'>
                      <IconBox icon={Icon} aria-hidden='true' />
                      <div>
                        <h3
                          id={`edu-title-${edu._id}`}
                          className='text-xl font-bold text-foreground'
                        >
                          {edu.degree}
                        </h3>
                        <p className='text-primary font-medium'>
                          {edu.institution}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-1 text-sm text-muted-foreground'>
                      <Calendar size={14} aria-hidden='true' />
                      <span className='sr-only'>Periode:</span>
                      <span>{formatPeriod(edu.startDate, edu.endDate)}</span>
                    </div>
                  </div>

                  <p className='text-muted-foreground text-sm mb-4 leading-relaxed'>
                    {edu.description}
                  </p>

                  <ul
                    className='flex flex-wrap gap-2'
                    role='list'
                    aria-label={`Præstationer for ${edu.degree}`}
                  >
                    {edu.achievements?.map((achievement) => (
                      <li
                        key={achievement}
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
          })}
        </ul>
      </div>
    </Section>
  );
}
