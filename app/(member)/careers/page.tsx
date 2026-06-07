'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Briefcase } from 'lucide-react';
import api from '@/lib/api';
import { PageHeader } from '@/components/ui/PageHeader';

type Job = {
  id: string;
  title: string;
  location?: string | null;
  department?: string | null;
};

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/rp/careers')
      .then((res) => setJobs(res.data.jobs || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title="Careers" description="Open positions at R&P Global Energies." />
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="panel py-12 text-center text-sm text-navy-500">No open positions at this time.</div>
      ) : (
        <ul className="space-y-3">
          {jobs.map((job) => (
            <li key={job.id}>
              <Link
                href={`/careers/${job.id}`}
                className="group panel flex items-center gap-4 p-5 transition-all hover:shadow-card-hover"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                  <Briefcase className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-navy-900 group-hover:text-navy-800">{job.title}</p>
                  <p className="text-sm text-navy-500 mt-0.5">
                    {[job.location, job.department].filter(Boolean).join(' · ') || 'R&P Global Energies'}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-navy-300 transition-transform group-hover:translate-x-0.5 group-hover:text-purple-600" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
