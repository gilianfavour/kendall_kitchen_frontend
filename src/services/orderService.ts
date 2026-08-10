import apiClient from '@/src/lib/axios';
import type { Order, PaymentData, PlaceOrderData } from '@/src/types';

/** POST /api/v1/orders */
export async function placeOrder(data: PlaceOrderData): Promise<Order> {
  const res = await apiClient.post('/v1/orders', data);
  return res.data.data;
}

/** GET /api/v1/orders */
export async function getOrders(page = 1): Promise<{ data: Order[]; last_page: number; total: number }> {
  const res = await apiClient.get('/v1/orders', { params: { page } });
  return res.data.data;
}

/** GET /api/v1/orders/{orderNumber} */
export async function getOrder(orderNumber: string): Promise<Order> {
  const res = await apiClient.get(`/v1/orders/${orderNumber}`);
  return res.data.data;
}

/** GET /api/v1/orders/{orderNumber}/track */
export async function trackOrder(orderNumber: string): Promise<{
  order_number:   string;
  order_status:   string;
  payment_status: string;
  kitchen_status: string | null;
  is_ready:       boolean;
}> {
  const res = await apiClient.get(`/v1/orders/${orderNumber}/track`);
  return res.data.data;
}

/** POST /api/v1/orders/{orderNumber}/cancel */
export async function cancelOrder(orderNumber: string): Promise<Order> {
  const res = await apiClient.post(`/v1/orders/${orderNumber}/cancel`);
  return res.data.data;
}

/** GET /api/v1/payments/methods */
export async function getPaymentMethods(): Promise<Array<{ value: string; label: string; is_deferred: boolean }>> {
  const res = await apiClient.get('/v1/payments/methods');
  return res.data.data;
}

/** POST /api/v1/payments/initiate */
export async function initiatePayment(data: PaymentData): Promise<{ payment: unknown; order: Order }> {
  const res = await apiClient.post('/v1/payments/initiate', data);
  return res.data.data;
}
