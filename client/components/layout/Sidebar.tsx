'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
  { href: '/dashboard/tasks', label: 'Tasks', icon: 'bi-list-task' },
  { href: '/dashboard/profile', label: 'Profile', icon: 'bi-person' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="d-none d-md-flex flex-column border-end bg-body shadow-sm" style={{ width: '260px' }}>
      <div className="p-3 border-bottom">
        <Link href="/dashboard" className="navbar-brand fw-bold text-body mb-0">
          <i className="bi bi-check2-square me-2"></i>Taskflow
        </Link>
      </div>
      <nav className="flex-grow-1 p-2">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`d-flex align-items-center gap-2 rounded px-3 py-2 text-decoration-none mb-1 ${
                active ? 'bg-primary text-white' : 'text-body hover-bg-body-secondary'
              }`}
            >
              <i className={`bi ${item.icon}`}></i>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-top bg-body-secondary">
        <div className="small text-body-secondary mb-2 text-truncate" title={user?.email}>
          <strong className="text-body d-block">{user?.name}</strong>
          {user?.email}
        </div>
        <div className="d-flex gap-2">
          <ThemeToggle />
          <button type="button" className="btn btn-outline-secondary btn-sm flex-grow-1" onClick={logout}>
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
