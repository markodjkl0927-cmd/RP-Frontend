export function isPublicPortalPath(path: string) {
  return (
    path === '/' ||
    path.startsWith('/locator') ||
    path.startsWith('/careers') ||
    path.startsWith('/terms') ||
    path.startsWith('/privacy') ||
    path.startsWith('/cookies') ||
    path.startsWith('/login') ||
    path.startsWith('/register') ||
    path.startsWith('/recover') ||
    path.startsWith('/reset-password')
  );
}

export function safeNextPath(next: string | null | undefined, fallback = '/dashboard') {
  if (!next) return fallback;
  if (!next.startsWith('/') || next.startsWith('//')) return fallback;
  return next;
}
