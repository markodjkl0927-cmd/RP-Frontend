'use client';

import { useState } from 'react';
import Link from 'next/link';
import { KeyRound, UserCircle } from 'lucide-react';
import api from '@/lib/api';
import { AuthShell, AuthFooterLink } from '@/components/AuthShell';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import clsx from 'clsx';

type Mode = 'account' | 'password';

export default function RecoverPage() {
  const [mode, setMode] = useState<Mode>('account');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const path = mode === 'account' ? '/rp/auth/recover-account' : '/rp/auth/forgot-password';
      const { data } = await api.post(path, { email });
      setMessage(data.message);
      setEmail('');
    } catch (err: unknown) {
      const ex = err as { response?: { data?: { error?: string } } };
      setError(ex.response?.data?.error || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Account recovery"
      subtitle="Use the email address from when you registered."
      footer={<AuthFooterLink href="/login">← Back to sign in</AuthFooterLink>}
    >
      <div className="mb-6 grid grid-cols-2 gap-2 rounded-md border border-surface-border bg-surface-muted p-1">
        <button
          type="button"
          onClick={() => {
            setMode('account');
            setError('');
            setMessage('');
          }}
          className={clsx(
            'flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
            mode === 'account'
              ? 'bg-white text-navy-900 shadow-sm'
              : 'text-navy-600 hover:text-navy-900'
          )}
        >
          <UserCircle className="h-4 w-4" />
          Account number
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('password');
            setError('');
            setMessage('');
          }}
          className={clsx(
            'flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
            mode === 'password'
              ? 'bg-white text-navy-900 shadow-sm'
              : 'text-navy-600 hover:text-navy-900'
          )}
        >
          <KeyRound className="h-4 w-4" />
          Password
        </button>
      </div>

      <p className="mb-5 text-sm text-navy-500">
        {mode === 'account'
          ? 'We will email your 10-digit member account number if it matches an active account.'
          : 'We will email a secure link to reset your password (valid for 1 hour).'}
      </p>

      {error ? (
        <div className="mb-4">
          <Alert>{error}</Alert>
        </div>
      ) : null}
      {message ? (
        <div className="mb-4">
          <Alert variant="success">{message}</Alert>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email address"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <Button type="submit" className="w-full" loading={loading}>
          {mode === 'account' ? 'Send account number' : 'Send reset link'}
        </Button>
      </form>

      <p className="mt-4 text-center text-xs text-navy-400">
        New member?{' '}
        <Link href="/register" className="font-medium text-purple-600 hover:text-purple-700">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
