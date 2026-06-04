import clsx from 'clsx';
import { SelectHTMLAttributes } from 'react';

export function Select({
  label,
  children,
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  return (
    <div className={className}>
      {label ? <label className="mb-1.5 block text-sm font-medium text-navy-700">{label}</label> : null}
      <select className={clsx('select-field', !props.value && 'text-navy-400')} {...props}>
        {children}
      </select>
    </div>
  );
}
