'use client';

import { memo } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { Section } from '@/components/ui/section';
import { Tag } from '@/components/ui/tag';
import { Project } from '../../../sanity.types';

interface ProjectsSectionProps {
  projects?: Project[];
}

type DisplayProject = {
  _id: string;
  title?: string | null;
  description?: string | null;
  image?: Project['image'] | string;
  tags?: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
};

const FALLBACK_PROJECTS: DisplayProject[] = [
  {
    _id: '1',
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce solution with real-time inventory, secure payments, and admin dashboard.',
    image: '/modern-ecommerce-dark.png',
    tags: ['Next.js', 'Stripe', 'Prisma', 'TypeScript'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    _id: '2',
    title: 'AI Dashboard',
    description:
      'Analytics dashboard with AI-powered insights, data visualization, and predictive modeling.',
    image: '/ai-analytics-dashboard-dark-mode.jpg',
    tags: ['React', 'Python', 'TensorFlow', 'D3.js'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    _id: '3',
    title: 'Social App',
    description:
      'Real-time social platform with messaging, notifications, and content sharing features.',
    image: '/social-media-app-dark-theme-mobile.jpg',
    tags: ['React Native', 'Firebase', 'Node.js', 'Socket.io'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    _id: '4',
    title: 'Design System',
    description:
      'Comprehensive component library with documentation, theming, and accessibility built-in.',
    image: '/design-system-component-library-dark.jpg',
    tags: ['Storybook', 'Tailwind', 'Radix UI', 'Figma'],
    githubUrl: '#',
    liveUrl: '#',
  },
];

const actionLinkClassName =
  'p-3 bg-secondary rounded-full text-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-colors';

function getProjectImageSrc(project: DisplayProject): string {
  if (typeof project.image === 'string') {
    return project.image;
  }

  return project.image?.url ?? '';
}

const ProjectCard = memo(function ProjectCard({
  project,
  index,
}: {
  project: DisplayProject;
  index: number;
}) {
  return (
    <m.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: 'easeOut',
      }}
      className='group relative list-none'
    >
      <article
        className='relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 group-hover:border-muted-foreground/50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
        tabIndex={0}
        aria-labelledby={`project-title-${project._id}`}
      >
        <div className='relative h-64 overflow-hidden'>
          <Image
            src={getProjectImageSrc(project)}
            alt={`Projekt: ${project.title}`}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='object-cover transition-transform duration-700 group-hover:scale-110'
          />
          <div className='absolute inset-0 bg-linear-to-t from-card via-card/50 to-transparent' />

          <div className='absolute inset-0 bg-background/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300'>
            {project.githubUrl ? (
              <m.a
                href={project.githubUrl}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`View ${project.title ?? 'project'} source code on GitHub`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={actionLinkClassName}
              >
                <Github size={20} aria-hidden='true' />
              </m.a>
            ) : null}
            {project.liveUrl ? (
              <m.a
                href={project.liveUrl}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`View ${project.title ?? 'project'} live demo`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={actionLinkClassName}
              >
                <ExternalLink size={20} aria-hidden='true' />
              </m.a>
            ) : null}
          </div>
        </div>

        <div className='p-6'>
          <h3
            id={`project-title-${project._id}`}
            className='text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors'
          >
            {project.title}
          </h3>
          <p className='text-muted-foreground text-sm mb-4 line-clamp-2'>
            {project.description}
          </p>
          <ul
            className='flex flex-wrap gap-2'
            role='list'
            aria-label={`Teknologier brugt i ${project.title}`}
          >
            {(project.tags ?? []).map((tag, tagIndex) => (
              <li
                key={`${project._id}-${tag}-${tagIndex}`}
                role='listitem'
                tabIndex={0}
                className='focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md'
              >
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </m.li>
  );
});

export function ProjectsSection({
  projects: sanityProjects,
}: ProjectsSectionProps) {
  const projects: DisplayProject[] =
    sanityProjects && sanityProjects.length > 0
      ? sanityProjects
      : FALLBACK_PROJECTS;

  return (
    <Section
      id='projects'
      title='Projekter'
      description='Et udvalg af nylige projekter, der viser mine færdigheder og min passion for at bygge gode produkter.'
      tabIndex={0}
      aria-label='Projekter portfolio'
    >
      <LazyMotion features={domAnimation}>
        <ul
          className='grid grid-cols-1 md:grid-cols-2 gap-8'
          role='list'
          aria-label='Liste over projekter'
        >
          {projects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </ul>
      </LazyMotion>
    </Section>
  );
}
