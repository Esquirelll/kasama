import { loadAllCountries } from '@/data/countries'
import { COUNTRY_LIST } from '@/data/countryList'
import { MESSAGES, SITE_PAGES } from '@/data/site'
import { SECTION_TITLES, type Block, type Country, type SectionKey } from '@/data/types'
import { numberSection } from './ids'

/**
 * The whole-site search index. It is built once, in the browser, from the same data the pages show
 * (src/data/countries/*, src/data/countryList.ts and src/data/site.ts). A new country file is indexed automatically.
 */

export type Kind = 'country' | 'topic' | 'item' | 'text' | 'site'

export interface Entry {
  id: string
  kind: Kind
  /** shown as the main line */
  title: string
  /** shown under the title (items and topics: the country and topic) */
  sub?: string
  country?: string
  countryName?: string
  section?: SectionKey
  /** "i3" for an item, "emergency" for the emergency card */
  item?: string
  /** "l57" for a line of guide text */
  line?: string
  /** photo key (see src/data/photos.ts) */
  photo?: string
  site?: { target?: string; action?: 'book' | 'other' | 'philippines' }
  /** the original text of a guide-text line (used for the snippet) */
  text?: string
  // ---- search fields (folded: lower case, no accents, punctuation turned into spaces) ----
  tfold: string
  words: string[]
  extra: string
  hay: string
}

export interface Hit {
  entry: Entry
  score: number
}
export interface Group {
  kind: Kind
  label: string
  hits: Hit[]
  total: number
}

/** Same length as the input, so match positions can be used on the original text. */
export function fold(s: string): string {
  let out = ''
  for (let i = 0; i < s.length; i++) {
    const ch = s[i]
    if (ch === 'đ' || ch === 'Đ') { out += 'd'; continue }
    const base = ch.normalize('NFD')[0]?.toLowerCase() ?? ' '
    out += /[a-z0-9]/.test(base) ? base : ' '
  }
  return out
}

const tokensOf = (q: string) => fold(q).split(' ').filter(Boolean)

/** Is `a` within `max` single-letter slips of `b`? */
function within(a: string, b: string, max: number): boolean {
  if (Math.abs(a.length - b.length) > max) return false
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]
    let rowMin = i
    for (let j = 1; j <= b.length; j++) {
      const v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
      cur.push(v)
      if (v < rowMin) rowMin = v
    }
    if (rowMin > max) return false
    prev = cur
  }
  return prev[b.length] <= max
}

export const shortTitle = (t: string) => {
  const s = t.trim()
  if (s.length <= 80) return s
  const cut = s.slice(0, 78)
  return cut.slice(0, cut.lastIndexOf(' ') > 40 ? cut.lastIndexOf(' ') : 78) + '…'
}

const mk = (e: Omit<Entry, 'tfold' | 'words' | 'extra' | 'hay'> & { extra?: string; hay?: string }): Entry => {
  const tfold = fold(e.title)
  return { ...e, tfold, words: tfold.split(' ').filter(Boolean), extra: fold(e.extra ?? ''), hay: e.hay ?? '' }
}

export interface Index {
  entries: Entry[]
  buildMs: number
  loadMs: number
}

let index: Promise<Index> | null = null
let ready: Index | null = null
export const getIndexIfReady = () => ready

const NOISE = /^(WEB[A-Z]{3,6}|FACEBOOK|fACEBOOK|INSTAGRAM|APP)\b\s*[:;]?\s*(https?:\/\/\S+|@\S+)?$/

function addCountry(c: Country, out: Entry[]) {
  for (const s of c.sections) {
    const ids = numberSection(s.blocks)
    const where = `${c.name} · ${SECTION_TITLES[s.key]}`
    const walk = (bl: Block[]) => {
      for (const b of bl) {
        if (b.t === 'p' || b.t === 'label' || b.t === 'ul') {
          const paras = b.t === 'ul' ? b.items : [b.p]
          for (const p of paras) {
            const t = p.text.trim()
            if (t.length < 4 || NOISE.test(t)) continue
            out.push(mk({ id: `${c.id}|${s.key}|${ids.line.get(p)}`, kind: 'text', title: shortTitle(t), sub: where, country: c.id, countryName: c.name, section: s.key, line: ids.line.get(p), text: t, hay: fold(t) }))
          }
        } else {
          const id = ids.item.get(b)!
          out.push(mk({ id: `${c.id}|${s.key}|${id}`, kind: 'item', title: shortTitle(b.head.text), sub: where, country: c.id, countryName: c.name, section: s.key, item: id, photo: b.photos?.[0], extra: `${c.name} ${SECTION_TITLES[s.key]}` }))
          walk(b.body)
        }
      }
    }
    walk(s.blocks)
  }
  if (c.emergency) {
    out.push(mk({ id: `${c.id}|emergency`, kind: 'item', title: 'Emergency numbers', sub: `${c.name} · ${SECTION_TITLES.protection}`, country: c.id, countryName: c.name, section: 'protection', item: 'emergency', extra: `${c.name} police ambulance immigration` }))
  }
}

export function buildIndex(): Promise<Index> {
  if (index) return index
  index = (async () => {
    const t0 = performance.now()
    const countries = await loadAllCountries()
    const t1 = performance.now()
    const out: Entry[] = []
    for (const c of COUNTRY_LIST) {
      out.push(mk({ id: c.id, kind: 'country', title: c.name, sub: c.focusCity ? `Guide covers ${c.focusCity}` : 'Open the guide', country: c.id, countryName: c.name, extra: c.focusCity ?? '' }))
      for (const k of c.sections) {
        out.push(mk({ id: `${c.id}|${k}`, kind: 'topic', title: `${SECTION_TITLES[k]} in ${c.name}`, sub: c.name, country: c.id, countryName: c.name, section: k }))
      }
    }
    out.push(mk({ id: 'philippines', kind: 'country', title: 'Philippines', sub: 'Home country, no guide', site: { action: 'philippines' } }))
    for (const p of SITE_PAGES) out.push(mk({ id: `site|${p.id}`, kind: 'site', title: p.title, sub: p.target ? 'On this page' : 'Coming soon', site: { target: p.target, action: p.action }, hay: fold(p.text) }))
    for (const c of countries) addCountry(c, out)
    const done = performance.now()
    const idx = { entries: out, buildMs: Math.round((done - t1) * 10) / 10, loadMs: Math.round((t1 - t0) * 10) / 10 }
    ready = idx
    ;(window as unknown as { __searchStats?: unknown }).__searchStats = { entries: out.length, buildMs: idx.buildMs, loadMs: idx.loadMs }
    return idx
  })()
  return index
}

const LABEL: Record<Kind, string> = { country: 'Countries', topic: 'Topics', item: 'Places and services', text: 'Guide text', site: 'Site pages' }
const ORDER: Kind[] = ['country', 'topic', 'item', 'text', 'site']
const KIND_BONUS: Record<Kind, number> = { country: 60, topic: 40, item: 20, site: 50, text: 0 }

function scoreTitle(e: Entry, tokens: string[], qf: string): number {
  const t = e.tfold.trim()
  if (t === qf) return 1000
  if (t.startsWith(qf)) return 850
  let prefix = 0, sub = 0, fuzzy = 0, viaExtra = 0
  for (const tok of tokens) {
    if (e.words.some((w) => w.startsWith(tok))) prefix++
    else if (tok.length >= 3 && e.tfold.includes(tok)) sub++
    else if (e.extra && (e.extra.split(' ').some((w) => w.startsWith(tok)))) viaExtra++
    else if (tok.length >= 4 && e.words.some((w) => within(tok, w, tok.length >= 8 ? 2 : 1))) fuzzy++
    else if (tok.length >= 4 && e.extra && e.extra.split(' ').some((w) => w.length > 2 && within(tok, w, 1))) fuzzy++
    else return 0
  }
  return 400 + prefix * 40 + sub * 20 + viaExtra * 10 - fuzzy * 15
}

export function search(idx: Index, query: string, perGroupCap = 60): Group[] {
  const tokens = tokensOf(query)
  if (!tokens.length) return []
  const qf = tokens.join(' ')
  const buckets: Record<Kind, Hit[]> = { country: [], topic: [], item: [], text: [], site: [] }
  for (const e of idx.entries) {
    let score = 0
    if (e.kind === 'text') {
      if (qf.length < 3) continue
      if (tokens.every((t) => e.hay.includes(t))) score = 100 + (e.hay.includes(qf) ? 40 : 0) - Math.min(e.hay.length / 60, 25)
    } else {
      score = scoreTitle(e, tokens, qf)
      // site pages and the home-page text: also found by their words
      if (!score && e.kind === 'site' && qf.length >= 3 && tokens.every((t) => e.hay.includes(t))) score = 300
    }
    if (score > 0) buckets[e.kind].push({ entry: e, score: score + KIND_BONUS[e.kind] - Math.min(e.title.length / 40, 10) })
  }
  const groups: Group[] = []
  for (const k of ORDER) {
    const hits = buckets[k].sort((a, b) => b.score - a.score)
    if (hits.length) groups.push({ kind: k, label: LABEL[k], total: hits.length, hits: hits.slice(0, perGroupCap) })
  }
  // the group with the best match goes first (ties keep the fixed order above)
  return groups.sort((a, b) => b.hits[0].score - a.hits[0].score)
}

/** Pieces of `text` marked as matching the query, without changing the text itself. */
export function highlight(text: string, query: string): { t: string; hit: boolean }[] {
  const tokens = tokensOf(query)
  const f = fold(text)
  const mark = new Array<boolean>(text.length).fill(false)
  for (const tok of tokens) {
    let from = 0
    for (;;) {
      const at = f.indexOf(tok, from)
      if (at < 0) break
      for (let i = at; i < at + tok.length; i++) mark[i] = true
      from = at + tok.length
    }
  }
  const out: { t: string; hit: boolean }[] = []
  let cur = ''
  let curHit = mark[0] ?? false
  for (let i = 0; i < text.length; i++) {
    if (mark[i] !== curHit) { out.push({ t: cur, hit: curHit }); cur = ''; curHit = mark[i] }
    cur += text[i]
  }
  if (cur) out.push({ t: cur, hit: curHit })
  return out
}

/** A short piece of the text around the first match. */
export function snippet(text: string, query: string, width = 110): string {
  const f = fold(text)
  const tok = tokensOf(query)[0]
  const at = tok ? f.indexOf(tok) : -1
  if (text.length <= width || at < 0) return text.length <= width ? text : text.slice(0, width - 1) + '…'
  const start = Math.max(0, at - 30)
  return (start > 0 ? '…' : '') + text.slice(start, start + width) + (start + width < text.length ? '…' : '')
}

export { MESSAGES }
