import type { ReactNode } from 'react'
import { SHOW_SAMPLE_TAGS } from '@/config/sampleContent'

/** Marks placeholder wording so you know what to replace. Hidden by one switch in config/sampleContent.ts. */
export function SampleTag({ children = 'Sample' }: { children?: ReactNode }) {
  if (!SHOW_SAMPLE_TAGS) return null
  return (
    <span className="ml-2 inline-block rounded-sm border border-gold/80 px-1.5 py-px align-middle font-nav text-[0.6rem] uppercase tracking-nav text-gold">
      [{children}]
    </span>
  )
}
