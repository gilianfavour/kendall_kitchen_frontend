'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import {
  Heart, Users, Star, Building, Clock, Leaf, Sun, Gift, Flame,
  Tent, MapPin, Music, Package, Briefcase,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import QuoteDrawer  from './QuoteDrawer';
import InquiryModal from './InquiryModal';
import type { BusinessInfo, CateringEventType, CateringService } from '@/src/types';

function FeatureIcon({ icon }: { icon?: string }) {
  const cls = 'h-5 w-5';
  switch (icon) {
    case 'heart':     return <Heart     className={cls} aria-hidden="true" />;
    case 'users':     return <Users     className={cls} aria-hidden="true" />;
    case 'star':      return <Star      className={cls} aria-hidden="true" />;
    case 'building':  return <Building  className={cls} aria-hidden="true" />;
    case 'clock':     return <Clock     className={cls} aria-hidden="true" />;
    case 'leaf':      return <Leaf      className={cls} aria-hidden="true" />;
    case 'sun':       return <Sun       className={cls} aria-hidden="true" />;
    case 'gift':      return <Gift      className={cls} aria-hidden="true" />;
    case 'flame':     return <Flame     className={cls} aria-hidden="true" />;
    case 'tent':      return <Tent      className={cls} aria-hidden="true" />;
    case 'map-pin':   return <MapPin    className={cls} aria-hidden="true" />;
    case 'music':     return <Music     className={cls} aria-hidden="true" />;
    case 'briefcase': return <Briefcase className={cls} aria-hidden="true" />;
    case 'cake':      return <Gift      className={cls} aria-hidden="true" />;
    default:          return <Package   className={cls} aria-hidden="true" />;
  }
}

interface ServiceSubPageProps {
  service:    CateringService;
  eventTypes: CateringEventType[];
  business:   BusinessInfo | null;
}

export default function ServiceSubPage({ service, eventTypes, business }: ServiceSubPageProps) {
  const [drawerOpen,  setDrawerOpen]  = useState(false);
  const [modalOpen,   setModalOpen]   = useState(false);

  const heroImg   = service.hero_image_url   ?? null;
  const menuImg   = service.menu_image_url   ?? null;
  const currency  = business?.currency       ?? 'UGX';
  const paragraphs = (service.description ?? '').split(/\n\n+/).filter(Boolean);

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section aria-label={`${service.title} hero`}
        className="relative min-h-[65vh] flex items-center overflow-hidden bg-[#2c1410]">
        {heroImg && (
          <Image src={heroImg} alt={service.title} fill priority quality={90}
            sizes="100vw" className="object-cover object-center" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0a08]/90 via-[#2c1410]/70 to-[#1a0a08]/30"
          aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-28 w-full">
          <div className="max-w-2xl">
            {/* Back link */}
            <Link href="/catering"
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs mb-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              All Catering Services
            </Link>

            {service.eyebrow && (
              <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
                {service.eyebrow}
              </p>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              {service.title}
            </h1>
            {service.tagline && (
              <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
                {service.tagline}
              </p>
            )}

            {/* Two distinct CTAs */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setDrawerOpen(true)}
                className="rounded bg-[#c9a84c] px-7 py-3 text-sm font-semibold text-[#1a0a08] hover:bg-[#d4b96a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
              >
                {service.quote_cta_label}
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="rounded border border-white/40 px-7 py-3 text-sm font-semibold text-white hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {service.inquire_cta_label}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Description ────────────────────────────────────────── */}
      {paragraphs.length > 0 && (
        <section aria-labelledby="desc-heading"
          className="py-20 lg:py-24 bg-[#fdf9f4]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              <div className="lg:col-span-2">
                <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                  About This Service
                </p>
                <h2 id="desc-heading" className="sr-only">About {service.title}</h2>
                <div className="w-12 h-0.5 bg-[#c9a84c] mb-7" aria-hidden="true" />
                {paragraphs.map((para, i) => (
                  <p key={i} className="text-[#5a4035] text-base leading-relaxed mb-5">{para}</p>
                ))}
              </div>

              {/* Quick-action card */}
              <aside className="rounded-xl border border-[#e8ddd0] bg-white shadow-sm p-6">
                <p className="text-xs font-bold text-[#2c1410] uppercase tracking-wide mb-5">
                  Ready to Book?
                </p>
                {service.pricing_from && (
                  <div className="mb-5 pb-5 border-b border-[#f0e6d3]">
                    <p className="text-xs text-[#b5a090] mb-1">Starting from</p>
                    <p className="text-2xl font-extrabold text-[#2c1410]">
                      {currency} {service.pricing_from}
                    </p>
                    <p className="text-xs text-[#b5a090]">{service.pricing_unit}</p>
                  </div>
                )}
                <button onClick={() => setDrawerOpen(true)}
                  className="w-full mb-3 rounded bg-[#3d1a1a] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#5c2e2e] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]">
                  {service.quote_cta_label}
                </button>
                <button onClick={() => setModalOpen(true)}
                  className="w-full rounded border border-[#e8ddd0] px-4 py-2.5 text-xs font-semibold text-[#3d1a1a] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]">
                  {service.inquire_cta_label}
                </button>
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* ── Feature Highlights ─────────────────────────────────── */}
      {service.features.length > 0 && (
        <section aria-labelledby="features-heading"
          className="py-20 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                Why Choose This Package
              </p>
              <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-[#2c1410]">
                What Makes It Special
              </h2>
              <div className="divider-gold mt-5" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.features.map((f, i) => (
                <div key={i}
                  className="rounded-xl bg-[#fdf9f4] border border-[#e8ddd0] p-5 text-center">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c]"
                    aria-hidden="true">
                    <FeatureIcon icon={f.icon} />
                  </div>
                  <h3 className="text-sm font-bold text-[#2c1410] mb-2">{f.title}</h3>
                  <p className="text-xs text-[#7a6050] leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Sample Menu ────────────────────────────────────────── */}
      {service.menu_courses.length > 0 && (
        <section aria-labelledby="menu-heading"
          className="py-20 lg:py-24 bg-[#fdf9f4]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                Sample Menu
              </p>
              <h2 id="menu-heading" className="text-3xl sm:text-4xl font-bold text-[#2c1410]">
                A Taste of What to Expect
              </h2>
              <div className="divider-gold mt-5" aria-hidden="true" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <ol className="space-y-6" aria-label="Menu courses">
                {service.menu_courses.map(({ label, description }, i) => (
                  <li key={i} className="flex gap-5">
                    <div className="shrink-0 h-8 w-8 rounded-full bg-[#c9a84c] flex items-center justify-center text-[#1a0a08] font-extrabold text-xs mt-0.5"
                      aria-hidden="true">{i + 1}</div>
                    <div>
                      <h3 className="text-sm font-bold text-[#2c1410] mb-1">{label}</h3>
                      <p className="text-sm text-[#7a6050] leading-relaxed">{description}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className={cn(
                'relative rounded-xl overflow-hidden shadow-md',
                menuImg ? 'h-80 lg:h-full min-h-[320px]' : 'hidden lg:block h-full min-h-[320px] bg-[#e8ddd0]'
              )}>
                {menuImg && (
                  <Image src={menuImg} alt="Menu showcase"
                    fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Inclusions ─────────────────────────────────────────── */}
      {service.inclusions.length > 0 && (
        <section aria-labelledby="inclusions-heading"
          className="py-20 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                What&apos;s Included
              </p>
              <h2 id="inclusions-heading" className="text-3xl sm:text-4xl font-bold text-[#2c1410]">
                Package Inclusions
              </h2>
              <div className="divider-gold mt-5" aria-hidden="true" />
            </div>

            <div className={cn(
              'grid gap-6 max-w-4xl mx-auto',
              service.inclusions.length === 1 ? 'grid-cols-1' :
              service.inclusions.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'
            )}>
              {service.inclusions.map(({ heading, items }, ci) => (
                <div key={ci} className="rounded-xl bg-[#fdf9f4] border border-[#e8ddd0] shadow-sm p-6">
                  <h3 className="text-sm font-bold text-[#2c1410] mb-4 flex items-center gap-2">
                    <span className="h-1.5 w-4 rounded-full bg-[#c9a84c]" aria-hidden="true" />
                    {heading}
                  </h3>
                  <ul className="space-y-3">
                    {items.map((item, ii) => (
                      <li key={ii} className="flex items-start gap-2.5 text-sm text-[#5a4035]">
                        <CheckCircle className="h-4 w-4 text-[#c9a84c] shrink-0 mt-0.5"
                          aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Pricing ────────────────────────────────────────────── */}
      {service.pricing_from && (
        <section aria-labelledby="pricing-heading"
          className="py-20 lg:py-24 bg-[#2c1410] text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              Pricing
            </p>
            <h2 id="pricing-heading" className="text-3xl sm:text-4xl font-bold mb-4">
              Investment in Your Event
            </h2>
            <div className="divider-gold mb-8" aria-hidden="true" />

            <div className="inline-block rounded-2xl bg-[#3d1a1a] border border-[#5c2e2e] px-12 py-10 shadow-2xl">
              <p className="text-[#c9a84c]/70 text-xs uppercase tracking-widest mb-2">
                Starting from
              </p>
              <p className="text-4xl sm:text-5xl font-extrabold text-white leading-none">
                {currency} {service.pricing_from}
              </p>
              <p className="text-white/50 text-sm mt-2">{service.pricing_unit}</p>

              {service.pricing_specs.length > 0 && (
                <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-6 text-left">
                  {service.pricing_specs.map(({ label, value }, i) => (
                    <div key={i}>
                      <p className="text-white/40 text-xs uppercase tracking-wide">{label}</p>
                      <p className="text-white text-sm font-semibold mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {service.pricing_note && (
              <p className="mt-6 text-white/40 text-xs max-w-sm mx-auto">
                {service.pricing_note}
              </p>
            )}

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => setDrawerOpen(true)}
                className="rounded bg-[#c9a84c] px-8 py-3 text-sm font-semibold text-[#1a0a08] hover:bg-[#d4b96a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2c1410]">
                {service.quote_cta_label}
              </button>
              <button onClick={() => setModalOpen(true)}
                className="rounded border border-white/30 px-8 py-3 text-sm font-semibold text-white hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                {service.inquire_cta_label}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Drawers & Modals */}
      <QuoteDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        eventTypes={eventTypes}
        prefilledType={service.event_type ?? undefined}
        serviceTitle={service.title}
        business={business}
      />
      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceTitle={service.title}
        business={business}
      />
    </>
  );
}
