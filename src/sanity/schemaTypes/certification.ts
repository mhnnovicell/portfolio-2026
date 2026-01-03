import { defineField, defineType } from 'sanity';
import { Spade } from 'lucide-react';

export const certification = defineType({
  name: 'certification',
  title: 'Certifications',
  type: 'document',
  icon: Spade,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'issuer',
      title: 'Issuer',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
