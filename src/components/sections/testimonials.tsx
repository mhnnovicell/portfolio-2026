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
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {testimonials.map((testimonial, i) => (
          <AnimatedCard
            key={testimonial._id}
            delay={i * 0.1}
            gradient='from-card to-secondary/20'
            className={i === 0 ? 'md:row-span-2' : ''}
          >
            <div className='h-full flex flex-col'>
              <div className='mb-4'>
                <Quote className='text-primary/30' size={i === 0 ? 48 : 32} />
              </div>

              <p
                className={`text-muted-foreground leading-relaxed mb-6 grow ${i === 0 ? 'text-lg' : 'text-sm'}`}
              >
                {testimonial.content}
              </p>

              <div className='flex gap-1 mb-4'>
                {Array.from({ length: testimonial.rating || 0 }).map((_, j) => (
                  <Star
                    key={j}
                    size={16}
                    className='fill-primary text-primary'
                  />
                ))}
              </div>

              <div className='flex items-center gap-4'>
                <div className='relative'>
                  <Image
                    src={
                      typeof testimonial.image === 'string'
                        ? testimonial.image
                        : testimonial.image?.url || '/placeholder.svg'
                    }
                    alt={testimonial.name || 'Testimonial'}
                    width={48}
                    height={48}
                    className='w-12 h-12 rounded-full object-cover border-2 border-border'
                  />
                  <div className='absolute inset-0 rounded-full ring-2 ring-primary/20 ring-offset-2 ring-offset-background opacity-0 group-hover:opacity-100 transition-opacity' />
                </div>
                <div>
                  <h4 className='font-semibold text-foreground'>
                    {testimonial.name}
                  </h4>
                  <p className='text-sm text-muted-foreground'>
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </Section>
  );
}
