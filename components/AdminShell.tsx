'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Briefcase, FileText, LayoutDashboard, LogOut, MapPin, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { useRpAuthStore } from '@/lib/store';
import { Logo } from './Logo';

const links = [
  { href: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/locations', label: 'Locations', icon: MapPin },
  { href: '/admin/careers', label: 'Careers', icon: Briefcase },
  { href: '/admin/applications', label: 'Applications', icon: FileText },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { clearAuth } = useRpAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const signOut = () => {
    clearAuth();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-surface-muted">
      <header className="sticky top-0 z-50 border-b border-surface-border bg-white shadow-nav">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex shrink-0 items-center gap-3">
              <Link href="/admin/dashboard">
                <Logo />
              </Link>
              <span className="hidden rounded-md bg-navy-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-purple-300 sm:inline">
                Admin
              </span>
            </div>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Admin">
              {links.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={clsx(
                      'topnav-link inline-flex items-center gap-1.5',
                      active ? 'topnav-link-active' : 'topnav-link-inactive'
                    )}
                  >
                    <Icon
                      className={clsx('h-3.5 w-3.5 shrink-0', active ? 'text-purple-500' : 'text-navy-400')}
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={signOut}
                className="hidden items-center gap-2 rounded-xl border border-surface-border px-3 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-surface-muted lg:flex"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>

              <button
                type="button"
                onClick={() => setMobileOpen((o) => !o)}
                className="rounded-lg p-2 text-navy-700 hover:bg-surface-muted lg:hidden"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen ? (
          <nav
            className="border-t border-surface-border bg-white px-4 py-3 lg:hidden"
            aria-label="Admin mobile"
          >
            <div className="flex flex-col gap-1">
              {links.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={clsx(
                      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                      active
                        ? 'bg-navy-50 text-navy-900'
                        : 'text-navy-600 hover:bg-surface-muted hover:text-navy-900'
                    )}
                  >
                    <Icon
                      className={clsx('h-4 w-4', active ? 'text-purple-500' : 'text-navy-400')}
                      strokeWidth={1.75}
                    />
                    {label}
                  </Link>
                );
              })}
              <button
                type="button"
                onClick={signOut}
                className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-600 hover:bg-surface-muted"
              >
                <LogOut className="h-4 w-4 text-navy-400" />
                Sign out
              </button>
            </div>
          </nav>
        ) : null}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
