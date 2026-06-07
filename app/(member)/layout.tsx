'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MemberShell from '@/components/MemberShell';
import { useRpAuthStore } from '@/lib/store';

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, user } = useRpAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!isAuthenticated || user?.role !== 'RP_MEMBER') {
      router.replace('/login');
    }
  }, [ready, isAuthenticated, user, router]);

  if (!ready || !isAuthenticated || user?.role !== 'RP_MEMBER') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  return <MemberShell>{children}</MemberShell>;
}
