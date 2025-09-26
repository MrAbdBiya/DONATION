'use client';

import { useMemo } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const fallbackData = Array.from({ length: 7 }, (_, i) => ({
  day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
  appointments: Math.round(12 + Math.random() * 10)
}));

export function AnalyticsChart() {
  const data = useMemo(() => fallbackData, []);

  return (
    <div className="mt-6 h-64 rounded-3xl bg-gradient-to-br from-brand-50 via-white to-brand-100 p-6 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 0, right: 0, top: 16, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1c7fa0" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#1c7fa0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" tickLine={false} axisLine={false} stroke="#64748b" />
          <Tooltip
            cursor={{ stroke: '#1c7fa0', strokeWidth: 1 }}
            contentStyle={{
              borderRadius: 16,
              border: '1px solid rgba(15, 51, 67, 0.1)',
              background: 'rgba(255,255,255,0.95)'
            }}
          />
          <Area type="monotone" dataKey="appointments" stroke="#1c7fa0" strokeWidth={3} fill="url(#colorAppointments)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
