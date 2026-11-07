import type { ReactNode } from 'react'

/** Small gold label with a hairline, used above section titles. */
export function Eyebrow({ children, center = false, className = '' }: { children: ReactNode; center?: boolean; className?: string }) {
  return (
    <p className={`inline-flex items-center gap-3 font-nav text-xs uppercase tracking-[0.32em] text-gold ${className}`}>
      <span aria-hidden="true" className="h-px w-9 bg-gold" />
      {children}
      {center && <span aria-hidden="true" className="h-px w-9 bg-gold" />}
    </p>
  )
}
