/** Clean "coming soon" body. Used for every country that has no guide yet. */
export function ComingSoon({ name }: { name: string }) {
  return (
    <div className="mt-8 border-t border-white/15 pt-8">
      <svg viewBox="0 0 100 100" aria-hidden="true" className="h-14 w-14 rotate-45 text-gold" fill="currentColor">
        <path d="M50 4 C52 4 54 10 54 18 L54 36 L92 58 L92 64 L54 54 L54 76 L66 86 L66 91 L50 87 L34 91 L34 86 L46 76 L46 54 L8 64 L8 58 L46 36 L46 18 C46 10 48 4 50 4 Z" />
      </svg>
      <p className="mt-5 font-body text-lg text-white/90">We are still writing the {name} guide.</p>
      <p className="mt-2 text-white/70">Check back soon. The countries in gold on the map are ready now.</p>
    </div>
  )
}
