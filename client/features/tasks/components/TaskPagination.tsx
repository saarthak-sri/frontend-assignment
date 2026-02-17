'use client';

interface TaskPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function TaskPagination({ page, totalPages, total, onPageChange }: TaskPaginationProps) {
  const from = (page - 1) * 10 + 1;
  const to = Math.min(page * 10, total);

  return (
    <div className="card-footer bg-body-secondary d-flex flex-wrap align-items-center justify-content-between gap-2 py-3">
      <span className="small text-body-secondary">
        Showing {from}–{to} of {total} tasks
      </span>
      <div className="btn-group btn-group-sm">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
