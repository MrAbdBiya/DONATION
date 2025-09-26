'use client';

import { MoonStar, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
    </Button>
  );
}
