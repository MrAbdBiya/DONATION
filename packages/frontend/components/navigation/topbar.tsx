'use client';

import { Bell, Search } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/ui/button';

export function Topbar() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white/70 px-6 py-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
      <div className="relative flex-1">
        <input
          className="w-full rounded-full border border-transparent bg-slate-100 px-12 py-3 text-sm text-slate-700 shadow-inner focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:bg-slate-800/80 dark:text-slate-200"
          placeholder="Search patients, appointments, or prescriptions"
        />
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      </div>
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link href="/notifications" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-lg font-semibold text-white shadow-lg">
          SA
        </div>
      </div>
    </header>
  );
}
