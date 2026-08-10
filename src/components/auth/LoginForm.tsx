'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { login } from '@/src/services/authService';
import { useAuthStore } from '@/src/stores/authStore';

const schema = z.object({
  email:    z.string().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type Schema = z.infer<typeof schema>;

export default function LoginForm({ redirectTo = '/' }: { redirectTo?: string }) {
  const router   = useRouter();
  const setAuth  = useAuthStore(s => s.setAuth);
  const [showPw, setShowPw] = useState(false);
  const [error,  setError]  = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    setError('');
    try {
      const { customer, token } = await login(values);
      setAuth(customer, token);
      router.push(redirectTo);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr?.response?.data?.message ?? 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">

      {/* Error banner */}
      {error && (
        <div role="alert" className="flex items-start gap-2.5 rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}

      {/* Email */}
      <div>
        <label className="text-xs font-semibold text-[#3d1a1a] uppercase tracking-wide block mb-1.5">
          Email Address <span className="text-[#c9a84c]" aria-hidden="true">*</span>
        </label>
        <input
          {...register('email')}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={inp(!!errors.email)}
        />
        {errors.email && <Err msg={errors.email.message!} />}
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-[#3d1a1a] uppercase tracking-wide">
            Password <span className="text-[#c9a84c]" aria-hidden="true">*</span>
          </label>
          <Link href="/forgot-password" className="text-xs text-[#c9a84c] hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <input
            {...register('password')}
            type={showPw ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            className={cn(inp(!!errors.password), 'pr-10')}
          />
          <button
            type="button"
            onClick={() => setShowPw(v => !v)}
            aria-label={showPw ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b5a090] hover:text-[#2c1410] transition-colors"
          >
            {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <Err msg={errors.password.message!} />}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#2c1410] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3d1a1a] disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2"
      >
        {loading ? (
          <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" aria-hidden="true" />
        ) : (
          <LogIn className="h-4 w-4" aria-hidden="true" />
        )}
        {loading ? 'Signing in…' : 'Sign In'}
      </button>

      {/* Register link */}
      <p className="text-center text-sm text-[#7a6050]">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-semibold text-[#c9a84c] hover:underline">
          Create one
        </Link>
      </p>
    </form>
  );
}

function inp(invalid: boolean) {
  return cn(
    'w-full rounded-lg border bg-[#fdf9f4] px-3.5 py-2.5 text-sm text-[#2c1410] placeholder:text-[#c5b4a4]',
    'outline-none transition-colors focus:bg-white focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20',
    invalid ? 'border-red-300' : 'border-[#e8ddd0]'
  );
}

function Err({ msg }: { msg: string }) {
  return (
    <p role="alert" className="mt-1 text-xs text-red-600 flex items-center gap-1">
      <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
      {msg}
    </p>
  );
}
