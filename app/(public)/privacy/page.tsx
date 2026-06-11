import { LegalDocument } from '@/components/legal/LegalDocument';
import { PRIVACY_POLICY } from '@/lib/legal-content';

export default function PrivacyPage() {
  return <LegalDocument document={PRIVACY_POLICY} />;
}
