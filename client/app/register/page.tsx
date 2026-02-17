'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { AuthForm } from '@/features/auth/components/AuthForm';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated, isLoading } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    router.replace('/dashboard');
    return null;
  }

  const handleSubmit = async (email: string, password: string, name?: string) => {
    if (!name?.trim()) {
      toast.error('Name is required');
      return;
    }
    setSubmitting(true);
    try {
      await register(name.trim(), email, password);
      toast.success('Account created');
      router.replace('/dashboard');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Get started with your free account.">
      <AuthForm mode="register" onSubmit={handleSubmit} isLoading={isLoading || submitting} />
      <p className="mt-4 mb-0 text-center text-muted small">
        Already have an account?{' '}
        <Link href="/login" className="fw-semibold text-decoration-none">Sign in</Link>
      </p>
    </AuthLayout>
  );
}
