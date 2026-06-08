'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

import { cardHover, riseSpring } from '@/lib/motion';

export function DashboardMetricCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={riseSpring}
      whileHover={reduceMotion ? {} : cardHover}
      className="group relative overflow-hidden rounded-xl border border-surface-border bg-white p-5"
    >
      <div
        className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-purple-200/0 blur-2xl transition-all duration-500 group-hover:bg-purple-200/70"
        aria-hidden
      />
      <motion.div
        initial={false}
        whileHover={reduceMotion ? {} : { scale: 1.12, rotate: -5 }}
        transition={{ type: 'spring', stiffness: 420, damping: 16 }}
        className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600 ring-1 ring-purple-100"
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </motion.div>
      <p className="relative mt-4 text-xs font-semibold uppercase tracking-wide text-navy-500">{label}</p>
      <motion.p
        className="relative mt-1 font-display text-xl font-bold text-navy-900"
        initial={false}
        whileHover={reduceMotion ? {} : { x: 2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        {value}
      </motion.p>
      {hint ? <p className="relative mt-1 text-xs text-navy-400">{hint}</p> : null}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"
        initial={{ width: '0%', opacity: 0 }}
        whileHover={reduceMotion ? {} : { width: '100%', opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}
