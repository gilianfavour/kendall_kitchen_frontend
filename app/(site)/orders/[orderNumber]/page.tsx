import type { Metadata } from 'next';
import OrderDetailClient from '@/src/components/orders/OrderDetailClient';

export const metadata: Metadata = { title: 'Order Details' };

interface Props { params: Promise<{ orderNumber: string }> }

export default async function OrderDetailPage({ params }: Props) {
  const { orderNumber } = await params;
  return <OrderDetailClient orderNumber={orderNumber} />;
}
