'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CreditCard, MapPin, ShieldCheck, Sparkles } from 'lucide-react';

import { AnimatedMeshBackground } from '../AnimatedMeshBackground';
import { heroCta, heroLine } from '@/lib/motion';

type Props = {
  greeting: string;
  firstName?: string;
  today: string;
  accountDisplay?: string;
};

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const ctaContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export function DashboardWelcomeBanner({ greeting, firstName, today, accountDisplay }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full overflow-hidden"
    >
      <AnimatedMeshBackground />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <motion.div variants={heroContainer} initial="hidden" animate="visible" className="max-w-xl">
          <motion.div
            variants={heroLine}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-100 backdrop-blur-sm"
          >
            <motion.span
              animate={reduceMotion ? {} : { rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="h-3.5 w-3.5 text-purple-200" />
            </motion.span>
            {today}
          </motion.div>

          <motion.h1
            variants={heroLine}
            className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            {greeting},{' '}
            <motion.span
              variants={heroLine}
              className="inline-block bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent"
            >
              {firstName || 'Member'}
            </motion.span>
          </motion.h1>

          <motion.p variants={heroLine} className="mt-3 max-w-2xl text-sm leading-relaxed text-purple-100/90 sm:text-base">
            Welcome to your R&P Global Energies command center. Manage your membership card, discover fuel
            stations, grow with our dealership program, and explore career opportunities.
          </motion.p>

          <motion.div variants={heroLine} className="mt-6 flex flex-wrap items-center gap-3">
            {accountDisplay ? (
              <motion.div
                whileHover={reduceMotion ? {} : { scale: 1.04, y: -3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="glass-panel inline-flex items-center gap-3 px-4 py-2.5"
              >
                <span className="text-[10px] font-semibold uppercase tracking-widest text-purple-200">Account</span>
                <span className="font-mono text-sm font-semibold text-white">{accountDisplay}</span>
              </motion.div>
            ) : null}
            <motion.div
              whileHover={reduceMotion ? {} : { scale: 1.04, y: -3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="glass-panel inline-flex items-center gap-2 px-4 py-2.5 text-sm text-white/90"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              Active membership
            </motion.div>
          </motion.div>

          <motion.div variants={ctaContainer} className="mt-8 flex flex-wrap gap-3">
            <motion.div variants={heroCta}>
              <Link
                href="/card"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-purple-900 shadow-lg shadow-purple-900/20 transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <CreditCard className="h-4 w-4" />
                View my card
              </Link>
            </motion.div>
            <motion.div variants={heroCta}>
              <Link
                href="/locator"
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <MapPin className="h-4 w-4" />
                Find stations
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.82, x: 40, rotateY: -12 }}
          animate={{ opacity: 1, scale: 1, x: 0, rotateY: 0 }}
          transition={{ type: 'spring', stiffness: 160, damping: 20, delay: 0.55 }}
          className="hidden shrink-0 lg:block"
          style={{ transformPerspective: 1000 }}
        >
          <motion.div
            whileHover={reduceMotion ? {} : { y: -6, rotateY: 6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 280, damping: 18 }}
            className="glass-panel relative p-5"
            style={{ transformPerspective: 1000 }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/15 to-transparent" aria-hidden />
            <motion.div
              animate={reduceMotion ? {} : { y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src="/images/rp-global-logo.png"
                alt=""
                width={280}
                height={90}
                className="relative h-auto w-[220px] object-contain brightness-0 invert"
                aria-hidden
              />
            </motion.div>
            <motion.p
              animate={reduceMotion ? {} : { opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative mt-3 text-center text-xs italic text-purple-200/80"
            >
              You deserve the best
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
