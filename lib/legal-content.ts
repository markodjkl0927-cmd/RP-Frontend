export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocument = {
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
};

const COMPANY = 'R&P Global Energies Inc.';
const CONTACT_EMAIL = 'noreply@randpglobalenergies.com';
const WEBSITE = 'randpglobalenergies.com';

export const TERMS_OF_SERVICE: LegalDocument = {
  title: 'Terms of Service',
  description: 'Rules for using the R&P Global Energies member portal and related services.',
  lastUpdated: 'June 3, 2026',
  sections: [
    {
      id: 'acceptance',
      title: '1. Acceptance of terms',
      paragraphs: [
        `These Terms of Service ("Terms") govern your access to and use of the ${COMPANY} member portal, website, and related online services (collectively, the "Services"). By registering, signing in, or using the Services, you agree to these Terms.`,
        'If you do not agree, do not use the Services.',
      ],
    },
    {
      id: 'eligibility',
      title: '2. Eligibility',
      paragraphs: [
        'You must be at least 18 years old and able to form a binding contract to use the Services.',
        'Membership is intended for individuals and authorized business representatives participating in R&P programs such as fuel network access, dealership partnerships, and careers.',
      ],
    },
    {
      id: 'account',
      title: '3. Your account',
      paragraphs: [
        'You are responsible for maintaining the confidentiality of your account credentials, including your 10-digit account number and password.',
        'You agree to provide accurate registration information and to keep your profile up to date.',
        'Notify us promptly if you suspect unauthorized access to your account.',
      ],
    },
    {
      id: 'permitted-use',
      title: '4. Permitted use',
      paragraphs: ['You may use the Services only for lawful purposes related to R&P membership and programs. You agree not to:'],
      bullets: [
        'Misrepresent your identity or affiliation',
        'Submit false or misleading application information',
        'Attempt to access data or accounts that are not yours',
        'Interfere with the security or operation of the Services',
        'Scrape, reverse engineer, or misuse portal content without permission',
      ],
    },
    {
      id: 'programs',
      title: '5. Programs & applications',
      paragraphs: [
        'Dealership and career applications submitted through the portal are requests for consideration only. Submission does not guarantee approval, partnership, or employment.',
        'R&P may review, approve, reject, or request additional information for any application at its sole discretion.',
      ],
    },
    {
      id: 'intellectual-property',
      title: '6. Intellectual property',
      paragraphs: [
        `The Services, including logos, branding, text, and software, are owned by or licensed to ${COMPANY} and protected by applicable intellectual property laws.`,
        'You may not copy, modify, or distribute portal materials except as allowed for personal membership use.',
      ],
    },
    {
      id: 'disclaimer',
      title: '7. Disclaimers',
      paragraphs: [
        'The Services are provided on an "as is" and "as available" basis. Station locator data, program availability, and application statuses may change without notice.',
        'To the fullest extent permitted by law, R&P disclaims warranties of merchantability, fitness for a particular purpose, and non-infringement.',
      ],
    },
    {
      id: 'liability',
      title: '8. Limitation of liability',
      paragraphs: [
        `To the fullest extent permitted by law, ${COMPANY} will not be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the Services.`,
        'Our total liability for any claim related to the Services will not exceed the amount you paid to us for membership in the twelve months before the claim, if any.',
      ],
    },
    {
      id: 'termination',
      title: '9. Suspension & termination',
      paragraphs: [
        'We may suspend or deactivate accounts that violate these Terms or pose a security risk.',
        'You may stop using the Services at any time. Sections that by their nature should survive termination will continue to apply.',
      ],
    },
    {
      id: 'changes',
      title: '10. Changes to these Terms',
      paragraphs: [
        'We may update these Terms from time to time. The "Last updated" date at the top of this page will reflect the latest version.',
        'Continued use of the Services after changes become effective constitutes acceptance of the revised Terms.',
      ],
    },
    {
      id: 'contact',
      title: '11. Contact',
      paragraphs: [
        `Questions about these Terms may be directed to ${COMPANY} at ${CONTACT_EMAIL} or through ${WEBSITE}.`,
      ],
    },
  ],
};

export const PRIVACY_POLICY: LegalDocument = {
  title: 'Privacy Policy',
  description: 'How R&P Global Energies collects, uses, and protects your information.',
  lastUpdated: 'June 3, 2026',
  sections: [
    {
      id: 'overview',
      title: '1. Overview',
      paragraphs: [
        `${COMPANY} ("R&P," "we," "us") respects your privacy. This Privacy Policy explains what information we collect when you use our member portal and related services, how we use it, and the choices you have.`,
      ],
    },
    {
      id: 'collect',
      title: '2. Information we collect',
      paragraphs: ['We may collect the following categories of information:'],
      bullets: [
        'Account information: name, email, phone, account number, and password (stored in hashed form)',
        'Profile and membership data used to display your digital member card',
        'Application data: dealership questionnaire answers and career applications including resumes',
        'Usage data: pages visited, device/browser type, and technical logs needed to operate the Services',
        'Communications: emails we send regarding account recovery, applications, and service updates',
      ],
    },
    {
      id: 'use',
      title: '3. How we use information',
      paragraphs: ['We use personal information to:'],
      bullets: [
        'Create and manage member accounts',
        'Authenticate sign-in and protect the portal',
        'Process dealership and career applications',
        'Send transactional emails such as application confirmations and status updates',
        'Operate the station locator and member programs',
        'Improve security, troubleshoot issues, and comply with legal obligations',
      ],
    },
    {
      id: 'sharing',
      title: '4. When we share information',
      paragraphs: [
        'We do not sell your personal information. We may share information with:',
      ],
      bullets: [
        'Service providers that help us host the portal, send email, or store uploaded resumes (under contractual safeguards)',
        'R&P personnel who review applications and manage member accounts',
        'Authorities when required by law or to protect rights, safety, and security',
      ],
    },
    {
      id: 'retention',
      title: '5. Data retention',
      paragraphs: [
        'We retain account and application records for as long as needed to provide the Services, review applications, meet legal requirements, and resolve disputes.',
        'You may request account updates through portal settings. Deactivation may be handled by R&P administrators.',
      ],
    },
    {
      id: 'security',
      title: '6. Security',
      paragraphs: [
        'We use reasonable administrative, technical, and organizational measures to protect personal information, including encrypted transport (HTTPS) and hashed passwords.',
        'No online service can guarantee absolute security. Please use a strong, unique password and keep your credentials confidential.',
      ],
    },
    {
      id: 'choices',
      title: '7. Your choices',
      paragraphs: [
        'You can update profile information in account settings.',
        'You may opt out of non-essential marketing communications if we offer them in the future.',
        'Application-related emails are transactional and sent when you submit applications or when statuses change.',
      ],
    },
    {
      id: 'children',
      title: '8. Children',
      paragraphs: [
        'The Services are not directed to children under 18, and we do not knowingly collect personal information from children.',
      ],
    },
    {
      id: 'changes-privacy',
      title: '9. Changes to this policy',
      paragraphs: [
        'We may update this Privacy Policy from time to time. Material changes will be reflected by updating the date on this page.',
      ],
    },
    {
      id: 'contact-privacy',
      title: '10. Contact',
      paragraphs: [
        `Privacy questions may be sent to ${CONTACT_EMAIL}. Please include enough detail for us to identify your account and request.`,
      ],
    },
  ],
};

export const COOKIE_POLICY: LegalDocument = {
  title: 'Cookie Policy',
  description: 'How R&P Global Energies uses cookies and similar technologies.',
  lastUpdated: 'June 3, 2026',
  sections: [
    {
      id: 'what',
      title: '1. What are cookies?',
      paragraphs: [
        'Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and keep you signed in.',
      ],
    },
    {
      id: 'how-we-use',
      title: '2. Cookies we use',
      paragraphs: ['The R&P member portal uses a minimal set of cookies and local storage:'],
      bullets: [
        'Authentication cookie (`rp-token`): keeps you signed in securely after login',
        'Auth storage (local storage): stores session state for the member portal',
        'Cookie consent preference (`rp-cookie-consent`): remembers that you accepted this notice',
      ],
    },
    {
      id: 'essential',
      title: '3. Essential cookies',
      paragraphs: [
        'Authentication and session cookies are strictly necessary to operate the member portal. Without them, you cannot remain signed in between page visits.',
      ],
    },
    {
      id: 'analytics',
      title: '4. Analytics & marketing cookies',
      paragraphs: [
        'We do not currently use third-party advertising or analytics cookies on the member portal. If this changes, we will update this policy and request consent where required.',
      ],
    },
    {
      id: 'manage',
      title: '5. Managing cookies',
      paragraphs: [
        'You can clear cookies through your browser settings. Clearing authentication cookies will sign you out of the portal.',
        'Declining non-essential cookies, where offered, will not block access to public pages such as the station locator or careers listings.',
      ],
    },
    {
      id: 'contact-cookies',
      title: '6. Contact',
      paragraphs: [`Questions about this Cookie Policy may be sent to ${CONTACT_EMAIL}.`],
    },
  ],
};

export const LEGAL_LINKS = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/cookies', label: 'Cookie Policy' },
] as const;
