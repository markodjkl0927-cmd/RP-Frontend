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

export default function AdminLoginPage() {
  const router = useRouter();
  const setAuth = useRpAuthStore((s) => s.setAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/rp/auth/admin/login', { email, password });
      const admin = data.admin;
      const user: RpUser = {
        id: admin.id,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        role: 'RP_ADMIN',
      };
      setAuth(user, data.token);
      router.push('/admin/dashboard');
    } catch (err: unknown) {
      const e = err as { response?: { data?: { error?: string } } };
      setError(e.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Administration"
      subtitle="Staff sign in for R&P Global Energies portal management."
      footer={<AuthFooterLink href="/login">← Member portal sign in</AuthFooterLink>}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error ? <Alert>{error}</Alert> : null}
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" loading={loading}>
          Sign in to admin
        </Button>
      </form>
    </AuthShell>
  );
}
