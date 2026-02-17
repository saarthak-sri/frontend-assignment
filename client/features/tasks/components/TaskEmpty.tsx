'use client';

export function TaskEmpty({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="card-body text-center py-5">
      <div className="text-body-secondary mb-3">
        <i className="bi bi-list-task display-4"></i>
      </div>
      <h5 className="mb-2 text-body">No tasks yet</h5>
      <p className="text-body-secondary small mb-4 mx-auto" style={{ maxWidth: 280 }}>
        Create your first task to get started. You can search and filter once you have a few.
      </p>
      <button type="button" className="btn btn-primary" onClick={onAdd}>
        <i className="bi bi-plus-lg me-1"></i> Add task
      </button>
    </div>
  );
}
