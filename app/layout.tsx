// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap', 
});

// Next.js automatically processes app/favicon.ico and app/opengraph-image.png files!
export const metadata: Metadata = {
  title: {
    default: 'College Park Ward Sacrament Planner',
    template: '%s | College Park Ward'
  },
  description: 'Efficiently schedule, plan, view, and organize weekly sacrament programs and meeting details.',
  openGraph: {
    title: 'College Park Ward Sacrament Planner',
    description: 'Efficiently plan and view ward sacrament programs.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="font-sans flex flex-col min-h-full bg-[#faf9f5] text-[#2c302e] antialiased">
        <Header />
        <main className="flex-grow max-w-5xl w-full mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
