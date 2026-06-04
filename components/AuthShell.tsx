import Link from 'next/link';
import { Logo } from './Logo';

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-hero-gradient lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.15),transparent_55%)]" />
        <div className="relative">
          <Logo light />
        </div>
        <div className="relative max-w-md">
          <h2 className="font-display text-3xl font-bold leading-tight text-white">
            Powering global energy solutions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-200">
            Access your member card, find fuel stations, apply for partnership programs, and explore careers — all in one secure portal.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-navy-200">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Digital R&P member card
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Nationwide station locator
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Dealership & career programs
            </li>
          </ul>
        </div>
        <p className="relative text-xs text-navy-400">© {new Date().getFullYear()} R&P Global Energies Inc.</p>
      </div>

      <div className="flex min-h-screen flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mb-8 lg:hidden">
          <Logo />
        </div>
        <div className="mx-auto w-full max-w-md">
          <h1 className="font-display text-2xl font-bold text-navy-900">{title}</h1>
          {subtitle ? <p className="mt-2 text-sm text-navy-500">{subtitle}</p> : null}
          <div className="mt-8">{children}</div>
          {footer ? <div className="mt-6">{footer}</div> : null}
        </div>
      </div>
    </div>
  );
}

export function AuthFooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <p className="text-center text-sm text-navy-500">
      <Link href={href} className="font-semibold text-navy-800 hover:text-gold-600 transition-colors">
        {children}
      </Link>
    </p>
  );
}
