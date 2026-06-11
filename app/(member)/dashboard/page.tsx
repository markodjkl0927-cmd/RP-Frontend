'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase, ClipboardList, CreditCard, Fuel, Globe, Handshake, MapPin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import api from '@/lib/api';
import { useRpAuthStore } from '@/lib/store';
import { Alert } from '@/components/ui/Alert';
import { DashboardWelcomeBanner } from '@/components/dashboard/DashboardWelcomeBanner';
import { DashboardMetricCard } from '@/components/dashboard/DashboardMetricCard';
import { DashboardMembershipWidget } from '@/components/dashboard/DashboardMembershipWidget';
import { DashboardQuickActions } from '@/components/dashboard/DashboardQuickActions';
import { DashboardServiceCard } from '@/components/dashboard/DashboardServiceCard';
import {
  fadeInUp,
  gridStagger,
  pageStagger,
  riseSpring,
  scrollReveal,
  viewportOnce,
} from '@/lib/motion';

function formatAccountNumber(value: string) {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 10) return value;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

const services = [
  {
    href: '/card',
    title: 'R&P Member Card',
    description:
      'View and share your digital membership card. Your account number and cardholder details in one secure place.',
    icon: CreditCard,
    tag: 'Membership',
  },
  {
    href: '/locator',
    title: 'Station Locator',
    description: 'Browse R&P fuel locations across the United States by state and city.',
    icon: MapPin,
    tag: 'Network',
  },
  {
    href: '/dealership',
    title: 'Dealership Program',
    description: 'Apply to partner with R&P Global Energies and join our growing dealership network.',
    icon: Handshake,
    tag: 'Partnership',
  },
  {
    href: '/careers',
    title: 'Careers at R&P',
    description: 'Discover open positions, upload your resume, and apply to join our team.',
    icon: Briefcase,
    tag: 'Careers',
  },
  {
    href: '/applications',
    title: 'Application tracking',
    description: 'See the status of your dealership and career submissions in one place.',
    icon: ClipboardList,
    tag: 'Status',
  },
];

type MemberDashboardStats = {
  membership: { active: boolean; cardReady: boolean };
  fuelNetwork: { activeStations: number; states: number };
  programs: { openCareerJobs: number; dealershipOpen: boolean; openTotal: number };
  applications: { total: number; active: number; dealership: number; career: number };
};

function buildMetrics(stats: MemberDashboardStats): {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  href: string;
}[] {
  const programHint = [
    stats.programs.openCareerJobs > 0
      ? `${stats.programs.openCareerJobs} career role${stats.programs.openCareerJobs === 1 ? '' : 's'}`
      : 'No career roles open',
    stats.programs.dealershipOpen ? 'dealership open' : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return [
    {
      label: 'Digital card',
      value: stats.membership.active ? 'Active' : 'Inactive',
      hint: stats.membership.cardReady ? 'Ready to view' : 'Setting up your card',
      icon: CreditCard,
      href: '/card',
    },
    {
      label: 'Fuel network',
      value: String(stats.fuelNetwork.activeStations),
      hint: `${stats.fuelNetwork.states} state${stats.fuelNetwork.states === 1 ? '' : 's'} in the locator`,
      icon: Fuel,
      href: '/locator',
    },
    {
      label: 'Open programs',
      value: String(stats.programs.openTotal),
      hint: programHint,
      icon: Globe,
      href: '/careers',
    },
    {
      label: 'My applications',
      value: String(stats.applications.active),
      hint:
        stats.applications.total > 0
          ? `${stats.applications.total} submitted · ${stats.applications.active} in progress`
          : 'No submissions yet',
      icon: ClipboardList,
      href: '/applications',
    },
  ];
}

const quickActions = [
  {
    href: '/card',
    label: 'Open member card',
    description: 'Full-screen digital card view',
    icon: CreditCard,
    step: 1,
  },
  {
    href: '/locator',
    label: 'Find a station',
    description: 'Search by state and city',
    icon: MapPin,
    step: 2,
  },
  {
    href: '/dealership',
    label: 'Apply for dealership',
    description: 'Multi-step partnership form',
    icon: Handshake,
    step: 3,
  },
  {
    href: '/careers',
    label: 'Browse careers',
    description: 'View jobs and submit applications',
    icon: Briefcase,
    step: 4,
  },
  {
    href: '/applications',
    label: 'Track applications',
    description: 'Dealership and career status',
    icon: ClipboardList,
    step: 5,
  },
];

export default function DashboardPage() {
  const user = useRpAuthStore((s) => s.user);
  const [stats, setStats] = useState<MemberDashboardStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState('');
  const acct = user?.accountNumber || '';
  const display = acct ? formatAccountNumber(acct) : '';
  const lastFour = acct.slice(-4);
  const holderName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim().toUpperCase() || 'MEMBER';
  const reduceMotion = useReducedMotion();
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    api
      .get('/rp/member/dashboard/stats')
      .then((res) => setStats(res.data.stats))
      .catch((err: unknown) => {
        const ex = err as { response?: { data?: { error?: string } } };
        setStatsError(ex.response?.data?.error || 'Failed to load dashboard metrics');
      })
      .finally(() => setStatsLoading(false));
  }, []);

  const metrics = useMemo(() => (stats ? buildMetrics(stats) : []), [stats]);

  return (
    <>
      <div className="relative left-1/2 -mt-8 w-screen max-w-[100vw] -translate-x-1/2">
        <DashboardWelcomeBanner
          greeting={getGreeting()}
          firstName={user?.firstName}
          today={today}
          accountDisplay={display}
        />
      </div>

      <motion.div className="space-y-8 pb-6 pt-8">
        {statsError ? (
          <Alert>{statsError}</Alert>
        ) : null}

        <motion.div
          variants={pageStagger}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
        >
          {statsLoading ? (
            <div className="flex min-h-[8rem] items-center justify-center rounded-md border border-surface-border bg-white">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
            </div>
          ) : (
            <motion.div variants={gridStagger} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => (
                <Link key={metric.label} href={metric.href} className="block transition-opacity hover:opacity-95">
                  <DashboardMetricCard
                    icon={metric.icon}
                    label={metric.label}
                    value={metric.value}
                    hint={metric.hint}
                  />
                </Link>
              ))}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={gridStagger} className="grid gap-6 xl:grid-cols-3">
            <motion.div variants={riseSpring} className="xl:col-span-2">
              {display ? (
                <DashboardMembershipWidget
                  holderName={holderName}
                  accountDisplay={display}
                  lastFour={lastFour}
                  email={user?.email}
                  phone={user?.phone}
                />
              ) : (
                <div className="rounded-md border border-surface-border bg-white p-8 text-center text-sm text-navy-500">
                  Loading membership details…
                </div>
              )}
            </motion.div>
            <motion.div variants={riseSpring}>
              <DashboardQuickActions actions={quickActions} />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.section
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={fadeInUp} className="mb-5">
            <h2 className="font-display text-xl font-semibold text-navy-900">Explore services</h2>
            <p className="mt-1 text-sm text-navy-500">Everything included in your R&P member portal</p>
          </motion.div>
          <motion.div variants={gridStagger} className="grid gap-5 sm:grid-cols-2">
            {services.map((service) => (
              <DashboardServiceCard key={service.href} {...service} />
            ))}
          </motion.div>
        </motion.section>

        <motion.div
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          whileHover={reduceMotion ? {} : { y: -4, scale: 1.005 }}
          transition={{ type: 'spring', stiffness: 360, damping: 26 }}
          className="flex flex-col gap-4 rounded-md border border-surface-border bg-white px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8"
        >
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">Partnership opportunity</p>
            <h3 className="mt-2 font-display text-xl font-bold text-navy-900">
              Grow your business with R&P Global Energies
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-500">
              Join our dealership network and connect with a trusted name in petroleum marketing and energy
              solutions.
            </p>
          </div>
          <motion.div whileHover={reduceMotion ? {} : { scale: 1.04 }} whileTap={reduceMotion ? {} : { scale: 0.97 }}>
            <Link
              href="/dealership"
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
            >
              Start application
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
