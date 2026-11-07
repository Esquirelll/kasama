import { useState } from 'react'
import { Accordion, ExpandAll } from '@/components/ui/Accordion'
import { PinIcon } from '@/components/ui/icons'
import { PLACE_SECTIONS } from '@/data/sections'
import { photoUrl } from '@/data/photos'
import type { Block, Section } from '@/data/types'
import { BlockView, isTitle, Photos } from './BlockView'
import { ParaText } from './Rich'

type ItemBlock = Extract<Block, { t: 'item' }>

type Group = { title?: Block; kind: 'intro' | 'label' | 'topic'; blocks: Block[] }

/**
 * Splits a section into an intro plus groups. A group starts at a topic heading (a short item that is
 * followed by "Do's / Don'ts"-style labels) or, when there are none, at each label.
 */
function split(blocks: Block[]): Group[] {
  const isTopic = (b: Block, next?: Block) => b.t === 'item' && b.body.length === 0 && isTitle(b.head.text) && next?.t === 'label'
  const hasTopics = blocks.some((b, i) => isTopic(b, blocks[i + 1]))
  const groups: Group[] = [{ kind: 'intro', blocks: [] }]
  blocks.forEach((b, i) => {
    if (hasTopics ? isTopic(b, blocks[i + 1]) : b.t === 'label') groups.push({ title: b, kind: hasTopics ? 'topic' : 'label', blocks: [] })
    else groups[groups.length - 1].blocks.push(b)
  })
  return groups
}

/** Open-state helper: which accordions are open, and an "Open all / Close all" switch. */
function useOpen(n: number, startOpen: number[]) {
  const [open, setOpen] = useState<boolean[]>(() => Array.from({ length: n }, (_, i) => startOpen.includes(i)))
  const allOpen = open.every(Boolean)
  return {
    open,
    toggle: (i: number) => setOpen((o) => o.map((v, j) => (j === i ? !v : v))),
    setAll: () => setOpen(Array.from({ length: n }, () => !allOpen)),
    allOpen,
  }
}

/** Places: a tidy row (photo + name) that opens to photos, text and links. */
function PlaceList({ blocks }: { blocks: Block[] }) {
  const intro = blocks.filter((b) => b.t !== 'item')
  const items = blocks.filter((b): b is ItemBlock => b.t === 'item')
  const o = useOpen(items.length, items.length <= 2 ? items.map((_, i) => i) : [])
  return (
    <div className="space-y-4">
      {intro.length > 0 && <div className="space-y-3"><BlockView blocks={intro} /></div>}
      {items.length > 3 && <div className="flex justify-end"><ExpandAll allOpen={o.allOpen} onClick={o.setAll} /></div>}
      <div className="space-y-3">
        {items.map((it, i) => {
          const title = isTitle(it.head.text)
          const thumb = it.photos?.[0] ? photoUrl(it.photos[0]) : undefined
          return (
            <Accordion
              key={i}
              open={o.open[i]}
              onToggle={() => o.toggle(i)}
              header={
                <span className="flex items-center gap-4">
                  {thumb ? (
                    <img src={thumb} alt="" loading="lazy" decoding="async" className="h-16 w-16 shrink-0 object-cover" />
                  ) : (
                    <span className="grid h-16 w-16 shrink-0 place-items-center border border-white/15 text-white/40"><PinIcon className="h-5 w-5" /></span>
                  )}
                  <span className={`min-w-0 ${title ? 'font-body text-lg font-semibold' : 'line-clamp-2 font-body text-base'}`}>{it.head.text}</span>
                </span>
              }
            >
              <div className="space-y-4">
                <Photos keys={it.photos} alt={title ? it.head.text : 'Photo for this place'} />
                {!title && <p><ParaText p={it.head} /></p>}
                {it.body.length > 0 && <div className="space-y-3 text-white/85"><BlockView blocks={it.body} depth={1} /></div>}
              </div>
            </Accordion>
          )
        })}
      </div>
    </div>
  )
}

/** Long, grouped content (do's and don'ts, apps, money): topic rows that open one at a time or all together. */
function Grouped({ groups }: { groups: Group[] }) {
  const titled = groups.map((g, i) => ({ g, i })).filter((x) => x.g.title)
  const o = useOpen(groups.length, titled.length <= 3 ? titled.map((x) => x.i) : [titled[0].i])
  const heading = (g: Group) =>
    g.kind === 'topic' && g.title?.t === 'item' ? (
      <span className="font-body text-lg font-semibold"><ParaText p={g.title.head} /></span>
    ) : g.title?.t === 'label' ? (
      <span className="font-nav text-xs uppercase tracking-[0.2em] text-gold"><ParaText p={g.title.p} /></span>
    ) : null
  return (
    <div className="space-y-4">
      {titled.length > 3 && <div className="flex justify-end"><ExpandAll allOpen={titled.every((x) => o.open[x.i])} onClick={o.setAll} /></div>}
      {groups.map((g, i) =>
        g.title ? (
          <Accordion key={i} open={o.open[i]} onToggle={() => o.toggle(i)} header={heading(g)}>
            <div className="space-y-4"><BlockView blocks={g.blocks} /></div>
          </Accordion>
        ) : g.blocks.length ? (
          <div key={i} className="space-y-3"><BlockView blocks={g.blocks} /></div>
        ) : null,
      )}
    </div>
  )
}

/** Items that each have a short title and their own details (e.g. "When visiting pagodas ...") become rows too. */
function Topics({ blocks }: { blocks: Block[] }) {
  const intro = blocks.filter((b) => b.t !== 'item')
  const items = blocks.filter((b): b is ItemBlock => b.t === 'item')
  const o = useOpen(items.length, items.length <= 3 ? items.map((_, i) => i) : [0])
  return (
    <div className="space-y-4">
      {intro.length > 0 && <div className="space-y-3"><BlockView blocks={intro} /></div>}
      {items.length > 3 && <div className="flex justify-end"><ExpandAll allOpen={o.allOpen} onClick={o.setAll} /></div>}
      {items.map((it, i) => (
        <Accordion key={i} open={o.open[i]} onToggle={() => o.toggle(i)} header={<span className="font-body text-lg font-semibold"><ParaText p={it.head} /></span>}>
          <div className="space-y-3 text-white/85"><BlockView blocks={it.body} depth={1} /></div>
        </Accordion>
      ))}
    </div>
  )
}

export function SectionBody({ section }: { section: Section }) {
  const { blocks } = section
  if (PLACE_SECTIONS.has(section.key)) return <PlaceList blocks={blocks} />
  const groups = split(blocks)
  if (groups.filter((g) => g.title).length >= 2) return <Grouped groups={groups} />
  const items = blocks.filter((b): b is ItemBlock => b.t === 'item')
  if (items.length >= 3 && items.every((it) => isTitle(it.head.text) && it.body.length > 0)) return <Topics blocks={blocks} />
  return <div className="space-y-4"><BlockView blocks={blocks} /></div>
}
