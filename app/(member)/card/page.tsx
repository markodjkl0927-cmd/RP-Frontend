'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Copy,
  CreditCard,
  MapPin,
  ShieldCheck,
  Smartphone,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';
import { CardDetailTile } from '@/components/card/CardDetailTile';
import { CardStagePanel } from '@/components/card/CardStagePanel';
import { Alert } from '@/components/ui/Alert';

type CardData = {
  holderName: string;
  accountNumber: string;
  accountNumberDisplay: string;
  lastFour: string;
  brand: string;
  type: string;
  status: string;
};

export default function CardPage() {
  const [card, setCard] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    api
      .get('/rp/member/card')
      .then((res) => setCard(res.data.card))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const copyAccount = async () => {
    if (!card) return;
    try {
      await navigator.clipboard.writeText(card.accountNumber);
      setCopiedAll(true);
      window.setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  if (error || !card) {
    return <Alert>Unable to load your card. Please try again later.</Alert>;
  }

  const statusLabel = card.status === 'ACTIVE' ? 'Active' : card.status;
  const typeLabel = card.type === 'MEMBER' ? 'Digital membership' : card.type;

  return (
    <div className="relative left-1/2 -mt-8 w-screen max-w-[100vw] -translate-x-1/2">
      <div className="grid lg:grid-cols-[minmax(280px,380px)_1fr] lg:gap-0 xl:grid-cols-[minmax(320px,420px)_1fr]">
        <CardStagePanel
          holderName={card.holderName}
          accountNumberDisplay={card.accountNumberDisplay}
          lastFour={card.lastFour}
          status={card.status}
        />

        {/* Right — details & actions (Chase dashboard panel style) */}
        <div className="bg-surface-muted px-4 py-8 sm:px-6 lg:px-10 lg:py-10 xl:px-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">Membership</p>
                <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
                  R&P Member Card
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy-500">
                  Manage your digital membership credentials, copy your account number, and prepare for wallet
                  integration when Stripe Issuing launches.
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {statusLabel}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={copyAccount}
                className="inline-flex items-center gap-2 rounded-md bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
              >
                <Copy className="h-4 w-4" />
                {copiedAll ? 'Account copied' : 'Copy account number'}
              </button>
              <button
                type="button"
                disabled
                title="Coming in a future release"
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-dashed border-surface-border bg-white px-4 py-2.5 text-sm font-semibold text-navy-400"
              >
                <Wallet className="h-4 w-4" />
                Add to Apple / Google Wallet
              </button>
              <Link
                href="/locator"
                className="inline-flex items-center gap-2 rounded-md border border-surface-border bg-white px-4 py-2.5 text-sm font-semibold text-navy-700 transition-colors hover:border-purple-200 hover:bg-purple-50"
              >
                <MapPin className="h-4 w-4 text-purple-600" />
                Find stations
              </Link>
            </div>

            <section className="mt-10">
              <h2 className="mb-4 text-sm font-semibold text-navy-900">Card information</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <CardDetailTile
                  label="Account number"
                  value={card.accountNumberDisplay}
                  mono
                  copyValue={card.accountNumber}
                  highlight
                />
                <CardDetailTile label="Cardholder name" value={card.holderName} copyValue={card.holderName} />
                <CardDetailTile label="Member ID" value={`•••• ${card.lastFour}`} mono />
                <CardDetailTile label="Card type" value={typeLabel} />
                <CardDetailTile label="Issued by" value={card.brand} />
                <CardDetailTile label="Status" value={statusLabel} />
              </div>
            </section>

            <section className="mt-10">
              <h2 className="mb-4 text-sm font-semibold text-navy-900">How to use your card</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-md border border-surface-border bg-white p-5">
                  <ShieldCheck className="h-5 w-5 text-purple-600" strokeWidth={1.75} />
                  <p className="mt-3 text-sm font-semibold text-navy-900">Member-only access</p>
                  <p className="mt-1 text-xs leading-relaxed text-navy-500">
                    Your card details are visible only while you are signed in to the portal.
                  </p>
                </div>
                <div className="rounded-md border border-surface-border bg-white p-5">
                  <CreditCard className="h-5 w-5 text-purple-600" strokeWidth={1.75} />
                  <p className="mt-3 text-sm font-semibold text-navy-900">Show in person</p>
                  <p className="mt-1 text-xs leading-relaxed text-navy-500">
                    Display your digital card or share your formatted account number at partner stations.
                  </p>
                </div>
                <div className="rounded-md border border-surface-border bg-white p-5">
                  <Smartphone className="h-5 w-5 text-purple-600" strokeWidth={1.75} />
                  <p className="mt-3 text-sm font-semibold text-navy-900">Wallet coming soon</p>
                  <p className="mt-1 text-xs leading-relaxed text-navy-500">
                    Apple Pay and Google Pay support via Stripe Issuing is on the roadmap.
                  </p>
                </div>
              </div>
            </section>

            <div className="mt-8">
              <Alert variant="info">
                This is a digital membership credential tied to your 10-digit account number. Physical and virtual
                payment cards through Stripe Issuing are planned for a future release.
              </Alert>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
