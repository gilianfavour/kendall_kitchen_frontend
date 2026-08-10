'use client';

import Image from 'next/image';
import { Clock, Plus, Check } from 'lucide-react';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/src/stores/cartStore';
import type { MenuItem } from '@/src/types';

interface Props {
  item:   MenuItem;
  index?: number;   // for staggered animation delay
}

export default function MenuItemCardEnhanced({ item, index = 0 }: Props) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const addItem = useCartStore(s => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      menu_item_id: item.id,
      name:         item.name,
      image_url:    item.image_url,
      unit_price:   item.selling_price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const priceFormatted = new Intl.NumberFormat('en-UG', {
    style:                 'currency',
    currency:              'UGX',
    maximumFractionDigits: 0,
  }).format(item.selling_price);

  const delay = Math.min(index % 6, 5) * 80; // stagger up to 400ms, reset per row

  return (
    <article
      ref={ref}
      aria-label={item.name}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'group relative rounded-2xl overflow-hidden bg-white border border-[#e8ddd0]',
        'shadow-sm hover:shadow-xl hover:-translate-y-1',
        'transition-all duration-300 ease-out',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}
    >
      {/* Image */}
      <div className="relative h-52 bg-[#f0e6d3] overflow-hidden">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl opacity-20" aria-hidden="true">🍽️</span>
          </div>
        )}

        {/* Availability ribbon */}
        {!item.is_available && (
          <div className="absolute inset-0 bg-[#1a0a08]/60 flex items-center justify-center">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">
              Sold Out
            </span>
          </div>
        )}

        {/* Category pill on image */}
        {item.category?.name && (
          <div className="absolute top-3 left-3">
            <span className="bg-[#2c1410]/80 backdrop-blur-sm text-[#c9a84c] text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full">
              {item.category.name}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-bold text-[#2c1410] text-sm leading-snug mb-1.5 line-clamp-1">
          {item.name}
        </h3>

        {item.description && (
          <p className="text-[#7a6050] text-xs leading-relaxed line-clamp-2 mb-3">
            {item.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-2.5 border-t border-[#f0e6d3]">
          <div className="flex flex-col gap-0.5">
            <span className="text-[#2c1410] font-extrabold text-sm">{priceFormatted}</span>
            <div className="flex items-center gap-2">
              {item.preparation_time_minutes && (
                <span className="flex items-center gap-1 text-[#b5a090] text-[10px]">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  {item.preparation_time_minutes}m
                </span>
              )}
              {item.is_available && (
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  Available
                </span>
              )}
            </div>
          </div>

          {/* Add to cart */}
          {item.is_available && (
            <button
              onClick={handleAdd}
              aria-label={added ? `${item.name} added to cart` : `Add ${item.name} to cart`}
              className={cn(
                'h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]',
                added
                  ? 'bg-emerald-500 text-white scale-95'
                  : 'bg-[#2c1410] text-white hover:bg-[#c9a84c] hover:text-[#1a0a08] active:scale-95'
              )}
            >
              {added
                ? <Check className="h-4 w-4" aria-hidden="true" />
                : <Plus  className="h-4 w-4" aria-hidden="true" />}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
