import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'VNM Trade — Premium Gadgets & Electronics',
  description:
    'Shop the latest gadgets, electronics, and mobile accessories. Premium tech products at competitive prices.',
  openGraph: {
    title: 'VNM Trade — Premium Gadgets & Electronics',
    description:
      'Shop the latest gadgets, electronics, and mobile accessories.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
