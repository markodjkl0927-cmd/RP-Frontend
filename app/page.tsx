import type { Metadata } from 'next';
import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = {
  title: 'R&P Global Energies — Petroleum Marketing & Member Portal',
  description:
    'R&P Global Energies delivers fuel solutions, digital membership, station locator, dealership programs, and careers across the United States.',
};

export default function Home() {
  return <LandingPage />;
}
