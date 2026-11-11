import type { HomepageContent } from '@/src/types';

interface AboutStatsProps {
  homepage: HomepageContent | null;
}

export default function AboutStats({ homepage }: AboutStatsProps) {
  const statNumber = homepage?.about_stat_number ?? null;
  const statLabel  = homepage?.about_stat_label  ?? null;

  // Only render this section when the CMS has real stat data
  if (!statNumber || !statLabel) return null;

  return (
    <section
      aria-label="Key statistics"
      className="py-16 lg:py-20 bg-[#c9a84c]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-center">
        <dl className="flex flex-col items-center gap-2 text-center">
          <dt className="text-5xl sm:text-6xl font-extrabold text-[#1a0a08] leading-none">
            {statNumber}
          </dt>
          <dd className="text-sm font-semibold text-[#1a0a08]/70 uppercase tracking-widest mt-1">
            {statLabel}
          </dd>
        </dl>
      </div>
    </section>
  );
}
