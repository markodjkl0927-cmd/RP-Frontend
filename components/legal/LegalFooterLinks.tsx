import Link from 'next/link';
import { LEGAL_LINKS } from '@/lib/legal-content';

export function LegalFooterLinks({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${className}`}>
      {LEGAL_LINKS.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="text-xs text-navy-500 transition-colors hover:text-purple-600">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
