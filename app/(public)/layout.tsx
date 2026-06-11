import AdaptivePortalShell from '@/components/AdaptivePortalShell';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <AdaptivePortalShell>{children}</AdaptivePortalShell>;
}
