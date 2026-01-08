'use client';

import { Section } from '@/components/ui/section';
import { AnimatedCard } from '@/components/ui/animatedCard';
import { Tag } from '@/components/ui/tag';
import { Skill } from '../../../sanity.types';

interface SkillsSectionProps {
  skills?: Skill[] | null;
}

export function SkillsSection({ skills: sanitySkills }: SkillsSectionProps) {
  const skillCategories = sanitySkills || [
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

  return (
    <Section
      id='skills'
      title='Evner'
      description='Teknologier jeg arbejder med for at bringe ideer til live.'
    >
      <div className='relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8'>
        {skillCategories.map((category, categoryIndex) => (
          <AnimatedCard
            key={category._id}
            delay={categoryIndex * 0.2}
            gradient='from-card to-secondary/20'
          >
            <h3 className='text-lg font-semibold mb-6 text-foreground'>
              {category.category}
            </h3>
            <div className='flex flex-wrap gap-3'>
              {category?.skills?.map((skill, skillIndex) => (
                <Tag
                  key={skill}
                  delay={categoryIndex * 0.1 + skillIndex * 0.05}
                  size='md'
                >
                  {skill}
                </Tag>
              ))}
            </div>
          </AnimatedCard>
        ))}
      </div>
    </Section>
  );
}
