'use client';

import { useState } from 'react';
import { Search, CheckCircle, Clock, AlertCircle, XCircle, ChevronRight } from 'lucide-react';
import apiClient from '@/src/lib/axios';
import type { CateringEventSummary } from '@/src/types';

type Status = 'idle' | 'loading' | 'found' | 'not_found' | 'error';

// Map backend status values to a user-friendly step progress
const STATUS_STEPS = [
  { key: 'inquiry',       label: 'Received',    description: 'Your inquiry has been received and is being reviewed.' },
  { key: 'quoted',        label: 'Quoted',       description: 'We have sent you a quote. Please check your email.' },
  { key: 'negotiating',   label: 'Negotiating',  description: 'We are finalising the details with you.' },
  { key: 'approved',      label: 'Confirmed',    description: 'Your event has been confirmed. Exciting times!' },
  { key: 'planned',       label: 'Planned',      description: 'Your event is fully planned and in our schedule.' },
  { key: 'in_production', label: 'In Prep',      description: 'Our kitchen is preparing for your event.' },
  { key: 'ready',         label: 'Ready',        description: 'Everything is ready for your event.' },
  { key: 'delivered',     label: 'Delivered',    description: 'Your event has been successfully delivered.' },
  { key: 'completed',     label: 'Completed',    description: 'Your event is complete. Thank you for choosing Kendall Kitchen!' },
];

const TERMINAL_STATUSES = ['completed', 'cancelled'];

function getStepIndex(status: string): number {
  return STATUS_STEPS.findIndex(s => s.key === status);
}

function StatusBadge({ status, label }: { status: string; label: string }) {
  const colours: Record<string, string> = {
    inquiry:       'bg-gray-100 text-gray-700',
    quoted:        'bg-blue-100 text-blue-700',
    negotiating:   'bg-amber-100 text-amber-700',
    approved:      'bg-[#c9a84c]/15 text-[#8a6200]',
    planned:       'bg-[#c9a84c]/15 text-[#8a6200]',
    in_production: 'bg-amber-100 text-amber-700',
    ready:         'bg-emerald-100 text-emerald-700',
    delivered:     'bg-emerald-100 text-emerald-700',
    completed:     'bg-emerald-100 text-emerald-700',
    cancelled:     'bg-red-100 text-red-700',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${colours[status] ?? 'bg-gray-100 text-gray-700'}`}>
      {label}
    </span>
  );
}

export default function TrackInquiry() {
  const [reference, setReference] = useState('');
  const [email,     setEmail]     = useState('');
  const [status,    setStatus]    = useState<Status>('idle');
  const [event,     setEvent]     = useState<CateringEventSummary | null>(null);
  const [errMsg,    setErrMsg]    = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim() || !email.trim()) return;
    setStatus('loading');
    setErrMsg('');
    setEvent(null);

    try {
      const res = await apiClient.get(
        `/v1/catering/inquiries/${reference.trim().toUpperCase()}`,
        { params: { email: email.trim() } }
      );
      setEvent(res.data?.data ?? null);
      setStatus('found');
    } catch (err: unknown) {
      const axiosErr = err as { response?: { status?: number; data?: { message?: string } } };
      if (axiosErr?.response?.status === 404) {
        setStatus('not_found');
      } else {
        setStatus('error');
        setErrMsg(axiosErr?.response?.data?.message ?? 'Something went wrong. Please try again.');
      }
    }
  };

  const reset = () => {
    setStatus('idle');
    setEvent(null);
    setErrMsg('');
  };

  const currentStep = event ? getStepIndex(event.status) : -1;
  const isCancelled = event?.status === 'cancelled';

  return (
    <section className="min-h-[80vh] bg-[#fdf9f4] py-20 lg:py-28">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Inquiry Tracker
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2c1410] mb-4">
            Track Your Inquiry
          </h1>
          <div className="w-12 h-0.5 bg-[#c9a84c] mx-auto mb-4" aria-hidden="true" />
          <p className="text-[#7a6050] text-sm leading-relaxed max-w-sm mx-auto">
            Enter the reference number from your confirmation and the email you submitted with.
          </p>
        </div>

        {/* Lookup form */}
        {status !== 'found' && (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-[#e8ddd0] shadow-sm p-8 space-y-5 mb-8"
          >
            <div>
              <label className="text-xs font-semibold text-[#3d1a1a] uppercase tracking-wide block mb-1.5">
                Reference Number <span className="text-[#c9a84c]" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                value={reference}
                onChange={e => setReference(e.target.value)}
                placeholder="CAT-000001"
                required
                className="w-full rounded border border-[#e8ddd0] bg-[#fdf9f4] px-3.5 py-2.5 text-sm font-mono text-[#2c1410] placeholder:text-[#c5b4a4] outline-none transition-colors focus:bg-white focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#3d1a1a] uppercase tracking-wide block mb-1.5">
                Email Address <span className="text-[#c9a84c]" aria-hidden="true">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="The email you submitted with"
                required
                className="w-full rounded border border-[#e8ddd0] bg-[#fdf9f4] px-3.5 py-2.5 text-sm text-[#2c1410] placeholder:text-[#c5b4a4] outline-none transition-colors focus:bg-white focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20"
              />
            </div>

            {/* Status messages */}
            {status === 'not_found' && (
              <div role="alert" className="flex items-start gap-2.5 rounded-lg bg-amber-50 border border-amber-100 px-4 py-3 text-sm text-amber-800">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                No inquiry found with that reference and email. Please double-check and try again.
              </div>
            )}

            {status === 'error' && errMsg && (
              <div role="alert" className="flex items-start gap-2.5 rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                {errMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full inline-flex items-center justify-center gap-2 rounded bg-[#3d1a1a] px-6 py-3 text-sm font-semibold text-white hover:bg-[#5c2e2e] disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2"
            >
              {status === 'loading' ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" aria-hidden="true" />
                  Looking up…
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" aria-hidden="true" />
                  Check Status
                </>
              )}
            </button>
          </form>
        )}

        {/* Result card */}
        {status === 'found' && event && (
          <div className="bg-white rounded-2xl border border-[#e8ddd0] shadow-sm p-8 space-y-8">

            {/* Event header */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs text-[#b5a090] font-mono mb-1">{event.event_number}</p>
                <h2 className="text-xl font-bold text-[#2c1410]">{event.event_name}</h2>
                {event.event_type_label && (
                  <p className="text-sm text-[#7a6050] mt-1">{event.event_type_label}</p>
                )}
              </div>
              <StatusBadge status={event.status} label={event.status_label} />
            </div>

            {/* Progress stepper (not shown for cancelled) */}
            {!isCancelled && (
              <div>
                <p className="text-xs font-semibold text-[#3d1a1a] uppercase tracking-wide mb-4">Progress</p>
                <ol className="relative" aria-label="Inquiry progress">
                  {STATUS_STEPS.map((step, i) => {
                    const isDone    = i < currentStep;
                    const isCurrent = i === currentStep;
                    return (
                      <li key={step.key} className="flex gap-4 pb-6 last:pb-0">
                        {/* Circle */}
                        <div className="flex flex-col items-center">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                            isDone    ? 'bg-[#c9a84c] text-[#1a0a08]' :
                            isCurrent ? 'bg-[#3d1a1a] text-white ring-4 ring-[#3d1a1a]/20' :
                                        'bg-[#f0e6d3] text-[#c5b4a4]'
                          }`}>
                            {isDone ? (
                              <CheckCircle className="h-4 w-4" aria-hidden="true" />
                            ) : isCurrent ? (
                              <Clock className="h-4 w-4" aria-hidden="true" />
                            ) : (
                              <span className="text-xs font-bold">{i + 1}</span>
                            )}
                          </div>
                          {i < STATUS_STEPS.length - 1 && (
                            <div className={`w-0.5 flex-1 mt-1 ${isDone ? 'bg-[#c9a84c]' : 'bg-[#e8ddd0]'}`} aria-hidden="true" />
                          )}
                        </div>
                        {/* Text */}
                        <div className="pt-1 pb-6">
                          <p className={`text-sm font-semibold ${isCurrent ? 'text-[#2c1410]' : isDone ? 'text-[#7a6050]' : 'text-[#c5b4a4]'}`}>
                            {step.label}
                          </p>
                          {isCurrent && (
                            <p className="text-xs text-[#7a6050] mt-0.5 leading-relaxed">
                              {step.description}
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}

            {/* Cancelled notice */}
            {isCancelled && (
              <div className="flex items-start gap-3 rounded-lg bg-red-50 border border-red-100 px-4 py-4">
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-red-700">This event has been cancelled</p>
                  <p className="text-xs text-red-600 mt-0.5">
                    Please contact us if you believe this is an error or would like to rebook.
                  </p>
                </div>
              </div>
            )}

            {/* Event details */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#f0e6d3]">
              {[
                { label: 'Event Date',     value: new Date(event.event_date).toLocaleDateString('en-UG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) },
                { label: 'Guests',         value: event.guest_count.toString() },
                { label: 'Location',       value: event.location ?? '—' },
                { label: 'Contact',        value: event.contact_person ?? '—' },
                { label: 'Quoted Amount',  value: event.quoted_amount ? `UGX ${Number(event.quoted_amount).toLocaleString()}` : '—' },
                { label: 'Final Amount',   value: event.final_amount  ? `UGX ${Number(event.final_amount).toLocaleString()}`  : '—' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-[#b5a090] uppercase tracking-wide">{label}</p>
                  <p className="text-sm font-medium text-[#2c1410] mt-0.5">{value}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="/catering#inquire"
                className="inline-flex items-center gap-2 rounded bg-[#c9a84c] px-5 py-2.5 text-xs font-semibold text-[#1a0a08] hover:bg-[#d4b96a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
              >
                Submit Another Inquiry
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded border border-[#e8ddd0] px-5 py-2.5 text-xs font-semibold text-[#3d1a1a] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
              >
                <Search className="h-3.5 w-3.5" aria-hidden="true" />
                Track Another
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
