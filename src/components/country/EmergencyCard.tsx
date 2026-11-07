import { Fragment } from 'react'
import type { Country } from '@/data/types'

/** Wraps phone numbers in tap-to-call links. The text itself is exactly as in the document. */
function withCalls(text: string) {
  return text.split(/(\d[\d ]{1,}\d)/g).map((part, i) =>
    /^\d[\d ]{1,}\d$/.test(part) ? (
      <a key={i} href={`tel:${part.replace(/\s/g, '')}`} className="whitespace-nowrap text-gold underline decoration-gold/50 underline-offset-2 hover:text-white">{part}</a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

/** Quick-access card, always one tap away at the top of the panel. */
export function EmergencyCard({ emergency }: { emergency: NonNullable<Country['emergency']> }) {
  return (
    <details className="group mt-6 border border-gold/70 bg-gold/10">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-nav text-xs uppercase tracking-nav text-gold [&::-webkit-details-marker]:hidden">
        Emergency numbers
        <span aria-hidden="true" className="transition-transform group-open:rotate-45">+</span>
      </summary>
      <ul className="space-y-3 border-t border-gold/40 px-4 py-4 text-sm text-white/90">
        {emergency.lines.map((l, i) => (
          <li key={i}>{withCalls(l.text)}</li>
        ))}
      </ul>
    </details>
  )
}
