'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, UserPlus, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { register as registerUser } from '@/src/services/authService';
import { useAuthStore } from '@/src/stores/authStore';

const schema = z.object({
  first_name:            z.string().min(2, 'First name required'),
  last_name:             z.string().min(2, 'Last name required'),
  email:                 z.string().email('Enter a valid email'),
  phone_number:          z.string().min(7, 'Phone number required'),
  password:              z.string().min(8, 'Password must be at least 8 characters'),
  password_confirmation: z.string().min(1, 'Please confirm your password'),
}).refine(d => d.password === d.password_confirmation, {
  message: 'Passwords do not match',
  path:    ['password_confirmation'],
});

type Schema = z.infer<typeof schema>;

export default function RegisterForm() {
  const router   = useRouter();
  const setAuth  = useAuthStore(s => s.setAuth);
  const [showPw,  setShowPw]  = useState(false);
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    setError('');
    try {
      const { customer, token } = await registerUser(values);
      setAuth(customer, token);
      router.push('/');
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr?.response?.data?.message ?? 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">

      {error && (
        <div role="alert" className="flex items-start gap-2.5 rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}

      {/* Name row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={lbl}>First Name <Req /></label>
          <input {...register('first_name')} type="text" autoComplete="given-name"
            placeholder="Jane" className={inp(!!errors.first_name)} />
          {errors.first_name && <Err msg={errors.first_name.message!} />}
        </div>
        <div>
          <label className={lbl}>Last Name <Req /></label>
          <input {...register('last_name')} type="text" autoComplete="family-name"
            placeholder="Doe" className={inp(!!errors.last_name)} />
          {errors.last_name && <Err msg={errors.last_name.message!} />}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className={lbl}>Email Address <Req /></label>
        <input {...register('email')} type="email" autoComplete="email"
          placeholder="you@example.com" className={inp(!!errors.email)} />
        {errors.email && <Err msg={errors.email.message!} />}
      </div>

      {/* Phone */}
      <div>
        <label className={lbl}>Phone Number <Req /></label>
        <input {...register('phone_number')} type="tel" autoComplete="tel"
          placeholder="+256 700 000 000" className={inp(!!errors.phone_number)} />
        {errors.phone_number && <Err msg={errors.phone_number.message!} />}
      </div>

      {/* Password */}
      <div>
        <label className={lbl}>Password <Req /></label>
        <div className="relative">
          <input {...register('password')} type={showPw ? 'text' : 'password'}
            autoComplete="new-password" placeholder="Min. 8 characters"
            className={cn(inp(!!errors.password), 'pr-10')} />
          <button type="button" onClick={() => setShowPw(v => !v)}
            aria-label={showPw ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b5a090] hover:text-[#2c1410] transition-colors">
            {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <Err msg={errors.password.message!} />}
      </div>

      {/* Confirm password */}
      <div>
        <label className={lbl}>Confirm Password <Req /></label>
        <input {...register('password_confirmation')} type={showPw ? 'text' : 'password'}
          autoComplete="new-password" placeholder="Repeat your password"
          className={inp(!!errors.password_confirmation)} />
        {errors.password_confirmation && <Err msg={errors.password_confirmation.message!} />}
      </div>

      {/* Submit */}
      <button type="submit" disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#2c1410] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3d1a1a] disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2">
        {loading ? (
          <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" aria-hidden="true" />
        ) : (
          <UserPlus className="h-4 w-4" aria-hidden="true" />
        )}
        {loading ? 'Creating account…' : 'Create Account'}
      </button>

      <p className="text-center text-sm text-[#7a6050]">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-[#c9a84c] hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}

const lbl = 'text-xs font-semibold text-[#3d1a1a] uppercase tracking-wide block mb-1.5';

function Req() {
  return <span className="text-[#c9a84c] ml-0.5" aria-hidden="true">*</span>;
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
