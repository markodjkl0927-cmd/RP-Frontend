import Link from 'next/link';
import { Logo } from '@/components/Logo';

const linkClass =
  'inline-block text-sm text-navy-700 transition-colors duration-200 hover:text-purple-600';

const headingClass = 'text-xs font-semibold uppercase tracking-wider text-purple-600';

export function LandingFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-purple-100">
      <div
        className="pointer-events-none absolute right-0 top-0 h-48 w-48 translate-x-1/4 rounded-full bg-purple-400/20 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] lg:items-start lg:gap-20">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-700">
              R&P Global Energies — petroleum marketing and member services across the United States.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-x-10">
            <div>
              <p className={headingClass}>Explore</p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href="#about" className={linkClass}>
                    About
                  </a>
                </li>
                <li>
                  <a href="#programs" className={linkClass}>
                    Programs
                  </a>
                </li>
                <li>
                  <a href="#membership" className={linkClass}>
                    Membership
                  </a>
                </li>
                <li>
                  <Link href="/locator" className={linkClass}>
                    Station locator
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className={linkClass}>
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className={headingClass}>Account</p>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/login" className={linkClass}>
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link href="/register" className={linkClass}>
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/recover" className={linkClass}>
                    Account recovery
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className={headingClass}>Portal</p>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/admin/login" className={linkClass}>
                    Admin sign in
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex h-9 items-center justify-center border-t border-purple-300/70 sm:mt-10">
        <p className="text-xs text-purple-800/80">
          © {new Date().getFullYear()} R&P Global Energies Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
