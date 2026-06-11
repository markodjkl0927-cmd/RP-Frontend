'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import api from '@/lib/api';
import { DEALERSHIP_STEP_META } from '@/components/dealership/DealershipStepNav';
import { DealershipProgramPanel } from '@/components/dealership/DealershipProgramPanel';
import { DealershipReviewSummary } from '@/components/dealership/DealershipReviewSummary';
import {
  DEALERSHIP_QUESTIONNAIRE_STEPS,
  getDealershipFieldsForStep,
  validateDealershipStep,
  type DealershipFieldDef,
} from '@/lib/dealership-questionnaire';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';

const TOTAL_STEPS = DEALERSHIP_QUESTIONNAIRE_STEPS.length;

export default function DealershipPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const reduceMotion = useReducedMotion();

  const fields = getDealershipFieldsForStep(step);
  const stepMeta = DEALERSHIP_STEP_META[step - 1];
  const progress = Math.round((step / TOTAL_STEPS) * 100);

  const setField = (key: string, value: string | boolean) => {
    setAnswers((current) => ({ ...current, [key]: value }));
    if (error) setError('');
  };

  const next = () => {
    const validationError = validateDealershipStep(step, answers);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      return;
    }

    submit();
  };

  const submit = async () => {
    const validationError = validateDealershipStep(step, answers);
    if (validationError) {
      setError(validationError);
      return;
    }

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

  const renderField = (field: DealershipFieldDef) => {
    if (field.type === 'checkbox') {
      return (
        <label
          key={field.key}
          className="flex items-start gap-3 rounded-md border border-surface-border bg-surface-muted/50 p-4 text-sm text-navy-700 sm:col-span-2"
        >
          <input
            type="checkbox"
            checked={!!answers[field.key]}
            onChange={(e) => setField(field.key, e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-navy-300 text-purple-600 focus:ring-purple-400"
          />
          <span>{field.label}</span>
        </label>
      );
    }

    if (field.type === 'textarea') {
      return (
        <div key={field.key} className={field.half ? 'sm:col-span-1' : 'sm:col-span-2'}>
          <label className="mb-1.5 block text-sm font-medium text-navy-700">{field.label}</label>
          <textarea
            rows={4}
            value={String(answers[field.key] || '')}
            onChange={(e) => setField(field.key, e.target.value)}
            className="input-field min-h-[120px] py-3"
          />
        </div>
      );
    }

    if (field.type === 'select' && field.options) {
      return (
        <div key={field.key} className={field.half ? '' : 'sm:col-span-2'}>
          <Select
            label={field.label}
            value={String(answers[field.key] || '')}
            onChange={(e) => setField(field.key, e.target.value)}
          >
            <option value="">Select…</option>
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          {field.hint ? <p className="mt-1 text-xs text-navy-400">{field.hint}</p> : null}
        </div>
      );
    }

    return (
      <div key={field.key} className={field.half ? '' : 'sm:col-span-2'}>
        <Input
          label={field.label}
          type={field.type || 'text'}
          hint={field.hint}
          value={String(answers[field.key] || '')}
          onChange={(e) => setField(field.key, e.target.value)}
        />
      </div>
    );
  };

  return (
    <div>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">Become a partner</p>
        <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
          Dealership application
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-navy-500">
          Tell us about your business, fuel operations, and partnership goals. This questionnaire helps our team
          evaluate dealership fit across the R&P network.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[minmax(280px,320px)_1fr] lg:items-start">
        <DealershipProgramPanel currentStep={step} />

        <div>
          <div className="mb-5 rounded-md border border-surface-border bg-white px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">
                  Step {step} of {TOTAL_STEPS}
                </p>
                <h2 className="mt-0.5 font-display text-lg font-semibold text-navy-900">{stepMeta.title}</h2>
                <p className="text-sm text-navy-500">{stepMeta.description}</p>
              </div>
              <span className="text-sm font-semibold tabular-nums text-purple-600">{progress}%</span>
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-navy-100">
              <motion.div
                className="h-full rounded-full bg-purple-600"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>

          {error ? (
            <div className="mb-4">
              <Alert>{error}</Alert>
            </div>
          ) : null}

          <div className="rounded-md border border-surface-border bg-white p-5 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: -16 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === 4 ? <DealershipReviewSummary answers={answers} /> : null}
                <div className={`grid gap-4 sm:grid-cols-2 ${step === 4 ? 'mt-5' : ''}`}>
                  {fields.map(renderField)}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            {step > 1 ? (
              <Button type="button" variant="secondary" onClick={() => setStep(step - 1)} icon={<ArrowLeft />}>
                Back
              </Button>
            ) : (
              <span />
            )}
            <Button
              type="button"
              onClick={next}
              loading={loading}
              icon={step === TOTAL_STEPS ? <Send /> : <ArrowRight />}
              iconPosition="right"
            >
              {step === TOTAL_STEPS ? 'Submit application' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
