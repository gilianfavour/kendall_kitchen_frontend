'use client';

import { useEffect } from 'react';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCateringForm } from '@/src/hooks/useCateringForm';
import type { CateringEventType } from '@/src/types';

interface QuoteDrawerProps {
  isOpen:         boolean;
  onClose:        () => void;
  eventTypes:     CateringEventType[];
  prefilledType?: string;   // auto-selects the event type
  serviceTitle?:  string;   // shown in the drawer header
  business?:      { phone?: string | null } | null;
}

export default function QuoteDrawer({
  isOpen, onClose, eventTypes, prefilledType, serviceTitle, business,
}: QuoteDrawerProps) {
  const { form, status, errorMessage, eventNumber, onSubmit } = useCateringForm();
  const { register, formState: { errors }, setValue } = form;

  // Pre-fill the event type when the drawer opens
  useEffect(() => {
    if (isOpen && prefilledType) {
      setValue('event_type', prefilledType);
    }
  }, [isOpen, prefilledType, setValue]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-[#1a0a08]/60 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      />

      {/* Drawer panel — slides in from the right */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Get a catering quote"
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex flex-col w-full max-w-lg bg-white shadow-2xl transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e8ddd0] shrink-0">
          <div>
            <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em]">
              Catering Quote
            </p>
            <h2 className="text-lg font-bold text-[#2c1410] mt-0.5">
              {serviceTitle ? `${serviceTitle} Quote` : 'Get a Quote'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quote drawer"
            className="h-8 w-8 rounded flex items-center justify-center text-[#7a6050] hover:bg-[#f0e6d3] hover:text-[#2c1410] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {status === 'success' ? (
            <DrawerSuccess eventNumber={eventNumber} onClose={onClose} />
          ) : (
            <form onSubmit={onSubmit} noValidate aria-label="Catering quote form" className="space-y-5">

              {/* Personal */}
              <div className="grid grid-cols-2 gap-4">
                <DField label="First Name" required error={errors.first_name?.message}>
                  <input
                    {...register('first_name')}
                    type="text"
                    autoComplete="given-name"
                    placeholder="Jane"
                    className={inp(!!errors.first_name)}
                  />
                </DField>
                <DField label="Last Name" required error={errors.last_name?.message}>
                  <input {...register('last_name')} type="text"
                    autoComplete="family-name" placeholder="Doe" className={inp(!!errors.last_name)} />
                </DField>
              </div>
              <DField label="Email" required error={errors.email?.message}>
                <input {...register('email')} type="email" autoComplete="email"
                  placeholder="jane@example.com" className={inp(!!errors.email)} />
              </DField>
              <DField label="Phone" required error={errors.phone_number?.message}>
                <input {...register('phone_number')} type="tel" autoComplete="tel"
                  placeholder="+256 700 000 000" className={inp(!!errors.phone_number)} />
              </DField>

              <div className="border-t border-[#f0e6d3] pt-5">
                <DField label="Event Name" required error={errors.event_name?.message}>
                  <input {...register('event_name')} type="text"
                    placeholder="e.g. Jane's Wedding Reception"
                    className={inp(!!errors.event_name)} />
                </DField>
              </div>

              <DField label="Event Type" required error={errors.event_type?.message}>
                <select {...register('event_type')} className={inp(!!errors.event_type)}>
                  <option value="">Select event type…</option>
                  {eventTypes.map((et) => (
                    <option key={et.value} value={et.value}>{et.label}</option>
                  ))}
                </select>
              </DField>

              <div className="grid grid-cols-2 gap-4">
                <DField label="Event Date" required error={errors.event_date?.message}>
                  <input {...register('event_date')} type="date" min={minDate}
                    className={inp(!!errors.event_date)} />
                </DField>
                <DField label="Guests" required error={errors.guest_count?.message}>
                  <input {...register('guest_count')} type="number" min={1}
                    placeholder="e.g. 200" className={inp(!!errors.guest_count)} />
                </DField>
              </div>

              <DField label="Venue / Location (optional)">
                <input {...register('location')} type="text"
                  placeholder="e.g. Kampala Serena Hotel"
                  className={inp(false)} />
              </DField>

              <div className="border-t border-[#f0e6d3] pt-5">
                <p className="text-xs font-bold text-[#2c1410] uppercase tracking-wide mb-3">
                  Day-of Contact
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <DField label="Contact Name" required error={errors.contact_person?.message}>
                    <input {...register('contact_person')} type="text"
                      placeholder="On-the-day contact"
                      className={inp(!!errors.contact_person)} />
                  </DField>
                  <DField label="Contact Phone" required error={errors.contact_phone?.message}>
                    <input {...register('contact_phone')} type="tel"
                      placeholder="+256 700 000 000"
                      className={inp(!!errors.contact_phone)} />
                  </DField>
                </div>
              </div>

              <DField label="Notes (optional)">
                <textarea {...register('notes')} rows={3}
                  placeholder="Dietary needs, theme, special requests…"
                  className={cn(inp(false), 'resize-none')} />
              </DField>

              {status === 'error' && errorMessage && (
                <div role="alert" className="flex items-start gap-2 rounded bg-red-50 border border-red-100 px-3 py-2.5 text-xs text-red-700">
                  <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" aria-hidden="true" />
                  {errorMessage}
                </div>
              )}

              {/* Sticky submit */}
              <div className="sticky bottom-0 -mx-6 px-6 py-4 bg-white border-t border-[#e8ddd0]">
                <button type="submit" disabled={status === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2 rounded bg-[#3d1a1a] px-6 py-3 text-sm font-semibold text-white hover:bg-[#5c2e2e] disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2">
                  {status === 'loading' ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" aria-hidden="true" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Submit Quote Request
                    </>
                  )}
                </button>
                {business?.phone && (
                  <p className="mt-2 text-center text-xs text-[#b5a090]">
                    Prefer to call?{' '}
                    <a href={`tel:${business.phone.replace(/\s+/g, '')}`}
                      className="text-[#c9a84c] hover:underline">{business.phone}</a>
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </aside>
    </>
  );
}

function DField({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
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
    'w-full rounded border bg-[#fdf9f4] px-3 py-2 text-sm text-[#2c1410] placeholder:text-[#c5b4a4]',
    'outline-none transition-colors focus:bg-white focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20',
    invalid ? 'border-red-300' : 'border-[#e8ddd0]'
  );
}

function DrawerSuccess({ eventNumber, onClose }: { eventNumber: string; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-16 text-center">
      <CheckCircle className="h-16 w-16 text-[#c9a84c]" aria-hidden="true" />
      <div>
        <h3 className="text-xl font-bold text-[#2c1410] mb-2">Quote Request Received!</h3>
        <p className="text-sm text-[#5a4035] mb-3">
          Our events team will contact you within 24 hours with a personalised proposal.
        </p>
        {eventNumber && (
          <p className="text-xs text-[#b5a090]">
            Reference:{' '}
            <span className="font-mono font-bold text-[#c9a84c]">{eventNumber}</span>
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        {eventNumber && (
          <a
            href="/catering/track"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center rounded bg-[#c9a84c] px-6 py-2.5 text-sm font-semibold text-[#1a0a08] hover:bg-[#d4b96a] transition-colors"
          >
            Track Your Inquiry
          </a>
        )}
        <button
          onClick={onClose}
          className="w-full rounded bg-[#3d1a1a] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#5c2e2e] transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
