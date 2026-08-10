'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/src/stores/authStore';

interface Props {
  children:    React.ReactNode;
  redirectTo?: string;
}

/**
 * Client-side auth guard. Redirects to /login if the user is not authenticated.
 * Use this as a wrapper in client components or page-level client shells.
 */
export default function ProtectedRoute({ children, redirectTo = '/login' }: Props) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, redirectTo, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#fdf9f4] flex items-center justify-center">
        <span className="h-8 w-8 rounded-full border-2 border-[#c9a84c]/30 border-t-[#c9a84c] animate-spin" aria-hidden="true" />
      </div>
    );
  }

  return <>{children}</>;
}
