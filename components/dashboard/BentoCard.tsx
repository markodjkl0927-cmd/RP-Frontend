'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, LucideIcon } from 'lucide-react';
import clsx from 'clsx';

import { riseSpring } from '@/lib/motion';

type BentoCardProps = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  size?: 'hero' | 'default' | 'compact';
  className?: string;
  children?: React.ReactNode;
};

export function BentoCard({
  href,
  title,
  description,
  icon: Icon,
  size = 'default',
  className,
  children,
}: BentoCardProps) {
  const reduceMotion = useReducedMotion();
  const isHero = size === 'hero';

  return (
    <motion.div variants={riseSpring} className={clsx('min-h-0', className)}>
      <Link
        href={href}
        className={clsx(
          'group relative flex h-full flex-col overflow-hidden border border-surface-border bg-white transition-colors duration-200',
          'hover:border-purple-200 hover:bg-purple-50/30',
          isHero ? 'rounded-xl p-7 sm:p-8' : size === 'compact' ? 'rounded-lg p-4' : 'rounded-lg p-5 sm:p-6'
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div
            className={clsx(
              'flex shrink-0 items-center justify-center rounded-lg text-purple-600 ring-1 ring-purple-100',
              isHero ? 'h-12 w-12 bg-purple-100' : 'h-10 w-10 bg-purple-50'
            )}
          >
            <Icon className={isHero ? 'h-6 w-6' : 'h-5 w-5'} strokeWidth={1.75} />
          </div>
          <motion.span
            className="flex h-8 w-8 items-center justify-center rounded-full border border-surface-border text-navy-400 transition-colors group-hover:border-purple-200 group-hover:bg-white group-hover:text-purple-600"
            whileHover={reduceMotion ? {} : { scale: 1.05 }}
          >
            <ArrowUpRight className="h-4 w-4" />
          </motion.span>
        </div>

        <div className={clsx('relative mt-4 flex flex-1 flex-col', isHero && 'sm:mt-6')}>
          <h3
            className={clsx(
              'font-display font-semibold tracking-tight text-navy-900',
              isHero ? 'text-xl sm:text-2xl' : size === 'compact' ? 'text-sm' : 'text-base'
            )}
          >
            {title}
          </h3>
          <p
            className={clsx(
              'mt-1.5 leading-relaxed text-navy-500',
              isHero ? 'max-w-md text-sm sm:text-base' : 'text-sm',
              size === 'compact' && 'text-xs'
            )}
          >
            {description}
          </p>
          {children}
        </div>

        {isHero ? (
          <div
            className="pointer-events-none absolute -bottom-16 -right-12 h-48 w-48 rounded-full bg-purple-200/40 blur-3xl transition-opacity group-hover:opacity-80"
            aria-hidden
          />
        ) : null}
      </Link>
    </motion.div>
  );
}
