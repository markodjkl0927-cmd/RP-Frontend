'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Fuel } from 'lucide-react';

export function LandingHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-110 blur-0 sm:blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/80 via-violet-900/70 to-navy-950/85" />
        <div className="absolute inset-0 bg-purple-600/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(196,181,253,0.2),transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-200 backdrop-blur-sm">
            <Fuel className="h-3.5 w-3.5" aria-hidden />
            Petroleum marketing · US fuel network
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Energy solutions built for{' '}
            <span className="bg-gradient-to-r from-purple-200 via-white to-purple-200 bg-clip-text text-transparent">
              members who deserve the best
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
            R&P Global Energies connects drivers, businesses, and partners through a trusted fuel network,
            digital membership, and growth programs across the United States.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-navy-900 shadow-lg transition-all hover:bg-purple-50 hover:shadow-xl"
            >
              Create member account
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Member sign in
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
