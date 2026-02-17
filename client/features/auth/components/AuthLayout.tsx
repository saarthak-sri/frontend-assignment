import Link from 'next/link';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light py-5">
      <Link href="/" className="mb-4 text-decoration-none">
        <span className="fw-bold fs-4 text-dark">
          <i className="bi bi-check2-square me-2"></i>Taskflow
        </span>
      </Link>
      <div className="card shadow-sm border-0 w-100 mx-3" style={{ maxWidth: '400px' }}>
        <div className="card-body p-4 p-md-5">
          <h1 className="h4 fw-bold mb-1">{title}</h1>
          <p className="text-muted small mb-4">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
