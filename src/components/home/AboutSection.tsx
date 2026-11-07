import aboutPhoto from '@/assets/home/about-golden-barge.webp'
import { SITE } from '@/data/site'
import { ClockIcon, MoneyBagIcon, ShieldCheckIcon } from '@/components/ui/icons'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { SampleTag } from '@/components/ui/SampleTag'
import { SectionHeading } from '@/components/ui/SectionHeading'

// [SAMPLE COPY] lives in src/data/site.ts. The icons are matched by key.
const ICONS = { safety: ShieldCheckIcon, support: ClockIcon, expenses: MoneyBagIcon }
const features = SITE.about.features.map((f) => ({ ...f, Icon: ICONS[f.key] }))

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="grain relative scroll-mt-20 bg-navy-deep py-28 lg:py-36">
      <Container className="relative z-10 grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <span aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 border border-gold" />
            <img
              src={aboutPhoto}
              alt="A gilded swan-headed royal barge on the river with temple spires behind"
              loading="lazy"
              decoding="async"
              width={1080}
              height={1350}
              className="relative aspect-[4/5] w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <Eyebrow>{SITE.about.eyebrow}</Eyebrow>
          <SectionHeading id="about-title" variant="italic" className="mt-5">{SITE.about.title}</SectionHeading>
          {/* [SAMPLE COPY] replace with your own wording */}
          <p className="mt-6 max-w-xl text-lg text-white/85">
            {SITE.about.blurb}
            <SampleTag />
          </p>
          <ul className="mt-10 space-y-7">
            {features.map(({ label, Icon, text }) => (
              <li key={label} className="flex items-start gap-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/25">
                  <Icon className="h-7 w-7 text-white" />
                </span>
                <div>
                  <h3 className="font-body text-lg font-semibold">{label}</h3>
                  <p className="mt-0.5 max-w-md text-white/70">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
