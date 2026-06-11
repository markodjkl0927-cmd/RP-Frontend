import { LegalDocument } from '@/components/legal/LegalDocument';
import { COOKIE_POLICY } from '@/lib/legal-content';

export default function CookiesPage() {
  return <LegalDocument document={COOKIE_POLICY} />;
}
