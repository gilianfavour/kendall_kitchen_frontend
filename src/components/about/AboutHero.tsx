import Image from 'next/image';
import type { BusinessInfo, HomepageContent } from '@/src/types';

interface AboutHeroProps {
  business: BusinessInfo | null;
  homepage: HomepageContent | null;
}

export default function AboutHero({ business, homepage }: AboutHeroProps) {
  const eyebrow  = homepage?.about_eyebrow      ?? 'Our Story';
  const line1    = homepage?.about_heading_line1 ?? 'Where Heritage Meets';
  const line2    = homepage?.about_heading_line2 ?? 'Artisanal Craft';
  const imageUrl = homepage?.about_image_url     ?? null;
  const name     = business?.name                ?? 'Kendall Kitchen';

  return (
    <section
      id="about-hero"
      aria-label="About hero"
      className="relative min-h-[70vh] flex items-center overflow-hidden bg-[#2c1410]"
    >
      {/* Background image — only renders when uploaded via admin */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={`${name} kitchen and team`}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
      )}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#1a0a08]/92 via-[#2c1410]/80 to-[#1a0a08]/60"
        aria-hidden="true"
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#c9a84c 1px, transparent 1px),
            linear-gradient(90deg, #c9a84c 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-28 w-full">
        <div className="max-w-2xl text-center mx-auto">
          <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.25em] mb-5">
            {eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {line1}
            <span className="block italic font-light text-[#e2cc90] mt-2">{line2}</span>
          </h1>
          <div className="divider-gold mt-8 mb-0" aria-hidden="true" />
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
