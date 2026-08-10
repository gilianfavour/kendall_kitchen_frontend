import apiClient from '@/src/lib/axios';
import type { CateringEventSummary, CateringEventType, CateringInquiryFormData, CateringPageContent, CateringService } from '@/src/types';

const BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000/api').replace(/\/$/, '');

const CACHE: RequestInit =
  process.env.NODE_ENV === 'development'
    ? { cache: 'no-store' }
    : { next: { revalidate: 60 } };

/**
 * GET /api/v1/catering-page
 * Returns all CMS-managed catering page content.
 */
export async function getCateringPageContent(): Promise<CateringPageContent> {
  const res = await fetch(`${BASE}/v1/catering-page`, CACHE);
  if (!res.ok) throw new Error(`GET /v1/catering-page failed: ${res.status}`);
  const json = await res.json();
  return json.data;
}

/**
 * GET /api/v1/catering/services
 */
export async function getCateringServices(): Promise<CateringService[]> {
  const res = await fetch(`${BASE}/v1/catering/services`, CACHE);
  if (!res.ok) throw new Error(`GET /v1/catering/services failed: ${res.status}`);
  const json = await res.json();
  return Array.isArray(json.data) ? json.data : [];
}

/**
 * GET /api/v1/catering/services/{slug}
 */
export async function getCateringServiceBySlug(slug: string): Promise<CateringService> {
  const res = await fetch(`${BASE}/v1/catering/services/${slug}`, CACHE);
  if (!res.ok) throw new Error(`GET /v1/catering/services/${slug} failed: ${res.status}`);
  const json = await res.json();
  return json.data;
}
export async function getCateringEventTypes(): Promise<CateringEventType[]> {
  const res = await fetch(`${BASE}/v1/catering/event-types`, {
    ...(process.env.NODE_ENV === 'development' ? { cache: 'no-store' } : { next: { revalidate: 86400 } }),
  });
  if (!res.ok) throw new Error(`GET /v1/catering/event-types failed: ${res.status}`);
  const json = await res.json();
  return Array.isArray(json.data) ? json.data : [];
}

/**
 * POST /api/v1/catering/inquiries
 */
export async function submitCateringInquiry(data: CateringInquiryFormData): Promise<{
  event_number: string;
  message: string;
}> {
  const res = await apiClient.post('/v1/catering/inquiries', data);
  return {
    event_number: res.data?.data?.event_number ?? '',
    message:      res.data?.message ?? 'Inquiry submitted.',
  };
}

/**
 * GET /api/v1/catering/my-events  (authenticated)
 * Returns the customer's catering inquiries/events.
 */
export async function getMyEvents(): Promise<CateringEventSummary[]> {
  const res = await apiClient.get('/v1/catering/my-events');
  return res.data?.data?.data ?? [];
}

/**
 * GET /api/v1/catering/my-events/{eventNumber}  (authenticated)
 */
export async function getMyEvent(eventNumber: string): Promise<CateringEventSummary> {
  const res = await apiClient.get(`/v1/catering/my-events/${eventNumber}`);
  return res.data?.data;
}
