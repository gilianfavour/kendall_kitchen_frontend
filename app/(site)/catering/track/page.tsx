import type { Metadata } from 'next';
import TrackInquiry from '@/src/components/catering/TrackInquiry';

export const metadata: Metadata = {
  title: 'Track Your Inquiry',
  description: 'Check the status of your catering inquiry — Kendall Kitchen.',
};

export default function TrackInquiryPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <TrackInquiry />
    </main>
  );
}
