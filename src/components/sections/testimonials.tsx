'use client';

import { Quote, Star } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { AnimatedCard } from '@/components/ui/animatedCard';
import { Testimonial } from '../../../sanity.types';
import Image from 'next/image';

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export function TestimonialsSection({
  testimonials: sanityTestimonials,
}: TestimonialsSectionProps) {
  const testimonials = sanityTestimonials || [
    {
      _id: '1',
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'TechCorp Inc.',
      image: '/professional-woman-headshot.png',
      content:
        'An exceptional developer who consistently delivers high-quality work. Their attention to detail and ability to translate complex requirements into elegant solutions is remarkable.',
      rating: 5,
    },
    {
      _id: '2',
      name: 'Michael Chen',
      role: 'CTO',
      company: 'StartupXYZ',
      image: '/professional-asian-man-headshot.png',
      content:
        'Working with this developer was a game-changer for our team. They brought not just technical skills, but also a deep understanding of user experience and product thinking.',
      rating: 5,
    },
    {
      _id: '3',
      name: 'Emily Rodriguez',
      role: 'Design Lead',
      company: 'Creative Studio',
      image: '/professional-latina-woman-headshot.png',
      content:
        'A rare blend of technical expertise and design sensibility. They implemented our designs with pixel-perfect precision and even suggested improvements that enhanced the user experience.',
      rating: 5,
    },
    {
      _id: '4',
      name: 'David Kim',
      role: 'Engineering Manager',
      company: 'Enterprise Solutions',
      image: '/professional-korean-man-headshot.png',
      content:
        "One of the most reliable developers I've worked with. They take ownership of their work, communicate proactively, and consistently exceed expectations.",
      rating: 5,
    },
  ];

  return (
    <Section
      id='testimonials'
      title='Udtalelser'
      description='Feedback fra kolleger og klienter, som jeg har haft fornøjelsen af at arbejde med.'
      tabIndex={0}
      aria-label='Udtalelser fra kolleger og klienter'
    >
      <ul
        className='grid grid-cols-1 md:grid-cols-2 gap-8'
        role='list'
        aria-label='Liste af udtalelser'
      >
        {testimonials.map((testimonial, i) => (
          <li
            key={testimonial._id}
            className='list-none h-full'
            role='listitem'
          >
            <AnimatedCard
              delay={i * 0.1}
              gradient='from-card to-secondary/20'
              tabIndex={0}
              aria-labelledby={`testimonial-name-${testimonial._id}`}
              className='h-full focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl'
            >
              <article className='h-full flex flex-col'>
                {/* Header with Image and Info */}
                <div className='flex items-start gap-6 mb-6 md:flex-row flex-col'>
                  <div className='relative shrink-0'>
                    <Image
                      src={
                        typeof testimonial.image === 'string'
                          ? testimonial.image
                          : testimonial.image?.url || '/placeholder.svg'
                      }
                      alt={`Udtalelse fra ${testimonial.name}`}
                      width={96}
                      height={96}
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      className='w-24 h-24 rounded-2xl object-cover border-2 border-border transition-transform duration-500 group-hover:scale-105'
                    />
                    <div className='absolute inset-0 rounded-2xl ring-2 ring-primary/20 ring-offset-2 ring-offset-background opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                  </div>

                  <div className='flex-1 min-w-0'>
                    <h3
                      id={`testimonial-name-${testimonial._id}`}
                      className='font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors'
                    >
                      {testimonial.name}
                    </h3>
                    <p className='text-sm text-muted-foreground mb-2'>
                      {testimonial.role}
                    </p>
                    <p className='text-xs text-muted-foreground/80 font-medium'>
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Quote Icon */}
                <div className='mb-4'>
                  <Quote className='text-primary/30' size={40} />
                </div>

                {/* Content */}
                <p className='text-muted-foreground leading-relaxed mb-4 grow text-base'>
                  {testimonial.content}
                </p>
                {/* Rating */}
                <div
                  className='flex gap-1 mt-4'
                  aria-label={`Vurdering: ${testimonial.rating || 0} ud af 5 stjerner`}
                  title={`${testimonial.rating || 0} ud af 5 stjerner`}
                >
                  {Array.from({ length: testimonial.rating || 0 }).map(
                    (_, j) => (
                      <Star
                        key={j}
                        size={18}
                        className='fill-primary text-primary'
                        aria-hidden='true'
                      />
                    ),
                  )}
                </div>
              </article>
            </AnimatedCard>
          </li>
        ))}
      </ul>
    </Section>
  );
}
