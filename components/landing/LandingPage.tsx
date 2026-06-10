'use client';

import { LandingHeader } from './LandingHeader';
import { LandingHero } from './LandingHero';
import { LandingAbout } from './LandingAbout';
import { LandingPrograms } from './LandingPrograms';
import { LandingMembership } from './LandingMembership';
import { LandingFooter } from './LandingFooter';

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingAbout />
        <LandingPrograms />
        <LandingMembership />
      </main>
      <LandingFooter />
    </div>
  );
}
