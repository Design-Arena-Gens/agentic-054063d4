import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MBTI Personality Quiz',
  description: 'Discover your MBTI type with a quick, beautiful quiz.',
  openGraph: {
    title: 'MBTI Personality Quiz',
    description: 'Discover your MBTI type with a quick, beautiful quiz.',
    url: 'https://agentic-054063d4.vercel.app',
    siteName: 'MBTI Quiz',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MBTI Personality Quiz',
    description: 'Discover your MBTI type with a quick, beautiful quiz.'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`${inter.className} min-h-full text-gray-900`}>{children}</body>
    </html>
  );
}
