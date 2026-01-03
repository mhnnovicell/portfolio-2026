import { defineField, defineType } from 'sanity';
import { UserPen } from 'lucide-react';

export const profile = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  icon: UserPen,

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'availableForHire',
      title: 'Available for Hire',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'cloudinary.asset', // Changed from 'image'
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'github', title: 'GitHub', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'twitter', title: 'Twitter', type: 'url' },
        { name: 'email', title: 'Email', type: 'string' },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'object',
      fields: [
        { name: 'projects', title: 'Projects Count', type: 'string' },
        { name: 'yearsExperience', title: 'Years Experience', type: 'string' },
        { name: 'clients', title: 'Clients Count', type: 'string' },
      ],
    }),
  ],
});
