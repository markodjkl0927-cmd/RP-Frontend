import { LegalDocument } from '@/components/legal/LegalDocument';
import { TERMS_OF_SERVICE } from '@/lib/legal-content';

export default function TermsPage() {
  return <LegalDocument document={TERMS_OF_SERVICE} />;
}
