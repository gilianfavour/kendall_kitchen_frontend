'use client';

import { AlertCircle, Send, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCateringForm } from '@/src/hooks/useCateringForm';
import type { CateringEventType, CateringPageContent } from '@/src/types';

interface CateringInquiryFormProps {
  eventTypes: CateringEventType[];
  business:   { phone?: string | null; email?: string | null } | null;
  cms:        CateringPageContent | null;
}

export default function CateringInquiryForm({ eventTypes, business, cms }: CateringInquiryFormProps) {
  const { form, status, errorMessage, eventNumber, onSubmit } = useCateringForm();
  const { register, formState: { errors } } = form;

  const eyebrow = cms?.form_eyebrow ?? 'Get in Touch';
  const heading = cms?.form_heading ?? 'Submit a Catering Inquiry';
  const subtext = cms?.form_subtext ?? 'Fill in the details below and our events team will reach out within 24 hours with a personalised proposal.';

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <section id="inquire" aria-labelledby="inquiry-heading" className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">

        {/* Header — from CMS */}
        <div className="text-center mb-12">
          <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            {eyebrow}
          </p>
          <h2 id="inquiry-heading" className="text-3xl sm:text-4xl font-bold text-[#2c1410]">
            {heading}
          </h2>
          <div className="divider-gold mt-5" aria-hidden="true" />
          {subtext && (
            <p className="mt-3 text-sm text-[#7a6050] max-w-lg mx-auto">{subtext}</p>
          )}
        </div>

        {status === 'success' ? (
          <SuccessState eventNumber={eventNumber} />
        ) : (
          <form onSubmit={onSubmit} noValidate aria-label="Catering inquiry form"
            className="bg-[#fdf9f4] rounded-2xl border border-[#e8ddd0] shadow-sm p-8 space-y-7">

            {/* Personal details */}
            <fieldset>
              <legend className="text-xs font-bold text-[#2c1410] uppercase tracking-wide mb-5 flex items-center gap-2">
                <span className="h-0.5 w-6 bg-[#c9a84c]" aria-hidden="true" />
                Your Details
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="First Name" required error={errors.first_name?.message}>
                  <input {...register('first_name')} type="text" autoComplete="given-name"
                    placeholder="Jane" className={inp(!!errors.first_name)} />
                </Field>
                <Field label="Last Name" required error={errors.last_name?.message}>
                  <input {...register('last_name')} type="text" autoComplete="family-name"
                    placeholder="Doe" className={inp(!!errors.last_name)} />
                </Field>
                <Field label="Email Address" required error={errors.email?.message}>
                  <input {...register('email')} type="email" autoComplete="email"
                    placeholder="jane@example.com" className={inp(!!errors.email)} />
                </Field>
                <Field label="Phone Number" required error={errors.phone_number?.message}>
                  <input {...register('phone_number')} type="tel" autoComplete="tel"
                    placeholder="+256 700 000 000" className={inp(!!errors.phone_number)} />
                </Field>
              </div>
            </fieldset>

            {/* Event details */}
            <fieldset>
              <legend className="text-xs font-bold text-[#2c1410] uppercase tracking-wide mb-5 flex items-center gap-2">
                <span className="h-0.5 w-6 bg-[#c9a84c]" aria-hidden="true" />
                Event Details
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Event Name" required error={errors.event_name?.message} className="sm:col-span-2">
                  <input {...register('event_name')} type="text"
                    placeholder="e.g. Jane & John's Wedding Reception"
                    className={inp(!!errors.event_name)} />
                </Field>
                <Field label="Event Type" required error={errors.event_type?.message}>
                  <select {...register('event_type')} className={inp(!!errors.event_type)}>
                    <option value="">Select event type…</option>
                    {eventTypes.map((et) => (
                      <option key={et.value} value={et.value}>{et.label}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Number of Guests" required error={errors.guest_count?.message}>
                  <input {...register('guest_count')} type="number" min={1}
                    placeholder="e.g. 200" className={inp(!!errors.guest_count)} />
                </Field>
                <Field label="Event Date" required error={errors.event_date?.message}>
                  <input {...register('event_date')} type="date" min={minDate}
                    className={inp(!!errors.event_date)} />
                </Field>
                <Field label="Event Time (optional)" error={errors.event_time?.message}>
                  <input {...register('event_time')} type="time" className={inp(!!errors.event_time)} />
                </Field>
                <Field label="Venue / Location (optional)" error={errors.location?.message} className="sm:col-span-2">
                  <input {...register('location')} type="text"
                    placeholder="e.g. Kampala Serena Hotel, Kintu Road"
                    className={inp(!!errors.location)} />
                </Field>
              </div>
            </fieldset>

            {/* Day-of contact */}
            <fieldset>
              <legend className="text-xs font-bold text-[#2c1410] uppercase tracking-wide mb-5 flex items-center gap-2">
                <span className="h-0.5 w-6 bg-[#c9a84c]" aria-hidden="true" />
                Day-of Contact
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Contact Person" required error={errors.contact_person?.message}>
                  <input {...register('contact_person')} type="text"
                    placeholder="Name of contact on the event day"
                    className={inp(!!errors.contact_person)} />
                </Field>
                <Field label="Contact Phone" required error={errors.contact_phone?.message}>
                  <input {...register('contact_phone')} type="tel"
                    placeholder="+256 700 000 000"
                    className={inp(!!errors.contact_phone)} />
                </Field>
              </div>
            </fieldset>

            <Field label="Additional Notes (optional)" error={errors.notes?.message}>
              <textarea {...register('notes')} rows={4}
                placeholder="Dietary requirements, special requests, theme preferences…"
                className={cn(inp(!!errors.notes), 'resize-none')} />
            </Field>

            {status === 'error' && errorMessage && (
              <div role="alert" className="flex items-start gap-2.5 rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                {errorMessage}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <button type="submit" disabled={status === 'loading'}
                className="inline-flex items-center gap-2 rounded bg-[#3d1a1a] px-8 py-3 text-sm font-semibold text-white hover:bg-[#5c2e2e] disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2">
                {status === 'loading' ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" aria-hidden="true" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Submit Inquiry
                  </>
                )}
              </button>
              <p className="text-xs text-[#b5a090]">
                We respond within 24 hours.
                {business?.phone && (
                  <> Prefer to call?{' '}
                    <a href={`tel:${business.phone.replace(/\s+/g, '')}`}
                      className="text-[#c9a84c] hover:underline">{business.phone}</a>
                  </>
                )}
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({ label, required, error, children, className }: {
  label: string; required?: boolean; error?: string;
  children: React.ReactNode; className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label className="text-xs font-semibold text-[#3d1a1a] uppercase tracking-wide">
        {label}
        {required && <span className="text-[#c9a84c] ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-red-600 flex items-center gap-1">
          <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

function inp(invalid: boolean) {
  return cn(
    'w-full rounded border bg-white px-3.5 py-2.5 text-sm text-[#2c1410] placeholder:text-[#c5b4a4]',
    'outline-none transition-colors focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20',
    invalid ? 'border-red-300' : 'border-[#e8ddd0]'
  );
}

function SuccessState({ eventNumber }: { eventNumber: string }) {
  return (
    <div role="status" aria-live="polite"
      className="flex flex-col items-center justify-center gap-5 rounded-2xl bg-[#fdf9f4] border border-[#e8ddd0] px-8 py-16 text-center">
      <CheckCircle className="h-16 w-16 text-[#c9a84c]" aria-hidden="true" />
      <div>
        <h3 className="text-xl font-bold text-[#2c1410] mb-2">Inquiry Received!</h3>
        <p className="text-sm text-[#5a4035] mb-3">
          Thank you for reaching out. Our events team will contact you within 24 hours.
        </p>
        {eventNumber && (
          <p className="text-xs text-[#b5a090]">
            Your reference number:{' '}
            <span className="font-mono font-bold text-[#c9a84c]">{eventNumber}</span>
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {eventNumber && (
          <a
            href={`/catering/track`}
            className="rounded bg-[#c9a84c] px-5 py-2.5 text-sm font-semibold text-[#1a0a08] hover:bg-[#d4b96a] transition-colors"
          >
            Track Your Inquiry
          </a>
        )}
        <a href="/" className="rounded border border-[#e8ddd0] px-5 py-2.5 text-sm font-semibold text-[#3d1a1a] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors">
          Back to Home
        </a>
      </div>
    </div>
  );
}
