type Props = {
  /** Color comes from the text color: className="text-slate-light" */
  className?: string
  flip?: boolean
  /** Thin white wave line over the edge, as in the mockup's hero bottom */
  line?: boolean
}

export function WaveDivider({ className = '', flip = false, line = false }: Props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`block h-14 w-full sm:h-20 lg:h-28 ${flip ? 'rotate-180' : ''} ${className}`}
    >
      <path fill="currentColor" d="M0,64 C240,6 480,2 720,46 C960,92 1200,98 1440,34 L1440,121 L0,121 Z" />
      {line && (
        <path
          fill="none"
          stroke="#FCFCFC"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          d="M0,50 C240,-8 480,-12 720,32 C960,78 1200,84 1440,20"
        />
      )}
    </svg>
  )
}
