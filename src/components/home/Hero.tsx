import { SITE } from '@/data/site'
import heroPhoto from '@/assets/home/hero-banner.webp'
import logoBadge from '@/assets/brand/logo-badge.webp'
import wordmark from '@/assets/brand/wordmark-kasama.webp'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { PinIcon } from '@/components/ui/icons'
import { SampleTag } from '@/components/ui/SampleTag'
import { WaveDivider } from '@/components/ui/WaveDivider'

export function Hero({ onBookNow }: { onBookNow: () => void }) {
  return (
    <header id="top" className="relative isolate flex h-[100svh] max-h-[920px] min-h-[620px] flex-col overflow-hidden">
      <img
        src={heroPhoto}
        alt="Traditional boats on a turquoise lagoon beneath limestone cliffs"
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full animate-kenburns object-cover"
      />
      {/* shade for legibility: darker on the text side, plus a soft top band for the thin header line */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep/65 via-navy-deep/20 to-transparent" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-navy-deep/50 to-transparent" />

      <Container className="flex items-center gap-5 pt-6">
        <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full border border-white bg-white sm:h-16 sm:w-16">
          <img src={logoBadge} alt="Kasama Guide and Tour logo" className="h-full w-full object-cover" />
        </span>
        <span aria-hidden="true" className="hidden h-px max-w-[52%] flex-1 bg-white/90 sm:block" />
        {/* [SAMPLE] address from the mockup */}
        <span className="ml-auto hidden font-nav text-xs font-light uppercase tracking-[0.25em] text-white sm:block">
          {SITE.hero.url}
        </span>
      </Container>

      <Container className="relative z-10 flex flex-1 flex-col justify-center pb-32">
        <h1>
          <img src={wordmark} alt="Kasama" width={1100} height={300} className="h-auto w-[min(88%,34rem)]" />
        </h1>
        <p className="mt-3 pl-2 font-script text-5xl text-shadow-soft sm:text-6xl lg:text-7xl">{SITE.hero.tagline}</p>
        {/* [SAMPLE COPY] */}
        <p className="mt-5 max-w-lg pl-2 text-lg text-white/90 text-shadow-soft">
          {SITE.hero.blurb}
          <SampleTag />
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4 pl-2">
          <ButtonLink href="#destinations" variant="gold">{SITE.hero.explore}</ButtonLink>
          <Button onClick={onBookNow} className="bg-navy-deep/30">
            {SITE.hero.bookNow} <PinIcon className="h-4 w-4" />
          </Button>
        </div>
      </Container>

      <a
        href="#destinations"
        aria-label="Scroll to destinations"
        className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 font-nav text-[0.65rem] uppercase tracking-[0.35em] text-white/80 hover:text-gold lg:flex"
      >
        Scroll
        <span aria-hidden="true" className="h-12 w-px animate-cue bg-white/80" />
      </a>

      <WaveDivider className="absolute inset-x-0 -bottom-px z-0 text-slate-light/70" />
      <WaveDivider line className="absolute inset-x-0 -bottom-px z-0 translate-y-1 text-slate-main" />
    </header>
  )
}
