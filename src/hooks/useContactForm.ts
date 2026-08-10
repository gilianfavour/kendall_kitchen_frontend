'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitContactForm } from '@/src/services/contactService';
import type { ContactFormData } from '@/src/types';

const schema = z.object({
  name:     z.string().min(2, 'Name is required'),
  email:    z.string().email('A valid email is required'),
  phone:    z.string().optional(),
  subject:  z.string().optional(),
  message:  z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormSchema = z.infer<typeof schema>;
export type ContactSubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export function useContactForm() {
  const [status, setStatus]             = useState<ContactSubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name:    '',
      email:   '',
      phone:   '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = form.handleSubmit(async (values: ContactFormData) => {
    setStatus('loading');
    setErrorMessage('');
    try {
      await submitContactForm(values);
      setStatus('success');
      form.reset();
    } catch (err: unknown) {
      setStatus('error');
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setErrorMessage(
        axiosErr?.response?.data?.message ??
        'Could not send your message. Please try again or call us directly.'
      );
    }
  });

  return { form, status, errorMessage, onSubmit };
}
