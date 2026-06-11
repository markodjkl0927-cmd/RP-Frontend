'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Briefcase,
  ChevronDown,
  ClipboardList,
  CreditCard,
  Handshake,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Settings,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { useRpAuthStore } from '@/lib/store';
import { LegalFooterLinks } from '@/components/legal/LegalFooterLinks';
import { Logo } from './Logo';

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/card', label: 'R&P Card', icon: CreditCard },
  { href: '/locator', label: 'Stations', icon: MapPin },
  { href: '/dealership', label: 'Dealership', icon: Handshake },
  { href: '/careers', label: 'Careers', icon: Briefcase },
  { href: '/applications', label: 'Applications', icon: ClipboardList },
];

export default function MemberShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, clearAuth } = useRpAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);

  const initials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase();

  useEffect(() => {
    setMobileOpen(false);
    setUserOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const signOut = () => {
    clearAuth();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-surface-muted">
      <header className="sticky top-0 z-50 border-b border-surface-border bg-white shadow-nav">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link href="/dashboard" className="shrink-0">
              <Logo />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
              {nav.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);
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
              <div className="relative hidden sm:block" ref={userRef}>
                <button
                  type="button"
                  onClick={() => setUserOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-xl border border-surface-border bg-surface-muted px-2 py-1.5 text-left transition-colors hover:bg-navy-50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-purple-300">
                    {initials}
                  </div>
                  <div className="hidden min-w-0 md:block">
                    <p className="truncate text-sm font-medium text-navy-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-navy-500">Member</p>
                  </div>
                  <ChevronDown className="hidden h-4 w-4 text-navy-400 md:block" />
                </button>
                {userOpen ? (
                  <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-surface-border bg-white py-1 shadow-card-hover">
                    <div className="border-b border-surface-border px-4 py-3">
                      <p className="text-sm font-medium text-navy-900">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="truncate text-xs text-navy-500">{user?.email}</p>
                    </div>
                    <Link
                      href="/settings"
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-navy-700 hover:bg-surface-muted"
                    >
                      <Settings className="h-4 w-4" />
                      Account settings
                    </Link>
                    <button
                      type="button"
                      onClick={signOut}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-navy-700 hover:bg-surface-muted"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                ) : null}
              </div>

              <button
                type="button"
                onClick={signOut}
                className="hidden rounded-lg p-2 text-navy-500 hover:bg-surface-muted hover:text-navy-800 sm:hidden"
                aria-label="Sign out"
              >
                <LogOut className="h-5 w-5" />
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
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1">
              {nav.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);
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
            </div>
            <div className="mt-3 border-t border-surface-border pt-3 sm:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-purple-300">
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-navy-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-navy-500">Member account</p>
                </div>
              </div>
              <Link
                href="/settings"
                className="mt-3 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-600 hover:bg-surface-muted hover:text-navy-900"
              >
                <Settings className="h-4 w-4 text-navy-400" strokeWidth={1.75} />
                Account settings
              </Link>
            </div>
          </nav>
        ) : null}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="border-t border-surface-border bg-white py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p className="text-xs text-navy-400">
            © {new Date().getFullYear()} R&P Global Energies Inc. · Member portal
          </p>
          <LegalFooterLinks />
        </div>
      </footer>
    </div>
  );
}
