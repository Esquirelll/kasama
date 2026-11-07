import type { ReactNode } from 'react'
import type { SectionKey } from '@/data/types'

// One consistent line-icon set for the 12 topics.
const P: Record<SectionKey, ReactNode> = {
  visa: <><rect x="5" y="3" width="14" height="18" rx="2" /><circle cx="12" cy="10" r="3" /><path d="M8.5 16.5h7" /></>,
  entry: <><path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" /><path d="M10 16l4-4-4-4" /><path d="M14 12H4" /></>,
  connectivity: <><path d="M8 3h6l4 4v13a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" /><rect x="10" y="12" width="5" height="5" rx="1" /></>,
  money: <><rect x="3" y="7" width="18" height="10" rx="2" /><circle cx="12" cy="12" r="2.5" /><path d="M6.5 10v4M17.5 10v4" /></>,
  destinations: <><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  transport: <><rect x="4" y="4" width="16" height="13" rx="2" /><path d="M4 11h16" /><circle cx="8" cy="19" r="1.3" /><circle cx="16" cy="19" r="1.3" /></>,
  hotels: <><path d="M3 18V7" /><path d="M3 14h18v4" /><path d="M21 14v-3a3 3 0 0 0-3-3h-7v6" /><circle cx="7" cy="11" r="1.5" /></>,
  restaurants: <><path d="M5 3v5a2 2 0 0 0 4 0V3" /><path d="M7 10v11" /><path d="M17 3c-2 2-3 4.5-3 7h3v11" /></>,
  etiquette: <><circle cx="12" cy="12" r="9" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><path d="M9 9.5h.01M15 9.5h.01" /></>,
  scams: <><path d="M12 3L2.5 20h19L12 3z" /><path d="M12 10v4" /><path d="M12 17h.01" /></>,
  apps: <><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 18h2" /></>,
  protection: <><path d="M12 3l8 3v5c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-3z" /><path d="M8.5 12l2.5 2.5 4.5-4.5" /></>,
}

export function SectionIcon({ k, className = 'h-6 w-6' }: { k: SectionKey; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {P[k]}
    </svg>
  )
}
