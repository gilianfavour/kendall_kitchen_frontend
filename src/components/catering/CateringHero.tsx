import Image from 'next/image';
import type { BusinessInfo, CateringPageContent } from '@/src/types';

interface CateringHeroProps {
  business: BusinessInfo | null;
  cms:      CateringPageContent | null;
}

export default function CateringHero({ business, cms }: CateringHeroProps) {
  const eyebrow     = cms?.hero_eyebrow          ?? 'Catering Services';
  const headline    = cms?.hero_headline          ?? 'The Royal Wedding Package';
  const description = cms?.hero_description       ?? 'Crafting unforgettable culinary experiences for your most cherished occasions.';
  const primaryLabel   = cms?.hero_primary_cta_label   ?? 'Inquire Now';
  const secondaryLabel = cms?.hero_secondary_cta_label ?? 'View Packages';
  const imageUrl    = cms?.hero_image_url         ?? null;

  return (
    <section
      id="catering-hero"
      aria-label="Catering hero"
      className="relative min-h-[70vh] flex items-center overflow-hidden bg-[#2c1410]"
    >
      {/* Background — only renders when uploaded in the backend */}
      {imageUrl && (
        <Image src={imageUrl} alt={headline} fill priority quality={90} sizes="100vw"
          className="object-cover object-center" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a0a08]/90 via-[#2c1410]/75 to-[#1a0a08]/50"
        aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-28 w-full">
        <div className="max-w-2xl text-center mx-auto">
          <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.25em] mb-5">
            {eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {headline}
          </h1>
          <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            {description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#inquire"
              className="rounded bg-[#c9a84c] px-8 py-3 text-sm font-semibold text-[#1a0a08] hover:bg-[#d4b96a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]">
              {primaryLabel}
            </a>
            <a href="#packages"
              className="rounded border border-white/40 px-8 py-3 text-sm font-semibold text-white hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              {secondaryLabel}
            </a>
          </div>
          {business?.phone && (
            <p className="mt-8 text-white/50 text-xs">
              Questions? Call us at{' '}
              <a href={`tel:${business.phone.replace(/\s+/g, '')}`}
                className="text-[#c9a84c] hover:text-[#d4b96a] transition-colors">
                {business.phone}
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
