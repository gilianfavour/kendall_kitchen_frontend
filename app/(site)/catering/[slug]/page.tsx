import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getBusinessInfo }                                from '@/src/services/businessService';
import { getCateringServiceBySlug, getCateringEventTypes,
         getCateringServices }                           from '@/src/services/cateringService';

import ServiceSubPage from '@/src/components/catering/ServiceSubPage';

export const dynamic    = 'force-dynamic';
export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const service  = await getCateringServiceBySlug(slug);
    return {
      title:       service.meta_title,
      description: service.meta_description ?? service.tagline ?? undefined,
    };
  } catch {
    return { title: 'Catering — Kendall Kitchen' };
  }
}

export async function generateStaticParams() {
  try {
    const services = await getCateringServices();
    return services.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export default async function CateringServicePage({ params }: PageProps) {
  const { slug } = await params;

  const [businessRes, serviceRes, eventTypesRes] =
    await Promise.allSettled([
      getBusinessInfo(),
      getCateringServiceBySlug(slug),
      getCateringEventTypes(),
    ]);

  if (serviceRes.status === 'rejected') {
    notFound();
  }

  const business   = businessRes.status   === 'fulfilled' ? businessRes.value   : null;
  const service    = serviceRes.value;
  const eventTypes = eventTypesRes.status === 'fulfilled' ? eventTypesRes.value : [];

  return (
    <main id="main-content" tabIndex={-1}>
      <ServiceSubPage
        service={service}
        eventTypes={eventTypes}
        business={business}
      />
    </main>
  );
}
