import { type SchemaTypeDefinition } from 'sanity';

import { certification } from './certification';
import { education } from './education';
import { experience } from './experience';
import { profile } from './profile';
import { project } from './projects';
import { testimonial } from './testimonial';
import { skill } from './skill';
import { navigation } from './navigation';
import { whatIDo } from './whatido';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    certification,
    education,
    experience,
    profile,
    project,
    skill,
    testimonial,
    navigation,
    whatIDo,
  ],
};
