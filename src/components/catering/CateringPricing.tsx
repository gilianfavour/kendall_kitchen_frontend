import type { BusinessInfo, CateringPageContent } from '@/src/types';

interface CateringPricingProps {
  business: BusinessInfo | null;
  cms:      CateringPageContent | null;
}

const DEFAULT_SPECS = [
  { label: 'Minimum guests', value: '100'      },
  { label: 'Setup included', value: 'Yes'      },
  { label: 'Service staff',  value: 'Included' },
  { label: 'Custom menu',    value: 'Yes'      },
];

export default function CateringPricing({ business, cms }: CateringPricingProps) {
  const currency = business?.currency ?? 'UGX';
  const eyebrow  = cms?.pricing_eyebrow    ?? 'Pricing';
  const heading  = cms?.pricing_heading    ?? 'Investment in Memories';
  const subtext  = cms?.pricing_subtext    ?? 'Our packages are priced per guest and fully customisable.';
  const label    = cms?.pricing_label      ?? 'Starting from';
  const amount   = cms?.pricing_amount     ?? '85,000';
  const unit     = cms?.pricing_unit       ?? 'per guest';
  const note     = cms?.pricing_note       ?? null;
  const ctaLabel = cms?.pricing_cta_label  ?? 'Get a Custom Quote';
  const specs    = (cms?.pricing_specs && cms.pricing_specs.length > 0)
    ? cms.pricing_specs
    : DEFAULT_SPECS;

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="py-20 lg:py-28 bg-[#2c1410]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">

        <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
          {eyebrow}
        </p>
        <h2 id="pricing-heading"
          className="text-3xl sm:text-4xl font-bold text-white mb-4">
          {heading}
        </h2>
        <div className="divider-gold mt-1 mb-6" aria-hidden="true" />
        {subtext && (
          <p className="text-white/60 text-sm max-w-lg mx-auto mb-10">{subtext}</p>
        )}

        {/* Price card */}
        <div className="inline-block rounded-2xl bg-[#3d1a1a] border border-[#5c2e2e] px-12 py-10 shadow-2xl">
          <p className="text-[#c9a84c]/70 text-xs uppercase tracking-widest mb-2">{label}</p>
          <p className="text-4xl sm:text-5xl font-extrabold text-white leading-none">
            {currency} {amount}
          </p>
          <p className="text-white/50 text-sm mt-2">{unit}</p>

          {specs.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-6 text-left">
              {specs.map(({ label: l, value: v }, i) => (
                <div key={i}>
                  <p className="text-white/40 text-xs uppercase tracking-wide">{l}</p>
                  <p className="text-white text-sm font-semibold mt-0.5">{v}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {note && (
          <p className="mt-8 text-white/40 text-xs max-w-sm mx-auto">{note}</p>
        )}

        <div className="mt-10">
          <a href="#inquire"
            className="inline-block rounded bg-[#c9a84c] px-8 py-3 text-sm font-semibold text-[#1a0a08] hover:bg-[#d4b96a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2c1410]">
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
