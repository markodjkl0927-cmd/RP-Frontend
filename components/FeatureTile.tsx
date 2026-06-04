import Link from 'next/link';
import { LucideIcon, ArrowRight } from 'lucide-react';

export function FeatureTile({
  href,
  title,
  description,
  icon: Icon,
  accent = 'gold',
}: {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent?: 'gold' | 'navy';
}) {
  return (
    <Link
      href={href}
      className="group panel flex flex-col p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
          accent === 'gold' ? 'bg-gold-50 text-gold-600' : 'bg-navy-50 text-navy-700'
        }`}
      >
        <Icon className="h-6 w-6" strokeWidth={1.75} />
      </div>
      <h2 className="font-display text-lg font-semibold text-navy-900 group-hover:text-navy-800">{title}</h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-500">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-600">
        Open
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
