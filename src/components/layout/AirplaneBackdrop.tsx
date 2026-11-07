/** Rebuilt as sharp vector art (no blurry plate): faint airplane silhouettes + a dotted flight path. */
const PLANE =
  'M50 4 C52 4 54 10 54 18 L54 36 L92 58 L92 64 L54 54 L54 76 L66 86 L66 91 L50 87 L34 91 L34 86 L46 76 L46 54 L8 64 L8 58 L46 36 L46 18 C46 10 48 4 50 4 Z'

function Plane({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`absolute ${className}`} fill="currentColor">
      <path d={PLANE} />
    </svg>
  )
}

export function AirplaneBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden text-navy-deep/35">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path
          d="M-40,640 C300,430 520,130 900,250 S1300,570 1500,290"
          fill="none"
          stroke="#FCFCFC"
          strokeOpacity="0.14"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1 12"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <Plane className="-left-10 top-[14%] w-56 -rotate-[28deg] sm:w-72 lg:-left-16 lg:w-[26rem]" />
      <Plane className="-right-8 bottom-[8%] w-52 rotate-[38deg] sm:w-64 lg:-right-10 lg:w-[24rem]" />
    </div>
  )
}
