import Image from 'next/image';
import type { BusinessInfo, HomepageContent } from '@/src/types';

interface HeroSectionProps {
  business: BusinessInfo | null;
  homepage: HomepageContent | null;
}

export default function HeroSection({ business, homepage }: HeroSectionProps) {
  const headline    = homepage?.hero_headline            ?? 'Simple food, beautifully served.';
  const subheadline = homepage?.hero_subheadline         ?? null;
  const description = homepage?.hero_description         ?? business?.description ?? 'Experience authentic flavours crafted from the freshest local ingredients, presented with artisanal care and warmth.';
  const primaryLabel  = homepage?.hero_primary_cta_label  ?? 'Explore Menu';
  const primaryHref   = homepage?.hero_primary_cta_href   ?? '#menu';
  const secondaryLabel = homepage?.hero_secondary_cta_label ?? 'Book an Event';
  const secondaryHref  = homepage?.hero_secondary_cta_href  ?? '#contact';
  const heroImageUrl  = homepage?.hero_image_url          ?? null;
  const name          = business?.name                    ?? 'Kendall Kitchen';

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background — CMS image only; shows dark background when none uploaded */}
      {heroImageUrl && (
        <Image
          src={heroImageUrl}
          alt={`${name} – hero background`}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#1a0a08]/90 via-[#2c1410]/70 to-[#1a0a08]/30"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-32 w-full">
        <div className="max-w-xl">
          <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-[0.2em] mb-5">
            Welcome to {name}
          </p>

          {/* Headline — split on comma if subheadline not set separately */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
            {subheadline ? (
              <>
                {headline}
                <span className="block italic font-light text-[#e2cc90] mt-1">{subheadline}</span>
              </>
            ) : (
              headline
            )}
          </h1>

          <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-10 max-w-md">
            {description}
          </p>

          {/* CTA buttons — labels and hrefs from CMS */}
          <div className="flex flex-wrap gap-4">
            <a
              href={primaryHref}
              className="inline-flex items-center rounded bg-[#c9a84c] px-7 py-3 text-sm font-semibold text-[#1a0a08] hover:bg-[#d4b96a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0a08]"
            >
              {primaryLabel}
            </a>
            <a
              href={secondaryHref}
              className="inline-flex items-center rounded border border-white/40 px-7 py-3 text-sm font-semibold text-white hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0a08]"
            >
              {secondaryLabel}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
        <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
