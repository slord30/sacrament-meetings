// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

// Load body sans font
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
});

// Load elegant heading serif font
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Sacrament Meeting Planner',
  description: 'Efficiently plan and view ward sacrament programs.',
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
