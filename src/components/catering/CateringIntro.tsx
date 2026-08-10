import { Users, Shirt, UtensilsCrossed, Package } from 'lucide-react';
import type { CateringPageContent } from '@/src/types';

// Maps icon string from DB to a Lucide icon component
function EssentialIcon({ icon }: { icon?: string }) {
  switch (icon) {
    case 'users':             return <Users            className="h-4 w-4" aria-hidden="true" />;
    case 'shirt':             return <Shirt            className="h-4 w-4" aria-hidden="true" />;
    case 'utensils-crossed':  return <UtensilsCrossed  className="h-4 w-4" aria-hidden="true" />;
    default:                  return <Package          className="h-4 w-4" aria-hidden="true" />;
  }
}

interface CateringIntroProps {
  cms: CateringPageContent | null;
}

export default function CateringIntro({ cms }: CateringIntroProps) {
  const eyebrow   = cms?.intro_eyebrow           ?? 'Artisanal Hospitality for Your Union';
  const body      = cms?.intro_body              ?? 'At Kendall Kitchen, we believe every occasion deserves a dining experience that reflects its significance.';
  const essHeading = cms?.intro_essentials_heading ?? 'Package Essentials';
  const ctaLabel  = cms?.intro_cta_label         ?? 'Request a Quote';
  const essentials = cms?.intro_essentials ?? [
    { icon: 'users',           text: '100 – 1,000 Guests' },
    { icon: 'shirt',           text: 'Linens & Décor' },
    { icon: 'utensils-crossed', text: 'Buffet or Table Service' },
  ];

  // Split body into paragraphs on double newline
  const paragraphs = (body ?? '').split(/\n\n+/).filter(Boolean);

  return (
    <section
      id="about-catering"
      aria-labelledby="catering-intro-heading"
      className="py-20 lg:py-28 bg-[#fdf9f4]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">

          {/* Left — description from CMS */}
          <div className="lg:col-span-2">
            <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              {eyebrow}
            </p>
            <div className="w-12 h-0.5 bg-[#c9a84c] mb-7" aria-hidden="true" />
            {paragraphs.map((para, i) => (
              <p key={i} className="text-[#5a4035] text-base leading-relaxed mb-5">
                {para}
              </p>
            ))}
          </div>

          {/* Right — essentials card from CMS */}
          <aside className="rounded-xl border border-[#e8ddd0] bg-white shadow-sm p-6"
            aria-label="Package essentials">
            <h2 id="catering-intro-heading"
              className="text-sm font-bold text-[#2c1410] uppercase tracking-wide mb-5">
              {essHeading}
            </h2>
            <ul className="space-y-4">
              {essentials.map(({ icon, text }, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-[#fdf9f4] border border-[#e8ddd0] flex items-center justify-center text-[#c9a84c] shrink-0"
                    aria-hidden="true">
                    <EssentialIcon icon={icon} />
                  </div>
                  <span className="text-sm text-[#5a4035]">{text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-[#f0e6d3]">
              <p className="text-xs text-[#b5a090] leading-relaxed">
                Every package is tailored to your specific needs. Contact us to discuss a custom arrangement.
              </p>
              <a href="#inquire"
                className="inline-block mt-4 w-full text-center rounded bg-[#3d1a1a] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#5c2e2e] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]">
                {ctaLabel}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
