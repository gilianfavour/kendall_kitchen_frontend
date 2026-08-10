'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitCateringInquiry } from '@/src/services/cateringService';

const schema = z.object({
  first_name:     z.string().min(2, 'First name required'),
  last_name:      z.string().min(2, 'Last name required'),
  email:          z.string().email('Valid email required'),
  phone_number:   z.string().min(7, 'Phone number required'),
  event_name:     z.string().min(3, 'Event name required'),
  event_type:     z.string().min(1, 'Please select an event type'),
  event_date:     z.string().min(1, 'Event date required'),
  event_time:     z.string().optional(),
  location:       z.string().optional(),
  // Keep as string in the form, convert to number on submit
  guest_count:    z.string().min(1, 'At least 1 guest required'),
  contact_person: z.string().min(2, 'Contact person required'),
  contact_phone:  z.string().min(7, 'Contact phone required'),
  notes:          z.string().optional(),
});

export type CateringFormSchema = z.infer<typeof schema>;
export type CateringSubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export function useCateringForm() {
  const [status, setStatus]             = useState<CateringSubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [eventNumber, setEventNumber]   = useState('');

  const form = useForm<CateringFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name:     '',
      last_name:      '',
      email:          '',
      phone_number:   '',
      event_name:     '',
      event_type:     '',
      event_date:     '',
      event_time:     '',
      location:       '',
      guest_count:    '50',
      contact_person: '',
      contact_phone:  '',
      notes:          '',
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setStatus('loading');
    setErrorMessage('');
    try {
      const result = await submitCateringInquiry({
        ...values,
        guest_count: parseInt(values.guest_count, 10) || 1,
      });
      setEventNumber(result.event_number);
      setStatus('success');
      form.reset();
    } catch (err: unknown) {
      setStatus('error');
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setErrorMessage(
        axiosErr?.response?.data?.message ??
        'We could not submit your inquiry. Please try again or call us directly.'
      );
    }
  });

  return { form, status, errorMessage, eventNumber, onSubmit };
}
