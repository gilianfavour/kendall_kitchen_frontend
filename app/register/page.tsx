import type { Metadata } from 'next';
import AuthCard     from '@/src/components/auth/AuthCard';
import RegisterForm from '@/src/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create your Kendall Kitchen account to start ordering.',
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create your account"
      subtitle="Join Kendall Kitchen to order online and track your deliveries"
    >
      <RegisterForm />
    </AuthCard>
  );
}
