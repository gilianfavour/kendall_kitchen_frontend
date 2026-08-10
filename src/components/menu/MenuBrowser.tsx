'use client';

import { useState, useMemo, useCallback } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import MenuCategoryTabs       from './MenuCategoryTabs';
import MenuItemCardEnhanced   from './MenuItemCardEnhanced';
import MenuItemCardSkeleton   from '@/src/components/home/MenuItemCardSkeleton';
import { getMenuCategories, getMenuItems } from '@/src/services/menuService';
import type { MenuItem } from '@/src/types';

type SortKey = 'name' | 'price_asc' | 'price_desc';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'name',       label: 'A – Z'          },
  { key: 'price_asc',  label: 'Price: Low → High' },
  { key: 'price_desc', label: 'Price: High → Low' },
];

export default function MenuBrowser() {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [search,           setSearch]           = useState('');
  const [sort,             setSort]             = useState<SortKey>('name');
  const [showFilters,      setShowFilters]       = useState(false);

  // ── Data fetching ────────────────────────────────────────────────────
  const { data: categories = [], isLoading: catsLoading } = useQuery({
    queryKey: ['menu-categories'],
    queryFn:  getMenuCategories,
    staleTime: 1000 * 60 * 10,
  });

  const { data: allItems = [], isLoading: itemsLoading } = useQuery({
    queryKey: ['menu-items-all'],
    queryFn:  () => getMenuItems({ per_page: 100 }),
    staleTime: 1000 * 60 * 5,
  });

  const isLoading = catsLoading || itemsLoading;

  // ── Client-side filtering & sorting ─────────────────────────────────
  const filtered = useMemo<MenuItem[]>(() => {
    let items = allItems;

    if (activeCategoryId !== null) {
      items = items.filter(i => i.category_id === activeCategoryId);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        i => i.name.toLowerCase().includes(q) ||
             (i.description ?? '').toLowerCase().includes(q) ||
             (i.category?.name ?? '').toLowerCase().includes(q)
      );
    }

    return [...items].sort((a, b) => {
      if (sort === 'price_asc')  return a.selling_price - b.selling_price;
      if (sort === 'price_desc') return b.selling_price - a.selling_price;
      return a.name.localeCompare(b.name);
    });
  }, [allItems, activeCategoryId, search, sort]);

  const handleCategoryChange = useCallback((id: number | null) => {
    setActiveCategoryId(id);
    setSearch(''); // clear search when switching category
  }, []);

  const clearSearch = () => setSearch('');

  const activeCategory = categories.find(c => c.id === activeCategoryId);

  return (
    <section aria-label="Full menu" className="pb-24">

      {/* ── Sticky filter bar ─────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-[#fdf9f4]/95 backdrop-blur-md border-b border-[#e8ddd0] py-4 shadow-sm">
        <div className="mx-auto max-w-7xl space-y-3">

          {/* Category tabs */}
          <MenuCategoryTabs
            categories={categories}
            activeId={activeCategoryId}
            onChange={handleCategoryChange}
          />

          {/* Search + sort row */}
          <div className="flex items-center gap-3 px-6 lg:px-8">
            {/* Search input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#b5a090]" aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search menu…"
                aria-label="Search menu items"
                className="w-full pl-9 pr-9 py-2 rounded-full border border-[#e8ddd0] bg-white text-sm text-[#2c1410] placeholder:text-[#c5b4a4] outline-none transition-colors focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20"
              />
              {search && (
                <button
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b5a090] hover:text-[#2c1410] transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Sort toggle */}
            <button
              onClick={() => setShowFilters(v => !v)}
              aria-expanded={showFilters}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#e8ddd0] bg-white text-xs font-medium text-[#5a4035] hover:border-[#c9a84c] hover:text-[#2c1410] transition-colors"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
              Sort
            </button>

            {/* Sort options (shown inline when open) */}
            {showFilters && (
              <div className="flex items-center gap-2">
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => { setSort(opt.key); setShowFilters(false); }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      sort === opt.key
                        ? 'bg-[#2c1410] text-white'
                        : 'bg-white border border-[#e8ddd0] text-[#5a4035] hover:border-[#c9a84c]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Content area ──────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-10">

        {/* Results header */}
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-[#2c1410]">
              {search
                ? `Results for "${search}"`
                : activeCategory
                  ? activeCategory.name
                  : 'All Items'}
            </h2>
            {!isLoading && (
              <p className="text-xs text-[#b5a090] mt-0.5">
                {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
              </p>
            )}
          </div>
          {/* Active filter pills */}
          <div className="flex gap-2">
            {activeCategoryId !== null && (
              <button
                onClick={() => handleCategoryChange(null)}
                className="flex items-center gap-1 text-xs bg-[#2c1410] text-white px-2.5 py-1 rounded-full hover:bg-[#3d1a1a] transition-colors"
              >
                {activeCategory?.name}
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            )}
            {search && (
              <button
                onClick={clearSearch}
                className="flex items-center gap-1 text-xs bg-[#f0e6d3] text-[#5a4035] px-2.5 py-1 rounded-full hover:bg-[#e8ddd0] transition-colors"
              >
                "{search}"
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <MenuItemCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-5xl mb-5 opacity-30" aria-hidden="true">🔍</span>
            <p className="text-[#2c1410] font-semibold text-lg mb-2">No items found</p>
            <p className="text-[#7a6050] text-sm max-w-xs">
              {search
                ? `No menu items match "${search}". Try a different search term.`
                : 'No items available in this category right now.'}
            </p>
            {(search || activeCategoryId !== null) && (
              <button
                onClick={() => { clearSearch(); setActiveCategoryId(null); }}
                className="mt-6 rounded-full bg-[#c9a84c] px-5 py-2 text-xs font-semibold text-[#1a0a08] hover:bg-[#d4b96a] transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((item, i) => (
              <MenuItemCardEnhanced key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
