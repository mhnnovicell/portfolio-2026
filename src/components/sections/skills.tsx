'use client';

import { memo } from 'react';
import { Section } from '@/components/ui/section';
import { AnimatedCard } from '@/components/ui/animatedCard';
import { Tag } from '@/components/ui/tag';
import type { Skill } from '../../../sanity.types';

interface SkillsSectionProps {
  skills?: Skill[] | null;
}

type SkillCategory = Pick<Skill, '_id' | 'category' | 'skills'>;

const FALLBACK_SKILLS: SkillCategory[] = [
  {
    _id: '1',
    category: 'Frontend',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Vue.js',
    ],
  },
  {
    _id: '2',
    category: 'Backend',
    skills: [
      'Node.js',
      'Python',
      'PostgreSQL',
      'MongoDB',
      'GraphQL',
      'REST APIs',
    ],
  },
  {
    _id: '3',
    category: 'Tools',
    skills: ['Git', 'Docker', 'Figma', 'Vercel', 'AWS', 'CI/CD'],
  },
];

const SkillCategoryCard = memo(function SkillCategoryCard({
  category,
  categoryIndex,
}: {
  category: SkillCategory;
  categoryIndex: number;
}) {
  return (
    <li key={category._id} className='list-none h-full' role='listitem'>
      <AnimatedCard
        delay={categoryIndex * 0.2}
        gradient='from-card to-secondary/20'
        tabIndex={0}
        aria-labelledby={`category-title-${category._id}`}
        className='h-full focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl'
      >
        <h3
          id={`category-title-${category._id}`}
          className='text-lg font-semibold mb-6 text-foreground'
        >
          {category.category}
        </h3>
        <ul
          className='flex flex-wrap gap-3'
          role='list'
          aria-label={`Evner inden for ${category.category}`}
        >
          {category?.skills?.map((skill, skillIndex) => (
            <li
              key={skill}
              tabIndex={0}
              role='listitem'
              className='focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md'
            >
              <Tag delay={categoryIndex * 0.1 + skillIndex * 0.05} size='md'>
                {skill}
              </Tag>
            </li>
          ))}
        </ul>
      </AnimatedCard>
    </li>
  );
});

export function SkillsSection({ skills: sanitySkills }: SkillsSectionProps) {
  const skillCategories: SkillCategory[] = sanitySkills ?? FALLBACK_SKILLS;

  return (
    <Section
      id='skills'
      title='Evner'
      description='Teknologier jeg arbejder med for at bringe ideer til live.'
      tabIndex={0}
      aria-label='Evner og teknologier'
    >
      <ul
        className='relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8'
        role='list'
        aria-label='Kategorier af evner'
      >
        {skillCategories.map((category, categoryIndex) => (
          <SkillCategoryCard
            key={category._id}
            category={category}
            categoryIndex={categoryIndex}
          />
        ))}
      </ul>
    </Section>
  );
}
