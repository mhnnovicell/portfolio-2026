import { Link } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: Link,

  fields: [
    defineField({
      name: 'logo',
      title: 'Logo Text',
      type: 'string',
      description: 'Main logo text (e.g., "alex")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logoSuffix',
      title: 'Logo Suffix',
      type: 'string',
      description: 'Suffix text after logo (e.g., ".dev")',
    }),
    defineField({
      name: 'navItems',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'href', type: 'string', title: 'Link (e.g., #about)' },
          ],
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              type: 'string',
              title: 'Platform',
              options: {
                list: [
                  { title: 'GitHub', value: 'github' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Email', value: 'email' },
                ],
              },
            },
            { name: 'url', type: 'url', title: 'URL' },
          ],
        },
      ],
    }),
  ],
});
