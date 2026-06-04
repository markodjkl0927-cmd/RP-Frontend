import clsx from 'clsx';

export function Alert({ children, variant = 'error' }: { children: React.ReactNode; variant?: 'error' | 'success' | 'info' }) {
  return (
    <div
      className={clsx(
        'rounded-xl border px-4 py-3 text-sm',
        variant === 'error' && 'border-red-200 bg-red-50 text-red-800',
        variant === 'success' && 'border-emerald-200 bg-emerald-50 text-emerald-800',
        variant === 'info' && 'border-navy-200 bg-navy-50 text-navy-800'
      )}
    >
      {children}
    </div>
  );
}
