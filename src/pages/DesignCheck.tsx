// DEV-ONLY page (not included in the production build). Delete in Phase 9.
import { useEffect, useState } from 'react'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { WaveDivider } from '@/components/ui/WaveDivider'

const swatches = [
  ['white', '#FCFCFC', 'bg-white'],
  ['gold', '#B48424', 'bg-gold'],
  ['navy-deep', '#0C243C', 'bg-navy-deep'],
  ['slate-main', '#244253', 'bg-slate-main'],
  ['slate-light', '#435562', 'bg-slate-light'],
  ['logo-navy', '#0C2C54', 'bg-logo-navy'],
] as const

/** true = the font file was found and loaded; false = missing, so the fallback is showing */
function useFontLoaded(family: string) {
  const [ok, setOk] = useState<boolean | null>(null)
  useEffect(() => {
    let live = true
    document.fonts
      .load(`16px "${family}"`)
      .then((faces) => live && setOk(faces.length > 0))
      .catch(() => live && setOk(false))
    return () => {
      live = false
    }
  }, [family])
  return ok
}

function FontRow({ family, role, sample, className }: { family: string; role: string; sample: string; className: string }) {
  const ok = useFontLoaded(family)
  return (
    <div className="border border-white/20 p-5">
      <p className="mb-3 font-nav text-xs uppercase tracking-nav text-gold">
        {family} · {role} ·{' '}
        <span className={ok ? 'text-white' : 'text-gold'}>{ok === null ? 'checking…' : ok ? 'loaded' : 'file missing → fallback showing'}</span>
      </p>
      <p className={className}>{sample}</p>
    </div>
  )
}

const h2 = 'font-nav text-sm uppercase tracking-nav text-white/70'

export default function DesignCheck() {
  return (
    <main className="pb-24">
      <Container className="space-y-14 py-12">
        <header className="space-y-2">
          <p className="font-nav text-xs uppercase tracking-nav text-gold">Dev only</p>
          <h1 className="font-caps text-5xl uppercase">Design check</h1>
          <p className="text-white/75">Your mockup fonts, by role. Tell me if any role is mapped to the wrong font.</p>
        </header>

        <section className="space-y-4">
          <h2 className={h2}>Colors</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {swatches.map(([name, hex, cls]) => (
              <div key={name} className="border border-white/20">
                <div className={`h-20 ${cls}`} />
                <p className="px-2 py-2 text-xs">{name}<br />{hex}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2}>Fonts by role</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <FontRow family="Alta" role="section titles" sample="CHOOSE YOUR OWN DESTINATION" className="font-caps text-4xl uppercase text-shadow-soft" />
            <FontRow family="Shrikhand" role="About / Membership / Contact" sample="About us" className="font-italic text-4xl text-shadow-soft" />
            <FontRow family="Moontime" role="script tagline" sample="Travel with a Kasama" className="font-script text-5xl" />
            <FontRow family="Barabara" role="nav + small caps" sample="HOME  ABOUT  CONTACT  BOOK  OTHER" className="font-nav text-lg uppercase tracking-nav" />
            <FontRow family="Fredoka" role="body, labels, contact" sample="+63 012 3456 · Safety · Support · Expenses" className="font-body text-xl font-semibold" />
          </div>
          <p className="max-w-xl leading-relaxed text-white/90">
            Body copy sample in Fredoka, so long country guides stay readable on a laptop or a phone.
            This is placeholder text for checking size and spacing only.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={h2}>Components</h2>
          <div className="flex flex-wrap gap-3">
            <Button>Outline</Button>
            <Button variant="gold">Gold</Button>
            <Button variant="ghost">Ghost</Button>
            <ButtonLink href="#">Link button</ButtonLink>
          </div>
          <SectionHeading variant="caps">Caps heading</SectionHeading>
          <SectionHeading variant="italic">Italic heading</SectionHeading>
          <div className="grid max-w-xl grid-cols-2 gap-3">
            <PlaceholderImage label="Hero banner" file="home/hero-banner.jpg" />
            <PlaceholderImage label="About photo" file="home/about-royal-barge.jpg" ratio="4 / 5" />
          </div>
        </section>
      </Container>

      <div className="bg-slate-main">
        <WaveDivider line className="text-slate-light" />
      </div>
      <div className="bg-slate-light py-10 text-center font-nav text-xs uppercase tracking-nav">Wave divider (with line)</div>
    </main>
  )
}
