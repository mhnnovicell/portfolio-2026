import { defineType, defineField } from 'sanity';
import { LayoutGrid } from 'lucide-react';

export const whatIDo = defineType({
  name: 'whatido',
  title: 'What I Do',
  type: 'document',
  icon: LayoutGrid,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description:
        'Lucide icon name (e.g., Code2, Palette, Zap, Globe, Sparkles, Coffee, Rocket, Heart, etc.)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gridSpan',
      title: 'Grid Span',
      type: 'object',
      fields: [
        {
          name: 'colSpan',
          title: 'Column Span',
          type: 'number',
          description: 'Number of columns (1-3)',
          validation: (Rule) => Rule.required().min(1).max(3),
          initialValue: 1,
        },
        {
          name: 'rowSpan',
          title: 'Row Span',
          type: 'number',
          description: 'Number of rows (1-3)',
          validation: (Rule) => Rule.required().min(1).max(3),
          initialValue: 1,
        },
      ],
    }),
    defineField({
      name: 'gradient',
      title: 'Gradient Style',
      type: 'string',
      options: {
        list: [
          { title: 'Card to Secondary', value: 'from-card to-secondary/50' },
          { title: 'Secondary to Card', value: 'from-secondary/50 to-card' },
          { title: 'Card to Accent', value: 'from-card to-accent' },
          { title: 'Accent to Card', value: 'from-accent to-card' },
          { title: 'Card to Muted', value: 'from-card to-muted' },
          { title: 'Muted to Card', value: 'from-muted to-card' },
        ],
      },
      initialValue: 'from-card to-secondary/50',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this item appears (lower numbers first)',
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      order: 'order',
    },
    prepare(selection) {
      const { title, subtitle, order } = selection;
      return {
        title: `${order}. ${title}`,
        subtitle: subtitle,
      };
    },
  },
});
