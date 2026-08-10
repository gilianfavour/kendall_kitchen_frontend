import { getBusinessInfo }           from '@/src/services/businessService';
import { getHomepageContent, getSocialLinks } from '@/src/services/homepageService';
import SiteNavigation               from '@/src/components/shared/SiteNavigation';
import SiteFooter                   from '@/src/components/shared/SiteFooter';
import CartDrawer                   from '@/src/components/cart/CartDrawer';

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch shared data — failures are swallowed so individual pages still render
  const [businessRes, homepageRes, socialsRes] = await Promise.allSettled([
    getBusinessInfo(),
    getHomepageContent(),
    getSocialLinks(),
  ]);

  const business    = businessRes.status  === 'fulfilled' ? businessRes.value  : null;
  const homepage    = homepageRes.status  === 'fulfilled' ? homepageRes.value  : null;
  const socialLinks = socialsRes.status   === 'fulfilled' ? socialsRes.value   : [];

  return (
    <>
      <SiteNavigation business={business} />
      <CartDrawer />
      {children}
      <SiteFooter business={business} homepage={homepage} socialLinks={socialLinks} />
    </>
  );
}
