'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { Experience } from '../../../sanity.types';
import { Section } from '@/components/ui/section';

interface ExperienceSectionProps {
  experiences?: Experience[];
}

function formatPeriod(startDate: string | undefined, endDate?: string) {
  if (!startDate) return 'Present';
  const start = new Date(startDate).getFullYear();
  const end = endDate ? new Date(endDate).getFullYear() : 'Present';
  return `${start} - ${end}`;
}

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
];

export function ExperienceSection({
  experiences: sanityExperiences,
}: ExperienceSectionProps) {
  const experiences = sanityExperiences || DEFAULT_EXPERIENCES;

  return (
    <Section
      id='work'
      title='Arbejdserfaring'
      description='En rejse gennem min professionelle karriere, hvor jeg har bygget produkter der betyder noget.'
      tabIndex={0}
      aria-label='Arbejdserfaring'
    >
      <div className='max-w-7xl mx-auto relative z-10'>
        <ul
          className='relative'
          role='list'
          aria-label='Liste over arbejdserfaring'
        >
          {experiences.map((exp, i) => (
            <motion.li
              key={exp._id}
              role='listitem'
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div
                aria-hidden='true'
                className='absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full transform md:-translate-x-1/2 -translate-x-1/2 mt-8 z-10'
              >
                <div className='absolute inset-0 bg-primary rounded-full animate-ping opacity-20' />
              </div>

              {/* Content card */}
              <div
                className={`flex-1 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-8 md:pl-0`}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  tabIndex={0}
                  aria-labelledby={`experience-role-${exp._id}`}
                  aria-describedby={`experience-desc-${exp._id}`}
                  className='group relative overflow-hidden rounded-2xl border border-border bg-linear-to-br from-card to-secondary/30 p-6 transition-all duration-500 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                >
                  {/* Hover glow */}
                  <div
                    className='absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                    aria-hidden='true'
                  />

                  <div className='relative z-10'>
                    {/* Header */}
                    <div className='flex flex-wrap items-start justify-between gap-4 mb-4'>
                      <div>
                        <h3
                          id={`experience-role-${exp._id}`}
                          className='text-xl font-bold text-foreground'
                        >
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
                          <span>
                            {formatPeriod(exp.startDate, exp.endDate)}
                          </span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <MapPin size={14} />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      id={`experience-desc-${exp._id}`}
                      className='text-muted-foreground text-sm mb-4 leading-relaxed'
                    >
                      {exp.description}
                    </p>

                    {/* Tech stack */}
                    <ul
                      className='flex flex-wrap gap-2'
                      role='list'
                      aria-label={`Teknologier brugt som ${exp.role}`}
                    >
                      {exp.techStack?.map((tech) => (
                        <li
                          key={tech}
                          role='listitem'
                          tabIndex={0}
                          className='px-3 py-1 text-xs font-medium bg-secondary rounded-full text-foreground border border-border focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Spacer for alternating layout */}
              <div aria-hidden='true' className='hidden md:block flex-1' />
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
