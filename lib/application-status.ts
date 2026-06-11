export const DEALERSHIP_STATUS_LABELS: Record<string, string> = {
  NEW: 'Submitted',
  UNDER_REVIEW: 'Under review',
  APPROVED: 'Approved',
  REJECTED: 'Not approved',
};

export const CAREER_STATUS_LABELS: Record<string, string> = {
  NEW: 'Submitted',
  UNDER_REVIEW: 'Under review',
  INTERVIEW: 'Interview',
  HIRED: 'Hired',
  REJECTED: 'Not selected',
};

const CLOSED_STATUSES = new Set(['REJECTED', 'APPROVED', 'HIRED']);

export function formatApplicationStatus(status: string, type: 'dealership' | 'career') {
  const normalized = status.toUpperCase();
  const labels = type === 'dealership' ? DEALERSHIP_STATUS_LABELS : CAREER_STATUS_LABELS;
  return labels[normalized] || status.replace(/_/g, ' ').toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
}

export function isApplicationActive(status: string) {
  return !CLOSED_STATUSES.has(status.toUpperCase());
}

export function formatApplicationDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
