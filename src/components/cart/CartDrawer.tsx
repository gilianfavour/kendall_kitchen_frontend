'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/src/stores/cartStore';
import { useAuthStore } from '@/src/stores/authStore';

export default function CartDrawer() {
  const {
    items, isOpen, closeCart,
    removeItem, updateQty, totalItems, totalAmount,
  } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const count  = totalItems();
  const total  = totalAmount();

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX', maximumFractionDigits: 0 }).format(n);

  // Trap focus & lock scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={cn(
          'fixed inset-0 z-40 bg-[#1a0a08]/60 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex flex-col w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e8ddd0] shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#c9a84c]" aria-hidden="true" />
            <h2 className="text-base font-bold text-[#2c1410]">
              Your Cart
              {count > 0 && (
                <span className="ml-2 text-xs font-semibold bg-[#c9a84c] text-[#1a0a08] px-1.5 py-0.5 rounded-full">
                  {count}
                </span>
              )}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="h-8 w-8 rounded flex items-center justify-center text-[#7a6050] hover:bg-[#f0e6d3] hover:text-[#2c1410] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <span className="text-5xl opacity-20" aria-hidden="true">🛒</span>
              <div>
                <p className="text-[#2c1410] font-semibold mb-1">Your cart is empty</p>
                <p className="text-[#7a6050] text-sm">
                  Browse the menu and add items to get started.
                </p>
              </div>
              <Link href="/menu" onClick={closeCart}
                className="mt-2 inline-flex items-center gap-2 rounded bg-[#c9a84c] px-5 py-2.5 text-sm font-semibold text-[#1a0a08] hover:bg-[#d4b96a] transition-colors">
                Browse Menu
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.menu_item_id}
                  className="flex gap-4 pb-4 border-b border-[#f0e6d3] last:border-0">
                  {/* Image */}
                  <div className="relative h-16 w-16 shrink-0 rounded-lg overflow-hidden bg-[#f0e6d3]">
                    {item.image_url ? (
                      <Image src={item.image_url} alt={item.name}
                        fill sizes="64px" className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl opacity-20" aria-hidden="true">🍽️</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#2c1410] truncate">{item.name}</p>
                    <p className="text-xs text-[#c9a84c] font-semibold mt-0.5">
                      {fmt(item.unit_price)}
                    </p>
                    {item.special_instructions && (
                      <p className="text-[10px] text-[#b5a090] mt-0.5 line-clamp-1 italic">
                        {item.special_instructions}
                      </p>
                    )}

                    {/* Qty controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.menu_item_id, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="h-6 w-6 rounded-full border border-[#e8ddd0] flex items-center justify-center text-[#5a4035] hover:border-[#c9a84c] hover:text-[#2c1410] transition-colors"
                      >
                        <Minus className="h-3 w-3" aria-hidden="true" />
                      </button>
                      <span className="text-sm font-bold text-[#2c1410] w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.menu_item_id, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="h-6 w-6 rounded-full border border-[#e8ddd0] flex items-center justify-center text-[#5a4035] hover:border-[#c9a84c] hover:text-[#2c1410] transition-colors"
                      >
                        <Plus className="h-3 w-3" aria-hidden="true" />
                      </button>
                      <span className="ml-auto text-sm font-bold text-[#2c1410]">
                        {fmt(item.unit_price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.menu_item_id)}
                        aria-label={`Remove ${item.name} from cart`}
                        className="h-6 w-6 flex items-center justify-center text-[#c5b4a4] hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — only when cart has items */}
        {items.length > 0 && (
          <div className="border-t border-[#e8ddd0] px-6 py-5 space-y-4 shrink-0 bg-white">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#7a6050]">Subtotal ({count} item{count !== 1 ? 's' : ''})</span>
              <span className="text-base font-extrabold text-[#2c1410]">{fmt(total)}</span>
            </div>

            {/* Checkout CTA */}
            {isAuthenticated ? (
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#2c1410] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3d1a1a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : (
              <div className="space-y-2">
                <Link href="/login" onClick={closeCart}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#2c1410] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3d1a1a] transition-colors">
                  Sign in to Checkout
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <p className="text-center text-xs text-[#b5a090]">
                  Don&apos;t have an account?{' '}
                  <Link href="/register" onClick={closeCart} className="text-[#c9a84c] hover:underline">
                    Register free
                  </Link>
                </p>
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
