'use client';

import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import type { MenuItem } from '@/src/types';

interface Props {
  specials: MenuItem[];
}

export default function SpecialsStrip({ specials }: Props) {
  if (specials.length === 0) return null;

  return (
    <section aria-labelledby="specials-heading" className="py-10 bg-[#2c1410]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="h-4 w-4 text-[#c9a84c]" aria-hidden="true" />
          <h2 id="specials-heading" className="text-xs font-bold text-[#c9a84c] uppercase tracking-[0.2em]">
            Today&apos;s Specials
          </h2>
          <div className="flex-1 h-px bg-white/10" aria-hidden="true" />
        </div>

        {/* Horizontal scroll strip */}
        <div
          className="flex gap-4 overflow-x-auto pb-2"
          style={{ scrollbarWidth: 'none' }}
          role="list"
          aria-label="Today's specials"
        >
          {specials.map((item) => {
            const price = new Intl.NumberFormat('en-UG', {
              style: 'currency', currency: 'UGX', maximumFractionDigits: 0,
            }).format(item.selling_price);

            return (
              <div
                key={item.id}
                role="listitem"
                className="group shrink-0 w-48 rounded-xl overflow-hidden bg-[#3d1a1a] border border-white/10 hover:border-[#c9a84c]/50 transition-all duration-200 hover:-translate-y-0.5"
              >
                {/* Image */}
                <div className="relative h-28 bg-[#4a2c1a] overflow-hidden">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      sizes="192px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl opacity-20" aria-hidden="true">🍽️</span>
                    </div>
                  )}
                  {/* Specials gold badge */}
                  <div className="absolute top-2 right-2">
                    <Sparkles className="h-3.5 w-3.5 text-[#c9a84c]" aria-hidden="true" />
                  </div>
                </div>

                <div className="p-3">
                  <p className="text-white text-xs font-semibold leading-snug line-clamp-2 mb-1.5">
                    {item.name}
                  </p>
                  <p className="text-[#c9a84c] text-xs font-bold">{price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
