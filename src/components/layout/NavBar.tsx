import { useEffect, useState } from 'react'
import logoBadge from '@/assets/brand/logo-badge.webp'
import { Container } from '@/components/ui/Container'
import { HomeIcon } from '@/components/ui/icons'
import { useActiveSection } from '@/hooks/useActiveSection'
import { SearchBar } from './SearchBar'
import { LogoutButton } from './LogoutButton'
import { MESSAGES, SITE } from '@/data/site'

const SECTIONS = ['top', 'destinations', 'about', 'membership', 'contact']
const item = 'whitespace-nowrap transition-colors hover:text-gold'
const current = 'underline decoration-1 underline-offset-[7px]'

export function NavBar({ onComingSoon, onSignUp }: { onComingSoon: (message: string) => void; onSignUp: () => void }) {
  const active = useActiveSection(SECTIONS)
  const here = active === 'top' || active === 'destinations' ? 'home' : active === 'contact' ? 'contact' : 'about'

  // The small logo badge appears in the bar once the big hero header has scrolled away.
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting), { rootMargin: '-80px 0px 0px 0px' })
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  return (
    <nav aria-label="Main" className={`sticky top-0 z-40 border-b bg-slate-main transition-shadow duration-300 ${scrolled ? 'border-white/15 shadow-[0_10px_30px_rgba(12,36,60,0.35)]' : 'border-white/10'}`}>
      <Container className="flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:py-4">
        <div className="flex items-center gap-4">
          <a
            href="#top"
            aria-label="Back to top"
            className={`shrink-0 overflow-hidden rounded-full bg-white transition-all duration-300 ${scrolled ? 'h-10 w-10 border border-white opacity-100' : 'h-0 w-0 opacity-0'}`}
          >
            <img src={logoBadge} alt="" className="h-full w-full object-cover" />
          </a>
          <SearchBar onSubmit={() => onComingSoon('Search is coming soon.')} />
          <button type="button" onClick={onSignUp} className="shrink-0 rounded-full bg-gold px-4 py-2 font-nav text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-navy-deep transition-colors hover:bg-white lg:hidden">{SITE.nav.signUp}</button>
        </div>
        <ul className="flex items-center gap-3 overflow-x-auto py-1 font-nav text-[0.68rem] font-light uppercase tracking-[0.14em] sm:gap-6 sm:text-sm sm:tracking-nav lg:gap-4 lg:overflow-visible lg:text-xs lg:tracking-[0.12em] min-[1440px]:gap-7 min-[1440px]:text-sm min-[1440px]:tracking-nav">
          <li>
            <a href="#top" aria-current={here === 'home' ? 'location' : undefined} className={`${item} inline-flex items-center gap-2 ${here === 'home' ? current : ''}`}>
              <HomeIcon className="hidden h-4 w-4 sm:block" /> Home
            </a>
          </li>
          <li>
            <a href="#about" aria-current={here === 'about' ? 'location' : undefined} className={`${item} ${here === 'about' ? current : ''}`}>About</a>
          </li>
          <li>
            <a href="#contact" aria-current={here === 'contact' ? 'location' : undefined} className={`${item} ${here === 'contact' ? current : ''}`}>Contact</a>
          </li>
          <li>
            <button
              type="button"
              onClick={() => onComingSoon(MESSAGES.book)}
              className="whitespace-nowrap rounded-full border border-gold px-3 py-1.5 uppercase text-gold sm:px-4 min-[1440px]:px-5 transition-colors hover:bg-gold hover:text-navy-deep"
            >
              Book
            </button>
          </li>
          <li>
            <button type="button" onClick={() => onComingSoon(MESSAGES.other)} className={`${item} uppercase`}>Other</button>
          </li>
          <li className="hidden lg:block">
            <button type="button" onClick={onSignUp} className="whitespace-nowrap rounded-full bg-gold px-5 py-2 font-semibold uppercase min-[1440px]:px-6 text-navy-deep transition-colors hover:bg-white">{SITE.nav.signUp}</button>
          </li>
          <li>
            <LogoutButton className="!px-0 !py-0 !text-[inherit] !tracking-[inherit] whitespace-nowrap" />
          </li>
        </ul>
      </Container>
    </nav>
  )
}
