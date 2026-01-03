'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { Section } from '@/components/ui/section';
import { Tag } from '@/components/ui/tag';
import { Project } from '../../../sanity.types';

interface ProjectsSectionProps {
  projects?: Project[];
}

export function ProjectsSection({
  projects: sanityProjects,
}: ProjectsSectionProps) {
  const projects = sanityProjects || [
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

  return (
    <Section
      id='projects'
      title='Featured Projects'
      description='A selection of recent work showcasing my skills and passion for building great products.'
      background='gradient'
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {projects.map((project, i) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className='group relative'
          >
            <div className='relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 group-hover:border-muted-foreground/50'>
              {/* Image container */}
              <div className='relative h-64 overflow-hidden'>
                <Image
                  src={
                    typeof project.image === 'string'
                      ? project.image
                      : (project.image?.url ?? '')
                  }
                  alt={project.title ?? ''}
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent' />

                {/* Hover overlay with links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className='absolute inset-0 bg-background/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                >
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className='p-3 bg-secondary rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-colors'
                    >
                      <Github size={20} />
                    </motion.a>
                  )}
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className='p-3 bg-secondary rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-colors'
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  )}
                </motion.div>
              </div>

              {/* Content */}
              <div className='p-6'>
                <h3 className='text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors'>
                  {project.title}
                </h3>
                <p className='text-muted-foreground text-sm mb-4 line-clamp-2'>
                  {project.description}
                </p>
                <div className='flex flex-wrap gap-2'>
                  {project?.tags?.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
