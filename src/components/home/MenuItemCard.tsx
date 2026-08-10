import Image from 'next/image';
import type { MenuItem } from '@/src/types';

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const priceFormatted = new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency: 'UGX',
    maximumFractionDigits: 0,
  }).format(item.selling_price);

  return (
    <article
      className="group rounded-lg overflow-hidden bg-white shadow-sm border border-[#e8ddd0] hover:shadow-md transition-all duration-200"
      aria-label={item.name}
    >
      {/* Image — only rendered when uploaded in the backend */}
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
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Category */}
        {item.category?.name && (
          <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-wide mb-1">
            {item.category.name}
          </p>
        )}

        <h3 className="font-bold text-[#2c1410] text-sm leading-snug mb-1.5 line-clamp-1">
          {item.name}
        </h3>

        {item.description && (
          <p className="text-[#7a6050] text-xs leading-relaxed line-clamp-2 mb-3">
            {item.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-[#f0e6d3]">
          <span className="text-[#2c1410] font-bold text-sm">{priceFormatted}</span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              item.is_available
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-red-50 text-red-600'
            }`}
          >
            {item.is_available ? 'Available' : 'Sold Out'}
          </span>
        </div>
      </div>
    </article>
  );
}
