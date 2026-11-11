import Image from 'next/image';
import Link from 'next/link';
import type { BusinessInfo, ServiceCard } from '@/src/types';

interface AboutServicesProps {
  services: ServiceCard[];
  business: BusinessInfo | null;
}

export default function AboutServices({ services, business }: AboutServicesProps) {
  // Don't render section if no services loaded from API
  if (services.length === 0) return null;

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
            What We Do
          </p>
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl font-bold text-[#2c1410]"
          >
            Our Services
          </h2>
          <div className="divider-gold mt-5" aria-hidden="true" />
          {business?.description && (
            <p className="mt-4 text-sm text-[#7a6050] max-w-lg mx-auto leading-relaxed">
              {business.description}
            </p>
          )}
        </div>

        {/* Services grid */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          role="list"
          aria-label="Services offered"
        >
          {services.map((service) => (
            <li
              key={service.id}
              className="bg-white rounded-lg border border-[#e8ddd0] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Service image */}
              <div className="relative h-48 bg-[#2c1410] shrink-0">
                {service.image_url ? (
                  <Image
                    src={service.image_url}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  /* Placeholder pattern when no image uploaded */
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(#c9a84c 1px, transparent 1px),
                        linear-gradient(90deg, #c9a84c 1px, transparent 1px)
                      `,
                      backgroundSize: '24px 24px',
                    }}
                    aria-hidden="true"
                  />
                )}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#1a0a08]/60 to-transparent"
                  aria-hidden="true"
                />
              </div>

              {/* Service content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-base font-bold text-[#2c1410] mb-2">{service.title}</h3>
                {service.description && (
                  <p className="text-[#7a6050] text-sm leading-relaxed flex-1">
                    {service.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/catering"
            className="inline-flex items-center rounded bg-[#3d1a1a] px-7 py-3 text-sm font-semibold text-white hover:bg-[#5c2e2e] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2"
          >
            Explore Catering Services
          </Link>
        </div>

      </div>
    </section>
  );
}
