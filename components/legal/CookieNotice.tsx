'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CONSENT_KEY = 'rp-cookie-consent';

export function CookieNotice() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname.startsWith('/admin')) return;
    const accepted = localStorage.getItem(CONSENT_KEY);
    if (!accepted) setVisible(true);
  }, [pathname]);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  if (!visible || pathname.startsWith('/admin')) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-surface-border bg-white/95 px-4 py-4 shadow-[0_-8px_30px_rgba(16,42,67,0.08)] backdrop-blur sm:px-6"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-sm leading-relaxed text-navy-700">
          We use essential cookies to keep you signed in and operate the R&P member portal. See our{' '}
          <Link href="/cookies" className="font-semibold text-purple-600 hover:text-purple-500">
            Cookie Policy
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="font-semibold text-purple-600 hover:text-purple-500">
            Privacy Policy
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
