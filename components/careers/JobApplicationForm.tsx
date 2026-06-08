'use client';

import { useRef, useState } from 'react';
import clsx from 'clsx';
import { FileText, Upload } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';

const ACCEPTED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const ACCEPTED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

function isAcceptedResume(file: File) {
  const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
  return ACCEPTED_TYPES.includes(file.type) || ACCEPTED_EXTENSIONS.includes(ext);
}

type Props = {
  jobTitle: string;
  onSubmit: (data: { file: File; coverLetter: string }) => Promise<void>;
};

export function JobApplicationForm({ jobTitle, onSubmit }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setResumeFile = (next: File | null) => {
    if (!next) {
      setFile(null);
      return;
    }
    if (!isAcceptedResume(next)) {
      setError('Please upload a PDF or Word document (.pdf, .doc, .docx).');
      return;
    }
    setError('');
    setFile(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload your CV (PDF or Word).');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await onSubmit({ file, coverLetter });
      setSubmitted(true);
    } catch (err: unknown) {
      const ex = err as { response?: { data?: { error?: string } } };
      setError(ex.response?.data?.error || 'Application failed');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-md border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-sm font-semibold text-emerald-800">Application submitted</p>
        <p className="mt-2 text-sm text-emerald-700">
          Thank you for applying to <span className="font-medium">{jobTitle}</span>. Our team will review your
          resume and contact you if there is a fit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-md border border-surface-border bg-white p-5 sm:p-6">
      <h2 className="font-display text-lg font-semibold text-navy-900">Apply for this role</h2>
      <p className="mt-1 text-sm text-navy-500">Upload your resume and optionally include a cover letter.</p>

      {error ? (
        <div className="mt-4">
          <Alert>{error}</Alert>
        </div>
      ) : null}

      <div className="mt-5">
        <p className="mb-2 text-sm font-medium text-navy-700">CV / Resume (PDF or Word)</p>
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragging(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setDragging(false);
            }
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragging(false);
            const dropped = e.dataTransfer.files?.[0];
            if (dropped) setResumeFile(dropped);
          }}
          className={clsx(
            'flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed px-4 py-8 transition-colors',
            dragging
              ? 'border-purple-400 bg-purple-50'
              : 'border-surface-border bg-surface-muted hover:border-purple-300 hover:bg-purple-50/40'
          )}
        >
          <Upload className={clsx('mb-2 h-8 w-8', dragging ? 'text-purple-600' : 'text-purple-500')} />
          <span className="text-sm font-medium text-navy-700">
            {file ? file.name : dragging ? 'Drop your resume here' : 'Drag and drop your resume, or click to browse'}
          </span>
          <span className="mt-1 text-xs text-navy-500">PDF, DOC, or DOCX</span>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
          />
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-navy-700">
          <FileText className="h-4 w-4 text-purple-600" />
          Cover letter (optional)
        </label>
        <textarea
          rows={5}
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          placeholder="Tell us why you are interested in this role..."
          className="input-field min-h-[120px] py-3"
        />
      </div>

      <Button type="submit" loading={loading} className="mt-6 w-full sm:w-auto">
        Submit application
      </Button>
    </form>
  );
}
