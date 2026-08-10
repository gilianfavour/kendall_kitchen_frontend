'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Star, LogOut, User, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import ProtectedRoute from '@/src/components/auth/ProtectedRoute';
import { useAuthStore } from '@/src/stores/authStore';
import { logout } from '@/src/services/authService';

export default function AccountClient() {
  return (
    <ProtectedRoute>
      <AccountView />
    </ProtectedRoute>
  );
}

function AccountView() {
  const router   = useRouter();
  const { customer, clearAuth } = useAuthStore();

  const handleLogout = async () => {
    try { await logout(); } catch { /* ignore */ }
    clearAuth();
    toast.success('Signed out');
    router.push('/');
  };

  if (!customer) return null;

  const initials = (customer.first_name[0] + customer.last_name[0]).toUpperCase();

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#fdf9f4] py-10 lg:py-16">
      <div className="mx-auto max-w-2xl px-6 lg:px-8 space-y-6">

        {/* Profile header */}
        <div className="bg-white rounded-2xl border border-[#e8ddd0] p-6">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-full bg-[#2c1410] text-white text-2xl font-bold flex items-center justify-center shrink-0">
              {initials}
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#2c1410]">{customer.full_name}</h1>
              <p className="text-xs text-[#b5a090] mt-0.5 font-mono">{customer.customer_code}</p>
            </div>
          </div>

          {/* Contact details */}
          <div className="mt-5 pt-5 border-t border-[#f0e6d3] space-y-3">
            {customer.email && (
              <div className="flex items-center gap-3 text-sm text-[#5a4035]">
                <Mail className="h-4 w-4 text-[#c9a84c] shrink-0" aria-hidden="true" />
                {customer.email}
              </div>
            )}
            {customer.phone_number && (
              <div className="flex items-center gap-3 text-sm text-[#5a4035]">
                <Phone className="h-4 w-4 text-[#c9a84c] shrink-0" aria-hidden="true" />
                {customer.phone_number}
              </div>
            )}
            {(customer.address || customer.city) && (
              <div className="flex items-center gap-3 text-sm text-[#5a4035]">
                <MapPin className="h-4 w-4 text-[#c9a84c] shrink-0" aria-hidden="true" />
                {[customer.address, customer.city].filter(Boolean).join(', ')}
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Orders',  value: customer.total_orders.toString() },
            { label: 'Total Spent',   value: `UGX ${Number(customer.total_spent).toLocaleString()}` },
            { label: 'Loyalty Points', value: customer.loyalty_points.toString() },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-2xl border border-[#e8ddd0] p-4 text-center">
              <p className="text-xl font-extrabold text-[#2c1410]">{value}</p>
              <p className="text-[10px] text-[#b5a090] uppercase tracking-wide mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Loyalty points explainer */}
        {customer.loyalty_points > 0 && (
          <div className="bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-2xl p-5 flex items-center gap-4">
            <Star className="h-8 w-8 text-[#c9a84c] shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold text-[#2c1410]">{customer.loyalty_points} Loyalty Points</p>
              <p className="text-xs text-[#7a6050] mt-0.5">
                You earn 1 point per UGX 10,000 spent. Points can be redeemed on future orders.
              </p>
            </div>
          </div>
        )}

        {/* Quick links */}
        <div className="bg-white rounded-2xl border border-[#e8ddd0] divide-y divide-[#f0e6d3]">
          <Link href="/orders"
            className="flex items-center gap-4 px-5 py-4 hover:bg-[#fdf9f4] transition-colors group">
            <ShoppingBag className="h-5 w-5 text-[#c9a84c]" aria-hidden="true" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#2c1410]">My Orders</p>
              <p className="text-xs text-[#b5a090]">View and track your order history</p>
            </div>
            <span className="text-[#c5b4a4] group-hover:text-[#c9a84c] transition-colors">›</span>
          </Link>

          <Link href="/catering/track"
            className="flex items-center gap-4 px-5 py-4 hover:bg-[#fdf9f4] transition-colors group">
            <User className="h-5 w-5 text-[#c9a84c]" aria-hidden="true" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#2c1410]">Track Catering Inquiry</p>
              <p className="text-xs text-[#b5a090]">Check the status of a catering event</p>
            </div>
            <span className="text-[#c5b4a4] group-hover:text-[#c9a84c] transition-colors">›</span>
          </Link>
        </div>

        {/* Sign out */}
        <div className="text-center">
          <button onClick={handleLogout}
            className="inline-flex items-center gap-2 text-sm text-[#7a6050] hover:text-red-600 transition-colors">
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}
