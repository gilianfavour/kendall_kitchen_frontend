import Image from 'next/image';
import type { HomepageContent, ServiceCard } from '@/src/types';

interface ServicesSectionProps {
  homepage: HomepageContent | null;
  services: ServiceCard[];
}

export default function ServicesSection({ homepage, services }: ServicesSectionProps) {
  const eyebrow = homepage?.services_eyebrow ?? 'Our Services';
  const heading = homepage?.services_heading ?? 'A Culinary Experience for Every Occasion';

  const cards = services.length > 0 ? services : [];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-20 lg:py-28 bg-[#fdf9f4]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            {eyebrow}
          </p>
          <h2 id="services-heading" className="text-3xl sm:text-4xl font-bold text-[#2c1410]">
            {heading}
          </h2>
          <div className="divider-gold mt-5" aria-hidden="true" />
        </div>

        {cards.length === 0 ? (
          <div className="text-center py-12 text-[#7a6050] text-sm">
            No services added yet. Add service cards from the dashboard.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card, i) => {
              const span = i === 1 ? 'sm:col-span-2 lg:col-span-1' : '';

              return (
                <article
                  key={card.id}
                  className={`relative overflow-hidden rounded-lg group cursor-pointer h-52 bg-[#2c1410] ${span}`}
                >
                  {/* Image — only rendered when uploaded in the backend */}
                  {card.image_url && (
                    <Image
                      src={card.image_url}
                      alt={card.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}

                  {/* Overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#1a0a08]/80 via-[#1a0a08]/30 to-transparent"
                    aria-hidden="true"
                  />

                  {/* Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-base mb-1">{card.title}</h3>
                    {card.description && (
                      <p className="text-white/70 text-xs leading-relaxed line-clamp-2">
                        {card.description}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
