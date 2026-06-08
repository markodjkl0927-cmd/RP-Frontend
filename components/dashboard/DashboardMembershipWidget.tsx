'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowRight, Mail, Phone, User } from 'lucide-react';

import RpCardVisual from '../RpCardVisual';
import { fadeInUp, gridStagger, riseSpring } from '@/lib/motion';

type Props = {
  holderName: string;
  accountDisplay: string;
  lastFour: string;
  email?: string;
  phone?: string;
};

const detailItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 260, damping: 22 },
  },
};

export function DashboardMembershipWidget({
  holderName,
  accountDisplay,
  lastFour,
  email,
  phone,
}: Props) {
  const reduceMotion = useReducedMotion();

  const details: { icon: typeof User | null; content: string; mono?: boolean; truncate?: boolean }[] = [
    { icon: User, content: holderName },
    ...(email ? [{ icon: Mail, content: email, truncate: true }] : []),
    ...(phone ? [{ icon: Phone, content: phone }] : []),
    { icon: null, content: accountDisplay, mono: true },
  ];

  return (
    <div className="overflow-hidden rounded-md border border-surface-border bg-white">
      <div className="flex items-center justify-between gap-4 border-b border-surface-border px-6 py-4">
        <div>
          <h2 className="font-display text-lg font-semibold text-navy-900">Your membership</h2>
          <p className="mt-0.5 text-sm text-navy-500">Digital card preview and account details</p>
        </div>
        <motion.div whileHover={reduceMotion ? {} : { scale: 1.04 }} whileTap={reduceMotion ? {} : { scale: 0.97 }}>
          <Link
            href="/card"
            className="inline-flex items-center gap-1.5 rounded-lg bg-purple-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
          >
            Full card
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>

      <div className="grid gap-8 p-6 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.86, rotateY: -14 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ type: 'spring', stiffness: 160, damping: 20, delay: 0.1 }}
          whileHover={reduceMotion ? {} : { scale: 1.03, rotateY: 4 }}
          className="mx-auto w-full max-w-[320px] lg:mx-0"
          style={{ transformPerspective: 900 }}
        >
          <RpCardVisual
            holderName={holderName}
            accountNumberDisplay={accountDisplay}
            lastFour={lastFour}
          />
        </motion.div>

        <div className="space-y-4">
          <motion.div
            variants={riseSpring}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-md border border-surface-border bg-surface-muted p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">Status</p>
            <p className="mt-1 text-sm font-semibold text-navy-900">Active · Digital member card</p>
          </motion.div>

          <motion.ul
            variants={gridStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {details.map((item, i) => (
              <motion.li key={i} variants={detailItem} className="flex items-center gap-3 text-sm text-navy-700">
                {item.icon ? (
                  <item.icon className="h-4 w-4 shrink-0 text-purple-600" />
                ) : (
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center text-[10px] font-bold text-purple-600">
                    #
                  </span>
                )}
                <span className={item.mono ? 'font-mono' : item.truncate ? 'truncate' : undefined}>
                  {item.content}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xs leading-relaxed text-navy-400"
          >
            Physical and virtual payment cards via Stripe Issuing are planned for a future release.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
