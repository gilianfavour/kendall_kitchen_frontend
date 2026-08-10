import type { Metadata } from 'next';
import ComingSoon from '@/src/components/shared/ComingSoon';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Kendall Kitchen — coming soon.',
};

export default function ContactPage() {
  return <ComingSoon page="Contact Us" />;
}
