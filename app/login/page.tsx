'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useRpAuthStore, RpUser } from '@/lib/store';
import { AuthShell, AuthFooterLink } from '@/components/AuthShell';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useRpAuthStore((s) => s.setAuth);
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/rp/auth/login', {
        accountNumber: accountNumber.replace(/\D/g, ''),
        password,
      });
      const member = data.member;
      const user: RpUser = {
        id: member.id,
        email: member.email,
        firstName: member.firstName,
        lastName: member.lastName,
        phone: member.phone,
        accountNumber: member.accountNumber,
        role: 'RP_MEMBER',
      };
      setAuth(user, data.token);
      router.push('/dashboard');
    } catch (err: unknown) {
      const e = err as { response?: { data?: { error?: string } } };
      setError(e.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in with your 10-digit member account number."
      footer={
        <>
          <AuthFooterLink href="/register">Create a new member account →</AuthFooterLink>
          <p className="mt-4 text-center text-xs text-navy-400">
            <Link href="/admin/login" className="hover:text-navy-600">
              Staff admin sign in
            </Link>
          </p>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error ? <Alert>{error}</Alert> : null}
        <Input
          label="Account number"
          inputMode="numeric"
          maxLength={14}
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="1234567890"
          hint="10 digits — sent to your email when you registered"
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" loading={loading}>
          Sign in
        </Button>
      </form>
    </AuthShell>
  );
}
