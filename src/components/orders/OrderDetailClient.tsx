'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, AlertCircle, XCircle, CreditCard, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import ProtectedRoute from '@/src/components/auth/ProtectedRoute';
import { getOrder, cancelOrder, getPaymentMethods, initiatePayment } from '@/src/services/orderService';
import type { Order } from '@/src/types';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX', maximumFractionDigits: 0 }).format(n);

const STATUS_COLORS: Record<string, string> = {
  draft:     'bg-gray-100 text-gray-700',
  confirmed: 'bg-blue-100 text-blue-700',
  completed: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
};

const PAY_STATUS_COLORS: Record<string, string> = {
  unpaid:   'bg-red-100 text-red-700',
  partial:  'bg-amber-100 text-amber-700',
  paid:     'bg-emerald-100 text-emerald-700',
  refunded: 'bg-gray-100 text-gray-700',
};

export default function OrderDetailClient({ orderNumber }: { orderNumber: string }) {
  return (
    <ProtectedRoute>
      <OrderDetail orderNumber={orderNumber} />
    </ProtectedRoute>
  );
}

function OrderDetail({ orderNumber }: { orderNumber: string }) {
  const qc = useQueryClient();
  const [payMethod,  setPayMethod]  = useState('');
  const [payRef,     setPayRef]     = useState('');
  const [showPayForm, setShowPayForm] = useState(false);

  const { data: order, isLoading, isError } = useQuery<Order>({
    queryKey: ['order', orderNumber],
    queryFn:  () => getOrder(orderNumber),
    refetchInterval: (q) => {
      const status = q.state.data?.order_status;
      // Stop polling once terminal
      return status === 'completed' || status === 'cancelled' ? false : 10_000;
    },
  });

  const { data: methods = [] } = useQuery({
    queryKey: ['payment-methods'],
    queryFn:  getPaymentMethods,
    staleTime: Infinity,
  });

  const cancelMutation = useMutation({
    mutationFn: () => cancelOrder(orderNumber),
    onSuccess: () => {
      toast.success('Order cancelled.');
      qc.invalidateQueries({ queryKey: ['order', orderNumber] });
      qc.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: () => toast.error('Could not cancel order.'),
  });

  const payMutation = useMutation({
    mutationFn: () => initiatePayment({
      order_number:    orderNumber,
      payment_method:  payMethod,
      amount:          order?.balance_due ?? 0,
      reference_number: payRef || undefined,
    }),
    onSuccess: () => {
      toast.success('Payment recorded!');
      setShowPayForm(false);
      setPayMethod('');
      setPayRef('');
      qc.invalidateQueries({ queryKey: ['order', orderNumber] });
    },
    onError: () => toast.error('Payment failed. Please try again.'),
  });

  if (isLoading) return (
    <main className="min-h-screen bg-[#fdf9f4] flex items-center justify-center">
      <span className="h-8 w-8 rounded-full border-2 border-[#c9a84c]/30 border-t-[#c9a84c] animate-spin" aria-hidden="true" />
    </main>
  );

  if (isError || !order) return (
    <main className="min-h-screen bg-[#fdf9f4] flex flex-col items-center justify-center gap-4 py-20 text-center">
      <AlertCircle className="h-12 w-12 text-red-400" aria-hidden="true" />
      <p className="text-[#2c1410] font-semibold">Order not found</p>
      <Link href="/orders" className="text-sm text-[#c9a84c] hover:underline">← Back to orders</Link>
    </main>
  );

  const isDraft    = order.order_status === 'draft';
  const isCancelled = order.order_status === 'cancelled';
  const isPaid     = order.payment_status === 'paid';
  const hasBalance = order.balance_due > 0;

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#fdf9f4] py-10 lg:py-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 space-y-6">

        {/* Back */}
        <Link href="/orders"
          className="inline-flex items-center gap-1.5 text-[#7a6050] hover:text-[#2c1410] text-xs transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Orders
        </Link>

        {/* Header card */}
        <div className="bg-white rounded-2xl border border-[#e8ddd0] p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-mono text-[#b5a090] mb-1">{order.order_number}</p>
              <h1 className="text-xl font-bold text-[#2c1410]">{order.order_type_label} Order</h1>
              <p className="text-xs text-[#b5a090] mt-0.5">
                {new Date(order.created_at).toLocaleDateString('en-UG', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <span className={cn('text-xs font-semibold px-3 py-1 rounded-full', STATUS_COLORS[order.order_status] ?? 'bg-gray-100 text-gray-700')}>
                {order.status_label}
              </span>
              <span className={cn('text-xs font-semibold px-3 py-1 rounded-full', PAY_STATUS_COLORS[order.payment_status] ?? 'bg-gray-100 text-gray-700')}>
                {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
              </span>
            </div>
          </div>

          {/* Kitchen status bar */}
          {order.kitchen_status && (
            <div className="mt-4 pt-4 border-t border-[#f0e6d3] flex items-center gap-2">
              <RefreshCw className="h-3.5 w-3.5 text-[#c9a84c] animate-spin" aria-hidden="true" />
              <p className="text-xs text-[#7a6050]">
                Kitchen status: <span className="font-semibold text-[#2c1410] capitalize">{order.kitchen_status.replace('_', ' ')}</span>
              </p>
            </div>
          )}
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl border border-[#e8ddd0]">
          <div className="px-6 py-4 border-b border-[#f0e6d3]">
            <h2 className="text-sm font-bold text-[#2c1410] uppercase tracking-wide">Items</h2>
          </div>
          <ul className="divide-y divide-[#f0e6d3]">
            {order.items.map((item) => (
              <li key={item.id} className="flex gap-4 px-6 py-4">
                <div className="relative h-14 w-14 shrink-0 rounded-lg overflow-hidden bg-[#f0e6d3]">
                  {item.image_url ? (
                    <Image src={item.image_url} alt={item.name} fill sizes="56px" className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-lg opacity-20">🍽️</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#2c1410]">{item.name}</p>
                  <p className="text-xs text-[#b5a090]">{fmt(item.unit_price)} × {item.quantity}</p>
                  {item.special_instructions && (
                    <p className="text-[10px] text-[#b5a090] italic mt-0.5">{item.special_instructions}</p>
                  )}
                </div>
                <p className="text-sm font-bold text-[#2c1410] shrink-0">{fmt(item.subtotal)}</p>
              </li>
            ))}
          </ul>
          {/* Totals */}
          <div className="px-6 py-4 border-t border-[#f0e6d3] space-y-2">
            <div className="flex justify-between text-sm text-[#5a4035]"><span>Subtotal</span><span>{fmt(order.subtotal)}</span></div>
            {order.discount_amount > 0 && <div className="flex justify-between text-sm text-emerald-700"><span>Discount</span><span>−{fmt(order.discount_amount)}</span></div>}
            {order.tax_amount > 0 && <div className="flex justify-between text-sm text-[#5a4035]"><span>Tax</span><span>{fmt(order.tax_amount)}</span></div>}
            <div className="flex justify-between text-sm font-bold text-[#2c1410] pt-2 border-t border-[#f0e6d3]"><span>Total</span><span>{fmt(order.total_amount)}</span></div>
            {order.amount_paid > 0 && <div className="flex justify-between text-sm text-emerald-700"><span>Paid</span><span>{fmt(order.amount_paid)}</span></div>}
            {hasBalance && <div className="flex justify-between text-sm font-bold text-red-600"><span>Balance Due</span><span>{fmt(order.balance_due)}</span></div>}
          </div>
        </div>

        {/* Payment section */}
        {!isCancelled && hasBalance && !isPaid && (
          <div className="bg-white rounded-2xl border border-[#e8ddd0] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#2c1410] uppercase tracking-wide">Pay Now</h2>
              <span className="text-lg font-extrabold text-red-600">{fmt(order.balance_due)}</span>
            </div>

            {!showPayForm ? (
              <button onClick={() => setShowPayForm(true)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#2c1410] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3d1a1a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]">
                <CreditCard className="h-4 w-4" />
                Record Payment
              </button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#3d1a1a] uppercase tracking-wide block mb-1.5">
                    Payment Method <span className="text-[#c9a84c]">*</span>
                  </label>
                  <select value={payMethod} onChange={e => setPayMethod(e.target.value)}
                    className="w-full rounded-lg border border-[#e8ddd0] bg-[#fdf9f4] px-3.5 py-2.5 text-sm text-[#2c1410] outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20">
                    <option value="">Select method…</option>
                    {methods.map(m => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#3d1a1a] uppercase tracking-wide block mb-1.5">
                    Reference / Transaction ID (optional)
                  </label>
                  <input type="text" value={payRef} onChange={e => setPayRef(e.target.value)}
                    placeholder="e.g. MTN ref, bank slip number"
                    className="w-full rounded-lg border border-[#e8ddd0] bg-[#fdf9f4] px-3.5 py-2.5 text-sm text-[#2c1410] placeholder:text-[#c5b4a4] outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20" />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => payMutation.mutate()} disabled={!payMethod || payMutation.isPending}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#2c1410] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3d1a1a] disabled:opacity-60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]">
                    {payMutation.isPending ? <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : <CreditCard className="h-4 w-4" />}
                    {payMutation.isPending ? 'Processing…' : 'Submit Payment'}
                  </button>
                  <button onClick={() => setShowPayForm(false)}
                    className="px-4 py-3 rounded-lg border border-[#e8ddd0] text-sm text-[#5a4035] hover:border-[#c9a84c] transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Payments history */}
        {order.payments.length > 0 && (
          <div className="bg-white rounded-2xl border border-[#e8ddd0]">
            <div className="px-6 py-4 border-b border-[#f0e6d3]">
              <h2 className="text-sm font-bold text-[#2c1410] uppercase tracking-wide">Payment History</h2>
            </div>
            <ul className="divide-y divide-[#f0e6d3]">
              {order.payments.map(p => (
                <li key={p.id} className="flex justify-between items-center px-6 py-3 text-sm">
                  <div>
                    <p className="font-medium text-[#2c1410]">{p.method_label}</p>
                    <p className="text-xs text-[#b5a090]">{p.payment_number} · {p.payment_date}</p>
                    {p.reference_number && <p className="text-[10px] text-[#b5a090] font-mono">{p.reference_number}</p>}
                  </div>
                  <p className="font-bold text-emerald-700">{fmt(p.amount)}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Cancel order */}
        {isDraft && (
          <div className="text-center">
            <button onClick={() => cancelMutation.mutate()} disabled={cancelMutation.isPending}
              className="inline-flex items-center gap-2 text-sm text-red-500 hover:text-red-700 transition-colors disabled:opacity-60">
              <XCircle className="h-4 w-4" aria-hidden="true" />
              {cancelMutation.isPending ? 'Cancelling…' : 'Cancel this order'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
