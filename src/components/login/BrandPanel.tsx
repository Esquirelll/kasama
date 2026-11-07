import heroPhoto from '@/assets/home/hero-banner.webp'
import logoBadge from '@/assets/brand/logo-badge.webp'

/** Left side of the login card: lagoon photo + the round logo badge (same idea as the mockup's hero badge). */
export function BrandPanel() {
  return (
    <div className="relative isolate flex min-h-[300px] flex-col items-center justify-center gap-5 overflow-hidden px-8 py-12 text-center lg:min-h-[580px]">
      <img src={heroPhoto} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep/85 via-navy-deep/30 to-navy-deep/10" />

      <div className="grid h-40 w-40 place-items-center overflow-hidden rounded-full border-2 border-gold bg-white shadow-[0_14px_44px_rgba(12,36,60,0.5)] sm:h-48 sm:w-48">
        <img src={logoBadge} alt="Kasama Guide and Tour logo" className="h-full w-full object-cover" />
      </div>

      <p className="font-script text-4xl leading-none text-shadow-soft sm:text-5xl">Travel with a Kasama</p>
      {/* [SAMPLE COPY] replace with your own wording */}
      <p className="max-w-xs font-body text-sm text-white/90 text-shadow-soft">
        Your guide to Southeast Asia, made for Filipino travelers.
      </p>
    </div>
  )
}
