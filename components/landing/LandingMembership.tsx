'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { fadeInUp, scrollReveal, viewportOnce } from '@/lib/motion';
import { SectionRibbon } from './SectionRibbon';

const benefits = [
  '10-digit account number for secure sign-in',
  'Digital R&P member card in your portal',
  'Access to station locator and member programs',
  'Apply for dealership partnership and careers',
];

export function LandingMembership() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="membership" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="overflow-hidden rounded-md border border-surface-border bg-gradient-to-br from-navy-900 via-navy-800 to-purple-900 px-6 py-12 sm:px-10 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-12"
        >
          <div className="max-w-xl">
            <motion.div variants={fadeInUp}>
              <SectionRibbon variant="dark">Membership</SectionRibbon>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
              Join in minutes. Use it for life on the road.
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-lg leading-relaxed text-white/75">
              Registration is free. We email your account number so you can sign in anytime from any device.
            </motion.p>
            <motion.ul variants={fadeInUp} className="mt-8 space-y-3">
              {benefits.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/90">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-purple-300" aria-hidden />
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex shrink-0 flex-col gap-3 lg:mt-0"
            whileHover={reduceMotion ? {} : { scale: 1.02 }}
          >
            <Link
              href="/register"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 text-sm font-semibold text-navy-900 transition-colors hover:bg-purple-50"
            >
              Create your account
            </Link>
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 px-8 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Already a member? Sign in
            </Link>
            <Link href="/recover" className="text-center text-sm text-purple-200 hover:text-white">
              Forgot account number or password?
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
