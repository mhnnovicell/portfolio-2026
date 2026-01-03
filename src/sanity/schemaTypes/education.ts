import { defineField, defineType } from 'sanity';
import { GraduationCap } from 'lucide-react';

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  icon: GraduationCap,
  fields: [
    defineField({
      name: 'degree',
      title: 'Degree',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'institution',
      title: 'Institution',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
