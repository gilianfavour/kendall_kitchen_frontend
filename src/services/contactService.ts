import apiClient from '@/src/lib/axios';
import type { ContactFormData } from '@/src/types';

/**
 * POST /api/v1/contact
 *
 * Now exists in the backend — PublicController::contact().
 * Stores the enquiry in ActivityLog and creates a SystemNotification for admins.
 *
 * Response: { success: true, message: "Your message has been received.", data: null }
 */
export async function submitContactForm(data: ContactFormData): Promise<void> {
  await apiClient.post('/v1/contact', {
    name:    data.name,
    email:   data.email,
    phone:   data.phone   ?? undefined,
    subject: data.subject ?? undefined,
    message: data.message,
  });
}
