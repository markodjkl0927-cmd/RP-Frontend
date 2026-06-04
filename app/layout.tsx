import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'R&P Global Energies — Member Portal',
  description: 'Member portal for R&P Global Energies',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
