import type { Metadata } from 'next';
import ComingSoon from '@/src/components/shared/ComingSoon';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Kendall Kitchen — coming soon.',
};

export default function AboutPage() {
  return <ComingSoon page="About Kendall Kitchen" />;
}
