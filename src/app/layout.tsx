import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import Script from 'next/script';

const Analytics = dynamic(() =>
  import('@vercel/analytics/next').then((m) => m.Analytics),
);

const SpeedInsights = dynamic(() =>
  import('@vercel/speed-insights/next').then((m) => m.SpeedInsights),
);

const ServiceWorkerRegistration = dynamic(() =>
  import('@/components/ServiceWorkerRegistration').then(
    (m) => m.ServiceWorkerRegistration,
  ),
);

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: 'black',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  title: 'mikkelraev.dk',
  description:
    'mikkelraev.dk er en personlig portefølje drevet af Mikkel Hornbech Nielsen',
  keywords: [
    'portefølje, portfolio, resume, CV, curicum vitale, Mikkel, Hornbech, Nielsen, mikkelraev, mikkel, raev, ræv, hjemmeside, frontend, grafik, web, udvikling, UI, UX, kode, Mikkel Hornbech Nielsen',
  ],
  metadataBase: new URL('https://mikkelraev.dk'),
  authors: [{ name: 'Mikkel Hornbech Nielsen', url: 'https://mikkelraev.dk' }],
  openGraph: {
    title: 'Mikkel Hornbech Nielsen | Frontend Developer',
    description:
      'mikkelraev.dk er en personlig portefølje drevet af Mikkel Hornbech Nielsen',
    url: 'https://mikkelraev.dk',
    siteName: 'Mikkel Hornbech Nielsen Portfolio',
    images: [
      {
        url: 'https://cdn.sanity.io/images/dedvn4af/production/f94359f9223a152b165b13ec24966f91a157644c-600x600.webp', // Extracted from your profile image
        width: 600,
        height: 600,
        alt: 'Mikkel Hornbech Nielsen',
      },
    ],
    locale: 'da_DK',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/favicon-512x512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

const jsonLdString = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    // 1. The Person Schema (Who you are)
    {
      '@type': 'Person',
      '@id': 'https://mikkelraev.dk/#person',
      name: 'Mikkel Hornbech Nielsen',
      telephone: '+45 41 43 05 42',
      jobTitle: 'Frontend Developer',
      url: 'https://mikkelraev.dk/',
      image:
        'https://cdn.sanity.io/images/dedvn4af/production/f94359f9223a152b165b13ec24966f91a157644c-600x600.webp',
      description:
        'mikkelraev.dk er en personlig portefølje drevet af Mikkel Hornbech Nielsen',
      email: 'mailto:kontakt@mikkelraev.dk',
      knowsAbout: [
        'Frontend Development',
        'React',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'UI/UX Design',
        'Accessibility',
      ],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Frontend Developer',
        occupationLocation: {
          '@type': 'City',
          name: 'Aarhus',
        },
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Aarhus',
        addressCountry: 'Denmark',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'NRGI',
      },
      alumniOf: [
        {
          '@type': 'CollegeOrUniversity',
          name: 'Erhvervsakademi Aarhus',
        },
      ],
      sameAs: [
        'https://github.com/mikkelraev',
        'https://www.linkedin.com/in/mikkel-hornbech-nielsen/',
      ],
    },
    // 2. The ProfessionalService Schema (Your Business Entity)
    {
      '@type': 'ProfessionalService',
      '@id': 'https://mikkelraev.dk/#business',
      name: 'Mikkel Hornbech Nielsen - Frontend Development', // Slightly distinct business name
      url: 'https://mikkelraev.dk/',
      logo: 'https://cdn.sanity.io/images/dedvn4af/production/f94359f9223a152b165b13ec24966f91a157644c-600x600.webp',
      image:
        'https://cdn.sanity.io/images/dedvn4af/production/f94359f9223a152b165b13ec24966f91a157644c-600x600.webp',
      description:
        'mikkelraev.dk er en personlig portefølje drevet af Mikkel Hornbech Nielsen',
      email: 'mailto:kontakt@mikkelraev.dk',
      telephone: '+45 41 43 05 42',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Aarhus',
        addressCountry: 'Denmark',
        postalCode: '8200',
        streetAddress: 'Kalmargade 40a, st. 11',
      },
      priceRange: '$$', // Optional: Indicates standard professional pricing
      areaServed: [
        {
          '@type': 'Country',
          name: 'Denmark',
        },
        {
          '@type': 'Place',
          name: 'Global', // If you take remote work
        },
      ],
      // Linking the Person as the founder/provider of this service
      founder: {
        '@id': 'https://mikkelraev.dk/#person',
      },
      // Listing specific services based on your "Filosofi" and "Evner"
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Development Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Frontend Development',
              description:
                'Building accessible, pixel-perfect web applications using React, Next.js, and TypeScript.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'UI/UX Design Implementation',
              description:
                'Creating beautiful interfaces with attention to detail and user experience.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Performance Optimization',
              description:
                'Optimizing websites for speed, efficiency, and SEO.',
            },
          },
        ],
      },
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />
        <Script
          type='text/javascript'
          src='//cdn.cookie-script.com/s/87392cce3e7ad19dd735b3fe168fdcf4.js'
          strategy='afterInteractive'
        />
        <ServiceWorkerRegistration />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
