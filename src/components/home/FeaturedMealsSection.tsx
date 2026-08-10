import { Suspense } from 'react';
import { getMenuItems } from '@/src/services/menuService';
import MenuItemCard from './MenuItemCard';
import MenuItemCardSkeleton from './MenuItemCardSkeleton';

// ── Server Component: fetches and renders menu items ──────────────────────
async function MealGrid() {
  let items = [];

  try {
    // Fetch first page, take 6 for the featured grid
    const all = await getMenuItems({ page: 1, per_page: 20 });
    items = all.slice(0, 6);
  } catch (err) {
    console.error('[FeaturedMeals] fetch error:', err);
    return (
      <div
        role="alert"
        className="col-span-full text-center py-14 rounded-lg bg-[#f8f3eb] border border-[#e8ddd0]"
      >
        <p className="text-[#7a6050] text-sm">
          Menu items could not be loaded right now. Please check back shortly.
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="col-span-full text-center py-14 rounded-lg bg-[#f8f3eb] border border-[#e8ddd0]">
        <p className="text-[#7a6050] text-sm">No menu items available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      {items.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
        />
      ))}
    </>
  );
}

// ── Loading skeleton ───────────────────────────────────────────────────────
function MealGridSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <MenuItemCardSkeleton key={i} />
      ))}
    </>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
export default function FeaturedMealsSection() {
  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="py-20 lg:py-28 bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              Featured Items
            </p>
            <h2
              id="menu-heading"
              className="text-3xl sm:text-4xl font-bold text-[#2c1410]"
            >
              Curated Masterpieces
            </h2>
            <div className="w-12 h-0.5 bg-[#c9a84c] mt-4" aria-hidden="true" />
          </div>

          {/* Link to the full menu page */}
          <a
            href="/menu"
            className="shrink-0 text-sm font-semibold text-[#c9a84c] hover:text-[#a8832a] underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded"
          >
            View Full Menu →
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense fallback={<MealGridSkeleton />}>
            <MealGrid />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
