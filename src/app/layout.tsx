import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import App from './App';
import { SpecialOffer } from '@/components/landing/SpecialOffer';
import FacebookPixel from '@/components/FacebookPixel';

export const metadata: Metadata = {
  metadataBase: new URL('https://pharbah.shop'),
  title: {
    default: 'بايو هيرب - الحل الطبيعي لصحة الجهاز الهضمي | BioHerb',
    template: '%s | بايو هيرب BioHerb',
  },
  description: 'بايو هيرب هو مكمل عشبي طبيعي 100%...',
  openGraph: {
    title: 'بايو هيرب - الحل الطبيعي لصحة الجهاز الهضمي | BioHerb',
    description: 'اكتشف BioHerb ...',
    url: 'https://pharbah.shop',
    siteName: 'BioHerb',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'منتج بايو هيرب',
      },
    ],
    locale: 'ar_EG',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* ✅ استدعاء المكون المنفصل للبكسل */}
        <FacebookPixel />
      </head>

      <body>
        <App>
          <SpecialOffer />
          {children}
        </App>
      </body>
    </html>
  );
}