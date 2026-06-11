'use client';

import { Clock, Handshake, Network, TrendingUp } from 'lucide-react';

import { DealershipStepNav } from './DealershipStepNav';

const benefits = [
  {
    icon: Network,
    title: 'R&P fuel network',
    text: 'Connect with a trusted petroleum marketing brand and member referral pipeline.',
  },
  {
    icon: TrendingUp,
    title: 'Grow your business',
    text: 'Expand reach through partnership programs designed for fuel and fleet operators.',
  },
  {
    icon: Handshake,
    title: 'Dedicated review',
    text: 'Our team reviews each application and follows up with qualified partners.',
  },
];

export function DealershipProgramPanel({ currentStep }: { currentStep: number }) {
  return (
    <div className="rounded-md border border-surface-border bg-white p-5 lg:sticky lg:top-20">
      <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">Partnership</p>
      <h2 className="mt-1 font-display text-lg font-semibold text-navy-900">Dealership program</h2>
      <p className="mt-2 text-sm leading-relaxed text-navy-500">
        Apply to join the R&P Global Energies dealership network. Complete all four steps — most applications
        take under 10 minutes.
      </p>

      <div className="mt-6 lg:hidden">
        <DealershipStepNav current={currentStep} />
      </div>

      <ul className="mt-6 hidden space-y-4 lg:block">
        {benefits.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-purple-50 text-purple-600">
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-sm font-semibold text-navy-900">{title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-navy-500">{text}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 hidden lg:block">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-navy-500">Application steps</p>
        <DealershipStepNav current={currentStep} />
      </div>

      <div className="mt-6 flex items-start gap-2 rounded-md border border-surface-border bg-surface-muted px-3 py-3">
        <Clock className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" />
        <p className="text-xs leading-relaxed text-navy-500">
          Typical review time is 5–10 business days. You will be contacted at the email provided in step 1.
        </p>
      </div>
    </div>
  );
}
