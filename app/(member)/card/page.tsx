'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import RpCardVisual from '@/components/RpCardVisual';
import { PageHeader } from '@/components/ui/PageHeader';
import { Alert } from '@/components/ui/Alert';

export default function CardPage() {
  const [card, setCard] = useState<{
    holderName: string;
    accountNumberDisplay: string;
    lastFour: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .get('/rp/member/card')
      .then((res) => setCard(res.data.card))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader
        title="R&P Card"
        description="Your membership card for R&P Global Energies. Stripe-powered physical and virtual cards will be available in a future release."
      />
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold-400 border-t-transparent" />
        </div>
      ) : error || !card ? (
        <Alert>Unable to load your card. Please try again later.</Alert>
      ) : (
        <>
          <RpCardVisual
            holderName={card.holderName}
            accountNumberDisplay={card.accountNumberDisplay}
            lastFour={card.lastFour}
          />
          <div className="panel mt-8 p-5">
            <p className="text-sm text-navy-600">
              <span className="font-semibold text-navy-900">Status:</span> Active member · Digital card
            </p>
          </div>
        </>
      )}
    </div>
  );
}
