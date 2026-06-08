'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

import { riseSpring } from '@/lib/motion';

export function DashboardStatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={riseSpring}
      whileHover={reduceMotion ? {} : { y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 380, damping: 24 }}
      className="panel group relative overflow-hidden p-4"
    >
      <div
        className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full bg-purple-100/0 blur-2xl transition-all duration-500 group-hover:bg-purple-100/80"
        aria-hidden
      />
      <div className="relative flex items-center gap-4">
        <motion.div
          whileHover={reduceMotion ? {} : { rotate: [0, -6, 6, 0] }}
          transition={{ duration: 0.5 }}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 ring-1 ring-purple-100"
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </motion.div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">{label}</p>
          <p className="mt-0.5 text-sm font-semibold text-navy-900">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}
