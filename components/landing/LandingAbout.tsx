'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Globe, ShieldCheck, TrendingUp } from 'lucide-react';
import { fadeInUp, gridStagger, scrollReveal, viewportOnce } from '@/lib/motion';
import { SectionRibbon } from './SectionRibbon';

const pillars = [
  {
    icon: Globe,
    title: 'Nationwide reach',
    text: 'A growing US fuel network with stations members can find by state and city — built for convenience on the road.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted partnership',
    text: 'We work with members, dealerships, and operators who value reliability, transparency, and long-term relationships.',
  },
  {
    icon: TrendingUp,
    title: 'Room to grow',
    text: 'From digital membership to dealership and career programs, R&P supports people and businesses at every stage.',
  },
];

export function LandingAbout() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div variants={fadeInUp}>
              <SectionRibbon>Our purpose</SectionRibbon>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="mt-4 font-display text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl"
            >
              Petroleum marketing with a member-first mindset
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-lg leading-relaxed text-navy-500">
              R&P Global Energies delivers fuel solutions and member services that put people first. Whether you are
              fueling up, growing a dealership, or building a career with us — you get a clear path forward through one
              portal.
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative overflow-hidden"
          >
            <div className="relative overflow-hidden rounded-2xl border border-surface-border shadow-card">
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                <Image
                  src="/images/about-energy.png"
                  alt="Industrial energy operations with real-time performance analytics"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-violet-600/10" />
              </div>
            </div>
            <div
              className="pointer-events-none absolute bottom-2 right-2 -z-10 h-[calc(100%-0.5rem)] w-[calc(100%-0.5rem)] rounded-2xl bg-purple-100/60"
              aria-hidden
            />
          </motion.div>
        </div>

        <motion.div
          variants={gridStagger}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 sm:grid-cols-3"
        >
          {pillars.map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              variants={fadeInUp}
              className="rounded-md border border-surface-border bg-surface-muted p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-500">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
