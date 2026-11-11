import type { Metadata } from 'next';
import { MapPin, Phone, Mail } from 'lucide-react';

import { getBusinessInfo }  from '@/src/services/businessService';
import ContactForm          from '@/src/components/contact/ContactForm';

export const dynamic    = 'force-dynamic';
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const business = await getBusinessInfo();
    return {
      title:       'Contact Us',
      description: `Get in touch with ${business.name ?? 'Kendall Kitchen'}. Send us a message, call us, or visit us at ${business.address ?? 'our location'}.`,
    };
  } catch {
    return {
      title:       'Contact Us',
      description: 'Get in touch with Kendall Kitchen — send us a message, call, or visit us.',
    };
  }
}

export default async function ContactPage() {
  const [businessRes] = await Promise.allSettled([getBusinessInfo()]);
  const business = businessRes.status === 'fulfilled' ? businessRes.value : null;

  return (
    <main id="main-content" tabIndex={-1}>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section
        aria-labelledby="contact-hero-heading"
        className="relative bg-[#2c1410] py-24 lg:py-32 overflow-hidden"
      >
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(#c9a84c 1px, transparent 1px),
              linear-gradient(90deg, #c9a84c 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Reach Out
          </p>
          <h1
            id="contact-hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
          >
            Contact{' '}
            <span className="text-[#c9a84c]">
              {business?.name ?? 'Kendall Kitchen'}
            </span>
          </h1>
          <div className="divider-gold mt-6 mb-8" aria-hidden="true" />
          <p className="text-white/60 text-base max-w-xl mx-auto leading-relaxed">
            Have a question, a catering enquiry, or just want to say hello?
            We&apos;re always happy to hear from you.
          </p>

          {/* Quick contact pills */}
          {(business?.phone || business?.email || business?.address) && (
            <ul
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
              aria-label="Quick contact options"
            >
              {business?.phone && (
                <li>
                  <a
                    href={`tel:${business.phone.replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white hover:border-[#c9a84c]/50 hover:bg-[#c9a84c]/10 hover:text-[#c9a84c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                  >
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    {business.phone}
                  </a>
                </li>
              )}
              {business?.email && (
                <li>
                  <a
                    href={`mailto:${business.email}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white hover:border-[#c9a84c]/50 hover:bg-[#c9a84c]/10 hover:text-[#c9a84c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                  >
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                    {business.email}
                  </a>
                </li>
              )}
              {business?.address && (
                <li>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/70">
                    <MapPin className="h-3.5 w-3.5 text-[#c9a84c]" aria-hidden="true" />
                    {business.address}
                  </span>
                </li>
              )}
            </ul>
          )}
        </div>
      </section>

      {/* ── Contact form + info panel ──────────────────────────────── */}
      <ContactForm business={business} />

    </main>
  );
}
