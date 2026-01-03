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
      title='Skills & Technologies'
      description='Technologies I work with to bring ideas to life.'
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

      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className='mt-16 p-8 rounded-2xl border border-border bg-card'
      >
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
          {[
            { value: '5+', label: 'Years Experience' },
            { value: '50+', label: 'Projects Completed' },
            { value: '30+', label: 'Happy Clients' },
            { value: '10+', label: 'Open Source Contributions' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  delay: 0.6 + i * 0.1,
                }}
                className='text-3xl md:text-4xl font-bold text-foreground mb-2'
              >
                {stat.value}
              </motion.div>
              <p className='text-muted-foreground text-sm'>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div> */}
    </Section>
  );
}
