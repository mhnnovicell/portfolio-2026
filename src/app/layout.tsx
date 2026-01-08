import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'mikkelraev.dk',
  description:
    'mikkelraev.dk er en personlig portefølje drevet af Mikkel Hornbech Nielsen',
  keywords: [
    'portefølje, portfolio, resume, CV, curicum vitale, Mikkel, Hornbech, Nielsen, mikkelraev, mikkel, raev, ræv, hjemmeside, frontend, grafik, web, udvikling, UI, UX, kode, Mikkel Hornbech Nielsen',
  ],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. The Person Schema (Who you are)
      {
        '@type': 'Person',
        '@id': 'https://portfolio-2026-mhn.vercel.app/#person',
        name: 'Mikkel Hornbech Nielsen',
        telephone: '+45 41 43 05 42',
        jobTitle: 'Frontend Developer',
        url: 'https://portfolio-2026-mhn.vercel.app/',
        image:
          'https://cdn.sanity.io/images/dedvn4af/production/f94359f9223a152b165b13ec24966f91a157644c-600x600.webp',
        description:
          'Passionate frontend developer with 5+ years of experience building accessible, pixel-perfect web applications.',
        email: 'mailto:kontakt@mikkelraev.dk',
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
        '@id': 'https://portfolio-2026-mhn.vercel.app/#business',
        name: 'Mikkel Hornbech Nielsen - Frontend Development', // Slightly distinct business name
        url: 'https://portfolio-2026-mhn.vercel.app/',
        logo: 'https://cdn.sanity.io/images/dedvn4af/production/f94359f9223a152b165b13ec24966f91a157644c-600x600.webp',
        image:
          'https://cdn.sanity.io/images/dedvn4af/production/f94359f9223a152b165b13ec24966f91a157644c-600x600.webp',
        description:
          'Specialized in frontend development, UI/UX design, and performance optimization for web applications.',
        email: 'mailto:kontakt@mikkelraev.dk',
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
          '@id': 'https://portfolio-2026-mhn.vercel.app/#person',
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
  };

  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id='Cookiebot'
          src='https://consent.cookiebot.com/uc.js'
          strategy='beforeInteractive'
          data-cbid='b843d607-a3f8-40df-a756-65d3e5e1f9ee'
          data-blockingmode='auto'
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
