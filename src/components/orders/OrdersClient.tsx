'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ShoppingBag, ChevronRight, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProtectedRoute from '@/src/components/auth/ProtectedRoute';
import { getOrders } from '@/src/services/orderService';
import type { Order } from '@/src/types';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX', maximumFractionDigits: 0 }).format(n);

const STATUS_COLORS: Record<string, string> = {
  draft:     'bg-gray-100 text-gray-600',
  confirmed: 'bg-blue-100 text-blue-700',
  completed: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-600',
};

const PAY_COLORS: Record<string, string> = {
  unpaid:  'text-red-600',
  partial: 'text-amber-600',
  paid:    'text-emerald-600',
};

export default function OrdersClient() {
  return (
    <ProtectedRoute>
      <OrdersList />
    </ProtectedRoute>
  );
}

function OrdersList() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['orders', page],
    queryFn:  () => getOrders(page),
  });

  const orders: Order[] = data?.data ?? [];
  const lastPage = data?.last_page ?? 1;

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#fdf9f4] py-10 lg:py-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-2">Account</p>
          <h1 className="text-2xl font-bold text-[#2c1410]">My Orders</h1>
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <span className="h-8 w-8 rounded-full border-2 border-[#c9a84c]/30 border-t-[#c9a84c] animate-spin" aria-hidden="true" />
          </div>
        )}

        {isError && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-5 py-4 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            Could not load your orders. Please try again.
          </div>
        )}

        {!isLoading && !isError && orders.length === 0 && (
          <div className="flex flex-col items-center py-24 text-center gap-4">
            <ShoppingBag className="h-12 w-12 text-[#e8ddd0]" aria-hidden="true" />
            <div>
              <p className="font-semibold text-[#2c1410] mb-1">No orders yet</p>
              <p className="text-sm text-[#7a6050]">Place your first order from the menu.</p>
            </div>
            <Link href="/menu"
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[#c9a84c] px-5 py-2.5 text-sm font-semibold text-[#1a0a08] hover:bg-[#d4b96a] transition-colors">
              Browse Menu
            </Link>
          </div>
        )}

        {orders.length > 0 && (
          <div className="space-y-3">
            {orders.map((order) => (
              <Link key={order.id} href={`/orders/${order.order_number}`}
                className="group flex items-center gap-4 bg-white rounded-2xl border border-[#e8ddd0] px-5 py-4 hover:border-[#c9a84c]/50 hover:shadow-md transition-all duration-200">

                {/* Icon */}
                <div className="h-10 w-10 rounded-xl bg-[#fdf9f4] border border-[#e8ddd0] flex items-center justify-center shrink-0">
                  <ShoppingBag className="h-5 w-5 text-[#c9a84c]" aria-hidden="true" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold text-[#2c1410] font-mono">{order.order_number}</p>
                    <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full', STATUS_COLORS[order.order_status] ?? 'bg-gray-100 text-gray-600')}>
                      {order.status_label}
                    </span>
                  </div>
                  <p className="text-xs text-[#b5a090] mt-0.5">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''} ·{' '}
                    {new Date(order.created_at).toLocaleDateString('en-UG', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>

                {/* Amount */}
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-[#2c1410]">{fmt(order.total_amount)}</p>
                  <p className={cn('text-xs font-semibold', PAY_COLORS[order.payment_status] ?? 'text-gray-500')}>
                    {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                  </p>
                </div>

                <ChevronRight className="h-4 w-4 text-[#c5b4a4] group-hover:text-[#c9a84c] transition-colors shrink-0" aria-hidden="true" />
              </Link>
            ))}

            {/* Pagination */}
            {lastPage > 1 && (
              <div className="flex justify-center gap-3 pt-4">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-[#e8ddd0] text-sm text-[#5a4035] hover:border-[#c9a84c] disabled:opacity-40 transition-colors">
                  Previous
                </button>
                <span className="flex items-center text-sm text-[#7a6050]">Page {page} of {lastPage}</span>
                <button onClick={() => setPage(p => Math.min(lastPage, p + 1))} disabled={page === lastPage}
                  className="px-4 py-2 rounded-lg border border-[#e8ddd0] text-sm text-[#5a4035] hover:border-[#c9a84c] disabled:opacity-40 transition-colors">
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
