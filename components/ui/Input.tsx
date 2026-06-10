'use client';

import clsx from 'clsx';
import { Eye, EyeOff } from 'lucide-react';
import { InputHTMLAttributes, useState } from 'react';

export function Input({
  label,
  hint,
  className,
  type,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={className}>
      {label ? <label className="mb-1.5 block text-sm font-medium text-navy-700">{label}</label> : null}
      <div className="relative">
        <input className={clsx('input-field', isPassword && 'pr-11')} type={inputType} {...props} />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-navy-400 transition-colors hover:text-navy-700 focus:outline-none focus:ring-2 focus:ring-purple-400/40"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
          >
            {showPassword ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
          </button>
        ) : null}
      </div>
      {hint ? <p className="mt-1.5 text-xs text-navy-500">{hint}</p> : null}
    </div>
  );
}
