import Link from 'next/link';

import { Button } from '@/ui/button';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-100 px-6 py-12 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-slate-200 bg-white/80 p-10 text-center shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">Sign in to MediQueuePro</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Access appointments, prescriptions, and queue updates.
        </p>
        <form className="space-y-5">
          <div className="text-left">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
            <input
              type="email"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900/70"
              placeholder="you@example.com"
            />
          </div>
          <div className="text-left">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
            <input
              type="password"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900/70"
              placeholder="••••••••"
            />
          </div>
          <Button className="w-full">Sign in</Button>
        </form>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          New to MediQueuePro?{' '}
          <Link className="font-medium text-brand-600" href="/auth/register">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
