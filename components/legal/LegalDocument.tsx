import Link from 'next/link';
import type { LegalDocument as LegalDocumentType } from '@/lib/legal-content';
import { LEGAL_LINKS } from '@/lib/legal-content';

export function LegalDocument({ document }: { document: LegalDocumentType }) {
  return (
    <article className="mx-auto max-w-3xl">
      <header className="mb-8 border-b border-surface-border pb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">Legal</p>
        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-navy-900">{document.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-navy-500">{document.description}</p>
        <p className="mt-3 text-xs text-navy-400">Last updated: {document.lastUpdated}</p>
      </header>

      <div className="space-y-8">
        {document.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="font-display text-lg font-semibold text-navy-900">{section.title}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-navy-700">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {section.bullets?.length ? (
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-navy-700">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <footer className="mt-10 border-t border-surface-border pt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">Related policies</p>
        <ul className="mt-3 flex flex-wrap gap-4 text-sm">
          {LEGAL_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="font-semibold text-purple-600 hover:text-purple-500">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </footer>
    </article>
  );
}
