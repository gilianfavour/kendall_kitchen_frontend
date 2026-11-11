import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import type { BusinessInfo, HomepageContent } from '@/src/types';

interface AboutStoryProps {
  business: BusinessInfo | null;
  homepage: HomepageContent | null;
}

export default function AboutStory({ business, homepage }: AboutStoryProps) {
  // All text sourced from CMS/business API — no hardcoded strings
  const line1        = homepage?.about_heading_line1 ?? null;
  const line2        = homepage?.about_heading_line2 ?? null;
  const description  = homepage?.about_description  ?? business?.description ?? null;
  const secondaryText = business?.tagline            ?? null;
  const imageUrl     = homepage?.about_image_url     ?? null;
  const statNumber   = homepage?.about_stat_number   ?? null;
  const statLabel    = homepage?.about_stat_label    ?? null;
  const values       = (homepage?.about_values && homepage.about_values.length > 0)
    ? homepage.about_values
    : null;

  // If there's nothing to show at all, render nothing
  if (!line1 && !description && !values) return null;

  return (
    <>
      {/* ── Story ─────────────────────────────────────────────────── */}
      <section
        id="our-story"
        aria-labelledby="story-heading"
        className="py-20 lg:py-28 bg-[#fdf9f4]"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Image column */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-lg overflow-hidden h-[460px] sm:h-[540px] bg-[#2c1410]">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={`${business?.name ?? 'Kendall Kitchen'} chef at work`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                )}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#1a0a08]/50 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>

              {/* Stat badge — only shown when CMS has real data */}
              {statNumber && statLabel && (
                <div className="absolute bottom-6 left-6 bg-[#c9a84c] rounded-lg px-6 py-4 shadow-xl">
                  <p className="text-[#1a0a08] text-3xl font-extrabold leading-none">{statNumber}</p>
                  <p className="text-[#1a0a08]/80 text-xs font-semibold uppercase tracking-wide mt-1">
                    {statLabel}
                  </p>
                </div>
              )}
            </div>

            {/* Text column */}
            <div className="order-1 lg:order-2">
              <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                {homepage?.about_eyebrow ?? 'Our Story'}
              </p>

              {(line1 || line2) && (
                <h2
                  id="story-heading"
                  className="text-3xl sm:text-4xl font-bold text-[#2c1410] leading-snug mb-5"
                >
                  {line1}
                  {line2 && (
                    <>
                      <br />
                      <span className="italic font-light">{line2}</span>
                    </>
                  )}
                </h2>
              )}

              <div className="divider-gold mb-7" aria-hidden="true" />

              {description && (
                <p className="text-[#5a4035] text-base leading-relaxed mb-5">{description}</p>
              )}
              {secondaryText && (
                <p className="text-[#7a6050] text-sm leading-relaxed">{secondaryText}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values — only rendered when CMS has values data ──────── */}
      {values && (
        <section
          id="values"
          aria-labelledby="values-heading"
          className="py-20 lg:py-28 bg-[#2c1410]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

              {/* Mission — uses real business data only */}
              <div>
                <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                  Our Mission
                </p>
                <h2
                  id="values-heading"
                  className="text-3xl sm:text-4xl font-bold text-white leading-snug mb-6"
                >
                  {business?.name ?? 'Kendall Kitchen'}
                </h2>
                <div className="w-12 h-0.5 bg-[#c9a84c] mb-7" aria-hidden="true" />
                {description && (
                  <p className="text-white/65 text-base leading-relaxed mb-6">{description}</p>
                )}
                {secondaryText && (
                  <p className="text-white/50 text-sm leading-relaxed">{secondaryText}</p>
                )}
              </div>

              {/* Values checklist — from CMS about_values JSON array */}
              <div>
                <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                  What We Stand For
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  Our Core Values
                </h3>
                <div className="w-12 h-0.5 bg-[#c9a84c] mb-8" aria-hidden="true" />
                <ul className="space-y-4" role="list">
                  {values.map((value, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="mt-0.5 h-6 w-6 rounded-full bg-[#c9a84c]/15 flex items-center justify-center shrink-0">
                        <CheckCircle className="h-3.5 w-3.5 text-[#c9a84c]" aria-hidden="true" />
                      </div>
                      <span className="text-white/75 text-sm leading-relaxed">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>
      )}
    </>
  );
}
