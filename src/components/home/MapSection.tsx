import { SITE } from '@/data/site'
import { AirplaneBackdrop } from '@/components/layout/AirplaneBackdrop'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { SampleTag } from '@/components/ui/SampleTag'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { lazy, Suspense } from 'react'

const SeaMap = lazy(() => import('@/components/map/SeaMap').then((m) => ({ default: m.SeaMap })))

export function MapSection() {
  return (
    <section id="destinations" aria-labelledby="destinations-title" className="grain relative isolate scroll-mt-20 overflow-hidden bg-slate-main py-28 lg:py-36">
      <AirplaneBackdrop />
      <Container className="relative z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow center>{SITE.map.eyebrow}</Eyebrow>
          <SectionHeading id="destinations-title" className="mt-5">{SITE.map.title}</SectionHeading>
          {/* [SAMPLE COPY] */}
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
            {SITE.map.blurb}
            <SampleTag />
          </p>
        </Reveal>
      </Container>
      {/* the map area is wider than the text column so it can use the whole screen */}
      <Reveal delay={0.1} className="relative z-10 mx-auto mt-14 w-full max-w-[96rem] px-4 sm:px-8">
        <Suspense fallback={<div className="grid h-[60vh] place-items-center text-white/60" role="status">Loading the map…</div>}>
          <SeaMap />
        </Suspense>
      </Reveal>
    </section>
  )
}
