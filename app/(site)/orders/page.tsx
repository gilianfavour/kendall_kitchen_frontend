import type { Metadata } from 'next';
import OrdersClient from '@/src/components/orders/OrdersClient';

export const metadata: Metadata = { title: 'My Orders' };

export default function OrdersPage() {
  return <OrdersClient />;
}
