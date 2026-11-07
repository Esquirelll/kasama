type Props = {
  /** What goes here, e.g. "Hero banner" */
  label: string
  /** Suggested file name, e.g. "home/hero-banner.jpg" */
  file?: string
  /** CSS aspect-ratio, e.g. "3 / 2" */
  ratio?: string
  className?: string
}

/** Visibly-labeled stand-in so nothing looks finished when it isn't. */
export function PlaceholderImage({ label, file, ratio = '3 / 2', className = '' }: Props) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={`relative flex flex-col items-center justify-center gap-1 overflow-hidden border border-dashed border-gold/70 bg-navy-deep/60 px-3 text-center ${className}`}
      style={{
        aspectRatio: ratio,
        backgroundImage:
          'repeating-linear-gradient(135deg, rgb(252 252 252 / 0.05) 0 12px, transparent 12px 24px)',
      }}
    >
      <span className="font-nav text-[0.7rem] uppercase tracking-nav text-gold">Placeholder</span>
      <span className="font-body text-sm text-white">{label}</span>
      {file && <span className="font-body text-xs text-white/60">{file}</span>}
    </div>
  )
}
