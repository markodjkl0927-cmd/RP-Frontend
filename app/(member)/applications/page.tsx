'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase, ClipboardList, Handshake, Mail } from 'lucide-react';
import api from '@/lib/api';
import {
  ApplicationListRow,
  type TrackedApplication,
} from '@/components/applications/ApplicationListRow';
import { isApplicationActive } from '@/lib/application-status';
import { Alert } from '@/components/ui/Alert';

type DealershipApplication = {
  id: string;
  status: string;
  createdAt: string;
  companyName: string | null;
  city: string | null;
  state: string | null;
  dealershipType: string | null;
};

type CareerApplication = {
  id: string;
  status: string;
  createdAt: string;
  job: {
    id: string;
    title: string;
    location: string | null;
    department: string | null;
    isActive: boolean;
  };
};

function toTrackedApplications(
  dealershipApplications: DealershipApplication[],
  careerApplications: CareerApplication[]
): TrackedApplication[] {
  const dealership = dealershipApplications.map((application) => {
    const location = [application.city, application.state].filter(Boolean).join(', ');
    const meta = [
      application.dealershipType || 'Dealership program',
      location || 'Location not provided',
    ].join(' · ');

    return {
      id: application.id,
      kind: 'dealership' as const,
      status: application.status,
      createdAt: application.createdAt,
      title: application.companyName || 'Dealership application',
      subtitle: 'R&P Global Energies',
      meta,
    };
  });

  const careers = careerApplications.map((application) => {
    const meta = [
      application.job.department || 'Careers',
      application.job.location || 'Location not provided',
    ].join(' · ');

    return {
      id: application.id,
      kind: 'career' as const,
      status: application.status,
      createdAt: application.createdAt,
      title: application.job.title,
      subtitle: 'R&P Global Energies',
      meta,
      jobId: application.job.id,
      jobActive: application.job.isActive,
    };
  });

  return [...dealership, ...careers].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

function ApplicationSection({
  title,
  count,
  applications,
}: {
  title: string;
  count: number;
  applications: TrackedApplication[];
}) {
  if (applications.length === 0) return null;

  return (
    <section className="overflow-hidden rounded-md border border-surface-border bg-white">
      <div className="border-b border-surface-border bg-surface-muted/50 px-4 py-3 sm:px-5">
        <h2 className="font-display text-sm font-semibold text-navy-900">
          {title} <span className="text-navy-400">({count})</span>
        </h2>
      </div>
      <div>
        {applications.map((application) => (
          <ApplicationListRow key={`${application.kind}-${application.id}`} application={application} />
        ))}
      </div>
    </section>
  );
}

export default function MemberApplicationsPage() {
  const [dealershipApplications, setDealershipApplications] = useState<DealershipApplication[]>([]);
  const [careerApplications, setCareerApplications] = useState<CareerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    api
      .get('/rp/member/applications')
      .then((res) => {
        setDealershipApplications(res.data.dealershipApplications || []);
        setCareerApplications(res.data.careerApplications || []);
      })
      .catch((err: unknown) => {
        const ex = err as { response?: { data?: { error?: string } } };
        setError(ex.response?.data?.error || 'Failed to load your applications');
      })
      .finally(() => setLoading(false));
  }, []);

  const applications = useMemo(
    () => toTrackedApplications(dealershipApplications, careerApplications),
    [dealershipApplications, careerApplications]
  );

  const activeApplications = useMemo(
    () => applications.filter((application) => isApplicationActive(application.status)),
    [applications]
  );

  const closedApplications = useMemo(
    () => applications.filter((application) => !isApplicationActive(application.status)),
    [applications]
  );

  return (
    <div>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">Application tracking</p>
        <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
          My applications
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy-500">
          A simple list of your submissions. Status updates are also emailed to you from{' '}
          <span className="font-medium text-navy-700">noreply@randpglobalenergies.com</span> when your application
          moves forward.
        </p>
      </motion.div>

      {error ? (
        <div className="mb-6">
          <Alert>{error}</Alert>
        </div>
      ) : null}

      {loading ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
        </div>
      ) : applications.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-md border border-dashed border-surface-border bg-white px-6 py-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-md bg-purple-50 text-purple-600">
            <ClipboardList className="h-6 w-6" strokeWidth={1.75} />
          </div>
          <h2 className="mt-4 font-display text-lg font-semibold text-navy-900">No applications yet</h2>
          <p className="mt-2 max-w-md text-sm text-navy-500">
            When you apply, you will receive a confirmation email and your application will appear here with a status
            ribbon.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-700"
            >
              <Briefcase className="h-4 w-4" />
              Browse careers
            </Link>
            <Link
              href="/dealership"
              className="inline-flex items-center gap-2 rounded-xl border border-surface-border px-4 py-2.5 text-sm font-semibold text-navy-700 hover:bg-surface-muted"
            >
              <Handshake className="h-4 w-4 text-purple-600" />
              Apply for dealership
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-surface-border bg-white px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2 text-sm text-navy-600">
              <Mail className="h-4 w-4 text-purple-600" />
              <span>
                {applications.length} application{applications.length === 1 ? '' : 's'} · {activeApplications.length}{' '}
                active
              </span>
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/careers" className="font-semibold text-purple-600 hover:text-purple-500">
                Browse careers
              </Link>
              <Link href="/dealership" className="font-semibold text-navy-600 hover:text-navy-800">
                New dealership application
              </Link>
            </div>
          </div>

          <ApplicationSection title="Active" count={activeApplications.length} applications={activeApplications} />
          <ApplicationSection title="Closed" count={closedApplications.length} applications={closedApplications} />
        </div>
      )}
    </div>
  );
}
