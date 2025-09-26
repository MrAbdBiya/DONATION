import Link from 'next/link';

import { Button } from '@/ui/button';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-100 px-6 py-12 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <div className="w-full max-w-2xl space-y-8 rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">Create a MediQueuePro account</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Register as a patient, doctor, nurse, or administrator.
        </p>
        <form className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">First name</label>
            <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900/70" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Last name</label>
            <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900/70" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
            <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900/70" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Role</label>
            <select className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900/70">
              <option>Patient</option>
              <option>Doctor</option>
              <option>Nurse</option>
              <option>Admin</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
            <input type="password" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900/70" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Confirm password</label>
            <input type="password" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900/70" />
          </div>
          <div className="md:col-span-2">
            <Button className="w-full">Create account</Button>
          </div>
        </form>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Already registered?{' '}
          <Link className="font-medium text-brand-600" href="/auth/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
