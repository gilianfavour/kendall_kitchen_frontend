import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import type { BusinessInfo, HomepageContent } from '@/src/types';

interface AboutSectionProps {
  business: BusinessInfo | null;
  homepage: HomepageContent | null;
}

const DEFAULT_VALUES = [
  'Authentically sourced, locally grown ingredients',
  'Handcrafted recipes perfected over generations',
  'Consistent quality across every plate we serve',
  'A team driven by passion and culinary excellence',
];

export default function AboutSection({ business, homepage }: AboutSectionProps) {
  const eyebrow      = homepage?.about_eyebrow       ?? 'Our Story';
  const heading1     = homepage?.about_heading_line1  ?? 'Where Heritage Meets';
  const heading2     = homepage?.about_heading_line2  ?? 'Artisanal Craft';
  const description  = homepage?.about_description    ?? business?.description
    ?? 'At Kendall Kitchen, every dish tells a story rooted in heritage and refined through artisanal craftsmanship. We believe that great food is born from honest ingredients, skilled hands, and a genuine love for feeding people well.';
  const aboutImageUrl = homepage?.about_image_url     ?? null;
  const statNumber   = homepage?.about_stat_number    ?? '15+';
  const statLabel    = homepage?.about_stat_label     ?? 'Years of Culinary Excellence';
  const ctaLabel     = homepage?.about_cta_label      ?? 'Learn More About Us';
  const values       = (homepage?.about_values && homepage.about_values.length > 0)
    ? homepage.about_values
    : DEFAULT_VALUES;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 lg:py-28 bg-[#fdf9f4]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — CMS image only; shows dark background when none uploaded */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden h-[460px] sm:h-[520px] bg-[#2c1410]">
              {aboutImageUrl && (
                <Image
                  src={aboutImageUrl}
                  alt="Chef at Kendall Kitchen"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              )}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#1a0a08]/60 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Gold stat card — from CMS */}
            <div className="absolute bottom-6 left-6 bg-[#c9a84c] rounded-lg px-6 py-4 shadow-xl">
              <p className="text-[#1a0a08] text-3xl font-extrabold leading-none">{statNumber}</p>
              <p className="text-[#1a0a08]/80 text-xs font-semibold uppercase tracking-wide mt-1">
                {statLabel}
              </p>
            </div>
          </div>

          {/* Right — text from CMS */}
          <div>
            <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              {eyebrow}
            </p>
            <h2 id="about-heading" className="text-3xl sm:text-4xl font-bold text-[#2c1410] leading-snug mb-2">
              {heading1}
            </h2>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2c1410] leading-snug mb-6">
              {heading2}
            </h2>
            <div className="w-12 h-0.5 bg-[#c9a84c] mb-7" aria-hidden="true" />

            <p className="text-[#5a4035] text-base leading-relaxed mb-8">{description}</p>

            {/* Values checklist — from CMS */}
            <ul className="space-y-3.5" role="list">
              {values.map((v, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#c9a84c] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm text-[#5a4035] leading-relaxed">{v}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-block mt-10 rounded bg-[#3d1a1a] px-7 py-3 text-sm font-semibold text-white hover:bg-[#5c2e2e] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
