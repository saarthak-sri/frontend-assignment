'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/tasks', label: 'Tasks' },
  { href: '/dashboard/profile', label: 'Profile' },
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-body border-bottom shadow-sm sticky-top">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between py-3">
          <Link href="/dashboard" className="fw-bold text-body text-decoration-none d-md-none">
            <i className="bi bi-check2-square me-2"></i>Taskflow
          </Link>
          <nav className="nav nav-pills gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : 'text-body-secondary'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
