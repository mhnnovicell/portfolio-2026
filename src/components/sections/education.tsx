'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Calendar } from 'lucide-react';
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
  certifications: sanityCertifications,
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

  const certifications = sanityCertifications || [
    {
      _id: '1',
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      year: '2023',
    },
    {
      _id: '2',
      name: 'Google Cloud Professional',
      issuer: 'Google',
      year: '2022',
    },
    { _id: '3', name: 'Meta Frontend Developer', issuer: 'Meta', year: '2022' },
    { _id: '4', name: 'TypeScript Expert', issuer: 'Microsoft', year: '2021' },
  ];

  return (
    <Section
      id='education'
      title='Education & Certifications'
      description='Academic background and professional certifications that shape my expertise.'
      background='accent'
    >
      {/* Bento grid layout */}
      <div className='relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='lg:col-span-2 space-y-6 w-full'>
          {education.map((edu, i) => {
            const Icon = i === 0 ? GraduationCap : BookOpen;
            return (
              <AnimatedCard
                key={edu._id}
                delay={i * 0.1}
                gradient='from-card to-secondary/20'
              >
                <div className='flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4'>
                  <div className='flex items-start gap-4'>
                    <IconBox icon={Icon} />
                    <div>
                      <h3 className='text-xl font-bold text-foreground'>
                        {edu.degree}
                      </h3>
                      <p className='text-primary font-medium'>
                        {edu.institution}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-1 text-sm text-muted-foreground'>
                    <Calendar size={14} />
                    <span>{formatPeriod(edu.startDate, edu.endDate)}</span>
                  </div>
                </div>

                <p className='text-muted-foreground text-sm mb-4 leading-relaxed'>
                  {edu.description}
                </p>

                <div className='flex flex-wrap gap-2'>
                  {edu.achievements?.map((achievement) => (
                    <Tag key={achievement} variant='bordered'>
                      {achievement}
                    </Tag>
                  ))}
                </div>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
