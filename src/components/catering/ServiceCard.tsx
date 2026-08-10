import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { BusinessInfo, CateringService } from '@/src/types';

interface ServiceCardProps {
  service:  CateringService;
  business: BusinessInfo | null;
}

export default function ServiceCard({ service, business }: ServiceCardProps) {
  const imageSrc = service.card_image_url ?? null;
  const currency = business?.currency ?? 'UGX';

  return (
    <article
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-[#e8ddd0] shadow-sm hover:shadow-lg hover:border-[#c9a84c]/40 transition-all duration-300"
      aria-label={service.title}
    >
      {/* Image */}
      <div className="relative h-52 bg-[#2c1410] overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={service.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#2c1410] to-[#5c2e2e]" />
        )}
        {/* Dark overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#1a0a08]/60 to-transparent"
          aria-hidden="true"
        />
        {/* Title overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-lg leading-tight">{service.title}</h3>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {service.tagline && (
          <p className="text-[#5a4035] text-sm leading-relaxed line-clamp-2">
            {service.tagline}
          </p>
        )}

        {/* Pricing teaser */}
        {service.pricing_from && (
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-[#b5a090] uppercase tracking-wide">From</span>
            <span className="text-base font-extrabold text-[#2c1410]">
              {currency} {service.pricing_from}
            </span>
            <span className="text-xs text-[#b5a090]">/ {service.pricing_unit}</span>
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/catering/${service.slug}`}
          className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#c9a84c] hover:text-[#a8832a] transition-colors group/link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded"
        >
          Learn More
          <ArrowRight
            className="h-4 w-4 group-hover/link:translate-x-1 transition-transform"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
