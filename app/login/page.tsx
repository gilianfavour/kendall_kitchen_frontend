import type { Metadata } from 'next';
import AuthCard  from '@/src/components/auth/AuthCard';
import LoginForm from '@/src/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Kendall Kitchen account.',
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to place orders and track your history"
    >
      <LoginForm />
    </AuthCard>
  );
}
