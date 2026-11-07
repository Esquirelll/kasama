import { PLACE_NOUN, SECTION_GROUPS, SECTION_HELP } from '@/data/sections'
import { SECTION_TITLES, type Country, type SectionKey } from '@/data/types'
import { SectionIcon } from './SectionIcons'

/** The first thing you see for a country: topics grouped by trip stage, each one tap away. */
export function Overview({ country, onOpen }: { country: Country; onOpen: (k: SectionKey) => void }) {
  const has = (k: SectionKey) => country.sections.find((s) => s.key === k)
  const groups = SECTION_GROUPS.map((g) => ({ title: g.title, keys: g.keys.filter(has) })).filter((g) => g.keys.length)
  const first = groups[0]?.keys[0]
  return (
    <div className="space-y-10">
      {first && (
        <button type="button" onClick={() => onOpen(first)} className="w-full bg-gold px-6 py-4 font-nav text-sm font-semibold uppercase tracking-[0.14em] text-navy-deep transition-colors hover:bg-white">
          Start planning: {SECTION_TITLES[first]} →
        </button>
      )}
      {groups.map((g) => (
        <section key={g.title} aria-label={g.title}>
          <h4 className="mb-3 font-nav text-xs uppercase tracking-[0.25em] text-gold">{g.title}</h4>
          <ul className="grid grid-cols-2 gap-3">
            {g.keys.map((k) => {
              const sec = has(k)!
              const n = PLACE_NOUN[k] ? sec.blocks.filter((b) => b.t === 'item').length : 0
              return (
                <li key={k}>
                  <button type="button" onClick={() => onOpen(k)} className="group flex h-full w-full flex-col items-start gap-3 border border-white/15 bg-white/[0.03] p-5 text-left transition-colors hover:border-gold hover:bg-white/[0.07]">
                    <SectionIcon k={k} className="h-6 w-6 text-gold" />
                    <span className="font-body text-lg font-semibold leading-tight">{SECTION_TITLES[k]}</span>
                    <span className="text-base text-white/65">{n > 1 ? `${n} ${PLACE_NOUN[k]}` : SECTION_HELP[k]}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
