'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, LayoutDashboard, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function DealershipSuccessPage() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-2xl py-6 sm:py-10">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-md border border-surface-border bg-white p-8 text-center sm:p-10"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-9 w-9 text-emerald-600" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Application received</p>
        <h1 className="mt-2 font-display text-2xl font-bold text-navy-900">Thank you for applying</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-navy-500">
          Our partnerships team will review your dealership application. Expect a response within 5–10 business days
          at the email you provided.
        </p>

        <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
          <div className="rounded-md border border-surface-border bg-surface-muted p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">What happens next</p>
            <ul className="mt-2 space-y-1.5 text-sm text-navy-700">
              <li>1. Application review by R&P team</li>
              <li>2. Follow-up call or email</li>
              <li>3. Onboarding if approved</li>
            </ul>
          </div>
          <div className="rounded-md border border-surface-border bg-surface-muted p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">While you wait</p>
            <p className="mt-2 text-sm text-navy-700">
              Explore R&P fuel stations or return to your member dashboard for card and program access.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/dashboard">
            <Button icon={<LayoutDashboard />}>Back to dashboard</Button>
          </Link>
          <Link href="/locator">
            <Button variant="secondary" icon={<MapPin />}>
              Station locator
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
