'use client';

interface ComingSoonProps {
  page: string;
}

export default function ComingSoon({ page }: ComingSoonProps) {
  return (
    <main className="min-h-screen bg-[#fdf9f4] flex flex-col items-center justify-center px-6">

      {/* Spinner — same fork & knife animation as the backend loader */}
      <div className="kk-coming-soon-icon mb-8">
        <div className="kk-coming-soon-plate" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="kk-coming-soon-svg"
        >
          {/* fork */}
          <path d="M8 3v4m0 0a2 2 0 0 0 0 4m0-4a2 2 0 0 1 0 4m0 0v10" />
          <path d="M6 3v3m4-3v3" />
          {/* knife */}
          <path d="M16 3c0 0 2 2 2 6s-2 4-2 4v8" />
        </svg>
      </div>

      {/* Gold accent line */}
      <div className="w-12 h-0.5 bg-[#c9a84c] mb-6" aria-hidden="true" />

      {/* Label */}
      <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
        Coming Soon
      </p>

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-[#2c1410] text-center mb-4">
        {page}
      </h1>

      <p className="text-[#7a6050] text-sm text-center max-w-sm leading-relaxed mb-10">
        We're putting the finishing touches on this page.
        Check back soon — it'll be worth the wait.
      </p>

      {/* Back home */}
      <a
        href="/"
        className="rounded bg-[#c9a84c] px-6 py-2.5 text-sm font-semibold text-[#1a0a08] hover:bg-[#d4b96a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2"
      >
        ← Back to Home
      </a>

      <style>{`
        .kk-coming-soon-icon {
          position: relative;
          width: 72px;
          height: 72px;
        }
        .kk-coming-soon-plate {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: 3px solid rgba(201, 168, 76, 0.18);
          border-top-color: #c9a84c;
          border-right-color: #3d2317;
          animation: kk-spin 0.9s linear infinite;
        }
        .kk-coming-soon-svg {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 30px;
          height: 30px;
          color: #3d2317;
          animation: kk-pulse 1.4s ease-in-out infinite;
        }
        @keyframes kk-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes kk-pulse {
          0%, 100% { opacity: 1;   transform: scale(1);    }
          50%       { opacity: 0.5; transform: scale(0.88); }
        }
      `}</style>
    </main>
  );
}
