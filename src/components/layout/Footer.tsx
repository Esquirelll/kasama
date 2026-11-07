import logoBadge from '@/assets/brand/logo-badge.webp'
import wordmark from '@/assets/brand/wordmark-kasama.webp'
import { Container } from '@/components/ui/Container'
import { photoCredits } from '@/data/credits'
import { LogoutButton } from './LogoutButton'

const links = [
  ['Home', '#top'],
  ['Destinations', '#destinations'],
  ['About', '#about'],
  ['Contact', '#contact'],
]

export function Footer() {
  return (
    <footer className="bg-navy-deep">
      <Container className="grid gap-12 pb-10 pt-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full border border-white bg-white">
              <img src={logoBadge} alt="Kasama Guide and Tour logo" loading="lazy" className="h-full w-full object-cover" />
            </span>
            <img src={wordmark} alt="Kasama" loading="lazy" width={1100} height={300} className="h-auto w-44" />
          </div>
          <p className="mt-5 max-w-xs text-sm text-white/70">Travel with a Kasama. Country guides made for Filipino travelers.</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="font-nav text-xs uppercase tracking-[0.3em] text-gold">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {links.map(([l, h]) => (
              <li key={l}><a href={h} className="text-white/80 transition-colors hover:text-gold">{l}</a></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-nav text-xs uppercase tracking-[0.3em] text-gold">Account</h2>
          <div className="mt-3"><LogoutButton className="!px-0 !py-1 !text-sm" /></div>
          {photoCredits.length > 0 && (
            <details className="mt-4 text-sm text-white/70">
              <summary className="cursor-pointer hover:text-gold">Photo credits</summary>
              <ul className="mt-2 space-y-1">{photoCredits.map((c) => <li key={c.file}>{c.credit}</li>)}</ul>
            </details>
          )}
        </div>
      </Container>
      <div className="border-t border-white/10 py-5 text-center font-body text-xs text-white/60">
        © 2026 Kasama · School project prototype
      </div>
    </footer>
  )
}
