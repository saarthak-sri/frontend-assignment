import { ProfileSection } from '@/features/profile/components/ProfileSection';

export default function ProfilePage() {
  return (
    <div className="container py-4 py-md-5">
      <div className="mb-4">
        <h1 className="h2 fw-bold mb-1 text-body">Profile</h1>
        <p className="text-body-secondary mb-0">Manage your account details.</p>
      </div>
      <ProfileSection />
    </div>
  );
}
