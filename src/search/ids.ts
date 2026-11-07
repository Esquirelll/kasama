import type { Block, Para } from '@/data/types'

type ItemBlock = Extract<Block, { t: 'item' }>

/** Stable ids for the items ("i0", "i1" ...) and text lines ("l0", "l1" ...) of one topic, numbered in reading order.
 *  The page and the search use this same numbering, so a search result can point at the exact spot. */
export interface Ids {
  item: WeakMap<ItemBlock, string>
  line: WeakMap<Para, string>
}

export function numberSection(blocks: Block[]): Ids {
  const item = new WeakMap<ItemBlock, string>()
  const line = new WeakMap<Para, string>()
  let i = 0
  let l = 0
  const walk = (bl: Block[]) => {
    for (const b of bl) {
      if (b.t === 'p' || b.t === 'label') line.set(b.p, `l${l++}`)
      else if (b.t === 'ul') for (const it of b.items) line.set(it, `l${l++}`)
      else {
        item.set(b, `i${i++}`)
        line.set(b.head, `l${l++}`)
        walk(b.body)
      }
    }
  }
  walk(blocks)
  return { item, line }
}

/** Is the item or line with this id somewhere inside these blocks? */
export function containsTarget(blocks: Block[], ids: Ids, target: string): boolean {
  for (const b of blocks) {
    if (b.t === 'p' || b.t === 'label') {
      if (ids.line.get(b.p) === target) return true
    } else if (b.t === 'ul') {
      if (b.items.some((it) => ids.line.get(it) === target)) return true
    } else if (ids.item.get(b) === target || ids.line.get(b.head) === target || containsTarget(b.body, ids, target)) return true
  }
  return false
}
