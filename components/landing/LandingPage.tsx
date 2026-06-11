'use client';

import { LandingHeader } from './LandingHeader';
import { LandingHero } from './LandingHero';
import { LandingAbout } from './LandingAbout';
import { LandingPrograms } from './LandingPrograms';
import { LandingMembership } from './LandingMembership';
import { LandingFooter } from './LandingFooter';

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <LandingHeader />
      <div className="flex flex-1 flex-col overflow-x-hidden">
        <main>
          <LandingHero />
          <LandingAbout />
          <LandingPrograms />
          <LandingMembership />
        </main>
        <LandingFooter />
      </div>
    </div>
  );
}
