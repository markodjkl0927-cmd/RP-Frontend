'use client';

import { useEffect, useState } from 'react';

import MemberShell from '@/components/MemberShell';
import PublicShell from '@/components/PublicShell';
import { useRpAuthStore } from '@/lib/store';

export default function AdaptivePortalShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useRpAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const isMember = ready && isAuthenticated && user?.role === 'RP_MEMBER';

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-muted">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  if (isMember) {
    return <MemberShell>{children}</MemberShell>;
  }

  return <PublicShell>{children}</PublicShell>;
}
