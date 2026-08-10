'use client';

import { useEffect, useRef, useState } from 'react';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import apiClient from '@/src/lib/axios';

interface InquiryModalProps {
  isOpen:        boolean;
  onClose:       () => void;
  serviceTitle?: string;
  business?:     { email?: string | null; phone?: string | null } | null;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function InquiryModal({ isOpen, onClose, serviceTitle, business }: InquiryModalProps) {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus]   = useState<Status>('idle');
  const [errMsg, setErrMsg]   = useState('');
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', handler);
      setTimeout(() => firstRef.current?.focus(), 150);
    }
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    setErrMsg('');
    try {
      await apiClient.post('/v1/contact', {
        name:    form.name,
        email:   form.email,
        phone:   form.phone || undefined,
        subject: serviceTitle ? `Enquiry — ${serviceTitle}` : 'Catering Enquiry',
        message: form.message,
      });
      setStatus('success');
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setStatus('error');
      setErrMsg(axiosErr?.response?.data?.message ?? 'Could not send your message. Please try again.');
    }
  };

  const reset = () => {
    setForm({ name: '', email: '', phone: '', message: '' });
    setStatus('idle');
    setErrMsg('');
  };

  const handleClose = () => { reset(); onClose(); };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={handleClose}
        className="fixed inset-0 z-50 bg-[#1a0a08]/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Ask a question about catering"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#e8ddd0]">
            <div>
              <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em]">
                Ask a Question
              </p>
              <h2 className="text-lg font-bold text-[#2c1410] mt-0.5">
                {serviceTitle ? `About ${serviceTitle}` : 'Catering Enquiry'}
              </h2>
            </div>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="h-8 w-8 rounded flex items-center justify-center text-[#7a6050] hover:bg-[#f0e6d3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            {status === 'success' ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <CheckCircle className="h-14 w-14 text-[#c9a84c]" aria-hidden="true" />
                <div>
                  <h3 className="text-base font-bold text-[#2c1410] mb-1">Message Sent!</h3>
                  <p className="text-sm text-[#5a4035]">
                    We&apos;ll get back to you as soon as possible.
                  </p>
                </div>
                <button onClick={handleClose}
                  className="rounded bg-[#3d1a1a] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5c2e2e] transition-colors">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <p className="text-sm text-[#7a6050] mb-2">
                  Have a quick question? We&apos;ll respond within a few hours.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#3d1a1a] uppercase tracking-wide block mb-1">
                      Name <span className="text-[#c9a84c]" aria-hidden="true">*</span>
                    </label>
                    <input
                      ref={firstRef}
                      type="text"
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      placeholder="Jane Doe"
                      required
                      className={minp()}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#3d1a1a] uppercase tracking-wide block mb-1">
                      Email <span className="text-[#c9a84c]" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      placeholder="jane@example.com"
                      required
                      className={minp()}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#3d1a1a] uppercase tracking-wide block mb-1">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    placeholder="+256 700 000 000"
                    className={minp()}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#3d1a1a] uppercase tracking-wide block mb-1">
                    Message <span className="text-[#c9a84c]" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    rows={4}
                    placeholder="What would you like to know?"
                    required
                    className={cn(minp(), 'resize-none')}
                  />
                </div>

                {status === 'error' && errMsg && (
                  <div role="alert" className="flex items-start gap-2 rounded bg-red-50 border border-red-100 px-3 py-2 text-xs text-red-700">
                    <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" aria-hidden="true" />
                    {errMsg}
                  </div>
                )}

                <button type="submit" disabled={status === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2 rounded bg-[#c9a84c] px-6 py-2.5 text-sm font-semibold text-[#1a0a08] hover:bg-[#d4b96a] disabled:opacity-60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]">
                  {status === 'loading' ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-[#1a0a08]/20 border-t-[#1a0a08] animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </button>

                {business?.email && (
                  <p className="text-center text-xs text-[#b5a090]">
                    Or email us directly:{' '}
                    <a href={`mailto:${business.email}`} className="text-[#c9a84c] hover:underline">
                      {business.email}
                    </a>
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function minp() {
  return 'w-full rounded border border-[#e8ddd0] bg-[#fdf9f4] px-3 py-2 text-sm text-[#2c1410] placeholder:text-[#c5b4a4] outline-none transition-colors focus:bg-white focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20';
}
