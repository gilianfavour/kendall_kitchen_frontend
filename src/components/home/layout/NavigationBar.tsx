'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BusinessInfo, HomepageContent } from '@/src/types';

const NAV_LINKS = [
  { href: '#hero',         label: 'Home' },
  { href: '#services',     label: 'Services' },
  { href: '#menu',         label: 'Menu' },
  { href: '#about',        label: 'About' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#contact',      label: 'Contact' },
];

interface NavigationBarProps {
  business: BusinessInfo | null;
  homepage: HomepageContent | null;
}

export default function NavigationBar({ business }: NavigationBarProps) {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);
  const brandName = business?.name ?? 'Kendall Kitchen';

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

          {/* Brand — from backend */}
          <a
            href="#hero"
            className="text-white font-bold text-lg tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded"
            aria-label={`${brandName} – back to top`}
          >
            {brandName}
          </a>

          {/* Desktop nav */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm text-white/80 hover:text-[#c9a84c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <a
              href="#menu"
              className="rounded bg-[#c9a84c] px-5 py-2 text-sm font-semibold text-[#1a0a08] hover:bg-[#d4b96a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2c1410]"
            >
              Order Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-white p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        role="navigation"
        aria-label="Mobile navigation"
        className={cn(
          'md:hidden bg-[#2c1410] border-t border-white/10 overflow-hidden transition-all duration-300',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        )}
      >
        <div className="px-6 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className="block py-2.5 text-sm text-white/80 hover:text-[#c9a84c] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#menu"
            onClick={close}
            className="block mt-3 text-center rounded bg-[#c9a84c] px-5 py-2.5 text-sm font-semibold text-[#1a0a08] hover:bg-[#d4b96a] transition-colors"
          >
            Order Now
          </a>
        </div>
      </div>
    </header>
  );
}
