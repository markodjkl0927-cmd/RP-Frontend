'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase, CreditCard, Handshake, MapPin, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { fadeInUp, gridStagger, scrollReveal, viewportOnce } from '@/lib/motion';
import { SectionRibbon } from './SectionRibbon';

type Program = {
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
  href: string;
  cta: string;
};

const programs: Program[] = [
  {
    icon: CreditCard,
    title: 'R&P Member Card',
    description: 'Digital membership with your account number and cardholder details — ready when you need them.',
    tag: 'Membership',
    href: '/register',
    cta: 'Become a member',
  },
  {
    icon: MapPin,
    title: 'Station Locator',
    description: 'Browse R&P fuel locations across the United States by state and city.',
    tag: 'Network',
    href: '/login',
    cta: 'Sign in to explore',
  },
  {
    icon: Handshake,
    title: 'Dealership Program',
    description: 'Apply to partner with R&P Global Energies and join our growing dealership network.',
    tag: 'Partnership',
    href: '/login',
    cta: 'Apply as a member',
  },
  {
    icon: Briefcase,
    title: 'Careers at R&P',
    description: 'Discover open positions and apply online with your resume.',
    tag: 'Careers',
    href: '/login',
    cta: 'View careers',
  },
];

export function LandingPrograms() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="programs" className="scroll-mt-20 bg-surface-muted py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-2xl"
        >
          <motion.div variants={fadeInUp}>
            <SectionRibbon>What we offer</SectionRibbon>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="mt-4 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            Programs in one member portal
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-lg text-navy-500">
            Create a free account to access your digital card, find stations, apply for dealership partnership, and
            explore careers.
          </motion.p>
        </motion.div>

        <motion.div
          variants={gridStagger}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-5 sm:grid-cols-2"
        >
          {programs.map((program) => (
            <motion.div
              key={program.title}
              variants={fadeInUp}
              className="group flex flex-col rounded-md border border-surface-border bg-white p-6 transition-shadow hover:shadow-card-hover"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-purple-600">{program.tag}</span>
              <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                <program.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-navy-900">{program.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-500">{program.description}</p>
              <Link
                href={program.href}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-purple-600 transition-colors group-hover:text-purple-500"
              >
                {program.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
