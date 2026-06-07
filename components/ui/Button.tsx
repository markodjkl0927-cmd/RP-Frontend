import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

export function Button({
  variant = 'primary',
  className,
  children,
  loading,
  icon,
  iconPosition = 'left',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}) {
  const spinner = (
    <span
      className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
      aria-hidden
    />
  );

  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      aria-busy={loading || undefined}
      className={clsx(
        'inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all',
        '[&_svg:not([aria-hidden=true])]:h-3.5 [&_svg:not([aria-hidden=true])]:w-3.5',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary' &&
          'bg-purple-600 text-white shadow-sm hover:bg-purple-500 hover:shadow-md active:scale-[0.98]',
        variant === 'secondary' &&
          'border border-surface-border bg-white text-navy-800 hover:bg-surface-muted',
        variant === 'ghost' && 'text-navy-600 hover:bg-navy-50',
        variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700',
        loading && 'relative',
        className
      )}
    >
      {loading ? (
        <>
          {spinner}
          {children ? <span>{children}</span> : <span className="sr-only">Loading</span>}
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' ? icon : null}
          {children}
          {icon && iconPosition === 'right' ? icon : null}
        </>
      )}
    </button>
  );
}
