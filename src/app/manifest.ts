import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'mikkelraev.dk',
    short_name: 'mikkelraev.dk',
    description:
      'mikkelraev.dk er en personlig portefølje drevet af Mikkel Hornbech Nielsen',
    start_url: '/',
    display: 'standalone',
    background_color: '#000',
    theme_color: '#000',
    icons: [
      {
        src: '/maskable_icon_x128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'maskable',
      },

      {
        src: '/public/maskable_icon_x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
