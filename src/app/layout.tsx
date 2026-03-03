import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://dunajmedia.sk'),
  title: {
    default: 'Dunajmedia | Digital Marketing Agency Slovakia',
    template: '%s | Dunajmedia',
  },
  description: 'Digital marketing agency Slovakia — web development services, social media management, growth marketing Bratislava, AI-driven SEO.',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'Dunajmedia',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
