'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { tasksApi } from '@/lib/api/tasks';
import type { TaskStats } from '@/lib/api/tasks';

const statCards: { key: keyof TaskStats; label: string; href: string; icon: string; bg: string; text: string }[] = [
  { key: 'total', label: 'Total tasks', href: '/dashboard/tasks', icon: 'bi-list-task', bg: 'bg-primary', text: 'text-white' },
  { key: 'completed', label: 'Completed', href: '/dashboard/tasks?filter=completed', icon: 'bi-check-circle', bg: 'bg-success', text: 'text-white' },
  { key: 'pending', label: 'Pending', href: '/dashboard/tasks?filter=pending', icon: 'bi-clock', bg: 'bg-warning', text: 'text-body' },
];

export function DashboardOverview() {
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    tasksApi
      .getStats()
      .then((data) => {
        if (!cancelled) setStats(data);
      })
      .catch((err) => {
        if (!cancelled) {
          toast.error(err instanceof Error ? err.message : 'Failed to load stats');
          setStats({ total: 0, completed: 0, pending: 0 });
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="row g-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="col-md-6 col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="placeholder-glow d-flex align-items-center gap-3">
                  <span className="placeholder rounded-circle" style={{ width: 56, height: 56 }}></span>
                  <div>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-4 d-block mt-1"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="row g-4">
        {statCards.map(({ key, label, href, icon, bg, text }) => (
          <div key={key} className="col-md-6 col-lg-4">
            <Link href={href} className="text-decoration-none">
              <div className="card border-0 shadow-sm h-100 hover-shadow">
                <div className="card-body d-flex align-items-center gap-3">
                  <div className={`rounded-3 ${bg} ${text} d-flex align-items-center justify-content-center`} style={{ width: 56, height: 56 }}>
                    <i className={`bi ${icon} fs-4`}></i>
                  </div>
                  <div className="flex-grow-1">
                    <p className="text-body-secondary small mb-0">{label}</p>
                    <h4 className="mb-0 fw-bold text-body">{stats ? stats[key] : 0}</h4>
                  </div>
                  <i className="bi bi-chevron-right text-body-secondary"></i>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div>
            <h5 className="card-title mb-1 text-body">Manage tasks</h5>
            <p className="card-text text-body-secondary small mb-0">
              Create, edit, and complete tasks. Use filters and search on the Tasks page.
            </p>
          </div>
          <Link href="/dashboard/tasks" className="btn btn-primary">
            Go to Tasks
          </Link>
        </div>
      </div>
    </>
  );
}
