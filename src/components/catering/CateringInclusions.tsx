import { CheckCircle } from 'lucide-react';
import type { CateringPageContent } from '@/src/types';

interface CateringInclusionsProps {
  cms: CateringPageContent | null;
}

const DEFAULT_COLUMNS = [
  {
    column: 'Premium Equipment',
    items: ['Fine china and glassware', 'Table linens and skirting', 'Chafing dishes and warmers', 'Tables and chairs'],
  },
  {
    column: 'Professional Service',
    items: ['Dedicated event coordinator', 'Uniformed service staff', 'Clean-up and pack-down', 'Transport logistics'],
  },
];

export default function CateringInclusions({ cms }: CateringInclusionsProps) {
  const eyebrow = cms?.inclusions_eyebrow ?? "What's Included";
  const heading = cms?.inclusions_heading ?? 'Standard Package Inclusions';
  const columns = (cms?.inclusions_columns && cms.inclusions_columns.length > 0)
    ? cms.inclusions_columns
    : DEFAULT_COLUMNS;

  return (
    <section
      id="inclusions"
      aria-labelledby="inclusions-heading"
      className="py-20 lg:py-28 bg-[#fdf9f4]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="text-center mb-14">
          <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            {eyebrow}
          </p>
          <h2 id="inclusions-heading"
            className="text-3xl sm:text-4xl font-bold text-[#2c1410]">
            {heading}
          </h2>
          <div className="divider-gold mt-5" aria-hidden="true" />
        </div>

        {/* Grid of inclusion columns — from CMS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {columns.map(({ column, items }, ci) => (
            <div key={ci}
              className="rounded-xl bg-white border border-[#e8ddd0] shadow-sm p-6">
              <h3 className="text-sm font-bold text-[#2c1410] mb-4 flex items-center gap-2">
                <span className="h-1.5 w-4 rounded-full bg-[#c9a84c]" aria-hidden="true" />
                {column}
              </h3>
              <ul className="space-y-3">
                {items.map((item, ii) => (
                  <li key={ii} className="flex items-center gap-2.5 text-sm text-[#5a4035]">
                    <CheckCircle className="h-4 w-4 text-[#c9a84c] shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
