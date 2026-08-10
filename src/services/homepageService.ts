import type { HomepageContent, ServiceCard, SocialLink } from '@/src/types';

const BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000/api').replace(/\/$/, '');

const CACHE: RequestInit =
  process.env.NODE_ENV === 'development'
    ? { cache: 'no-store' }
    : { next: { revalidate: 60 } };

/**
 * GET /api/v1/homepage
 * Returns all CMS homepage content in one request.
 */
export async function getHomepageContent(): Promise<HomepageContent> {
  const res = await fetch(`${BASE}/v1/homepage`, CACHE);
  if (!res.ok) throw new Error(`GET /v1/homepage failed: ${res.status}`);
  const json = await res.json();
  return json.data;
}

/**
 * GET /api/v1/services
 * Returns all active service cards ordered by sort_order.
 */
export async function getServiceCards(): Promise<ServiceCard[]> {
  const res = await fetch(`${BASE}/v1/services`, CACHE);
  if (!res.ok) throw new Error(`GET /v1/services failed: ${res.status}`);
  const json = await res.json();
  return Array.isArray(json.data) ? json.data : [];
}

/**
 * GET /api/v1/social-links
 * Returns all active social media links.
 */
export async function getSocialLinks(): Promise<SocialLink[]> {
  const res = await fetch(`${BASE}/v1/social-links`, CACHE);
  if (!res.ok) throw new Error(`GET /v1/social-links failed: ${res.status}`);
  const json = await res.json();
  return Array.isArray(json.data) ? json.data : [];
}
