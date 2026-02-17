'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { TasksView } from '@/features/tasks/components/TasksView';

export default function TasksPage() {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get('filter');
  const initialFilter = useMemo(() => {
    if (filterParam === 'completed' || filterParam === 'pending') return filterParam;
    return 'all' as const;
  }, [filterParam]);

  return (
    <div className="container py-4 py-md-5">
      <div className="mb-4">
        <h1 className="h2 fw-bold mb-1 text-body">Tasks</h1>
        <p className="text-body-secondary mb-0">Create and manage your tasks. Search, filter, and paginate.</p>
      </div>
      <TasksView initialFilter={initialFilter} />
    </div>
  );
}
