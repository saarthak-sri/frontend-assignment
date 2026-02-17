'use client';

interface TaskFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  filter: 'all' | 'completed' | 'pending';
  onFilterChange: (v: 'all' | 'completed' | 'pending') => void;
  onSearch: () => void;
}

const filters: { value: 'all' | 'completed' | 'pending'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

export function TaskFilters({ search, onSearchChange, filter, onFilterChange, onSearch }: TaskFiltersProps) {
  return (
    <div className="d-flex flex-wrap align-items-center gap-2">
      <div className="input-group" style={{ width: 220 }}>
        <input
          type="search"
          className="form-control form-control-sm"
          placeholder="Search..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        />
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onSearch}>
          <i className="bi bi-search"></i>
        </button>
      </div>
      <div className="btn-group btn-group-sm" role="group">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            className={`btn ${filter === f.value ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => onFilterChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
