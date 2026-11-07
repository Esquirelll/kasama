import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { animate, AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CountryPanel } from '@/components/country/CountryPanel'
import { loadCountry } from '@/data/countries'
import { COUNTRY_LIST } from '@/data/countryList'
import { DECORATIVE, NOTE, statusOf, type Status } from '@/geo/countryMeta'
import { SEA_COUNTRIES, SEA_GRATICULE, SEA_VIEWBOX } from '@/geo/seaMap'
import { useCountryParam } from '@/hooks/useCountryParam'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const { w: W, h: H } = SEA_VIEWBOX
type View = [number, number, number, number]
const NO_LABEL = new Set(['singapore', 'brunei', 'timor-leste', 'malaysia'])
// small or split countries get a callout: text in open water plus a thin line to the country
const CALLOUTS = [
  { id: 'malaysia', text: 'Malaysia', x: 262, y: 497, anchor: 'start' as const, to: [243, 522] },
  { id: 'singapore', text: 'Singapore', x: 268, y: 568, anchor: 'start' as const, to: [241, 589] },
  { id: 'brunei', text: 'Brunei', x: 430, y: 494, anchor: 'end' as const, to: [457, 520] },
  { id: 'timor-leste', text: 'Timor-Leste', x: 735, y: 834, anchor: 'start' as const, to: [712, 806] },
]
const RING = new Set(['singapore', 'brunei'])
const TINY = new Set(['singapore', 'brunei', 'timor-leste']) // get an enlarged invisible tap target
// labels that sit in open water next to a thin or island country use a hand-placed spot
const LABEL_AT: Record<string, { x: number; y: number; anchor: 'start' | 'middle' }> = {
  vietnam: { x: 372, y: 252, anchor: 'start' },
  philippines: { x: 724, y: 352, anchor: 'start' },
}

/** On laptops the map area is as wide as the page allows; the details panel takes a comfortable strip on the right. */
const panelWidth = (stageW: number, rootPx: number) => Math.round(Math.min(46 * rootPx, Math.max(30 * rootPx, stageW * 0.46)))

/** The whole map, centered in a stage of any shape. */
function fullView(aspect: number): View {
  if (aspect >= W / H) { const w = H * aspect; return [-(w - W) / 2, 0, w, H] }
  const h = W / aspect
  return [0, -(h - H) / 2, W, h]
}

/** The SVG view box that frames one country, leaving room for the panel on laptops. */
function viewFor(id: string | null, aspect: number, usable: number): View {
  const c = SEA_COUNTRIES.find((x) => x.id === id)
  if (!c) return fullView(aspect)
  const [x0, y0, x1, y1] = c.bounds
  const bw = Math.max(x1 - x0, 90) // tiny countries do not zoom absurdly far
  const bh = Math.max(y1 - y0, 90)
  const pad = 0.2
  const w = Math.max((bw * (1 + 2 * pad)) / usable, bh * (1 + 2 * pad) * aspect)
  const h = w / aspect
  return [(x0 + x1) / 2 - (usable / 2) * w, (y0 + y1) / 2 - h / 2, w, h]
}
const asAttr = (v: View) => v.map((n) => n.toFixed(2)).join(' ')

export function SeaMap() {
  const { country, setCountry } = useCountryParam()
  const desktop = useMediaQuery('(min-width: 1024px)')
  const reduce = useReducedMotion()

  const interactive = useMemo(() => new Set(SEA_COUNTRIES.filter((c) => !DECORATIVE.has(c.id)).map((c) => c.id)), [])
  const selected = country && interactive.has(country) ? country : null

  const stageRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRefs = useRef<Record<string, SVGPathElement | null>>({})
  const [size, setSize] = useState<{ w: number; h: number; root: number } | null>(null)
  const aspect = size ? size.w / size.h : W / H
  const panelW = size ? panelWidth(size.w, size.root) : 560
  const usable = desktop && size ? 1 - panelW / size.w : 1
  const target = useMemo(() => viewFor(selected, aspect, usable), [selected, aspect, usable])

  const viewRef = useRef<View>(target)
  const [initialView] = useState(() => asAttr(target))
  const motionRef = useRef<{ stop: () => void } | null>(null)
  const first = useRef(true)
  const prevSelected = useRef<string | null>(selected)
  const [tip, setTip] = useState<{ id: string; x: number; y: number } | null>(null)

  // ---- measure the stage (the map area always uses all the room it is given)
  useLayoutEffect(() => {
    const el = stageRef.current
    if (!el) return
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight, root: parseFloat(getComputedStyle(document.documentElement).fontSize) || 16 })
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [desktop])

  // ---- zoom: animate the viewBox (instant on first load, on resize, or with reduced motion)
  const goTo = useCallback((to: View, instant: boolean) => {
    motionRef.current?.stop()
    const from = viewRef.current
    const set = (v: View) => {
      viewRef.current = v
      svgRef.current?.setAttribute('viewBox', asAttr(v))
    }
    if (instant || reduce) return set(to)
    const ctl = animate(0, 1, {
      duration: 0.9,
      ease: [0.45, 0, 0.2, 1],
      onUpdate: (t) => set(from.map((f, i) => f + (to[i] - f) * t) as View),
    })
    // safety net: if the browser throttles animation frames (background tab), still land exactly on the target
    const timer = window.setTimeout(() => set(to), 1100)
    motionRef.current = { stop: () => { ctl.stop(); window.clearTimeout(timer) } }
  }, [reduce])

  useLayoutEffect(() => {
    const changedCountry = prevSelected.current !== selected
    prevSelected.current = selected
    goTo(target, first.current || !changedCountry)
    if (size) first.current = false
  }, [target, selected, goTo, size])

  // ---- a link like /home?country=laos opens already zoomed, and scrolls to the map
  useEffect(() => {
    if (!selected) return
    let cancelled = false
    // wait for the fonts: they change the height of the text above the map, which would make us land in the wrong place
    const ready = document.fonts?.ready ?? Promise.resolve()
    ready.then(() => requestAnimationFrame(() => { if (!cancelled) stageRef.current?.scrollIntoView({ block: 'start' }) }))
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ---- scrolling away from the map puts it back to normal (laptop: the panel floats over the map, so it should not linger)
  useEffect(() => {
    if (!selected || !desktop || typeof IntersectionObserver === 'undefined') return
    const el = stageRef.current
    if (!el) return
    let seen = false
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.5) seen = true
        else if (seen && e.intersectionRatio < 0.12) close(true)
      },
      { threshold: [0, 0.12, 0.5, 1] },
    )
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, desktop])

  // ---- Esc zooms out
  useEffect(() => {
    if (!selected) return
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  // ---- after choosing a country, bring the zoomed map into view (laptop: centered; phone: top, with the panel under it)
  const mounted = useRef(false)
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return }
    if (!selected) return
    const id = requestAnimationFrame(() =>
      stageRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }),
    )
    return () => cancelAnimationFrame(id)
  }, [selected, desktop, reduce])

  const open = (id: string) => { setTip(null); setCountry(id) }
  function close(quiet = false) {
    const last = selected
    setCountry(null, { replace: quiet })
    if (last && !quiet) requestAnimationFrame(() => pathRefs.current[last]?.focus({ preventScroll: true }))
  }

  // ---- tooltip
  const showTip = (id: string, e: PointerEvent) => {
    void loadCountry(id) // start downloading this guide so it opens instantly
    if (e.pointerType === 'touch' || !stageRef.current || id === selected) return
    const r = stageRef.current.getBoundingClientRect()
    setTip({ id, x: e.clientX - r.left, y: e.clientY - r.top })
  }
  const showTipFocus = (id: string) => {
    const el = pathRefs.current[id]; const stage = stageRef.current
    if (!el || !stage) return
    const a = el.getBoundingClientRect(); const r = stage.getBoundingClientRect()
    setTip({ id, x: a.left + a.width / 2 - r.left, y: a.top + a.height / 2 - r.top })
  }
  const tipCountry = tip ? SEA_COUNTRIES.find((c) => c.id === tip.id) : null

  const handlers = (id: string) => ({
    onClick: (e: React.MouseEvent) => { e.stopPropagation(); open(id) },
    onPointerEnter: (e: PointerEvent) => showTip(id, e),
    onPointerMove: (e: PointerEvent) => showTip(id, e),
    onPointerLeave: () => setTip(null),
  })
  const onKey = (id: string) => (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(id) }
  }

  const zoomed = selected !== null
  const fullScale = size ? size.w / fullView(aspect)[2] : 1 // screen pixels per map unit when not zoomed
  const hitR = Math.min(56, Math.max(14, 22 / fullScale))

  return (
    <figure>
      <div
        ref={stageRef}
        className="relative mx-auto w-full scroll-mt-[6.5rem]"
        style={desktop ? { height: 'clamp(30rem, calc(100svh - 8.5rem), 62rem)' } : { aspectRatio: `${W} / ${H}` }}
      >
        <svg
          ref={svgRef}
          viewBox={initialView}
          role="group"
          aria-label="Map of Southeast Asia. Choose a country to open its guide."
          onClick={(e) => { if (zoomed && !(e.target as Element).closest('[data-country]')) close() }}
          className="absolute inset-0 h-full w-full touch-manipulation"
        >
          <path d={SEA_GRATICULE} fill="none" stroke="#FCFCFC" strokeOpacity="0.09" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />

          {SEA_COUNTRIES.map((c) => {
            const st = statusOf(c.id)
            const deco = DECORATIVE.has(c.id)
            const isSel = c.id === selected
            const dim = zoomed && !isSel
            const stroke = isSel ? '#FCFCFC' : dim || st === 'soon' ? '#244253' : '#B48424'
            return (
              <path
                key={c.id}
                ref={(el) => { pathRefs.current[c.id] = el }}
                d={c.d}
                data-country={c.id}
                stroke={stroke}
                strokeWidth={st === 'soon' || isSel ? 1 : 2}
                strokeDasharray={st === 'partial' && !isSel ? '5 4' : undefined}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                className={`outline-none transition-[fill,opacity] duration-300 ${isSel ? 'fill-gold' : dim ? 'fill-slate-light' : 'fill-white'} ${deco ? 'pointer-events-none' : 'cursor-pointer hover:fill-gold focus-visible:fill-gold'}`}
                {...(deco
                  ? {}
                  : {
                      tabIndex: 0,
                      role: 'button',
                      'aria-label': `${c.name}. ${NOTE[st]}.`,
                      'aria-pressed': isSel,
                      onKeyDown: onKey(c.id),
                      onFocus: () => showTipFocus(c.id),
                      onBlur: () => setTip(null),
                      ...handlers(c.id),
                    })}
              />
            )
          })}

          {/* small markers + enlarged invisible tap targets for the tiny countries */}
          {SEA_COUNTRIES.filter((c) => TINY.has(c.id)).map((c) => (
            <g key={c.id} className={`transition-opacity duration-300 ${zoomed ? 'opacity-0' : ''}`}>
              {RING.has(c.id) && <circle cx={c.label[0]} cy={c.label[1]} r={13} fill="none" stroke="#FCFCFC" strokeOpacity="0.8" strokeWidth="1.2" pointerEvents="none" />}
              <circle cx={c.label[0]} cy={c.label[1]} r={hitR} fill="transparent" data-country={c.id} className="cursor-pointer" style={{ pointerEvents: zoomed ? 'none' : 'all' }} {...handlers(c.id)} />
            </g>
          ))}

          {selected && (() => {
            const c = SEA_COUNTRIES.find((x) => x.id === selected)!
            return <path d={c.d} fill="none" stroke="#FCFCFC" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" pointerEvents="none" />
          })()}

          <g className={`hidden transition-opacity duration-300 md:block ${zoomed ? 'opacity-0' : ''}`} pointerEvents="none">
            {SEA_COUNTRIES.filter((c) => !NO_LABEL.has(c.id)).map((c) => {
              const at = LABEL_AT[c.id]
              return (
                <text
                  key={c.id}
                  x={at?.x ?? c.label[0]}
                  y={at?.y ?? c.label[1]}
                  textAnchor={at?.anchor ?? 'middle'}
                  className={`font-nav uppercase ${at ? 'fill-white' : 'fill-navy-deep'}`}
                  style={{ fontSize: 13, letterSpacing: '0.18em', fontWeight: 600, paintOrder: 'stroke', stroke: at ? '#244253' : 'none', strokeWidth: at ? 3 : 0, strokeLinejoin: 'round' }}
                >
                  {c.name}
                </text>
              )
            })}
            {CALLOUTS.map((c) => (
              <g key={c.id}>
                <line x1={c.to[0]} y1={c.to[1]} x2={c.x + (c.anchor === 'start' ? -4 : 4)} y2={c.y - 4} stroke="#FCFCFC" strokeOpacity="0.7" strokeWidth="0.9" />
                <text x={c.x} y={c.y} textAnchor={c.anchor} className="fill-white font-nav uppercase" style={{ fontSize: 12, letterSpacing: '0.14em', fontWeight: 600, paintOrder: 'stroke', stroke: '#244253', strokeWidth: 3, strokeLinejoin: 'round' }}>
                  {c.text}
                </text>
              </g>
            ))}
          </g>
        </svg>

        {/* tooltip: country name + whether a guide is available */}
        {tip && tipCountry && (
          <div role="tooltip" className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[130%] whitespace-nowrap border border-gold/60 bg-navy-deep px-3 py-1.5 font-nav text-xs uppercase tracking-nav shadow-[0_8px_24px_rgba(12,36,60,0.5)]" style={{ left: tip.x, top: tip.y }}>
            {tipCountry.name} <span className="ml-1 text-gold">· {NOTE[statusOf(tipCountry.id)]}</span>
          </div>
        )}

        {/* phone: Back button sits on the map, since the panel is below it */}
        <AnimatePresence>
          {zoomed && !desktop && (
            <motion.button
              key="back"
              type="button"
              onClick={() => close()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 top-0 z-20 border border-white/70 bg-navy-deep/80 px-4 py-2 font-nav text-xs uppercase tracking-nav hover:border-gold hover:text-gold"
            >
              ← All countries
            </motion.button>
          )}
        </AnimatePresence>

        {/* laptop: details slide in over the right side of the map area */}
        <AnimatePresence mode="wait">
          {selected && desktop && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 48 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="absolute inset-y-0 right-0 z-10 shadow-[-24px_0_48px_rgba(12,36,60,0.4)]"
              style={{ width: panelW }}
            >
              <CountryPanel id={selected} onClose={() => close()} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* phone and tablet: details sit under the map */}
      <AnimatePresence>
        {selected && !desktop && (
          <motion.div key={selected} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="mt-6 scroll-mt-24 border border-gold/40">
            <CountryPanel id={selected} onClose={() => close()} />
          </motion.div>
        )}
      </AnimatePresence>

      <figcaption className="mt-6 flex flex-col items-center gap-3 font-body text-sm text-white/80 md:flex-row md:justify-between">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {(['full', 'partial', 'soon'] as Status[]).map((s) => (
            <li key={s} className="flex items-center gap-2">
              <span aria-hidden="true" className={`h-3.5 w-3.5 rounded-full bg-white ${s === 'full' ? 'ring-2 ring-gold' : s === 'partial' ? 'border-2 border-dashed border-gold' : ''}`} />
              {NOTE[s]}
            </li>
          ))}
        </ul>
        <p className="text-center">Click or tap a country. Press Esc to zoom back out.</p>
      </figcaption>

      <section aria-label="All countries" className="mt-14">
        <h4 className="mb-5 font-nav text-xs uppercase tracking-[0.25em] text-gold">All countries</h4>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {[...COUNTRY_LIST].sort((a, b) => a.name.localeCompare(b.name)).map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => open(c.id)}
                onPointerEnter={() => void loadCountry(c.id)}
                onFocus={() => void loadCountry(c.id)}
                aria-pressed={c.id === selected}
                className={`flex h-full w-full flex-col items-start gap-1 border p-4 text-left transition-colors hover:border-gold hover:bg-white/[0.07] ${c.id === selected ? 'border-gold bg-gold/10' : 'border-white/15 bg-white/[0.03]'}`}
              >
                <span className="font-body text-lg font-semibold leading-tight">{c.name}</span>
                <span className="text-sm text-white/65">{c.focusCity ? `Guide covers ${c.focusCity}` : 'Open the guide'}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </figure>
  )
}
