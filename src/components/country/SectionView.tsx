import { useEffect, useRef } from 'react'
import { SECTION_TITLES, type Section, type SectionKey } from '@/data/types'
import { SectionBody } from './SectionBody'
import { SectionIcon } from './SectionIcons'
import { ParaText } from './Rich'

type Props = {
  section: Section
  prev?: SectionKey
  next?: SectionKey
  onGo: (k: SectionKey) => void
}

export function SectionView({ section, prev, next, onGo }: Props) {
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => { heading.current?.focus({ preventScroll: true }) }, [section.key])
  return (
    <article aria-labelledby="section-title">
      <div className="flex items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/60 text-gold"><SectionIcon k={section.key} /></span>
        <h3 id="section-title" ref={heading} tabIndex={-1} className="font-italic text-4xl text-shadow-soft outline-none">{SECTION_TITLES[section.key]}</h3>
      </div>
      <p className="mt-5 border-l-2 border-gold pl-4 text-base text-white/70">
        Verify before you travel: check the source below. Rules, prices and opening hours change.
      </p>
      <div className="mt-8 text-lg leading-relaxed text-white/90">
        <SectionBody section={section} />
      </div>
      {section.sources.length > 0 && (
        <div className="mt-10 border-t border-white/15 pt-5">
          <h4 className="font-nav text-xs uppercase tracking-[0.25em] text-gold">Source</h4>
          <ul className="mt-3 space-y-3 text-base text-white/70">
            {section.sources.map((s, i) => (
              <li key={i}>
                {s.note && <span className="mr-2 font-nav text-[0.7rem] uppercase tracking-nav text-white/50">({s.note})</span>}
                {s.lines.map((l, j) => (
                  <span key={j} className="block"><ParaText p={l} /></span>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}
      {(prev || next) && (
        <nav aria-label="Next topic" className="mt-10 flex items-stretch justify-between gap-3 border-t border-white/15 pt-6">
          {prev ? (
            <button type="button" onClick={() => onGo(prev)} className="flex-1 border border-white/20 px-4 py-3 text-left transition-colors hover:border-gold">
              <span className="block font-nav text-[0.65rem] uppercase tracking-nav text-white/60">← Back</span>
              <span className="mt-1 block font-body font-semibold">{SECTION_TITLES[prev]}</span>
            </button>
          ) : <span className="flex-1" />}
          {next && (
            <button type="button" onClick={() => onGo(next)} className="flex-1 border border-gold/70 bg-gold/10 px-4 py-3 text-right transition-colors hover:bg-gold/20">
              <span className="block font-nav text-[0.65rem] uppercase tracking-nav text-gold">Next →</span>
              <span className="mt-1 block font-body font-semibold">{SECTION_TITLES[next]}</span>
            </button>
          )}
        </nav>
      )}
    </article>
  )
}
