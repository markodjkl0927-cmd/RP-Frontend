'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, KeyRound, UserRound } from 'lucide-react';
import api from '@/lib/api';
import { useRpAuthStore } from '@/lib/store';
import { PageHeader } from '@/components/ui/PageHeader';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { fadeInUp, pageStagger } from '@/lib/motion';

type MemberProfile = {
  id: string;
  accountNumber: string;
  accountNumberDisplay: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  createdAt: string;
};

export default function SettingsPage() {
  const updateUser = useRpAuthStore((s) => s.updateUser);
  const reduceMotion = useReducedMotion();

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [accountDisplay, setAccountDisplay] = useState('');
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    api
      .get('/rp/member/me')
      .then((res) => {
        const member: MemberProfile = res.data.member;
        setProfile({
          firstName: member.firstName,
          lastName: member.lastName,
          email: member.email,
          phone: member.phone || '',
        });
        setAccountDisplay(member.accountNumberDisplay);
        updateUser({
          firstName: member.firstName,
          lastName: member.lastName,
          email: member.email,
          phone: member.phone || undefined,
          accountNumber: member.accountNumber,
        });
      })
      .catch(() => setLoadError('Could not load your profile. Please refresh the page.'))
      .finally(() => setLoading(false));
  }, [updateUser]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess(false);
    setProfileLoading(true);
    try {
      const { data } = await api.put('/rp/member/me', {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone || undefined,
      });
      const member: MemberProfile = data.member;
      setAccountDisplay(member.accountNumberDisplay);
      updateUser({
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        phone: member.phone || undefined,
        accountNumber: member.accountNumber,
      });
      setProfileSuccess(true);
      window.setTimeout(() => setProfileSuccess(false), 4000);
    } catch (err: unknown) {
      const ex = err as { response?: { data?: { error?: string } } };
      setProfileError(ex.response?.data?.error || 'Failed to save profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters');
      return;
    }

    setPasswordLoading(true);
    try {
      await api.put('/rp/member/password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordSuccess(true);
      window.setTimeout(() => setPasswordSuccess(false), 4000);
    } catch (err: unknown) {
      const ex = err as { response?: { data?: { error?: string } } };
      setPasswordError(ex.response?.data?.error || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="max-w-lg">
        <PageHeader title="Account settings" />
        <Alert>{loadError}</Alert>
      </div>
    );
  }

  return (
    <motion.div
      variants={pageStagger}
      initial={reduceMotion ? false : 'hidden'}
      animate="visible"
      className="mx-auto max-w-3xl space-y-8"
    >
      <motion.div variants={fadeInUp}>
        <PageHeader
          title="Account settings"
          description="Update your contact details and password. Your account number cannot be changed."
        />
      </motion.div>

      <motion.section variants={fadeInUp} className="rounded-md border border-surface-border bg-white p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50">
            <UserRound className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-navy-900">Profile</h2>
            <p className="text-sm text-navy-500">Name, email, and phone on your membership</p>
          </div>
        </div>

        <form onSubmit={handleProfileSubmit} className="space-y-4">
          {profileError ? <Alert>{profileError}</Alert> : null}
          {profileSuccess ? (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              Profile saved successfully
            </div>
          ) : null}

          <div className="rounded-lg border border-surface-border bg-surface-muted px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-navy-500">Account number</p>
            <p className="mt-1 font-mono text-lg font-semibold tracking-wider text-navy-900">{accountDisplay}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="First name"
              required
              value={profile.firstName}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            />
            <Input
              label="Last name"
              required
              value={profile.lastName}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            />
          </div>
          <Input
            label="Email"
            type="email"
            required
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <Input
            label="Phone"
            type="tel"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            hint="Optional"
          />
          <Button type="submit" loading={profileLoading}>
            Save profile
          </Button>
        </form>
      </motion.section>

      <motion.section variants={fadeInUp} className="rounded-md border border-surface-border bg-white p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-50">
            <KeyRound className="h-5 w-5 text-navy-700" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-navy-900">Password</h2>
            <p className="text-sm text-navy-500">Change the password you use with your account number</p>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          {passwordError ? <Alert>{passwordError}</Alert> : null}
          {passwordSuccess ? (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              Password updated successfully
            </div>
          ) : null}

          <Input
            label="Current password"
            type="password"
            required
            value={passwordForm.currentPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
          />
          <Input
            label="New password"
            type="password"
            required
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
            hint="Minimum 8 characters"
          />
          <Input
            label="Confirm new password"
            type="password"
            required
            value={passwordForm.confirmPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
          />
          <Button type="submit" loading={passwordLoading}>
            Update password
          </Button>
        </form>
      </motion.section>
    </motion.div>
  );
}
