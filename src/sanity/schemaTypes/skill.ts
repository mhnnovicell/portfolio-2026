import { Skull } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const skill = defineType({
  name: 'skill',
  title: 'Skills',
  type: 'document',
  icon: Skull,

  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
});
