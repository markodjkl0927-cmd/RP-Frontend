'use client';

import { motion, useReducedMotion } from 'framer-motion';

const blobs = [
  {
    className: 'left-[8%] top-[12%] h-56 w-56 bg-purple-500/40',
    animate: { x: [0, 36, -18, 0], y: [0, -24, 18, 0], scale: [1, 1.12, 0.92, 1] },
    duration: 12,
  },
  {
    className: 'right-[6%] top-[20%] h-64 w-64 bg-violet-400/35',
    animate: { x: [0, -40, 20, 0], y: [0, 28, -14, 0], scale: [1, 0.9, 1.1, 1] },
    duration: 14,
  },
  {
    className: 'bottom-[8%] left-[30%] h-72 w-72 bg-fuchsia-500/25',
    animate: { x: [0, 28, -30, 0], y: [0, -18, 22, 0], scale: [1, 1.06, 0.96, 1] },
    duration: 16,
  },
  {
    className: 'bottom-[18%] right-[22%] h-48 w-48 bg-indigo-400/30',
    animate: { x: [0, -22, 28, 0], y: [0, 16, -20, 0], scale: [1, 1.14, 0.9, 1] },
    duration: 10,
  },
];

export function AnimatedMeshBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            'linear-gradient(135deg, #1e0a3c 0%, #4c1d95 30%, #6d28d9 55%, #5b21b6 80%, #2e1065 100%)',
        }}
        animate={
          reduceMotion
            ? {}
            : {
                background: [
                  'linear-gradient(135deg, #1e0a3c 0%, #4c1d95 30%, #6d28d9 55%, #5b21b6 80%, #2e1065 100%)',
                  'linear-gradient(135deg, #2e1065 0%, #5b21b6 25%, #7c3aed 50%, #4c1d95 75%, #1e0a3c 100%)',
                  'linear-gradient(135deg, #1e0a3c 0%, #4c1d95 30%, #6d28d9 55%, #5b21b6 80%, #2e1065 100%)',
                ],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {blobs.map((blob, i) =>
        reduceMotion ? (
          <div key={i} className={`absolute rounded-full blur-3xl ${blob.className}`} />
        ) : (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-3xl ${blob.className}`}
            animate={blob.animate}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )
      )}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(196,181,253,0.32),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(91,33,182,0.4),transparent_55%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.04%22/%3E%3C/svg%3E')] opacity-40 mix-blend-overlay" />
    </div>
  );
}
