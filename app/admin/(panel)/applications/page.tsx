'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { PageHeader } from '@/components/ui/PageHeader';
import { Download } from 'lucide-react';

const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function AdminApplicationsPage() {
  const [dealership, setDealership] = useState<any[]>([]);
  const [careers, setCareers] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      api.get('/rp/admin/dealership-applications'),
      api.get('/rp/admin/career-applications'),
    ]).then(([d, c]) => {
      setDealership(d.data.applications || []);
      setCareers(c.data.applications || []);
    });
  }, []);

  return (
    <div className="space-y-10">
      <PageHeader title="Applications" description="Dealership and career submissions from members." />

      <section>
        <h2 className="mb-4 font-display text-lg font-semibold text-navy-900">Dealership program</h2>
        {dealership.length === 0 ? (
          <p className="panel py-8 text-center text-sm text-navy-500">No submissions yet.</p>
        ) : (
          <ul className="space-y-3">
            {dealership.map((app) => (
              <li key={app.id} className="panel p-5 text-sm">
                <p className="font-semibold text-navy-900">
                  {app.member.firstName} {app.member.lastName}
                  <span className="ml-2 font-mono text-xs font-normal text-navy-500">
                    {app.member.accountNumber}
                  </span>
                </p>
                <p className="text-navy-500">{app.member.email}</p>
                <pre className="mt-4 max-h-48 overflow-auto rounded-xl bg-surface-muted p-4 text-xs text-navy-700">
                  {JSON.stringify(app.answers, null, 2)}
                </pre>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-4 font-display text-lg font-semibold text-navy-900">Career applications</h2>
        {careers.length === 0 ? (
          <p className="panel py-8 text-center text-sm text-navy-500">No submissions yet.</p>
        ) : (
          <ul className="space-y-3">
            {careers.map((app) => (
              <li key={app.id} className="panel p-5 text-sm">
                <p className="font-semibold text-navy-900">{app.job.title}</p>
                <p className="mt-1 text-navy-600">
                  {app.member.firstName} {app.member.lastName} · {app.member.email}
                </p>
                {app.coverLetter ? (
                  <p className="mt-3 rounded-xl bg-surface-muted p-3 text-navy-700">{app.coverLetter}</p>
                ) : null}
                <a
                  href={`${apiBase.replace(/\/api$/, '')}${app.resumeUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 font-semibold text-gold-600 hover:text-gold-500"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
