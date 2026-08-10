import type { BusinessInfo } from '@/src/types';

const BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000/api').replace(/\/$/, '');

// In dev: no caching so every page load hits the backend live.
// In production: revalidate every hour.
const CACHE: RequestInit =
  process.env.NODE_ENV === 'development'
    ? { cache: 'no-store' }
    : { next: { revalidate: 3600 } };

/**
 * GET /api/v1/business
 * Response: { success: true, message: string, data: BusinessInfo }
 */
export async function getBusinessInfo(): Promise<BusinessInfo> {
  const res = await fetch(`${BASE}/v1/business`, CACHE);

  if (!res.ok) {
    throw new Error(`GET /v1/business failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  const data = json.data ?? json;

  return {
    name:        data.name        ?? null,
    tagline:     data.tagline     ?? null,
    description: data.description ?? null,
    address:     data.address     ?? null,
    phone:       data.phone       ?? null,
    email:       data.email       ?? null,
    website:     data.website     ?? null,
    currency:    data.currency    ?? 'UGX',
    logo_url:    data.logo_url    ?? null,
  };
}

/**
 * GET /api/v1/business/opening-hours
 * Response: { success: true, message: string, data: { opening_time, closing_time, opening_hours } }
 */
export async function getOpeningHours(): Promise<{
  opening_time:  string | null;
  closing_time:  string | null;
  opening_hours: string | null;
}> {
  const res = await fetch(`${BASE}/v1/business/opening-hours`, CACHE);

  if (!res.ok) {
    throw new Error(`GET /v1/business/opening-hours failed: ${res.status}`);
  }

  const json = await res.json();
  const data = json.data ?? json;

  return {
    opening_time:  data.opening_time  ?? null,
    closing_time:  data.closing_time  ?? null,
    opening_hours: data.opening_hours ?? null,
  };
}
