import clsx from 'clsx';
import { Fragment, ReactNode } from 'react';

export type DataTableColumn<T> = {
  id: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
  align?: 'left' | 'right' | 'center';
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowId: (row: T) => string;
  emptyMessage?: string;
  expandedRowId?: string | null;
  renderExpandedRow?: (row: T) => ReactNode;
};

export function DataTable<T>({
  columns,
  data,
  getRowId,
  emptyMessage = 'No results.',
  expandedRowId,
  renderExpandedRow,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return <p className="panel py-10 text-center text-sm text-navy-500">{emptyMessage}</p>;
  }

  return (
    <div className="panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="border-b border-surface-border bg-surface-muted text-left text-xs font-semibold uppercase tracking-wide text-navy-500">
              {columns.map((col) => (
                <th
                  key={col.id}
                  scope="col"
                  className={clsx(
                    'whitespace-nowrap px-5 py-3',
                    col.align === 'right' && 'text-right',
                    col.align === 'center' && 'text-center',
                    col.headerClassName
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {data.map((row) => {
              const rowId = getRowId(row);
              const isExpanded = expandedRowId === rowId;
              return (
                <Fragment key={rowId}>
                  <tr className="transition-colors hover:bg-surface-muted/60">
                    {columns.map((col) => (
                      <td
                        key={col.id}
                        className={clsx(
                          'px-5 py-3.5 align-top text-navy-700',
                          col.align === 'right' && 'text-right',
                          col.align === 'center' && 'text-center',
                          col.cellClassName
                        )}
                      >
                        {col.cell(row)}
                      </td>
                    ))}
                  </tr>
                  {isExpanded && renderExpandedRow ? (
                    <tr className="bg-surface-muted/40">
                      <td colSpan={columns.length} className="px-5 py-4">
                        {renderExpandedRow(row)}
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const normalized = status.toUpperCase();
  const styles =
    normalized === 'ACTIVE'
      ? 'bg-emerald-50 text-emerald-700 ring-emerald-200/80'
      : normalized === 'INACTIVE' || normalized === 'SUSPENDED'
        ? 'bg-red-50 text-red-700 ring-red-200/80'
        : normalized === 'NEW'
      ? 'bg-amber-50 text-amber-700 ring-amber-200/80'
      : normalized === 'UNDER_REVIEW' || normalized === 'IN_REVIEW'
        ? 'bg-sky-50 text-sky-700 ring-sky-200/80'
        : normalized === 'INTERVIEW'
          ? 'bg-violet-50 text-violet-700 ring-violet-200/80'
          : normalized === 'APPROVED' || normalized === 'ACCEPTED' || normalized === 'HIRED'
          ? 'bg-emerald-50 text-emerald-700 ring-emerald-200/80'
          : normalized === 'REJECTED' || normalized === 'DECLINED'
            ? 'bg-red-50 text-red-700 ring-red-200/80'
            : 'bg-navy-50 text-navy-600 ring-surface-border';

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ring-1 ring-inset',
        styles
      )}
    >
      {status}
    </span>
  );
}
