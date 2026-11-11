'use client';

import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useContactForm } from '@/src/hooks/useContactForm';
import type { BusinessInfo } from '@/src/types';

interface ContactFormProps {
  business: BusinessInfo | null;
}

export default function ContactForm({ business }: ContactFormProps) {
  const { form, status, errorMessage, onSubmit } = useContactForm();
  const { register, formState: { errors } } = form;

  return (
    <section
      id="contact-form"
      aria-labelledby="contact-form-heading"
      className="py-20 lg:py-28 bg-[#fdf9f4]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            We&apos;d Love to Hear From You
          </p>
          <h2
            id="contact-form-heading"
            className="text-3xl sm:text-4xl font-bold text-[#2c1410]"
          >
            Send Us a Message
          </h2>
          <div className="divider-gold mt-5" aria-hidden="true" />
          <p className="mt-4 text-sm text-[#7a6050] max-w-lg mx-auto">
            Whether you have a question, a catering enquiry, or just want to say hello — fill in
            the form and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

          {/* ── Left — Contact info panel ──────────────────────────── */}
          <aside
            aria-label="Contact information"
            className="lg:col-span-2 space-y-6"
          >
            {/* Info card */}
            <div className="bg-[#3d1a1a] rounded-lg p-8 text-white space-y-6">
              <div>
                <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-1">
                  Get in Touch
                </p>
                <h3 className="text-lg font-bold">
                  {business?.name ?? 'Kendall Kitchen'}
                </h3>
                {business?.tagline && (
                  <p className="text-white/60 text-xs mt-1 leading-relaxed">
                    {business.tagline}
                  </p>
                )}
              </div>

              <ul className="space-y-4" aria-label="Contact details">
                {business?.phone && (
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 h-8 w-8 rounded-full bg-[#c9a84c]/15 flex items-center justify-center shrink-0">
                      <Phone className="h-3.5 w-3.5 text-[#c9a84c]" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-wide mb-0.5">Phone</p>
                      <a
                        href={`tel:${business.phone.replace(/\s+/g, '')}`}
                        className="text-sm text-white hover:text-[#c9a84c] transition-colors"
                      >
                        {business.phone}
                      </a>
                    </div>
                  </li>
                )}

                {business?.email && (
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 h-8 w-8 rounded-full bg-[#c9a84c]/15 flex items-center justify-center shrink-0">
                      <Mail className="h-3.5 w-3.5 text-[#c9a84c]" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-wide mb-0.5">Email</p>
                      <a
                        href={`mailto:${business.email}`}
                        className="text-sm text-white hover:text-[#c9a84c] transition-colors break-all"
                      >
                        {business.email}
                      </a>
                    </div>
                  </li>
                )}

                {business?.address && (
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 h-8 w-8 rounded-full bg-[#c9a84c]/15 flex items-center justify-center shrink-0">
                      <MapPin className="h-3.5 w-3.5 text-[#c9a84c]" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-wide mb-0.5">Location</p>
                      <p className="text-sm text-white leading-relaxed">{business.address}</p>
                    </div>
                  </li>
                )}

                <li className="flex items-start gap-3">
                  <div className="mt-0.5 h-8 w-8 rounded-full bg-[#c9a84c]/15 flex items-center justify-center shrink-0">
                    <Clock className="h-3.5 w-3.5 text-[#c9a84c]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-wide mb-0.5">Response Time</p>
                    <p className="text-sm text-white">We reply within 24 hours</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map placeholder */}
            <div
              className="relative h-52 rounded-lg overflow-hidden bg-[#e8ddd0] border border-[#e8ddd0] flex flex-col items-center justify-center"
              aria-label="Map location placeholder"
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(#c9a84c 1px, transparent 1px),
                    linear-gradient(90deg, #c9a84c 1px, transparent 1px)
                  `,
                  backgroundSize: '32px 32px',
                }}
                aria-hidden="true"
              />
              <div className="relative z-10 flex flex-col items-center gap-3 text-center px-6">
                <div className="h-12 w-12 rounded-full bg-[#3d1a1a] flex items-center justify-center shadow-lg">
                  <MapPin className="h-6 w-6 text-[#c9a84c]" aria-hidden="true" />
                </div>
                <p className="text-[#2c1410] font-semibold text-sm">Find Us Here</p>
                {business?.address && (
                  <p className="text-[#5a4035] text-xs leading-relaxed max-w-xs">{business.address}</p>
                )}
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(business?.address ?? 'Kendall Kitchen Kampala')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 rounded bg-[#c9a84c] px-4 py-1.5 text-xs font-semibold text-[#1a0a08] hover:bg-[#d4b96a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </aside>

          {/* ── Right — Form ───────────────────────────────────────── */}
          <div className="lg:col-span-3 bg-white rounded-lg border border-[#e8ddd0] shadow-sm p-8">
            {status === 'success' ? (
              <SuccessMessage />
            ) : (
              <form onSubmit={onSubmit} noValidate aria-label="Contact form" className="space-y-5">

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
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
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
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
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
                      placeholder="Catering enquiry, feedback…"
                      className={inputClass(false)}
                    />
                  </Field>
                </div>

                <Field label="Your Message" required error={errors.message?.message}>
                  <textarea
                    {...register('message')}
                    id="contact-message"
                    rows={6}
                    placeholder="Tell us how we can help you…"
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className={cn(inputClass(!!errors.message), 'resize-none')}
                  />
                </Field>

                {status === 'error' && errorMessage && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700"
                  >
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
                      <span
                        className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                        aria-hidden="true"
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-[#b5a090]">
                  We&apos;ll respond within 24 hours. For urgent matters, please call us directly.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ── Helpers ──────────────────────────────────────────────────────────── */

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
        {required && (
          <span className="text-[#c9a84c] ml-0.5" aria-hidden="true">*</span>
        )}
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
    invalid ? 'border-red-300' : 'border-[#e8ddd0]',
  );
}

function SuccessMessage() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-5 py-20 text-center"
    >
      <div className="h-16 w-16 rounded-full bg-[#c9a84c]/10 flex items-center justify-center">
        <CheckCircle className="h-9 w-9 text-[#c9a84c]" aria-hidden="true" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-[#2c1410] mb-2">Message Sent!</h3>
        <p className="text-sm text-[#5a4035] max-w-xs mx-auto leading-relaxed">
          Thank you for reaching out. A member of our team will be in touch within 24 hours.
        </p>
      </div>
    </div>
  );
}
