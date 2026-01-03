import { type SchemaTypeDefinition } from 'sanity';

import { blockContentType } from './blockContentType';
import { certification } from './certification';
import { education } from './education';
import { experience } from './experience';
import { profile } from './profile';
import { project } from './projects';
import { testimonial } from './testimonial';
import { skill } from './skill';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    certification,
    education,
    experience,
    profile,
    project,
    skill,
    testimonial,
  ],
};
