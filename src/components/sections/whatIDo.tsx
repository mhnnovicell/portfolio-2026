'use client';

import {
  Code2,
  Coffee,
  Globe,
  Heart,
  Palette,
  Rocket,
  Sparkles,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/ui/section';
import { AnimatedCard } from '@/components/ui/animatedCard';
import { IconBox } from '@/components/ui/iconBox';
import type { Whatido } from '../../../sanity.types';

type WhatIDoItem = {
  _id?: string;
  title?: string;
  description?: string;
  icon?: string;
  gridSpan?: {
    colSpan?: number;
    rowSpan?: number;
  };
  gradient?: Whatido['gradient'];
  order?: number;
};

const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  Palette,
  Zap,
  Globe,
  Sparkles,
  Coffee,
  Rocket,
  Heart,
};

const COL_SPAN_CLASS: Record<1 | 2 | 3, string> = {
  1: '',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
};

const ROW_SPAN_CLASS: Record<1 | 2 | 3, string> = {
  1: '',
  2: 'md:row-span-2',
  3: 'md:row-span-3',
};

const defaultWhatIDoItems: WhatIDoItem[] = [
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

function getIconComponent(iconName?: string): LucideIcon {
  if (!iconName) {
    return Code2;
  }

  return ICON_MAP[iconName] ?? Code2;
}

function clampSpan(value?: number): 1 | 2 | 3 {
  if (value === 2) {
    return 2;
  }

  if (value === 3) {
    return 3;
  }

  return 1;
}

function getSpanClassName(gridSpan?: WhatIDoItem['gridSpan']): string {
  const colSpan = clampSpan(gridSpan?.colSpan);
  const rowSpan = clampSpan(gridSpan?.rowSpan);

  return `${COL_SPAN_CLASS[colSpan]} ${ROW_SPAN_CLASS[rowSpan]}`.trim();
}

interface WhatIDoProps {
  items?: Whatido[] | null;
}

export function WhatIDo({ items }: WhatIDoProps) {
  const whatIDoItems = items?.length ? items : defaultWhatIDoItems;

  return (
    <Section
      id='whatido'
      title='Filosofi'
      description='Kombinerer teknisk ekspertise med kreativ tænkning for at levere exceptionelle digitale produkter.'
      tabIndex={0}
      aria-label='Filosofi: Kombinerer teknisk ekspertise med kreativ tænkning'
    >
      <ul
        className='relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-4'
        aria-label='Liste over mine filosofier og kompetencer'
      >
        {whatIDoItems.map((item, i) => {
          const IconComponent = getIconComponent(item.icon);
          const spanClass = getSpanClassName(item.gridSpan);
          const title = item.title ?? 'What I Do';
          const description = item.description ?? '';
          const itemKey = item._id ?? `${title}-${i}`;

          return (
            <li key={itemKey} className={spanClass}>
              <AnimatedCard
                delay={i * 0.05}
                gradient={item.gradient}
                className='h-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 outline-hidden cursor-default'
                tabIndex={0}
                role='article'
                aria-labelledby={`whatido-title-${i}`}
                aria-describedby={`whatido-desc-${i}`}
              >
                <div aria-hidden='true'>
                  <IconBox icon={IconComponent} className='mb-4' />
                </div>
                <h3
                  id={`whatido-title-${i}`}
                  className='text-xl font-semibold mb-2 text-foreground'
                >
                  {title}
                </h3>
                <p
                  id={`whatido-desc-${i}`}
                  className='text-muted-foreground text-sm leading-relaxed'
                >
                  {description}
                </p>
              </AnimatedCard>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
