'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, LucideIcon } from 'lucide-react';

import { cardHover, riseSpring } from '@/lib/motion';

export function DashboardServiceCard({
  href,
  title,
  description,
  icon: Icon,
  tag,
}: {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tag: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div variants={riseSpring} className="h-full">
      <motion.div
        whileHover={reduceMotion ? {} : cardHover}
        whileTap={reduceMotion ? {} : { scale: 0.99 }}
        className="h-full"
      >
        <Link
          href={href}
          className="group relative flex h-full flex-col overflow-hidden rounded-md border border-surface-border bg-white p-5 transition-colors hover:border-purple-200"
        >
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          >
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-purple-200/50 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-purple-50/80 to-transparent" />
          </motion.div>

          <div className="relative flex items-start justify-between gap-4">
            <motion.div
              whileHover={reduceMotion ? {} : { scale: 1.08, rotate: -3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-purple-50 text-purple-600 group-hover:bg-purple-100"
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </motion.div>
            <span className="rounded-md border border-surface-border bg-surface-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-navy-500">
              {tag}
            </span>
          </div>
          <h3 className="relative mt-4 font-display text-lg font-semibold text-navy-900 transition-colors group-hover:text-purple-800">
            {title}
          </h3>
          <p className="relative mt-2 flex-1 text-sm leading-relaxed text-navy-500">{description}</p>
          <span className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 group-hover:text-purple-700">
            Get started
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>

          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 via-purple-400 to-transparent"
            initial={{ width: '0%' }}
            whileHover={reduceMotion ? {} : { width: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}
