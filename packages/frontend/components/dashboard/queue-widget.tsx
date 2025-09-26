'use client';

import { useMemo, type ReactNode } from 'react';
import { Activity, AlertCircle, ArrowRight, CircleCheck } from 'lucide-react';
import { format } from 'date-fns';
import useSWR from 'swr';

import type { QueueSummary } from '@mediqueuepro/types';

import { Button } from '@/ui/button';

interface QueueResponse extends QueueSummary {
  activePatient?: {
    firstName: string;
    lastName: string;
  };
}

export function QueueWidget() {
  const { data } = useSWR<QueueResponse>('/queue/summary');
  const queue = data ?? {
    activeQueueNumber: 12,
    estimatedWaitMinutes: 24,
    patientsAhead: 4,
    activePatient: { firstName: 'Sara', lastName: 'El Amrani' }
  };

  const eta = useMemo(() => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + queue.estimatedWaitMinutes);
    return format(date, 'HH:mm');
  }, [queue.estimatedWaitMinutes]);

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-inner dark:border-slate-800 dark:bg-slate-950/80">
        <p className="text-sm uppercase tracking-wider text-brand-500">Now serving</p>
        <div className="mt-4 flex items-end gap-4">
          <p className="text-6xl font-semibold text-brand-600">{queue.activeQueueNumber ?? '—'}</p>
          <div className="text-sm text-slate-500">
            <p>Patient</p>
            <p className="font-medium text-slate-900 dark:text-slate-100">
              {queue.activePatient ? `${queue.activePatient.firstName} ${queue.activePatient.lastName}` : 'TBD'}
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
          <Metric icon={Activity} label="Patients waiting" value={queue.patientsAhead} />
          <Metric icon={AlertCircle} label="Estimated wait" value={`${queue.estimatedWaitMinutes} min`} />
          <Metric icon={CircleCheck} label="Expected at" value={eta} />
        </div>
      </div>
      <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-xl">
        <div>
          <h3 className="text-xl font-semibold">Smart queue automation</h3>
          <p className="mt-2 text-sm text-slate-200">
            Automatically notify patients when their turn approaches and keep the waiting room calm and
            informed.
          </p>
        </div>
        <Button className="mt-6 self-start bg-white text-slate-900 hover:bg-slate-100">
          Call next patient
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof Activity; label: string; value: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-brand-500" />
        <span className="text-xs uppercase tracking-widest">{label}</span>
      </div>
      <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{value}</p>
    </div>
  );
}
