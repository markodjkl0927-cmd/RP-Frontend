'use client';

import Link from 'next/link';
import { LogIn, UserPlus } from 'lucide-react';

export function ApplySignInPrompt({ returnPath }: { returnPath: string }) {
  const loginHref = `/login?next=${encodeURIComponent(returnPath)}`;
  const registerHref = `/register?next=${encodeURIComponent(returnPath)}`;

  return (
    <div className="rounded-md border border-surface-border bg-white p-5 sm:p-6">
      <h2 className="font-display text-lg font-semibold text-navy-900">Apply for this role</h2>
      <p className="mt-2 text-sm leading-relaxed text-navy-500">
        Sign in with your member account to upload your resume and submit an application. Browsing job listings is
        free — only applying requires an account.
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link
          href={loginHref}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
        >
          <LogIn className="h-4 w-4" />
          Sign in to apply
        </Link>
        <Link
          href={registerHref}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-surface-border px-5 text-sm font-semibold text-navy-700 transition-colors hover:bg-surface-muted"
        >
          <UserPlus className="h-4 w-4 text-purple-600" />
          Create member account
        </Link>
      </div>
    </div>
  );
}
