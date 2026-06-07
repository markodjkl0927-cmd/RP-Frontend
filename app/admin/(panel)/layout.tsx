'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRpAuthStore } from '@/lib/store';
import { AdminShell } from '@/components/AdminShell';

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isAuthenticated } = useRpAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  useEffect(() => {
    if (!ready) return;
    if (!isAuthenticated || user?.role !== 'RP_ADMIN') {
      router.replace('/admin/login');
    }
  }, [ready, isAuthenticated, user, router]);

  if (!ready || user?.role !== 'RP_ADMIN') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-muted">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  return <AdminShell>{children}</AdminShell>;
}
