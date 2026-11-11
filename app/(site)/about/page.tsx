import type { Metadata } from 'next';
import Link from 'next/link';

import { getBusinessInfo }    from '@/src/services/businessService';
import { getHomepageContent,
         getServiceCards }    from '@/src/services/homepageService';
import { getTestimonials }    from '@/src/services/testimonialService';

import AboutHero          from '@/src/components/about/AboutHero';
import AboutStory         from '@/src/components/about/AboutStory';
import AboutStats         from '@/src/components/about/AboutStats';
import AboutServices      from '@/src/components/about/AboutServices';
import TestimonialsSection from '@/src/components/home/TestimonialsSection';
import ContactSection     from '@/src/components/home/ContactSection';

export const dynamic    = 'force-dynamic';
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const [business, homepage] = await Promise.all([
      getBusinessInfo(),
      getHomepageContent(),
    ]);
    return {
      title:       'About Us',
      description: homepage.about_description
        ?? business.description
        ?? `Learn the story behind ${business.name ?? 'Kendall Kitchen'} — our heritage, our values, and the team behind every meal.`,
    };
  } catch {
    return {
      title:       'About Us',
      description: 'Learn the story behind Kendall Kitchen — our heritage, values, and the team behind every meal.',
    };
  }
}

export default async function AboutPage() {
  const [businessRes, homepageRes, testimonialsRes, servicesRes] =
    await Promise.allSettled([
      getBusinessInfo(),
      getHomepageContent(),
      getTestimonials(),
      getServiceCards(),
    ]);

  const business     = businessRes.status     === 'fulfilled' ? businessRes.value     : null;
  const homepage     = homepageRes.status     === 'fulfilled' ? homepageRes.value     : null;
  const testimonials = testimonialsRes.status === 'fulfilled' ? testimonialsRes.value : [];
  const services     = servicesRes.status     === 'fulfilled' ? servicesRes.value     : [];

  return (
    <main id="main-content" tabIndex={-1}>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <AboutHero business={business} homepage={homepage} />

      {/* ── Story + Values (CMS driven, hidden when no data) ─────── */}
      <AboutStory business={business} homepage={homepage} />

      {/* ── CMS stat badge (hidden when no data) ─────────────────── */}
      <AboutStats homepage={homepage} />

      {/* ── Services from /api/v1/services (hidden when empty) ───── */}
      <AboutServices services={services} business={business} />

      {/* ── Testimonials from /api/v1/testimonials ────────────────── */}
      <TestimonialsSection testimonials={testimonials} homepage={homepage} />

      {/* ── CTA strip ─────────────────────────────────────────────── */}
      <section
        aria-labelledby="about-cta-heading"
        className="py-20 lg:py-24 bg-[#2c1410] text-white text-center"
      >
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Come Dine With Us
          </p>
          <h2
            id="about-cta-heading"
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Ready to experience the food?
          </h2>
          <div className="divider-gold mt-4 mb-7" aria-hidden="true" />
          <p className="text-white/60 text-sm leading-relaxed mb-10">
            {business?.tagline
              ?? 'Explore our menu, book a catering event, or simply get in touch — we\'d love to have you at our table.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/menu"
              className="rounded bg-[#c9a84c] px-8 py-3 text-sm font-semibold text-[#1a0a08] hover:bg-[#d4b96a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
            >
              Explore Our Menu
            </Link>
            <Link
              href="/catering"
              className="rounded border border-white/40 px-8 py-3 text-sm font-semibold text-white hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Book a Catering Event
            </Link>
          </div>
        </div>
      </section>

      {/* ── Contact section ───────────────────────────────────────── */}
      <ContactSection business={business} />

    </main>
  );
}
