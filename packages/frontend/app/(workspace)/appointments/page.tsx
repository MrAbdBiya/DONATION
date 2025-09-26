"use client";

import { CalendarPlus, Clock3, UsersRound } from 'lucide-react';
import useSWR from 'swr';

import type { Appointment } from '@mediqueuepro/types';

import { Card, CardDescription, CardTitle } from '@/ui/card';
import { Button } from '@/ui/button';

export default function AppointmentsPage() {
  const { data } = useSWR<{
    data: Appointment[];
  }>('/appointments?page=1&pageSize=20');

  const appointments = data?.data ?? [];

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">Appointments</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Manage bookings, reschedule visits, and ensure patients have everything they need.
          </p>
        </div>
        <Button className="gap-2">
          <CalendarPlus className="h-4 w-4" />
          Book appointment
        </Button>
      </header>

      <div className="grid gap-5 md:grid-cols-3">
        <Card>
          <CardTitle>Today's visits</CardTitle>
          <div className="mt-4 flex items-center gap-3 text-3xl font-semibold text-brand-600">
            <UsersRound className="h-8 w-8" />
            18
          </div>
        </Card>
        <Card>
          <CardTitle>Average wait time</CardTitle>
          <div className="mt-4 flex items-center gap-3 text-3xl font-semibold text-brand-600">
            <Clock3 className="h-8 w-8" />
            16 min
          </div>
        </Card>
        <Card>
          <CardTitle>Upcoming telehealth</CardTitle>
          <div className="mt-4 text-3xl font-semibold text-brand-600">5</div>
        </Card>
      </div>

      <Card>
        <CardTitle>Schedule</CardTitle>
        <CardDescription>Overview of the next 20 consultations.</CardDescription>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Doctor</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {(appointments.length > 0 ? appointments : demoAppointments).map((appointment) => (
                <tr key={appointment.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/40">
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                    {new Date(appointment.scheduledDate).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{appointment.patientId}</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{appointment.doctorId}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-600">
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

const demoAppointments: Appointment[] = Array.from({ length: 8 }).map((_, index) => ({
  id: `demo-${index}`,
  patientId: `patient-${index}`,
  doctorId: `doctor-${index}`,
  scheduledDate: new Date(Date.now() + index * 45 * 60000).toISOString(),
  queueNumber: index + 20,
  status: index % 3 === 0 ? 'CONFIRMED' : 'PENDING',
  reason: null
}));
