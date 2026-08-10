'use client';

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { MenuCategory } from '@/src/types';

interface Props {
  categories:   MenuCategory[];
  activeId:     number | null;   // null = "All"
  onChange:     (id: number | null) => void;
}

export default function MenuCategoryTabs({ categories, activeId, onChange }: Props) {
  const listRef    = useRef<HTMLDivElement>(null);
  const activeRef  = useRef<HTMLButtonElement>(null);

  // Scroll active tab into view when it changes
  useEffect(() => {
    if (activeRef.current && listRef.current) {
      const list   = listRef.current;
      const btn    = activeRef.current;
      const offset = btn.offsetLeft - list.clientWidth / 2 + btn.clientWidth / 2;
      list.scrollTo({ left: offset, behavior: 'smooth' });
    }
  }, [activeId]);

  const tabs = [{ id: null, name: 'All', items_count: undefined }, ...categories];

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label="Menu categories"
      className="flex gap-2 overflow-x-auto scrollbar-hide px-6 lg:px-8 pb-1 snap-x"
      style={{ scrollbarWidth: 'none' }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id ?? 'all'}
            ref={isActive ? activeRef : null}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'snap-start shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2',
              isActive
                ? 'bg-[#2c1410] text-white shadow-md scale-105'
                : 'bg-white text-[#5a4035] border border-[#e8ddd0] hover:border-[#c9a84c] hover:text-[#2c1410]'
            )}
          >
            {tab.name}
            {tab.items_count !== undefined && (
              <span
                className={cn(
                  'text-[10px] font-bold rounded-full px-1.5 py-0.5 leading-none',
                  isActive ? 'bg-white/20 text-white' : 'bg-[#f0e6d3] text-[#7a6050]'
                )}
              >
                {tab.items_count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
