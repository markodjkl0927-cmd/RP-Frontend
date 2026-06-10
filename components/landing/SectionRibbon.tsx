import clsx from 'clsx';

type SectionRibbonProps = {
  children: React.ReactNode;
  variant?: 'light' | 'dark';
  className?: string;
};

export function SectionRibbon({ children, variant = 'light', className }: SectionRibbonProps) {
  const isDark = variant === 'dark';

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider',
        isDark
          ? 'bg-white/10 text-purple-200 ring-1 ring-white/15'
          : 'bg-purple-50 text-purple-600 ring-1 ring-purple-100',
        className
      )}
    >
      {children}
    </span>
  );
}
