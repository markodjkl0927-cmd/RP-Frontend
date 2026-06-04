import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function DealershipSuccessPage() {
  return (
    <div className="mx-auto max-w-lg py-12 text-center">
      <div className="panel p-10">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-9 w-9 text-emerald-600" />
        </div>
        <h1 className="font-display text-2xl font-bold text-navy-900">Application submitted</h1>
        <p className="mt-3 text-sm leading-relaxed text-navy-500">
          Thank you. Our team will review your dealership application and contact you soon.
        </p>
        <Link href="/dashboard" className="mt-8 inline-block">
          <Button>Back to dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
