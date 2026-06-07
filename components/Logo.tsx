import clsx from 'clsx';
import Image from 'next/image';

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <div
      className={clsx(
        'inline-flex items-center',
        light && 'rounded-xl bg-white px-3 py-2 shadow-sm',
        className
      )}
    >
      <Image
        src="/images/rp-global-logo.png"
        alt="R&P Global Energies"
        width={1536}
        height={493}
        priority
        className="h-9 w-auto max-w-[200px] object-contain sm:h-10 sm:max-w-[220px]"
      />
    </div>
  );
}
