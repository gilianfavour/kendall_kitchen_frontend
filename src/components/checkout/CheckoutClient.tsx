'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import ProtectedRoute from '@/src/components/auth/ProtectedRoute';
import { useCartStore } from '@/src/stores/cartStore';
import { placeOrder } from '@/src/services/orderService';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX', maximumFractionDigits: 0 }).format(n);

export default function CheckoutClient() {
  return (
    <ProtectedRoute redirectTo="/login">
      <CheckoutForm />
    </ProtectedRoute>
  );
}

function CheckoutForm() {
  const router    = useRouter();
  const { items, totalAmount, clearCart } = useCartStore();
  const total     = totalAmount();
  const [notes,   setNotes]   = useState('');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;
    setLoading(true);
    setError('');
    try {
      const order = await placeOrder({
        order_type: 'online',
        notes:      notes || undefined,
        items: items.map(i => ({
          menu_item_id:         i.menu_item_id,
          quantity:             i.quantity,
          special_instructions: i.special_instructions,
        })),
      });
      clearCart();
      toast.success(`Order ${order.order_number} placed!`);
      router.push(`/orders/${order.order_number}`);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr?.response?.data?.message ?? 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#fdf9f4] flex flex-col items-center justify-center py-20 px-6 text-center">
        <span className="text-5xl mb-6 opacity-20" aria-hidden="true">🛒</span>
        <h1 className="text-2xl font-bold text-[#2c1410] mb-3">Your cart is empty</h1>
        <p className="text-[#7a6050] text-sm mb-8">Add items from the menu before checking out.</p>
        <Link href="/menu"
          className="inline-flex items-center gap-2 rounded-lg bg-[#2c1410] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3d1a1a] transition-colors">
          <ShoppingBag className="h-4 w-4" />
          Browse Menu
        </Link>
      </main>
    );
  }

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#fdf9f4] py-10 lg:py-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <Link href="/menu"
            className="inline-flex items-center gap-1.5 text-[#7a6050] hover:text-[#2c1410] text-xs mb-4 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Menu
          </Link>
          <h1 className="text-2xl font-bold text-[#2c1410]">Review Your Order</h1>
          <p className="text-[#7a6050] text-sm mt-1">Check your items then place your order. Payment can be made after.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Items list */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl border border-[#e8ddd0] divide-y divide-[#f0e6d3]">
              {items.map((item) => (
                <div key={item.menu_item_id} className="flex gap-4 p-4">
                  <div className="relative h-16 w-16 shrink-0 rounded-lg overflow-hidden bg-[#f0e6d3]">
                    {item.image_url ? (
                      <Image src={item.image_url} alt={item.name} fill sizes="64px" className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-xl opacity-20">🍽️</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#2c1410]">{item.name}</p>
                    <p className="text-xs text-[#b5a090] mt-0.5">{fmt(item.unit_price)} × {item.quantity}</p>
                    {item.special_instructions && (
                      <p className="text-[10px] text-[#b5a090] italic mt-0.5">{item.special_instructions}</p>
                    )}
                  </div>
                  <p className="text-sm font-bold text-[#2c1410] shrink-0">
                    {fmt(item.unit_price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Notes */}
            <div className="bg-white rounded-2xl border border-[#e8ddd0] p-5">
              <label className="text-xs font-semibold text-[#3d1a1a] uppercase tracking-wide block mb-2">
                Order Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
                placeholder="Any special requests or instructions for the kitchen…"
                className="w-full rounded-lg border border-[#e8ddd0] bg-[#fdf9f4] px-3.5 py-2.5 text-sm text-[#2c1410] placeholder:text-[#c5b4a4] outline-none transition-colors focus:bg-white focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 resize-none"
              />
            </div>
          </div>

          {/* Summary + Place Order */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-[#e8ddd0] p-6 sticky top-24 space-y-5">
              <h2 className="text-sm font-bold text-[#2c1410] uppercase tracking-wide">Order Summary</h2>

              <div className="space-y-2.5 text-sm">
                {items.map(i => (
                  <div key={i.menu_item_id} className="flex justify-between text-[#5a4035]">
                    <span className="truncate mr-2">{i.name} ×{i.quantity}</span>
                    <span className="shrink-0 font-medium">{fmt(i.unit_price * i.quantity)}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-3 border-t border-[#f0e6d3] font-bold text-[#2c1410]">
                  <span>Total</span>
                  <span>{fmt(total)}</span>
                </div>
              </div>

              <div className="rounded-lg bg-amber-50 border border-amber-100 px-3 py-2.5 text-xs text-amber-800 flex items-start gap-2">
                <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" aria-hidden="true" />
                Payment is collected separately after your order is confirmed.
              </div>

              {error && (
                <div role="alert" className="rounded-lg bg-red-50 border border-red-100 px-3 py-2.5 text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" aria-hidden="true" />
                  {error}
                </div>
              )}

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#2c1410] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3d1a1a] disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2"
              >
                {loading ? (
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" aria-hidden="true" />
                ) : (
                  <CheckCircle className="h-4 w-4" aria-hidden="true" />
                )}
                {loading ? 'Placing Order…' : 'Place Order'}
              </button>

              <p className="text-center text-[10px] text-[#b5a090]">
                By placing this order you agree to our terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
