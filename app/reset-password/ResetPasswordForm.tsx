'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import api from '@/lib/api';
import { AuthShell, AuthFooterLink } from '@/components/AuthShell';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!token) {
      setError('Invalid reset link. Please request a new one from account recovery.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    try {
      await api.post('/rp/auth/reset-password', { token, password });
      setDone(true);
    } catch (err: unknown) {
      const ex = err as { response?: { data?: { error?: string } } };
      setError(ex.response?.data?.error || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  if (!token && !done) {
    return (
      <AuthShell
        title="Invalid link"
        subtitle="This password reset link is missing or incomplete."
        footer={<AuthFooterLink href="/recover">Request a new link →</AuthFooterLink>}
      >
        <Alert>Please use account recovery to request a new password reset email.</Alert>
      </AuthShell>
    );
  }

  if (done) {
    return (
      <AuthShell title="Password updated" subtitle="You can sign in with your account number and new password.">
        <div className="panel p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <Button type="button" className="w-full" onClick={() => router.push('/login')}>
            Go to sign in
          </Button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Choose a new password"
      subtitle="Enter a new password for your member account."
      footer={<AuthFooterLink href="/login">← Back to sign in</AuthFooterLink>}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error ? <Alert>{error}</Alert> : null}
        <Input
          label="New password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          hint="Minimum 8 characters"
        />
        <Input
          label="Confirm new password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" className="w-full mt-2" loading={loading}>
          Update password
        </Button>
      </form>
      <p className="mt-4 text-center text-xs text-navy-400">
        Link expired?{' '}
        <Link href="/recover" className="font-medium text-purple-600 hover:text-purple-700">
          Request a new one
        </Link>
      </p>
    </AuthShell>
  );
}
