import type { Metadata } from 'next';

import { getBusinessInfo }                             from '@/src/services/businessService';
import { getCateringPageContent, getCateringServices } from '@/src/services/cateringService';
import { getTestimonials }                             from '@/src/services/testimonialService';
import { getCateringEventTypes }                       from '@/src/services/cateringService';

import CateringHero        from '@/src/components/catering/CateringHero';
import CateringIntro       from '@/src/components/catering/CateringIntro';
import CateringMenuShowcase from '@/src/components/catering/CateringMenuShowcase';
import CateringInclusions  from '@/src/components/catering/CateringInclusions';
import CateringPricing     from '@/src/components/catering/CateringPricing';
import CateringCTA         from '@/src/components/catering/CateringCTA';
import CateringInquiryForm from '@/src/components/catering/CateringInquiryForm';
import ServiceCard         from '@/src/components/catering/ServiceCard';
import TestimonialsSection from '@/src/components/home/TestimonialsSection';

export const dynamic    = 'force-dynamic';
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const cms = await getCateringPageContent();
    return { title: cms.meta_title, description: cms.meta_description ?? undefined };
  } catch {
    return { title: 'Catering Services', description: 'Artisanal catering for every occasion.' };
  }
}

export default async function CateringHubPage() {
  const [businessRes, cmsRes, servicesRes, testimonialsRes, eventTypesRes] =
    await Promise.allSettled([
      getBusinessInfo(),
      getCateringPageContent(),
      getCateringServices(),
      getTestimonials(),
      getCateringEventTypes(),
    ]);

  const business     = businessRes.status     === 'fulfilled' ? businessRes.value     : null;
  const cms          = cmsRes.status          === 'fulfilled' ? cmsRes.value          : null;
  const services     = servicesRes.status     === 'fulfilled' ? servicesRes.value     : [];
  const testimonials = testimonialsRes.status === 'fulfilled' ? testimonialsRes.value : [];
  const eventTypes   = eventTypesRes.status   === 'fulfilled' ? eventTypesRes.value   : [];

  return (
    <main id="main-content" tabIndex={-1}>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <CateringHero cms={cms} business={business} />

      {/* ── Intro / About section ─────────────────────────────────── */}
      <CateringIntro cms={cms} />

      {/* ── Services grid ─────────────────────────────────────────── */}
      <section
        id="services"
        aria-labelledby="services-heading"
        className="py-20 lg:py-28 bg-[#fdf9f4]"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              What We Cater For
            </p>
            <h2 id="services-heading" className="text-3xl sm:text-4xl font-bold text-[#2c1410]">
              Choose Your Event Type
            </h2>
            <div className="divider-gold mt-5" aria-hidden="true" />
            <p className="mt-3 text-sm text-[#7a6050] max-w-lg mx-auto">
              Select your event type to see full details, sample menus, inclusions and pricing
              — then request a personalised quote.
            </p>
          </div>

          {services.length === 0 ? (
            <div className="text-center py-14 text-[#7a6050] text-sm">
              No catering services available right now. Please check back soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} business={business} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Sample Menu showcase ───────────────────────────────────── */}
      <CateringMenuShowcase cms={cms} />

      {/* ── Package Inclusions ────────────────────────────────────── */}
      <CateringInclusions cms={cms} />

      {/* ── Pricing ───────────────────────────────────────────────── */}
      <CateringPricing cms={cms} business={business} />

      {/* ── Why Kendall Kitchen stats ──────────────────────────────── */}
      <section
        aria-labelledby="why-heading"
        className="py-20 lg:py-24 bg-[#2c1410] text-white"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Why Choose Us
          </p>
          <h2 id="why-heading" className="text-3xl sm:text-4xl font-bold mb-4">
            Trusted by Hundreds of Events
          </h2>
          <div className="divider-gold mb-10" aria-hidden="true" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { number: '500+',   label: 'Events Catered'      },
              { number: '15+',    label: 'Years Experience'    },
              { number: '1,000+', label: 'Max Guest Capacity'  },
              { number: '100%',   label: 'Client Satisfaction' },
            ].map(({ number, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#c9a84c]">{number}</span>
                <span className="text-xs text-white/60 uppercase tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────── */}
      <TestimonialsSection testimonials={testimonials} homepage={null} />

      {/* ── CTA banner ────────────────────────────────────────────── */}
      <CateringCTA cms={cms} business={business} />

      {/* ── Inquiry form ──────────────────────────────────────────── */}
      <CateringInquiryForm eventTypes={eventTypes} business={business} cms={cms} />

    </main>
  );
}
