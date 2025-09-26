'use client';

import { format } from 'date-fns';
import useSWR from 'swr';

import type { Appointment } from '@mediqueuepro/types';

import { cn } from '@/lib/utils';

export function AppointmentTimeline() {
  const { data } = useSWR<{
    data: (Appointment & {
      patient: { user: { firstName: string; lastName: string } };
      doctor: { user: { firstName: string; lastName: string } };
    })[];
  }>('/appointments?page=1&pageSize=5');

  const appointments = data?.data ?? [
    {
      id: '1',
      patientId: 'p1',
      doctorId: 'd1',
      scheduledDate: new Date().toISOString(),
      queueNumber: 12,
      status: 'CONFIRMED',
      reason: 'Follow-up consultation',
      patient: { user: { firstName: 'Sara', lastName: 'El Amrani' } },
      doctor: { user: { firstName: 'Youssef', lastName: 'Haddad' } }
    }
  ];

  return (
    <ol className="mt-6 space-y-5">
      {appointments.map((appointment, index) => (
        <li key={appointment.id} className="relative pl-9">
          <span className="absolute left-1 top-2 h-4 w-4 rounded-full border-4 border-white bg-brand-500 shadow ring-4 ring-brand-100 dark:border-slate-900 dark:ring-brand-500/40" />
          <div
            className={cn(
              'rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60',
              index === 0 && 'border-brand-300 shadow-brand-200/50'
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {appointment.patient.user.firstName} {appointment.patient.user.lastName}
                </p>
                <p className="text-xs uppercase tracking-wide text-brand-500">
                  with Dr. {appointment.doctor.user.lastName}
                </p>
              </div>
              <div className="text-right text-sm text-slate-600 dark:text-slate-400">
                <p>{format(new Date(appointment.scheduledDate), 'HH:mm')}</p>
                <p>Queue #{appointment.queueNumber ?? '—'}</p>
              </div>
            </div>
            {appointment.reason ? (
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{appointment.reason}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
