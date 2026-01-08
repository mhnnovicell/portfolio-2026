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
};

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
