'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { PageHeader } from '@/components/ui/PageHeader';
import { StepProgress } from '@/components/ui/StepProgress';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';

type FieldDef = {
  key: string;
  label: string;
  required: boolean;
  type?: 'email' | 'textarea' | 'checkbox';
};

const STEP1: FieldDef[] = [
  { key: 'companyName', label: 'Company / dealership name', required: true },
  { key: 'contactName', label: 'Primary contact name', required: true },
  { key: 'contactEmail', label: 'Contact email', type: 'email', required: true },
  { key: 'contactPhone', label: 'Contact phone', required: true },
];

const STEP2: FieldDef[] = [
  { key: 'businessAddress', label: 'Business address', required: true },
  { key: 'city', label: 'City', required: true },
  { key: 'state', label: 'State', required: true },
  { key: 'yearsInBusiness', label: 'Years in business', required: true },
  { key: 'dealershipType', label: 'Dealership type (e.g. fuel, auto, fleet)', required: true },
];

const STEP3: FieldDef[] = [
  { key: 'monthlyVolume', label: 'Estimated monthly fuel volume', required: false },
  { key: 'additionalInfo', label: 'Tell us about your business', type: 'textarea', required: false },
  { key: 'agreeTerms', label: 'I agree to be contacted about the R&P dealership program', type: 'checkbox', required: true },
];

export default function DealershipPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fields = step === 1 ? STEP1 : step === 2 ? STEP2 : STEP3;

  const setField = (key: string, value: string | boolean) => {
    setAnswers((a) => ({ ...a, [key]: value }));
  };

  const validateStep = () => {
    for (const f of fields) {
      if (f.required && f.type === 'checkbox') {
        if (!answers[f.key]) {
          setError('Please accept the terms to continue.');
          return false;
        }
      } else if (f.required && !String(answers[f.key] || '').trim()) {
        setError(`${f.label} is required`);
        return false;
      }
    }
    setError('');
    return true;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < 3) setStep(step + 1);
    else submit();
  };

  const submit = async () => {
    if (!validateStep()) return;
    setLoading(true);
    try {
      await api.post('/rp/dealership/apply', { answers });
      router.push('/dealership/success');
    } catch (err: unknown) {
      const e = err as { response?: { data?: { error?: string } } };
      setError(e.response?.data?.error || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Dealership program"
        description="Apply to join the R&P Global Energies dealership network. This form uses placeholder questions until your final questionnaire is provided."
      />
      <StepProgress current={step} total={3} />
      {error ? (
        <div className="mb-4">
          <Alert>{error}</Alert>
        </div>
      ) : null}
      <div className="panel space-y-4 p-6 sm:p-8">
        {fields.map((f) =>
          f.type === 'checkbox' ? (
            <label key={f.key} className="flex items-start gap-3 text-sm text-navy-700">
              <input
                type="checkbox"
                checked={!!answers[f.key]}
                onChange={(e) => setField(f.key, e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-navy-300 text-purple-600 focus:ring-purple-400"
              />
              {f.label}
            </label>
          ) : f.type === 'textarea' ? (
            <div key={f.key}>
              <label className="mb-1.5 block text-sm font-medium text-navy-700">{f.label}</label>
              <textarea
                rows={4}
                value={String(answers[f.key] || '')}
                onChange={(e) => setField(f.key, e.target.value)}
                className="input-field min-h-[100px] py-3"
              />
            </div>
          ) : (
            <Input
              key={f.key}
              label={f.label}
              type={f.type || 'text'}
              value={String(answers[f.key] || '')}
              onChange={(e) => setField(f.key, e.target.value)}
            />
          )
        )}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {step > 1 ? (
          <Button type="button" variant="secondary" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        ) : null}
        <Button type="button" onClick={next} loading={loading}>
          {step === 3 ? 'Submit application' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
