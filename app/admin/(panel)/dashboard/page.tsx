'use client';

import Link from 'next/link';
import { Briefcase, FileText, MapPin, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';

const cards = [
  {
    href: '/admin/locations',
    title: 'Fuel locations',
    description: 'Manage states, cities, and station addresses for the member locator.',
    icon: MapPin,
  },
  {
    href: '/admin/careers',
    title: 'Career postings',
    description: 'Create and edit job listings visible to members.',
    icon: Briefcase,
  },
  {
    href: '/admin/applications',
    title: 'Applications',
    description: 'Review dealership and career submissions.',
    icon: FileText,
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <PageHeader
        title="Overview"
        description="Manage member-facing content and review incoming applications."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ href, title, description, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group panel flex flex-col p-6 transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <h2 className="font-display font-semibold text-navy-900">{title}</h2>
            <p className="mt-2 flex-1 text-sm text-navy-500">{description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-600">
              Manage
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
