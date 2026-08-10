import apiClient from '@/src/lib/axios';
import type { AuthResponse, Customer, LoginData, RegisterData } from '@/src/types';

/**
 * POST /api/v1/auth/register
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
  const res = await apiClient.post('/v1/auth/register', data);
  return res.data.data;
}

/**
 * POST /api/v1/auth/login
 */
export async function login(data: LoginData): Promise<AuthResponse> {
  const res = await apiClient.post('/v1/auth/login', data);
  return res.data.data;
}

/**
 * POST /api/v1/auth/logout  (requires token)
 */
export async function logout(): Promise<void> {
  await apiClient.post('/v1/auth/logout');
}

/**
 * GET /api/v1/auth/me  (requires token)
 */
export async function getMe(): Promise<Customer> {
  const res = await apiClient.get('/v1/auth/me');
  return res.data.data;
}
