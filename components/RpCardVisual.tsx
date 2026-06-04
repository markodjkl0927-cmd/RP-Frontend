'use client';

type Props = {
  holderName: string;
  accountNumberDisplay: string;
  lastFour: string;
};

export default function RpCardVisual({ holderName, accountNumberDisplay, lastFour }: Props) {
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <div className="absolute -inset-4 rounded-[2rem] bg-gold-400/20 blur-2xl" aria-hidden />
      <div
        className="relative aspect-[1.586/1] overflow-hidden rounded-2xl text-white shadow-2xl"
        style={{
          background:
            'linear-gradient(145deg, #0a1929 0%, #102a43 35%, #243b53 70%, #334e68 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_15%_20%,#d4af37_0%,transparent_45%)]" />
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5" />
        <div className="absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-gold-400/10" />

        <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-300">R&P Global</p>
              <p className="font-display text-xl font-bold tracking-tight">Energies</p>
            </div>
            <div className="h-9 w-12 rounded-md bg-gold-shine shadow-inner" />
          </div>

          <div>
            <p className="mb-1 text-[10px] uppercase tracking-wider text-navy-300">Member account</p>
            <p className="font-mono text-xl tracking-[0.15em] sm:text-2xl">{accountNumberDisplay}</p>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-navy-300">Cardholder</p>
              <p className="text-sm font-semibold tracking-wide">{holderName}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-navy-300">Valid thru</p>
              <p className="font-mono text-sm">•••• {lastFour}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
