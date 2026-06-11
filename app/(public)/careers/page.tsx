'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import api from '@/lib/api';
import { CareersProgramPanel } from '@/components/careers/CareersProgramPanel';
import { JobCard, JobListItem } from '@/components/careers/JobCard';
import { JobFilters } from '@/components/careers/JobFilters';
import { Alert } from '@/components/ui/Alert';
import { gridStagger, riseSpring } from '@/lib/motion';

function CareersPageContent() {
  const searchParams = useSearchParams();
  const applied = searchParams.get('applied') === '1';
  const [jobs, setJobs] = useState<JobListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    api
      .get('/rp/careers')
      .then((res) => setJobs(res.data.jobs || []))
      .finally(() => setLoading(false));
  }, []);

  const departments = useMemo(
    () => [...new Set(jobs.map((j) => j.department).filter(Boolean) as string[])].sort(),
    [jobs]
  );
  const locations = useMemo(
    () => [...new Set(jobs.map((j) => j.location).filter(Boolean) as string[])].sort(),
    [jobs]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((job) => {
      if (department && job.department !== department) return false;
      if (location && job.location !== location) return false;
      if (!q) return true;
      return (
        job.title.toLowerCase().includes(q) ||
        (job.department || '').toLowerCase().includes(q) ||
        (job.location || '').toLowerCase().includes(q)
      );
    });
  }, [jobs, query, department, location]);

  return (
    <div>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">Join our team</p>
        <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
          Careers at R&P
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-navy-500">
          Browse open positions and read full job descriptions without signing in. Member sign-in is required only
          when you submit an application with your resume.
        </p>
      </motion.div>

      {applied ? (
        <div className="mb-6">
          <Alert variant="success">Your application was submitted successfully. Thank you!</Alert>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(260px,300px)_1fr] lg:items-start">
        <CareersProgramPanel jobCount={jobs.length} />

        <div className="space-y-5">
          {!loading && jobs.length > 0 ? (
            <JobFilters
              query={query}
              department={department}
              location={location}
              departments={departments}
              locations={locations}
              onQueryChange={setQuery}
              onDepartmentChange={setDepartment}
              onLocationChange={setLocation}
              resultCount={filtered.length}
            />
          ) : null}

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-36 animate-pulse rounded-md border border-surface-border bg-white" />
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-md border border-dashed border-surface-border bg-white px-6 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-md bg-navy-50 text-navy-500">
                <Briefcase className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">No open positions</h3>
              <p className="mt-2 max-w-md text-sm text-navy-500">
                There are no active job listings right now. Check back later for new opportunities at R&P Global
                Energies.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-md border border-surface-border bg-white px-6 py-12 text-center text-sm text-navy-500">
              No roles match your search. Try clearing filters or using a different keyword.
            </div>
          ) : (
            <motion.div
              variants={gridStagger}
              initial="hidden"
              animate="visible"
              className="grid gap-4 sm:grid-cols-2"
            >
              {filtered.map((job) => (
                <motion.div key={job.id} variants={riseSpring} className="h-full">
                  <JobCard job={job} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CareersPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
        </div>
      }
    >
      <CareersPageContent />
    </Suspense>
  );
}
