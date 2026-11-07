import { useId, type ReactNode } from 'react'

export function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`h-5 w-5 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

/** Collapsed by default; one click opens it. The content stays in the page, just hidden until asked for. */
export function Accordion({ open, onToggle, header, children, className = '' }: { open: boolean; onToggle: () => void; header: ReactNode; children: ReactNode; className?: string }) {
  const id = useId()
  return (
    <div className={`border border-white/15 bg-white/[0.03] ${className}`}>
      <button type="button" aria-expanded={open} aria-controls={id} onClick={onToggle} className="flex w-full items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-white/[0.06]">
        <span className="min-w-0 flex-1">{header}</span>
        <Chevron open={open} />
      </button>
      <div id={id} role="region" hidden={!open} className="border-t border-white/10 px-4 py-5">
        {children}
      </div>
    </div>
  )
}

export function ExpandAll({ allOpen, onClick }: { allOpen: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="font-nav text-xs uppercase tracking-nav text-gold underline-offset-4 hover:underline">
      {allOpen ? 'Close all' : 'Open all'}
    </button>
  )
}
