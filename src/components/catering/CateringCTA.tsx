import type { BusinessInfo, CateringPageContent } from '@/src/types';

interface CateringCTAProps {
  business: BusinessInfo | null;
  cms:      CateringPageContent | null;
}

export default function CateringCTA({ business, cms }: CateringCTAProps) {
  const eyebrow      = cms?.cta_eyebrow        ?? "Let's Create Something Special";
  const heading      = cms?.cta_heading         ?? 'Begin Your Journey';
  const description  = cms?.cta_description     ?? 'Ready to start planning? Submit an inquiry below and our events team will contact you within 24 hours.';
  const primaryLabel = cms?.cta_primary_label   ?? 'Inquire Now';
  const secondaryLabel = cms?.cta_secondary_label ?? 'Call Us';

  return (
    <section
      id="begin-journey"
      aria-labelledby="cta-heading"
      className="py-20 lg:py-28 bg-[#fdf9f4]"
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">

        <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
          {eyebrow}
        </p>
        <h2 id="cta-heading"
          className="text-3xl sm:text-4xl font-bold text-[#2c1410] mb-5">
          {heading}
        </h2>
        <div className="divider-gold mb-7" aria-hidden="true" />

        {description && (
          <p className="text-[#5a4035] text-base leading-relaxed mb-10 max-w-xl mx-auto">
            {description}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#inquire"
            className="rounded bg-[#3d1a1a] px-8 py-3 text-sm font-semibold text-white hover:bg-[#5c2e2e] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2">
            {primaryLabel}
          </a>
          {business?.phone && (
            <a href={`tel:${business.phone.replace(/\s+/g, '')}`}
              className="rounded border border-[#e8ddd0] bg-white px-8 py-3 text-sm font-semibold text-[#3d1a1a] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2">
              {secondaryLabel}: {business.phone}
            </a>
          )}
        </div>

        {business?.email && (
          <p className="mt-6 text-[#b5a090] text-xs">
            Or email us at{' '}
            <a href={`mailto:${business.email}`}
              className="text-[#c9a84c] hover:text-[#a8832a] transition-colors">
              {business.email}
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
