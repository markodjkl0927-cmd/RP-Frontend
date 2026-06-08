'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Sparkles } from 'lucide-react';
import Image from 'next/image';

import { AnimatedMeshBackground } from './AnimatedMeshBackground';
import { heroLine } from '@/lib/motion';

type Props = {
  firstName?: string;
  accountDisplay?: string;
};

const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

export function DashboardHero({ firstName, accountDisplay }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative mb-10 overflow-hidden rounded-2xl shadow-card"
    >
      <AnimatedMeshBackground />

      <div className="relative flex flex-col gap-8 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
        <motion.div variants={heroContainer} initial="hidden" animate="visible" className="max-w-xl">
          <motion.div
            variants={heroLine}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-100 backdrop-blur-md"
          >
            <motion.span
              animate={reduceMotion ? {} : { rotate: [0, 8, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="h-3.5 w-3.5 text-purple-200" />
            </motion.span>
            Member portal
          </motion.div>

          <motion.h1
            variants={heroLine}
            className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
          >
            Welcome back,{' '}
            <span className="bg-gradient-to-r from-white via-purple-100 to-violet-200 bg-clip-text text-transparent">
              {firstName || 'Member'}
            </span>
          </motion.h1>

          <motion.p variants={heroLine} className="mt-4 max-w-lg text-base leading-relaxed text-purple-100/90">
            Manage your R&P card, find fuel stations, and access partnership and career programs — all in one place.
          </motion.p>

          <motion.div variants={heroLine} className="mt-6 flex flex-wrap gap-3">
            {accountDisplay ? (
              <motion.div
                whileHover={reduceMotion ? {} : { scale: 1.03, y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className="glass-panel inline-flex items-center gap-3 px-4 py-2.5"
              >
                <span className="text-[10px] font-semibold uppercase tracking-widest text-purple-200">Account</span>
                <span className="font-mono text-sm font-semibold tracking-wide text-white">{accountDisplay}</span>
              </motion.div>
            ) : null}
            <motion.div
              whileHover={reduceMotion ? {} : { scale: 1.03, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="glass-panel inline-flex items-center gap-2 px-4 py-2.5"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              <span className="text-sm font-medium text-white/90">Active member</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.35 }}
          className="hidden shrink-0 lg:block"
        >
          <motion.div
            whileHover={reduceMotion ? {} : { y: -4, rotateY: 4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="glass-panel relative p-5"
            style={{ transformPerspective: 800 }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/15 to-transparent" aria-hidden />
            <motion.div
              animate={reduceMotion ? {} : { y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
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
            <p className="relative mt-3 text-center text-xs italic text-purple-200/80">You deserve the best</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
