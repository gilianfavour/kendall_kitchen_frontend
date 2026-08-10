import { Suspense } from 'react';
import type { Metadata } from 'next';

import { getBusinessInfo }                    from '@/src/services/businessService';
import { getHomepageContent, getServiceCards } from '@/src/services/homepageService';
import { getTestimonials }                    from '@/src/services/testimonialService';

import HeroSection          from '@/src/components/home/HeroSection';
import ServicesSection      from '@/src/components/home/ServicesSection';
import FeaturedMealsSection from '@/src/components/home/FeaturedMealsSection';
import AboutSection         from '@/src/components/home/AboutSection';
import TestimonialsSection  from '@/src/components/home/TestimonialsSection';
import ContactSection       from '@/src/components/home/ContactSection';

export const dynamic    = 'force-dynamic';
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const [business, homepage] = await Promise.all([
      getBusinessInfo(),
      getHomepageContent(),
    ]);
    return {
      title: { absolute: business.name ?? 'Kendall Kitchen' },
      description:
        homepage.hero_description ??
        business.description ??
        'Fresh, authentic meals crafted with passion — Kendall Kitchen, Kampala.',
    };
  } catch {
    return { title: 'Kendall Kitchen' };
  }
}

export default async function HomePage() {
  const [businessRes, homepageRes, servicesRes, testimonialsRes] =
    await Promise.allSettled([
      getBusinessInfo(),
      getHomepageContent(),
      getServiceCards(),
      getTestimonials(),
    ]);

  const business     = businessRes.status     === 'fulfilled' ? businessRes.value     : null;
  const homepage     = homepageRes.status     === 'fulfilled' ? homepageRes.value     : null;
  const services     = servicesRes.status     === 'fulfilled' ? servicesRes.value     : [];
  const testimonials = testimonialsRes.status === 'fulfilled' ? testimonialsRes.value : [];

  if (process.env.NODE_ENV === 'development') {
    if (businessRes.status     === 'rejected') console.error('[home] business:',    businessRes.reason);
    if (homepageRes.status     === 'rejected') console.error('[home] homepage:',    homepageRes.reason);
    if (servicesRes.status     === 'rejected') console.error('[home] services:',    servicesRes.reason);
    if (testimonialsRes.status === 'rejected') console.error('[home] testimonials:',testimonialsRes.reason);
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <HeroSection business={business} homepage={homepage} />

      <ServicesSection homepage={homepage} services={services} />

      <Suspense fallback={<MenuSkeleton />}>
        <FeaturedMealsSection />
      </Suspense>

      <AboutSection business={business} homepage={homepage} />

      <TestimonialsSection testimonials={testimonials} homepage={homepage} />

      <ContactSection business={business} />
    </main>
  );
}

function MenuSkeleton() {
  return (
    <section className="py-20 lg:py-28 bg-white" aria-label="Loading menu">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 space-y-3">
          <div className="h-3 w-24 rounded bg-[#f0e6d3] animate-pulse" />
          <div className="h-8 w-52 rounded bg-[#f0e6d3] animate-pulse" />
          <div className="h-0.5 w-12 bg-[#f0e6d3]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg bg-[#f8f3eb] animate-pulse h-72 border border-[#e8ddd0]"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
