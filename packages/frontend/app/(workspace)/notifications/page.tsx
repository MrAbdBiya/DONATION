"use client";

import { BellRing, Filter, MailOpen } from 'lucide-react';
import useSWR from 'swr';

import type { Notification } from '@mediqueuepro/types';

import { Card, CardDescription, CardTitle } from '@/ui/card';
import { Button } from '@/ui/button';

export default function NotificationsPage() {
  const { data } = useSWR<Notification[]>('/notifications');
  const notifications = data ?? demoNotifications;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">Notification center</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Stay on top of upcoming visits, queue updates, and prescriptions.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button className="gap-2">
            Mark all read
            <MailOpen className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {notifications.map((notification) => (
          <Card key={notification.id} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <BellRing className="h-4 w-4 text-brand-500" />
                {notification.title}
              </CardTitle>
              <CardDescription className="text-sm text-slate-600 dark:text-slate-400">
                {notification.message}
              </CardDescription>
            </div>
            <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-600">
              {notification.type.toLowerCase()}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}

const demoNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'demo',
    title: 'Queue update',
    message: 'Patient Sara El Amrani has been notified for queue number 12.',
    type: 'QUEUE',
    isRead: false,
    sentAt: new Date().toISOString()
  },
  {
    id: 'notif-2',
    userId: 'demo',
    title: 'Prescription shared',
    message: 'Dr. Haddad shared the updated treatment plan with the patient portal.',
    type: 'PRESCRIPTION',
    isRead: false,
    sentAt: new Date().toISOString()
  }
];
