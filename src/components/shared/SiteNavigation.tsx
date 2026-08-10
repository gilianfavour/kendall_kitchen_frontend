'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, User, LogOut, ShoppingBag, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/src/stores/authStore';
import { useCartStore } from '@/src/stores/cartStore';
import { logout } from '@/src/services/authService';
import type { BusinessInfo } from '@/src/types';

const NAV_LINKS = [
  { href: '/',         label: 'Home'     },
  { href: '/menu',     label: 'Menu'     },
  { href: '/catering', label: 'Catering' },
  { href: '/about',    label: 'About'    },
  { href: '/contact',  label: 'Contact'  },
];

interface SiteNavigationProps {
  business: BusinessInfo | null;
}

export default function SiteNavigation({ business }: SiteNavigationProps) {
  const [open,        setOpen]        = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  // Prevent hydration mismatch: Zustand reads from localStorage which
  // doesn't exist on the server. Only expose auth/cart state after mount.
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react/no-direct-mutation-state
  useEffect(() => { setMounted(true); }, []); // intentional: mount-only flag

  const pathname = usePathname();
  const router   = useRouter();

  const { customer, isAuthenticated, clearAuth } = useAuthStore();
  const { totalItems, toggleCart } = useCartStore();

  const cartCount  = mounted ? totalItems() : 0;
  const isAuthed   = mounted && isAuthenticated;
  const activeUser = mounted ? customer : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  const handleLogout = async () => {
    try { await logout(); } catch { /* ignore */ }
    clearAuth();
    router.push('/');
  };

  const brandName = business?.name ?? 'Kendall Kitchen';
  const isActive  = (href: string) => pathname === href;
  const initials  = activeUser
    ? (activeUser.first_name[0] + activeUser.last_name[0]).toUpperCase()
    : '';

  return (
    <header
      role="banner"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-[#2c1410]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Brand */}
          <Link href="/"
            className="text-white font-bold text-lg tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded"
            aria-label={`${brandName} – home`}
          >
            {brandName}
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={cn(
                  'px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded',
                  isActive(link.href)
                    ? 'text-white font-semibold underline underline-offset-4 decoration-[#c9a84c] decoration-2'
                    : 'text-[#c9a84c] hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right — cart + Book Event + auth (desktop) */}
          <div className="hidden md:flex items-center gap-3">

            {/* Cart icon */}
            <button
              onClick={toggleCart}
              aria-label={cartCount > 0 ? `Open cart, ${cartCount} items` : 'Open cart'}
              className="relative flex items-center justify-center h-9 w-9 rounded-full text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-[18px] min-w-[18px] rounded-full bg-[#c9a84c] text-[#1a0a08] text-[10px] font-bold flex items-center justify-center px-1 leading-none">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            <Link href="/catering#inquire"
              className="rounded bg-[#c9a84c] px-5 py-2 text-sm font-semibold text-[#1a0a08] hover:bg-[#d4b96a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2c1410]"
            >
              Book Event
            </Link>

            {isAuthed && activeUser ? (
              <div className="relative">
                <button
                  onClick={() => setAccountOpen(v => !v)}
                  aria-expanded={accountOpen}
                  aria-haspopup="menu"
                  className="flex items-center gap-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors px-3 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                >
                  <span className="h-6 w-6 rounded-full bg-[#c9a84c] text-[#1a0a08] text-xs font-bold flex items-center justify-center">
                    {initials}
                  </span>
                  <span className="text-white text-xs font-medium max-w-[80px] truncate">
                    {activeUser.first_name}
                  </span>
                  <ChevronDown className={cn('h-3.5 w-3.5 text-white/70 transition-transform', accountOpen && 'rotate-180')} />
                </button>

                {accountOpen && (
                  <div role="menu"
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-[#e8ddd0] shadow-lg py-1.5 z-50"
                  >
                    <div className="px-4 py-2.5 border-b border-[#f0e6d3]">
                      <p className="text-xs font-semibold text-[#2c1410]">{activeUser.full_name}</p>
                      <p className="text-[10px] text-[#b5a090] truncate">{activeUser.email}</p>
                    </div>
                    <Link href="/orders" role="menuitem"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#3d1a1a] hover:bg-[#fdf9f4] transition-colors">
                      <ShoppingBag className="h-3.5 w-3.5 text-[#c9a84c]" />
                      My Orders
                    </Link>
                    <Link href="/account" role="menuitem"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#3d1a1a] hover:bg-[#fdf9f4] transition-colors">
                      <User className="h-3.5 w-3.5 text-[#c9a84c]" />
                      My Account
                    </Link>
                    <button onClick={handleLogout} role="menuitem"
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <LogOut className="h-3.5 w-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login"
                className="flex items-center gap-1.5 rounded-full border border-white/30 px-4 py-1.5 text-sm font-medium text-white hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
              >
                <User className="h-3.5 w-3.5" aria-hidden="true" />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile — cart + hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={toggleCart}
              aria-label={cartCount > 0 ? `Open cart, ${cartCount} items` : 'Open cart'}
              className="relative p-2 text-white rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 h-4 min-w-[16px] rounded-full bg-[#c9a84c] text-[#1a0a08] text-[10px] font-bold flex items-center justify-center px-1 leading-none">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
            <button type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(v => !v)}
              className="text-white p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div id="mobile-nav" role="navigation" aria-label="Mobile navigation"
        className={cn(
          'md:hidden bg-[#2c1410] border-t border-white/10 overflow-hidden transition-all duration-300',
          open ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        )}
      >
        <div className="px-6 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={close}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={cn(
                'block py-2.5 text-sm transition-colors',
                isActive(link.href)
                  ? 'text-white font-semibold underline underline-offset-4 decoration-[#c9a84c] decoration-2'
                  : 'text-[#c9a84c] hover:text-white'
              )}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-white/10 space-y-2">
            <Link href="/catering#inquire" onClick={close}
              className="block text-center rounded bg-[#c9a84c] px-5 py-2.5 text-sm font-semibold text-[#1a0a08] hover:bg-[#d4b96a] transition-colors">
              Book Event
            </Link>

            {isAuthed && activeUser ? (
              <>
                <Link href="/orders" onClick={close}
                  className="flex items-center gap-2 py-2 text-sm text-[#c9a84c]">
                  <ShoppingBag className="h-4 w-4" />
                  My Orders
                </Link>
                <Link href="/account" onClick={close}
                  className="flex items-center gap-2 py-2 text-sm text-[#c9a84c]">
                  <User className="h-4 w-4" />
                  My Account
                </Link>
                <button onClick={handleLogout}
                  className="flex items-center gap-2 py-2 text-sm text-red-400 w-full">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/login" onClick={close}
                className="flex items-center justify-center gap-2 rounded border border-white/30 px-5 py-2.5 text-sm font-medium text-white hover:border-[#c9a84c] transition-colors">
                <User className="h-4 w-4" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
