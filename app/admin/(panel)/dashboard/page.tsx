'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Briefcase, FileText, MapPin, ArrowRight, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import api from '@/lib/api';
import { PageHeader } from '@/components/ui/PageHeader';
import { DashboardMetricCard } from '@/components/dashboard/DashboardMetricCard';
import { Alert } from '@/components/ui/Alert';

type DashboardStats = {
  members: { total: number; active: number; inactive: number };
  locations: { total: number; active: number };
  careerJobs: { total: number; active: number };
  dealershipApplications: { total: number; pending: number };
  careerApplications: { total: number; pending: number };
};

const cards = [
  {
    href: '/admin/members',
    title: 'Members',
    description: 'Search accounts, view application history, and deactivate or reactivate access.',
    icon: Users,
  },
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

function buildMetrics(stats: DashboardStats): {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  href: string;
}[] {
  const pendingTotal =
    stats.dealershipApplications.pending + stats.careerApplications.pending;

  return [
    {
      label: 'Active members',
      value: String(stats.members.active),
      hint: `${stats.members.total} registered · ${stats.members.inactive} deactivated`,
      icon: Users,
      href: '/admin/members',
    },
    {
      label: 'Fuel stations',
      value: String(stats.locations.active),
      hint: `${stats.locations.total} in directory`,
      icon: MapPin,
      href: '/admin/locations',
    },
    {
      label: 'Open job postings',
      value: String(stats.careerJobs.active),
      hint: `${stats.careerJobs.total} total listings`,
      icon: Briefcase,
      href: '/admin/careers',
    },
    {
      label: 'Dealership pending',
      value: String(stats.dealershipApplications.pending),
      hint: `${stats.dealershipApplications.total} submissions total`,
      icon: FileText,
      href: '/admin/applications',
    },
    {
      label: 'Career pending',
      value: String(stats.careerApplications.pending),
      hint: `${stats.careerApplications.total} applications total`,
      icon: FileText,
      href: '/admin/applications',
    },
    {
      label: 'Needs review',
      value: String(pendingTotal),
      hint: 'Dealership + career awaiting action',
      icon: FileText,
      href: '/admin/applications',
    },
  ];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/rp/admin/dashboard/stats')
      .then((res) => setStats(res.data.stats))
      .catch((err: unknown) => {
        const ex = err as { response?: { data?: { error?: string } } };
        setError(ex.response?.data?.error || 'Failed to load dashboard metrics');
      })
      .finally(() => setLoading(false));
  }, []);

  const metrics = stats ? buildMetrics(stats) : [];

  return (
    <div className="space-y-10">
      <PageHeader
        title="Overview"
        description="Live portal metrics and quick links to manage content and applications."
      />

      {error ? <Alert>{error}</Alert> : null}

      <section>
        <h2 className="mb-4 font-display text-lg font-semibold text-navy-900">Live metrics</h2>
        {loading ? (
          <div className="flex min-h-[8rem] items-center justify-center rounded-md border border-surface-border bg-white">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {metrics.map((metric) => (
              <Link key={metric.label} href={metric.href} className="block transition-opacity hover:opacity-95">
                <DashboardMetricCard
                  icon={metric.icon}
                  label={metric.label}
                  value={metric.value}
                  hint={metric.hint}
                />
              </Link>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 font-display text-lg font-semibold text-navy-900">Manage</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {cards.map(({ href, title, description, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group panel flex flex-col p-6 transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-display font-semibold text-navy-900">{title}</h3>
              <p className="mt-2 flex-1 text-sm text-navy-500">{description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-purple-600">
                Manage
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
