'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Briefcase, MapPin } from 'lucide-react';
import api from '@/lib/api';
import { ApplySignInPrompt } from '@/components/careers/ApplySignInPrompt';
import { JobApplicationForm } from '@/components/careers/JobApplicationForm';
import { useRpAuthStore } from '@/lib/store';

type Job = {
  title: string;
  description: string;
  location?: string | null;
  department?: string | null;
};

export default function CareerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { isAuthenticated, user } = useRpAuthStore();
  const [job, setJob] = useState<Job | null>(null);
  const [notFound, setNotFound] = useState(false);
  const reduceMotion = useReducedMotion();
  const isMember = isAuthenticated && user?.role === 'RP_MEMBER';
  const returnPath = `/careers/${id}`;

  useEffect(() => {
    if (!id) return;
    api
      .get(`/rp/careers/${id}`)
      .then((res) => setJob(res.data.job))
      .catch(() => setNotFound(true));
  }, [id]);

  const submitApplication = async ({ file, coverLetter }: { file: File; coverLetter: string }) => {
    const form = new FormData();
    form.append('resume', file);
    if (coverLetter) form.append('coverLetter', coverLetter);
    await api.post(`/rp/careers/${id}/apply`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    router.push('/careers?applied=1');
  };

  if (notFound) {
    return (
      <div className="rounded-md border border-surface-border bg-white p-8 text-center">
        <p className="text-sm text-navy-600">This position is no longer available.</p>
        <Link href="/careers" className="mt-4 inline-block text-sm font-semibold text-purple-600 hover:text-purple-700">
          ← Back to careers
        </Link>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/careers"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-navy-600 transition-colors hover:text-purple-600"
      >
        <ArrowLeft className="h-4 w-4" />
        All positions
      </Link>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6 rounded-md border border-surface-border bg-white px-5 py-5 sm:px-6"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">Open role</p>
        <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">{job.title}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          {job.location ? (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-surface-border bg-surface-muted px-2.5 py-1 text-xs font-medium text-navy-600">
              <MapPin className="h-3.5 w-3.5 text-purple-600" />
              {job.location}
            </span>
          ) : null}
          {job.department ? (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-surface-border bg-surface-muted px-2.5 py-1 text-xs font-medium text-navy-600">
              <Briefcase className="h-3.5 w-3.5 text-purple-600" />
              {job.department}
            </span>
          ) : null}
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] lg:items-start">
        <motion.section
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45 }}
          className="rounded-md border border-surface-border bg-white p-5 sm:p-6 lg:sticky lg:top-20"
        >
          <h2 className="text-sm font-semibold text-navy-900">About this role</h2>
          <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-navy-700">{job.description}</div>
        </motion.section>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.45 }}
        >
          {isMember ? (
            <JobApplicationForm jobTitle={job.title} onSubmit={submitApplication} />
          ) : (
            <ApplySignInPrompt returnPath={returnPath} />
          )}
        </motion.div>
      </div>
    </div>
  );
}
