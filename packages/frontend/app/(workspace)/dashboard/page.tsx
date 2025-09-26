"use client";

import type { ReactNode } from 'react';
import { Activity, Clock, FileText, Stethoscope } from 'lucide-react';
import useSWR from 'swr';

import { Card, CardDescription, CardTitle } from '@/ui/card';
import { Button } from '@/ui/button';
import { AppointmentTimeline } from '@/dashboard/timeline';
import { QueueWidget } from '@/dashboard/queue-widget';
import { AnalyticsChart } from '@/dashboard/analytics-chart';

export default function DashboardPage() {
  const { data: analytics } = useSWR('/analytics');
  const summary = analytics ?? {
    appointmentsToday: 12,
    averageWaitMinutes: 18,
    prescriptionsIssued: 9,
    occupancyRate: 72
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-6 rounded-3xl bg-gradient-to-br from-brand-500 via-brand-400 to-brand-600 p-8 text-white shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-widest text-brand-100/80">Welcome back</p>
            <h2 className="mt-2 text-3xl font-semibold">MediQueuePro Control Center</h2>
            <p className="mt-2 max-w-xl text-brand-50/80">
              Monitor patient flow, manage appointments, and keep everyone informed with a single unified
              workspace.
            </p>
          </div>
          <Button variant="outline" className="border-white/30 bg-white/20 text-white hover:bg-white/40">
            Generate daily report
          </Button>
        </div>
        <dl className="grid gap-4 md:grid-cols-4">
          <StatCard icon={Stethoscope} label="Appointments today" value={summary.appointmentsToday} />
          <StatCard icon={Clock} label="Average wait" value={`${summary.averageWaitMinutes} min`} />
          <StatCard icon={FileText} label="Prescriptions" value={summary.prescriptionsIssued} />
          <StatCard icon={Activity} label="Occupancy" value={`${summary.occupancyRate}%`} />
        </dl>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardTitle>Live queue overview</CardTitle>
          <CardDescription>Track in-clinic waiting times and call the next patient with one tap.</CardDescription>
          <QueueWidget />
        </Card>
        <Card>
          <CardTitle>Performance insights</CardTitle>
          <CardDescription>Understand volume and utilisation trends.</CardDescription>
          <AnalyticsChart />
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardTitle>Upcoming appointments</CardTitle>
          <CardDescription>Personalised view of your next consultations.</CardDescription>
          <AppointmentTimeline />
        </Card>
        <Card>
          <CardTitle>Care team activity</CardTitle>
          <CardDescription>Stay aligned with nurses and administrators.</CardDescription>
          <ul className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <span className="font-medium text-slate-900 dark:text-slate-100">Nurse Amina</span> updated the
              vaccination checklist for patient Sara.
            </li>
            <li>
              <span className="font-medium text-slate-900 dark:text-slate-100">Admin Rachid</span> confirmed 3 new
              patient registrations.
            </li>
            <li>
              <span className="font-medium text-slate-900 dark:text-slate-100">Dr. Haddad</span> shared a nutrition plan
              via the patient portal.
            </li>
          </ul>
        </Card>
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof Activity; label: string; value: ReactNode }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white/10 px-4 py-5 text-sm shadow-lg shadow-brand-900/30">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-brand-50/80">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
