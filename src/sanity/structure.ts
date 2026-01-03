// ./structure/index.ts

import type { StructureResolver } from 'sanity/structure';

// docs: https://www.sanity.io/docs/studio/structure-builder-cheat-sheet

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Base')
    .items([
      // list all document types except 'siteSettings'
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'siteSettings'
      ),
      S.divider(),
      // then add the 'sideSettings' type separate
    ]);
