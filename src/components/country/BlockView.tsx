import { DOUBTFUL_PHOTOS, photoUrl } from '@/data/photos'
import type { Block } from '@/data/types'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import { ParaText } from './Rich'

const LINK_LABEL = /^(WEB[A-Z]{3,6}|FACEBOOK|fACEBOOK|INSTAGRAM|APP)\b\s*[:;]?\s*/

/** a short head with no sentence in it is shown as a title; a long one is just text */
export const isTitle = (t: string) => t.length <= 80 && !/[.!?]$/.test(t.trim())

export function Photos({ keys, alt }: { keys?: string[]; alt: string }) {
  if (!keys?.length) return <PlaceholderImage label="Photo coming soon" ratio="16 / 9" className="w-full" />
  const odd = keys.length % 2 === 1 && keys.length > 1
  return (
    <div className={keys.length === 1 ? '' : 'grid grid-cols-2 gap-1'}>
      {keys.map((k, i) => (
        <div key={k} className={`relative ${odd && i === 0 ? 'col-span-2' : ''}`}>
          <img src={photoUrl(k)} alt={alt} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
          {import.meta.env.DEV && DOUBTFUL_PHOTOS.has(k) && (
            <span className="absolute left-0 top-0 bg-gold px-2 py-0.5 font-nav text-[0.6rem] uppercase tracking-nav text-navy-deep">dev note: photo may not match</span>
          )}
        </div>
      ))}
    </div>
  )
}

/** The document's text, block by block, exactly as written. */
export function BlockView({ blocks, depth = 0 }: { blocks: Block[]; depth?: number }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.t === 'label')
          return (
            <h4 key={i} className="pt-3 font-nav text-xs uppercase tracking-[0.25em] text-gold">
              <ParaText p={b.p} />
            </h4>
          )
        if (b.t === 'ul')
          return (
            <ul key={i} className="list-disc space-y-2 pl-5 marker:text-gold">
              {b.items.map((it, j) => (
                <li key={j}><ParaText p={it} /></li>
              ))}
            </ul>
          )
        if (b.t === 'p') {
          const m = b.p.text.match(LINK_LABEL)
          if (m && /https?:\/\/|@/.test(b.p.text))
            return (
              <p key={i} className="text-sm">
                <span className="mr-2 font-nav text-[0.7rem] uppercase tracking-nav text-white/60">{m[0].trim()}</span>
                <ParaText p={b.p} text={b.p.text.slice(m[0].length)} />
              </p>
            )
          return <p key={i}><ParaText p={b.p} /></p>
        }
        const title = isTitle(b.head.text)
        return (
          <div key={i} className={depth === 0 ? 'border-l-2 border-gold/60 pl-4' : 'border-l border-white/20 pl-4'}>
            {title ? <h5 className="font-body text-lg font-semibold"><ParaText p={b.head} /></h5> : <p><ParaText p={b.head} /></p>}
            {b.body.length > 0 && (
              <div className="mt-2 space-y-3 text-white/85">
                <BlockView blocks={b.body} depth={depth + 1} />
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}
