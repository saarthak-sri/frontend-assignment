'use client';

import Link from 'next/link';

export function AppFooter() {
  return (
    <footer className="bg-body border-top py-3 mt-auto">
      <div className="container-fluid px-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
          <span className="small text-body-secondary">
            © {new Date().getFullYear()} Taskflow. Built for getting things done.
          </span>
          <div className="d-flex gap-3 small">
            <Link href="/dashboard" className="text-body-secondary text-decoration-none">Dashboard</Link>
            <Link href="/dashboard/tasks" className="text-body-secondary text-decoration-none">Tasks</Link>
            <Link href="/dashboard/profile" className="text-body-secondary text-decoration-none">Profile</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
