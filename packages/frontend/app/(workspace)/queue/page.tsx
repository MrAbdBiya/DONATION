"use client";

import { AlertTriangle, CheckCircle2, Clock, Users } from 'lucide-react';
import useSWR from 'swr';

import type { QueueEntry, QueueSummary } from '@mediqueuepro/types';

import { Card, CardDescription, CardTitle } from '@/ui/card';
import { Button } from '@/ui/button';

interface QueueResponse extends QueueSummary {
  activePatient?: { firstName: string; lastName: string };
}

export default function QueuePage() {
  const { data: summary } = useSWR<QueueResponse>('/queue/summary');
  const { data: appointments } = useSWR<{ data: QueueEntry[] }>('/queue');

  const entries = appointments?.data ?? [];

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">Queue tracker</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Monitor live wait times and communicate updates instantly.
          </p>
        </div>
        <Button className="gap-2">
          Notify next patient
          <CheckCircle2 className="h-4 w-4" />
        </Button>
      </header>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardTitle>Now serving</CardTitle>
          <CardDescription className="mt-4 text-4xl font-semibold text-brand-600">
            {summary?.activeQueueNumber ?? '—'}
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>Patients waiting</CardTitle>
          <CardDescription className="mt-4 flex items-center gap-2 text-4xl font-semibold text-brand-600">
            <Users className="h-7 w-7" />
            {summary?.patientsAhead ?? 0}
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>Average wait</CardTitle>
          <CardDescription className="mt-4 flex items-center gap-2 text-4xl font-semibold text-brand-600">
            <Clock className="h-7 w-7" />
            {summary?.estimatedWaitMinutes ?? 0} min
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>Alerts</CardTitle>
          <CardDescription className="mt-4 flex items-center gap-2 text-4xl font-semibold text-brand-600">
            <AlertTriangle className="h-7 w-7" />
            1
          </CardDescription>
        </Card>
      </div>

      <Card>
        <CardTitle>Queue details</CardTitle>
        <CardDescription>Live list of waiting patients.</CardDescription>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Queue #</th>
                <th className="px-4 py-3">Appointment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">ETA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {(entries.length > 0 ? entries : demoEntries).map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/40">
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{entry.queueNumber}</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{entry.appointmentId}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-600">
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{entry.estimatedTime} min</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

const demoEntries: QueueEntry[] = Array.from({ length: 6 }).map((_, index) => ({
  id: `queue-${index}`,
  appointmentId: `appointment-${index}`,
  queueNumber: index + 10,
  estimatedTime: 20 + index * 5,
  status: index === 0 ? 'CALLED' : index % 2 === 0 ? 'WAITING' : 'IN_PROGRESS'
}));
