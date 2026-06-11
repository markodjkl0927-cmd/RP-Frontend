'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { Logo } from '@/components/Logo';
import { useRpAuthStore } from '@/lib/store';

const anchors = [
  { href: '/#about', label: 'About' },
  { href: '/#programs', label: 'Programs' },
  { href: '/#membership', label: 'Membership' },
];

const pages = [
  { href: '/locator', label: 'Stations' },
  { href: '/careers', label: 'Careers' },
];

export function LandingHeader() {
  const { isAuthenticated, user } = useRpAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMember = isAuthenticated && user?.role === 'RP_MEMBER';

  useEffect(() => {
    setMobileOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-white shadow-nav">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {anchors.map(({ href, label }) => (
            <Link key={href} href={href} className="topnav-link-inactive">
              {label}
            </Link>
          ))}
          {pages.map(({ href, label }) => (
            <Link key={href} href={href} className="topnav-link-inactive">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {isMember ? (
            <Link
              href="/dashboard"
              className="rounded-xl bg-navy-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
            >
              My dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-surface-muted"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-purple-400"
              >
                Join now
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="rounded-lg p-2 text-navy-700 hover:bg-surface-muted md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen ? (
        <nav className="border-t border-surface-border px-4 py-3 md:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-1">
            {anchors.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-navy-600 hover:bg-surface-muted hover:text-navy-900"
              >
                {label}
              </Link>
            ))}
            {pages.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-navy-600 hover:bg-surface-muted hover:text-navy-900"
              >
                {label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-surface-border pt-3">
              {isMember ? (
                <Link
                  href="/dashboard"
                  className="rounded-xl bg-navy-800 px-4 py-2.5 text-center text-sm font-semibold text-white"
                >
                  My dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-xl border border-surface-border px-4 py-2.5 text-center text-sm font-medium text-navy-700 hover:bg-surface-muted"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className={clsx(
                      'rounded-xl bg-purple-500 px-4 py-2.5 text-center text-sm font-semibold text-white'
                    )}
                  >
                    Join now
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
