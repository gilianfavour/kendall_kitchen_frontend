import type { MenuCategory, MenuItem } from '@/src/types';

const BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000/api').replace(/\/$/, '');

const CACHE: RequestInit =
  process.env.NODE_ENV === 'development'
    ? { cache: 'no-store' }
    : { next: { revalidate: 600 } };

/**
 * GET /api/v1/menu/categories
 * Response: { success, message, data: MenuCategory[] }
 */
export async function getMenuCategories(): Promise<MenuCategory[]> {
  const res = await fetch(`${BASE}/v1/menu/categories`, CACHE);
  if (!res.ok) throw new Error(`GET /v1/menu/categories failed: ${res.status}`);
  const json = await res.json();
  return Array.isArray(json.data) ? json.data : [];
}

/**
 * GET /api/v1/menu/items
 *
 * Laravel returns paginator wrapped in ok():
 *   { success, message, data: { data: MenuItem[], current_page, last_page, ... } }
 */
export async function getMenuItems(params?: {
  category_id?: number;
  search?:      string;
  page?:        number;
  per_page?:    number;
}): Promise<MenuItem[]> {
  const url = new URL(`${BASE}/v1/menu/items`);
  if (params?.category_id) url.searchParams.set('category_id', String(params.category_id));
  if (params?.search)      url.searchParams.set('search',      params.search);
  if (params?.page)        url.searchParams.set('page',        String(params.page));
  if (params?.per_page)    url.searchParams.set('per_page',    String(params.per_page));

  const res = await fetch(url.toString(), CACHE);
  if (!res.ok) throw new Error(`GET /v1/menu/items failed: ${res.status}`);

  const json  = await res.json();
  const outer = json.data;

  // Paginator shape: { data: [...], current_page, ... }
  if (outer && Array.isArray(outer.data)) return outer.data;
  // Direct array fallback
  if (Array.isArray(outer)) return outer;
  return [];
}

/**
 * GET /api/v1/menu/specials
 * Backend returns flat MenuItem[] (updated in PublicController).
 * Response: { success, message, data: MenuItem[] }
 */
export async function getSpecials(): Promise<MenuItem[]> {
  const res = await fetch(`${BASE}/v1/menu/specials`, CACHE);
  if (!res.ok) throw new Error(`GET /v1/menu/specials failed: ${res.status}`);
  const json = await res.json();
  return Array.isArray(json.data) ? json.data : [];
}
