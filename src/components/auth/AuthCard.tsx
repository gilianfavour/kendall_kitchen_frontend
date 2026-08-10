interface AuthCardProps {
  title:    string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="min-h-screen bg-[#fdf9f4] flex flex-col justify-center py-16 px-4">
      {/* Brand header */}
      <div className="text-center mb-8">
        <a href="/" className="inline-block mb-6" aria-label="Back to home">
          <span className="text-[#2c1410] font-bold text-2xl tracking-wide">
            Kendall Kitchen
          </span>
        </a>
        <div className="w-10 h-0.5 bg-[#c9a84c] mx-auto mb-5" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-[#2c1410]">{title}</h1>
        <p className="text-[#7a6050] text-sm mt-1.5">{subtitle}</p>
      </div>

      {/* Card */}
      <div className="mx-auto w-full max-w-md bg-white rounded-2xl border border-[#e8ddd0] shadow-sm p-8">
        {children}
      </div>
    </div>
  );
}
