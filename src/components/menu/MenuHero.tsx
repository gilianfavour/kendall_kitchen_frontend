export default function MenuHero() {
  return (
    <section
      aria-label="Menu hero"
      className="relative bg-[#2c1410] py-24 lg:py-32 overflow-hidden"
    >
      {/* Decorative radial glow */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, #c9a84c 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.3em] mb-5">
          Kendall Kitchen
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Our Full Menu
        </h1>
        <div className="w-12 h-0.5 bg-[#c9a84c] mx-auto mb-6" aria-hidden="true" />
        <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          Fresh ingredients, crafted with care. Browse our full selection and discover
          something delicious for every occasion.
        </p>
      </div>
    </section>
  );
}
