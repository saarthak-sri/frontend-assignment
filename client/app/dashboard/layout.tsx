import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Sidebar } from '@/components/layout/Sidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-vh-100 d-flex flex-column bg-body">
        <div className="d-flex flex-grow-1 overflow-hidden">
          <Sidebar />
          <div className="d-flex flex-column flex-grow-1 overflow-hidden">
            <AppHeader />
            <main className="flex-grow-1 overflow-auto">{children}</main>
            <AppFooter />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
