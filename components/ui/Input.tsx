import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

export function Input({
  label,
  hint,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string }) {
  return (
    <div className={className}>
      {label ? <label className="mb-1.5 block text-sm font-medium text-navy-700">{label}</label> : null}
      <input className="input-field" {...props} />
      {hint ? <p className="mt-1.5 text-xs text-navy-500">{hint}</p> : null}
    </div>
  );
}
