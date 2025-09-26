import { cn } from '@/lib/utils';

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-brand-100/40 transition hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-900/50',
        className
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: CardProps) {
  return <h3 className={cn('text-lg font-semibold text-slate-900 dark:text-slate-100', className)} {...props} />;
}

export function CardDescription({ className, ...props }: CardProps) {
  return <p className={cn('mt-2 text-sm text-slate-600 dark:text-slate-400', className)} {...props} />;
}
