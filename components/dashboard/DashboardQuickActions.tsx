'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowRight, LucideIcon } from 'lucide-react';

import { gridStagger } from '@/lib/motion';

type Action = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  step: number;
};

const listItem: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 240, damping: 22 },
  },
};

export function DashboardQuickActions({ actions }: { actions: Action[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="rounded-xl border border-surface-border bg-white p-5">
      <h2 className="font-display text-lg font-semibold text-navy-900">Quick actions</h2>
      <p className="mt-1 text-sm text-navy-500">Common tasks for R&P members</p>

      <motion.ul variants={gridStagger} className="mt-5 space-y-2">
        {actions.map(({ href, label, description, icon: Icon, step }) => (
          <motion.li
            key={href}
            variants={listItem}
            whileHover={reduceMotion ? {} : { x: 6 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          >
            <Link
              href={href}
              className="group flex items-start gap-3 rounded-lg border border-transparent p-3 transition-colors hover:border-purple-100 hover:bg-purple-50/60"
            >
              <motion.span
                whileHover={reduceMotion ? {} : { scale: 1.1 }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-surface-border bg-white text-xs font-bold text-navy-600 transition-colors group-hover:border-purple-200 group-hover:bg-purple-100 group-hover:text-purple-700"
              >
                {step}
              </motion.span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-purple-600" strokeWidth={1.75} />
                  <span className="font-semibold text-navy-900 group-hover:text-purple-800">{label}</span>
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-navy-500">{description}</p>
              </div>
              <motion.span
                initial={false}
                animate={reduceMotion ? {} : { x: 0 }}
                whileHover={reduceMotion ? {} : { x: 4 }}
              >
                <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-navy-400 group-hover:text-purple-600" />
              </motion.span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
