import { MESSAGES, SITE } from '@/data/site'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { SampleTag } from '@/components/ui/SampleTag'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { DiamondCollage } from './DiamondCollage'

const hair = { fill: 'none', stroke: '#FCFCFC', strokeOpacity: 0.7, strokeWidth: 1.2, vectorEffect: 'non-scaling-stroke' } as const

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-gold"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
)

export function MembershipSection({ onNotify }: { onNotify: (message: string) => void }) {
  const plans = SITE.membership.plans
  return (
    <section id="membership" aria-labelledby="membership-title" className="grain relative z-10 scroll-mt-20 bg-slate-main">
      <div className="relative py-28 lg:py-32">
      {/* navy slanted panel + the mockup's two slanted hairlines (desktop) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[50%] lg:block">
        <div className="absolute inset-0 bg-navy-deep [clip-path:polygon(15%_0,100%_0,100%_100%,0_100%)]" />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          <path {...hair} d="M15,0 L0,100" />
          <path {...hair} d="M11.5,0 L-3.5,100" />
        </svg>
      </div>
      <div className="absolute inset-0 -z-0 bg-navy-deep lg:hidden" aria-hidden="true" style={{ clipPath: 'polygon(0 55%, 100% 45%, 100% 100%, 0 100%)' }} />

      <Container className="relative z-10 grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>{SITE.membership.eyebrow}</Eyebrow>
          <SectionHeading id="membership-title" variant="italic" className="mt-5 max-w-xl !text-4xl sm:!text-5xl lg:!text-5xl xl:!text-6xl">{SITE.membership.title.split('/')[0]}/<wbr />{SITE.membership.title.split('/')[1]}</SectionHeading>
          {/* [SAMPLE COPY] */}
          <p className="mt-6 max-w-md text-lg text-white/85">
            {SITE.membership.blurb}
            <SampleTag />
          </p>
          <span className="mt-8 inline-block rounded-full border border-gold px-5 py-1.5 font-nav text-xs uppercase tracking-nav text-gold">{SITE.membership.badge}</span>
        </Reveal>
        <Reveal delay={0.1} className="relative lg:-my-24">
          <DiamondCollage />
        </Reveal>
      </Container>
      </div>

      {/* MOCKUP pricing: nothing can be bought yet */}
      <Container className="relative z-10 pb-28 lg:pb-36">
        <Reveal>
          <div id="plans" className="scroll-mt-28 flex flex-wrap items-center gap-4">
            <Eyebrow>{plans.eyebrow}</Eyebrow>
            <SampleTag>Mockup</SampleTag>
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <article className="flex flex-col border border-gold bg-gold/10 p-8 lg:p-10">
              <h3 className="font-nav text-xs uppercase tracking-[0.25em] text-gold">{plans.subscription.title}</h3>
              <p className="mt-5 flex items-baseline gap-2">
                <span className="font-italic text-6xl text-shadow-soft">{plans.subscription.price}</span>
                <span className="text-lg text-white/75">/ {plans.subscription.per}</span>
              </p>
              <p className="mt-3 text-lg text-white/85">{plans.subscription.note}</p>
              <ul className="mt-6 space-y-3 text-lg">
                {plans.aCarte.items.map((i) => (
                  <li key={i.key} className="flex gap-3"><Check />{i.name}</li>
                ))}
              </ul>
              <Button variant="gold" className="mt-auto w-full rounded-full" onClick={() => onNotify(MESSAGES.plans)}>{plans.subscription.cta}</Button>
            </article>
            <article className="border border-white/20 bg-navy-deep/60 p-8 lg:p-10">
              <h3 className="font-body text-2xl font-semibold">{plans.aCarte.title}</h3>
              <p className="mt-2 max-w-md text-lg text-white/75">{plans.aCarte.blurb}</p>
              <ul className="mt-6 divide-y divide-white/15 border-y border-white/15">
                {plans.aCarte.items.map((i) => (
                  <li key={i.key}>
                    <button type="button" onClick={() => onNotify(MESSAGES.plans)} className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-gold">
                      <span>
                        <span className="block font-body text-lg font-semibold">{i.name}</span>
                        {i.detail && <span className="block text-base text-white/60">({i.detail})</span>}
                      </span>
                      <span className="shrink-0 text-right"><span className="font-body text-xl font-semibold text-gold">{i.price}</span><span className="text-white/70"> / {i.per}</span></span>
                    </button>
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <p className="mt-6 text-base text-white/60">{plans.mockup}</p>
        </Reveal>
      </Container>
    </section>
  )
}
