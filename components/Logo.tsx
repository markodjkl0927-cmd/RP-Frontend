import clsx from 'clsx';

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <div className={clsx('flex items-center gap-2.5', className)}>
      <div
        className={clsx(
          'flex h-9 w-9 items-center justify-center rounded-lg font-display text-sm font-bold',
          light ? 'bg-gold-400 text-navy-950' : 'bg-navy-800 text-gold-300'
        )}
      >
        R&P
      </div>
      <div className={light ? 'text-white' : 'text-navy-900'}>
        <p className="font-display text-sm font-bold leading-tight tracking-tight">R&P Global</p>
        <p className={clsx('text-[10px] font-medium uppercase tracking-widest', light ? 'text-navy-200' : 'text-navy-500')}>
          Energies
        </p>
      </div>
    </div>
  );
}
