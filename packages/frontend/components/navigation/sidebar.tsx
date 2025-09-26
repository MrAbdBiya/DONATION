'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarClock, Home, Layers, MessageCircle, Settings } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';

const links = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/appointments', label: 'Appointments', icon: CalendarClock },
  { href: '/queue', label: 'Queue Tracker', icon: Layers },
  { href: '/notifications', label: 'Notifications', icon: MessageCircle }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="relative hidden w-72 shrink-0 border-r border-slate-200 bg-white/60 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/60 lg:flex lg:flex-col">
      <div className="flex items-center justify-between px-6 pb-8 pt-10">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand-500">MediQueuePro</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-50">Care Center</h1>
        </div>
        <ThemeToggle />
      </div>
      <nav className="flex-1 space-y-1 px-4">
        {links.map((item) => {
          const Icon = item.icon;
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition',
                active
                  ? 'bg-brand-500/10 text-brand-700 shadow-inner shadow-brand-200/60 dark:bg-brand-500/20 dark:text-brand-200'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-slate-200 px-6 py-6 dark:border-slate-800">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 shadow-sm transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-brand-400"
        >
          <Settings className="h-5 w-5" />
          Manage account
        </Link>
      </div>
    </aside>
  );
}
