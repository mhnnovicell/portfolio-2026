'use client';

import * as Icons from 'lucide-react';
import { Section } from '@/components/ui/section';
import { AnimatedCard } from '@/components/ui/animatedCard';
import { IconBox } from '@/components/ui/iconBox';
import type { LucideIcon } from 'lucide-react';
import type { Whatido } from '../../../sanity.types';

const defaultwhatIDoItems = [
  {
    title: 'Clean Code',
    description:
      'Writing maintainable, scalable code with best practices and design patterns.',
    icon: 'Code2',
    gridSpan: { colSpan: 2, rowSpan: 1 },
    gradient: 'from-card to-secondary/50',
    order: 1,
  },
  {
    title: 'UI/UX Design',
    description:
      'Creating beautiful interfaces with attention to detail and user experience.',
    icon: 'Palette',
    gridSpan: { colSpan: 1, rowSpan: 2 },
    gradient: 'from-secondary/50 to-card',
    order: 2,
  },
  {
    title: 'Performance',
    description: 'Optimizing for speed and efficiency.',
    icon: 'Zap',
    gridSpan: { colSpan: 1, rowSpan: 1 },
    gradient: 'from-card to-accent',
    order: 3,
  },
  {
    title: 'Global Reach',
    description:
      'Building apps for users worldwide with i18n and a11y in mind.',
    icon: 'Globe',
    gridSpan: { colSpan: 1, rowSpan: 1 },
    gradient: 'from-accent to-card',
    order: 4,
  },
  {
    title: 'Innovation',
    description:
      'Exploring cutting-edge technologies and pushing creative boundaries.',
    icon: 'Sparkles',
    gridSpan: { colSpan: 1, rowSpan: 1 },
    gradient: 'from-card to-secondary/50',
    order: 5,
  },
  {
    title: 'Collaboration',
    description:
      'Working closely with teams and clients to bring visions to life.',
    icon: 'Coffee',
    gridSpan: { colSpan: 1, rowSpan: 1 },
    gradient: 'from-secondary/50 to-card',
    order: 6,
  },
];

interface WhatIDoProps {
  items?: Whatido[] | null;
}

export function WhatIDo({ items }: WhatIDoProps) {
  const whatIDoItems = items || defaultwhatIDoItems;

  return (
    <Section
      id='whatido'
      title='Filosofi'
      description='Kombinerer teknisk ekspertise med kreativ tænkning for at levere exceptionelle digitale produkter.'
    >
      <div className='relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-4'>
        {whatIDoItems.map((item, i) => {
          const IconComponent = (Icons[item?.icon as keyof typeof Icons] ||
            Icons.Code2) as LucideIcon;
          const className = `md:col-span-${item?.gridSpan?.colSpan} md:row-span-${item?.gridSpan?.rowSpan}`;

          return (
            <AnimatedCard
              key={item.title}
              delay={i * 0.1}
              gradient={item.gradient}
              className={className}
            >
              <IconBox icon={IconComponent} className='mb-4' />
              <h3 className='text-xl font-semibold mb-2 text-foreground'>
                {item.title}
              </h3>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                {item.description}
              </p>
            </AnimatedCard>
          );
        })}
      </div>
    </Section>
  );
}
