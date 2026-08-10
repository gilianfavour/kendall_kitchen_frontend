import Image from 'next/image';
import type { CateringPageContent } from '@/src/types';

interface CateringMenuShowcaseProps {
  cms: CateringPageContent | null;
}

const DEFAULT_COURSES = [
  { label: 'Welcome Drinks', description: 'A curated selection of sparkling and still beverages to welcome your guests in style.' },
  { label: 'Appetisers',     description: 'Delicate canapés and starters designed to set the tone — light, refined, beautifully presented.' },
  { label: 'Main Course',    description: 'A choice of proteins served with seasonal vegetables and chef-crafted sauces. Vegetarian options available.' },
  { label: 'Dessert',        description: 'An indulgent finale — our signature dessert selection and a fresh fruit arrangement.' },
];

export default function CateringMenuShowcase({ cms }: CateringMenuShowcaseProps) {
  const eyebrow   = cms?.menu_eyebrow   ?? 'Sample Menu';
  const heading   = cms?.menu_heading   ?? 'A Taste of Excellence';
  const subtext   = cms?.menu_subtext   ?? 'Every menu is designed in close consultation with you.';
  const imageUrl  = cms?.menu_image_url ?? null;
  const courses   = (cms?.menu_courses && cms.menu_courses.length > 0)
    ? cms.menu_courses
    : DEFAULT_COURSES;

  return (
    <section
      id="packages"
      aria-labelledby="menu-showcase-heading"
      className="py-20 lg:py-28 bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            {eyebrow}
          </p>
          <h2 id="menu-showcase-heading"
            className="text-3xl sm:text-4xl font-bold text-[#2c1410]">
            {heading}
          </h2>
          <div className="divider-gold mt-5" aria-hidden="true" />
          {subtext && (
            <p className="mt-3 text-sm text-[#7a6050] max-w-xl mx-auto">{subtext}</p>
          )}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Courses list — from CMS */}
          <ol className="space-y-6" aria-label="Menu courses">
            {courses.map(({ label, description }, i) => (
              <li key={i} className="flex gap-5">
                <div
                  className="shrink-0 h-8 w-8 rounded-full bg-[#c9a84c] flex items-center justify-center text-[#1a0a08] font-extrabold text-xs mt-0.5"
                  aria-hidden="true"
                >
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#2c1410] mb-1">{label}</h3>
                  <p className="text-sm text-[#7a6050] leading-relaxed">{description}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Image — only rendered when uploaded in the backend */}
          <div className="relative rounded-xl overflow-hidden h-80 lg:h-full min-h-[340px] shadow-md bg-[#2c1410]">
            {imageUrl && (
              <Image src={imageUrl} alt="Catering menu showcase"
                fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a08]/40 to-transparent"
              aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
