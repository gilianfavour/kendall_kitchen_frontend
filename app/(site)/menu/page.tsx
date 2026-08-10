import type { Metadata } from 'next';
import { getSpecials } from '@/src/services/menuService';
import MenuHero     from '@/src/components/menu/MenuHero';
import SpecialsStrip from '@/src/components/menu/SpecialsStrip';
import MenuBrowser  from '@/src/components/menu/MenuBrowser';

export const dynamic    = 'force-dynamic';
export const revalidate = 300; // 5 min

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'Browse the full Kendall Kitchen menu — fresh ingredients, honest prices, and something delicious for every occasion.',
};

export default async function MenuPage() {
  // Specials are fetched server-side for instant above-the-fold render
  let specials: Awaited<ReturnType<typeof getSpecials>> = [];
  try {
    specials = await getSpecials();
  } catch {
    // Non-blocking — strip simply won't render
  }

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#fdf9f4]">
      <MenuHero />
      <SpecialsStrip specials={specials} />
      <MenuBrowser />
    </main>
  );
}
