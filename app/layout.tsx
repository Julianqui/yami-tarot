import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SiteChrome } from './components/site-chrome';

const sans = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Yami Tarot · Lecturas de tarot',
  description:
    'Lecturas de tarot con Yami: sesiones en vivo, tiradas en video y rituales. Reservá online y pagá con Mercado Pago.',
  openGraph: {
    title: 'Yami Tarot',
    description: 'Lecturas de tarot, videos y rituales. Reservá tu sesión y pagá con Mercado Pago.',
    type: 'website',
    locale: 'es_AR',
  },
};

export const viewport: Viewport = {
  themeColor: '#0b0b0c',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
