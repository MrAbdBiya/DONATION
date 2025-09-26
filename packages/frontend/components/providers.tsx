'use client';

import { ThemeProvider } from 'next-themes';
import { SWRConfig } from 'swr';

import { api } from '@/lib/api';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SWRConfig value={{ fetcher: (url) => api.get(url).then((res) => res.data) }}>{children}</SWRConfig>
    </ThemeProvider>
  );
}
