'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

import RpCardVisual from '../RpCardVisual';
import { riseSpring } from '@/lib/motion';

type Props = {
  holderName: string;
  accountNumberDisplay: string;
  lastFour: string;
  status: string;
};

export function CardStagePanel({ holderName, accountNumberDisplay, lastFour, status }: Props) {
  const reduceMotion = useReducedMotion();
  const isActive = status.toUpperCase() === 'ACTIVE';

  return (
    <motion.aside
      variants={riseSpring}
      initial={reduceMotion ? false : 'hidden'}
      animate="visible"
      className="relative flex flex-col items-center justify-center border-b border-surface-border bg-white px-6 py-10 sm:px-10 lg:sticky lg:top-16 lg:min-h-[calc(100vh-4rem)] lg:border-b-0 lg:border-r lg:py-14"
    >
      {/* Subtle surface texture — no heavy color wash */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,58,237,0.06),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[linear-gradient(to_right,rgba(16,42,67,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,42,67,0.04)_1px,transparent_1px)] bg-[size:24px_24px]"
        aria-hidden
      />

      <div className="relative w-full max-w-[380px]">
        <div className="mb-8 text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">Digital membership</p>
          <h2 className="mt-1 font-display text-lg font-semibold text-navy-900">Your R&P card</h2>
          <p className="mt-2 text-sm leading-relaxed text-navy-500">
            Show this card in person or share your account number with partner locations.
          </p>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 24, delay: 0.15 }}
          className="relative"
        >
          <RpCardVisual
            holderName={holderName}
            accountNumberDisplay={accountNumberDisplay}
            lastFour={lastFour}
            status={status}
            elevated
          />
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          {isActive ? (
            <span className="inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Active member
            </span>
          ) : null}
          <span className="inline-flex items-center gap-2 rounded-md border border-surface-border bg-surface-muted px-3 py-1.5 text-xs font-semibold text-navy-600">
            <ShieldCheck className="h-3.5 w-3.5 text-purple-600" />
            Verified credential
          </span>
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-navy-400 lg:text-left">
          Wallet integration for Apple Pay and Google Pay will be available when Stripe Issuing launches.
        </p>
      </div>
    </motion.aside>
  );
}
