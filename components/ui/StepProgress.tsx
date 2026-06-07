export function StepProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-8">
      <div className="mb-2 flex justify-between text-xs font-medium text-navy-500">
        <span>
          Step {current} of {total}
        </span>
        <span>{Math.round((current / total) * 100)}%</span>
      </div>
      <div className="flex gap-2">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${i < current ? 'bg-purple-500' : 'bg-navy-100'}`}
          />
        ))}
      </div>
    </div>
  );
}
