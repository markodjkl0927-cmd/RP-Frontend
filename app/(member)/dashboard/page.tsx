'use client';

import { CreditCard, Handshake, MapPin, Briefcase } from 'lucide-react';
import { useRpAuthStore } from '@/lib/store';
import { FeatureTile } from '@/components/FeatureTile';

export default function DashboardPage() {
  const user = useRpAuthStore((s) => s.user);
  const acct = user?.accountNumber;
  const display = acct ? `${acct.slice(0, 3)} ${acct.slice(3, 6)} ${acct.slice(6)}` : '';

  return (
    <div>
      <div className="relative mb-10 overflow-hidden rounded-2xl bg-hero-gradient p-8 text-white shadow-card sm:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.25),transparent_50%)]" />
        <div className="relative">
          <p className="text-sm font-medium text-purple-300">Member portal</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Hello, {user?.firstName}
          </h1>
          <p className="mt-3 max-w-lg text-base text-navy-200">
            Manage your R&P card, find fuel stations, and access partnership and career programs.
          </p>
          {display ? (
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 backdrop-blur-sm">
              <span className="text-xs uppercase tracking-wider text-navy-300">Account</span>
              <span className="font-mono text-sm font-semibold text-purple-300">{display}</span>
            </div>
          ) : null}
        </div>
      </div>

      <h2 className="mb-4 font-display text-lg font-semibold text-navy-800">Quick access</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <FeatureTile
          href="/card"
          title="R&P Card"
          description="View your digital member card. Physical and virtual programs coming soon."
          icon={CreditCard}
        />
        <FeatureTile
          href="/locator"
          title="Station locator"
          description="Browse R&P fuel locations by state and city across the United States."
          icon={MapPin}
          accent="navy"
        />
        <FeatureTile
          href="/dealership"
          title="Dealership program"
          description="Apply to become part of the R&P dealership network."
          icon={Handshake}
        />
        <FeatureTile
          href="/careers"
          title="Join our team"
          description="Explore open roles and submit your application online."
          icon={Briefcase}
          accent="navy"
        />
      </div>
    </div>
  );
}
