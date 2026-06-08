'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function CardDetailTile({
  label,
  value,
  mono,
  copyValue,
  highlight,
}: {
  label: string;
  value: string;
  mono?: boolean;
  copyValue?: string;
  highlight?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!copyValue) return;
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div
      className={`relative rounded-md border p-4 ${
        highlight ? 'border-purple-200 bg-purple-50/50' : 'border-surface-border bg-white'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">{label}</p>
        {copyValue ? (
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-semibold text-purple-600 transition-colors hover:bg-purple-100"
            aria-label={`Copy ${label}`}
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                Copy
              </>
            )}
          </button>
        ) : null}
      </div>
      <p
        className={`mt-2 text-sm font-semibold text-navy-900 ${mono ? 'font-mono tracking-wide' : ''} ${
          highlight ? 'text-lg' : ''
        }`}
      >
        {value}
      </p>
    </div>
  );
}
