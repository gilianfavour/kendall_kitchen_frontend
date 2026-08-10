import type { Testimonial } from '@/src/types';

const BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000/api').replace(/\/$/, '');

const CACHE: RequestInit =
  process.env.NODE_ENV === 'development'
    ? { cache: 'no-store' }
    : { next: { revalidate: 3600 } };

/**
 * GET /api/v1/testimonials
 * Response: { success, message, data: Testimonial[] }
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await fetch(`${BASE}/v1/testimonials`, CACHE);

  if (!res.ok) {
    // Non-fatal — return empty array so the UI shows placeholder cards
    console.warn(`[testimonialService] GET /v1/testimonials returned ${res.status}`);
    return [];
  }

  const json = await res.json();
  return Array.isArray(json.data) ? json.data : [];
}
