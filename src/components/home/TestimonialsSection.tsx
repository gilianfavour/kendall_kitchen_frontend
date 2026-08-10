import { Quote } from 'lucide-react';
import type { HomepageContent, Testimonial } from '@/src/types';

type DisplayTestimonial = {
  id: number;
  author_name: string;
  author_title?: string | null;
  content: string;
  rating: number;
};

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  homepage: HomepageContent | null;
}

const PLACEHOLDER_TESTIMONIALS: DisplayTestimonial[] = [
  {
    id: 1,
    author_name: 'Sarah M.',
    author_title: 'Regular Guest',
    content: 'The food at Kendall Kitchen is simply outstanding. Every dish is prepared with such care and attention — you can taste the quality in every bite.',
    rating: 5,
  },
  {
    id: 2,
    author_name: 'James O.',
    author_title: 'Corporate Client',
    content: 'We used Kendall Kitchen for our annual company dinner and it was a resounding success. The team was professional and the food was exceptional.',
    rating: 5,
  },
  {
    id: 3,
    author_name: 'Amara N.',
    author_title: 'Wedding Client',
    content: 'Choosing Kendall Kitchen for our wedding catering was the best decision we made. The menu was crafted perfectly to our tastes.',
    rating: 5,
  },
];

function TestimonialCard({ testimonial }: { testimonial: DisplayTestimonial }) {
  return (
    <article className="flex flex-col rounded-lg bg-[#3d1a1a] border border-[#5c2e2e] p-6">
      <Quote className="h-8 w-8 text-[#c9a84c] mb-4 opacity-80" aria-hidden="true" />
      <blockquote className="flex-1">
        <p className="text-white/80 text-sm leading-relaxed italic">
          &ldquo;{testimonial.content}&rdquo;
        </p>
      </blockquote>
      <footer className="mt-6 flex items-center gap-3">
        <div
          className="h-10 w-10 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/40 flex items-center justify-center text-[#c9a84c] font-bold text-sm shrink-0"
          aria-hidden="true"
        >
          {testimonial.author_name.charAt(0)}
        </div>
        <div>
          <p className="text-white text-sm font-semibold">{testimonial.author_name}</p>
          {testimonial.author_title && (
            <p className="text-[#c9a84c]/70 text-xs">{testimonial.author_title}</p>
          )}
        </div>
      </footer>
    </article>
  );
}

export default function TestimonialsSection({ testimonials, homepage }: TestimonialsSectionProps) {
  const eyebrow = homepage?.testimonials_eyebrow ?? 'Testimonials';
  const heading = homepage?.testimonials_heading ?? 'Kind Words From Our Table';

  const displayItems: DisplayTestimonial[] =
    testimonials.length > 0 ? testimonials : PLACEHOLDER_TESTIMONIALS;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-20 lg:py-28 bg-[#2c1410]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header — from CMS */}
        <div className="text-center mb-14">
          <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            {eyebrow}
          </p>
          <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-bold text-white">
            {heading}
          </h2>
          <div className="divider-gold mt-5" aria-hidden="true" />
          {testimonials.length === 0 && (
            <p className="text-white/30 text-xs mt-3">
              Sample reviews shown — add real ones from the dashboard.
            </p>
          )}
        </div>

        {/* Cards — from backend */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
