'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { AuthForm } from '@/features/auth/components/AuthForm';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    router.replace('/dashboard');
    return null;
  }

  const handleSubmit = async (email: string, password: string, _name?: string) => {
    setSubmitting(true);
    try {
      await login(email, password);
      toast.success('Welcome back');
      router.replace('/dashboard');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Sign in" subtitle="Enter your credentials to access your account.">
      <AuthForm mode="login" onSubmit={handleSubmit} isLoading={isLoading || submitting} />
      <p className="mt-4 mb-0 text-center text-muted small">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="fw-semibold text-decoration-none">Sign up</Link>
      </p>
    </AuthLayout>
  );
}
