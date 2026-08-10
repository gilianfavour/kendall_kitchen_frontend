'use client';

import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useContactForm } from '@/src/hooks/useContactForm';
import type { BusinessInfo } from '@/src/types';

interface ContactSectionProps {
  business: BusinessInfo | null;
}

export default function ContactSection({ business }: ContactSectionProps) {
  const { form, status, errorMessage, onSubmit } = useContactForm();
  const { register, formState: { errors } } = form;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 lg:py-28 bg-[#fdf9f4]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Get In Touch
          </p>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-bold text-[#2c1410]"
          >
            Visit or Inquire
          </h2>
          <div className="divider-gold mt-5" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── Left — Form ─────────────────────────────────────────── */}
          <div className="bg-white rounded-lg border border-[#e8ddd0] shadow-sm p-8">
            {status === 'success' ? (
              <SuccessMessage />
            ) : (
              <form onSubmit={onSubmit} noValidate aria-label="Contact form" className="space-y-5">

                {/* Contact info pills at top */}
                <div className="space-y-3 mb-6 pb-6 border-b border-[#f0e6d3]">
                  {business?.phone && (
                    <div className="flex items-center gap-3 text-sm text-[#5a4035]">
                      <Phone className="h-4 w-4 text-[#c9a84c] shrink-0" aria-hidden="true" />
                      <a href={`tel:${business.phone}`} className="hover:text-[#c9a84c] transition-colors">
                        {business.phone}
                      </a>
                    </div>
                  )}
                  {business?.email && (
                    <div className="flex items-center gap-3 text-sm text-[#5a4035]">
                      <Mail className="h-4 w-4 text-[#c9a84c] shrink-0" aria-hidden="true" />
                      <a href={`mailto:${business.email}`} className="hover:text-[#c9a84c] transition-colors">
                        {business.email}
                      </a>
                    </div>
                  )}
                  {business?.address && (
                    <div className="flex items-center gap-3 text-sm text-[#5a4035]">
                      <MapPin className="h-4 w-4 text-[#c9a84c] shrink-0" aria-hidden="true" />
                      <span>{business.address}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Your Name" required error={errors.name?.message}>
                    <input
                      {...register('name')}
                      type="text"
                      id="contact-name"
                      autoComplete="name"
                      placeholder="Jane Doe"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      className={inputClass(!!errors.name)}
                    />
                  </Field>
                  <Field label="Email Address" required error={errors.email?.message}>
                    <input
                      {...register('email')}
                      type="email"
                      id="contact-email"
                      autoComplete="email"
                      placeholder="jane@example.com"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      className={inputClass(!!errors.email)}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Phone (optional)">
                    <input
                      {...register('phone')}
                      type="tel"
                      id="contact-phone"
                      autoComplete="tel"
                      placeholder="+256 700 000 000"
                      className={inputClass(false)}
                    />
                  </Field>
                  <Field label="Subject (optional)">
                    <input
                      {...register('subject')}
                      type="text"
                      id="contact-subject"
                      placeholder="Catering enquiry"
                      className={inputClass(false)}
                    />
                  </Field>
                </div>

                <Field label="Message" required error={errors.message?.message}>
                  <textarea
                    {...register('message')}
                    id="contact-message"
                    rows={4}
                    placeholder="How can we help you?"
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    className={cn(inputClass(!!errors.message), 'resize-none')}
                  />
                </Field>

                {status === 'error' && errorMessage && (
                  <div role="alert" className="flex items-start gap-2 rounded bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 rounded bg-[#3d1a1a] px-6 py-3 text-sm font-semibold text-white hover:bg-[#5c2e2e] disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── Right — Map placeholder ──────────────────────────────── */}
          <div className="h-full min-h-[460px] rounded-lg overflow-hidden bg-[#e8ddd0] border border-[#e8ddd0] flex flex-col items-center justify-center relative">
            {/* Simulated map grid */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(#c9a84c 1px, transparent 1px),
                  linear-gradient(90deg, #c9a84c 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 flex flex-col items-center gap-3 text-center px-8">
              <div className="h-14 w-14 rounded-full bg-[#3d1a1a] flex items-center justify-center shadow-lg">
                <MapPin className="h-7 w-7 text-[#c9a84c]" aria-hidden="true" />
              </div>
              <p className="text-[#2c1410] font-bold text-base">Find Us Here</p>
              {business?.address && (
                <p className="text-[#5a4035] text-sm leading-relaxed max-w-xs">
                  {business.address}
                </p>
              )}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(business?.address ?? 'Kendall Kitchen Kampala')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded bg-[#c9a84c] px-5 py-2 text-xs font-semibold text-[#1a0a08] hover:bg-[#d4b96a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
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

function inputClass(invalid: boolean) {
  return cn(
    'w-full rounded border bg-[#fdf9f4] px-3.5 py-2.5 text-sm text-[#2c1410] placeholder:text-[#b5a090]',
    'outline-none transition-colors',
    'focus:bg-white focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20',
    invalid ? 'border-red-300' : 'border-[#e8ddd0]'
  );
}

function SuccessMessage() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-4 py-16 text-center"
    >
      <CheckCircle className="h-14 w-14 text-[#c9a84c]" aria-hidden="true" />
      <div>
        <h3 className="text-lg font-bold text-[#2c1410] mb-2">Message Sent!</h3>
        <p className="text-sm text-[#5a4035]">
          Thank you for reaching out. We&apos;ll be in touch soon.
        </p>
      </div>
    </div>
  );
}
