import { DashboardOverview } from '@/features/dashboard/components/DashboardOverview';

export default function DashboardPage() {
  return (
    <div className="container py-4 py-md-5">
      <div className="mb-4">
        <h1 className="h2 fw-bold mb-1 text-body">Dashboard</h1>
        <p className="text-body-secondary mb-0">Overview of your task progress.</p>
      </div>
      <DashboardOverview />
    </div>
  );
}
