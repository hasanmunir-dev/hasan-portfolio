export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stroke px-6 md:px-10 py-8">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-display text-xl text-ink-3 tracking-wider">H·M</span>
        <p className="text-label text-ink-3 text-center">
          DESIGNED &amp; ENGINEERED BY HASAN MUNIR — {year}
        </p>
        <p className="text-label text-ink-3">NEXT.JS · FRAMER MOTION</p>
      </div>
    </footer>
  );
}
