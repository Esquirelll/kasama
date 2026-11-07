import { SITE } from '@/data/site'
import { AtIcon, MailIcon, PhoneIcon } from '@/components/ui/icons'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { SampleTag } from '@/components/ui/SampleTag'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { WaveDivider } from '@/components/ui/WaveDivider'

// [SAMPLE] values copied from the mockup live in src/data/site.ts.
const ICONS = { phone: PhoneIcon, email: MailIcon, social: AtIcon }
const contacts = SITE.contact.items.map((c) => ({ ...c, Icon: ICONS[c.key] }))

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="grain relative scroll-mt-20 bg-slate-light">
      <WaveDivider className="absolute inset-x-0 bottom-[calc(100%-1px)] text-slate-light" />
      <Container className="relative z-10 pb-6 pt-20 text-center lg:pt-28">
        <Reveal>
          <Eyebrow center>{SITE.contact.eyebrow}</Eyebrow>
          <SectionHeading id="contact-title" variant="italic" className="mt-5">{SITE.contact.title}</SectionHeading>
          <ul className="mx-auto mt-14 grid max-w-5xl gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/25">
            {contacts.map(({ label, value, Icon }) => (
              <li key={label} className="flex flex-col items-center gap-4 px-6">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-white/40">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="font-nav text-xs uppercase tracking-[0.3em] text-white/70">{label}</span>
                <span className="break-words font-body text-xl font-semibold md:text-lg lg:text-xl">{value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10"><SampleTag>Contact details from the mockup</SampleTag></p>
        </Reveal>
      </Container>
      <WaveDivider className="mt-10 text-navy-deep" />
    </section>
  )
}
