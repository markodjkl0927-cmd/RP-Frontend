'use client';

import Image from 'next/image';
import { Wifi } from 'lucide-react';
import clsx from 'clsx';

type Props = {
  holderName: string;
  accountNumberDisplay: string;
  lastFour: string;
  status?: string;
  elevated?: boolean;
};

export default function RpCardVisual({
  holderName,
  accountNumberDisplay,
  lastFour,
  status = 'ACTIVE',
  elevated = false,
}: Props) {
  const isActive = status.toUpperCase() === 'ACTIVE';

  return (
    <div className="relative mx-auto w-full max-w-[400px]">
      <div
        className={clsx(
          'absolute -inset-4 rounded-[2rem] blur-2xl',
          elevated ? 'bg-navy-900/8' : 'bg-purple-500/15'
        )}
        aria-hidden
      />

      <div
        className={clsx(
          'relative aspect-[1.586/1] overflow-hidden rounded-2xl text-white',
          elevated
            ? 'shadow-[0_28px_56px_-16px_rgba(16,42,67,0.28),0_12px_24px_-8px_rgba(76,29,149,0.2)]'
            : 'shadow-[0_20px_50px_rgba(46,16,101,0.35)]'
        )}
        style={{
          background:
            'linear-gradient(145deg, #1e0a3c 0%, #4c1d95 38%, #6d28d9 72%, #5b21b6 100%)',
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(196,181,253,0.35),transparent_50%)]" />
        <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-10 h-52 w-52 rounded-full bg-purple-400/10" />

        <div className="relative flex h-full flex-col justify-between p-6 sm:p-7">
          <div className="flex items-start justify-between gap-3">
            <div className="rounded-lg bg-white/95 px-2.5 py-1.5">
              <Image
                src="/images/rp-global-logo.png"
                alt="R&P Global Energies"
                width={120}
                height={38}
                className="h-6 w-auto object-contain"
              />
            </div>
            <div className="flex items-center gap-2">
              {isActive ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-purple-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Active
                </span>
              ) : null}
              <Wifi className="h-5 w-5 rotate-90 text-purple-200/80" strokeWidth={1.75} aria-hidden />
            </div>
          </div>

          <div className="flex w-full items-center justify-between gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-200/90">Member card</p>
            <div
              className="h-9 w-11 shrink-0 rounded-md bg-gradient-to-br from-amber-200/90 via-amber-300/80 to-amber-400/70 shadow-inner"
              aria-hidden
            />
          </div>

          <div>
            <p className="mb-1.5 text-[10px] uppercase tracking-wider text-purple-200/80">Account number</p>
            <p className="font-mono text-xl tracking-[0.12em] sm:text-2xl">{accountNumberDisplay}</p>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-purple-200/80">Cardholder</p>
              <p className="truncate text-sm font-semibold tracking-wide">{holderName}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-purple-200/80">Member ID</p>
              <p className="font-mono text-sm">•••• {lastFour}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
