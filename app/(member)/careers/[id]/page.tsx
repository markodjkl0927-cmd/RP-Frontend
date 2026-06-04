'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Upload } from 'lucide-react';
import api from '@/lib/api';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';

export default function CareerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [job, setJob] = useState<{ title: string; description: string; location?: string } | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    api.get(`/rp/careers/${id}`).then((res) => setJob(res.data.job));
  }, [id]);

  const apply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload your CV (PDF or Word).');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const form = new FormData();
      form.append('resume', file);
      if (coverLetter) form.append('coverLetter', coverLetter);
      await api.post(`/rp/careers/${id}/apply`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      router.push('/careers');
    } catch (err: unknown) {
      const e = err as { response?: { data?: { error?: string } } };
      setError(e.response?.data?.error || 'Application failed');
    } finally {
      setLoading(false);
    }
  };

  if (!job) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <Link href="/careers" className="mb-6 inline-flex text-sm font-medium text-navy-600 hover:text-gold-600">
        ← All positions
      </Link>
      <PageHeader title={job.title} description={job.location} />
      <div className="panel mb-8 whitespace-pre-wrap p-6 text-sm leading-relaxed text-navy-700">
        {job.description}
      </div>

      <form onSubmit={apply} className="panel space-y-5 p-6 sm:p-8">
        <h2 className="font-display text-lg font-semibold text-navy-900">Apply for this role</h2>
        {error ? <Alert>{error}</Alert> : null}
        <div>
          <label className="mb-2 block text-sm font-medium text-navy-700">CV / Resume (PDF or Word)</label>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-surface-border bg-surface-muted px-4 py-8 transition-colors hover:border-gold-400 hover:bg-gold-50/50">
            <Upload className="mb-2 h-8 w-8 text-navy-400" />
            <span className="text-sm font-medium text-navy-700">
              {file ? file.name : 'Click to upload'}
            </span>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
          </label>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-700">Cover letter (optional)</label>
          <textarea
            rows={5}
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="input-field min-h-[120px] py-3"
          />
        </div>
        <Button type="submit" loading={loading}>
          Submit application
        </Button>
      </form>
    </div>
  );
}
