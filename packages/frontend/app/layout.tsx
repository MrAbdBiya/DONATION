import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from '@/components/providers';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'MediQueuePro',
  description: 'Medical cabinet management platform for modern clinics.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-slate-50 font-sans antialiased', inter.variable)}>
        <Providers>
          <div className="flex min-h-screen flex-col bg-gradient-to-br from-brand-50 via-white to-brand-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
