import { Fragment, type ReactNode } from 'react'
import type { Para } from '@/data/types'

const URL_RE = /(https?:\/\/[^\s]+)/g
const TRAIL = /[.,;:!?)\]»”’]+$/

/** Long addresses (with tracking junk) are shown shortened; the link itself is untouched. */
function shorten(url: string) {
  const bare = url.replace(/^https?:\/\//, '').replace(/^www\./, '')
  return bare.length > 58 ? bare.slice(0, 56) + '…' : bare
}

function A({ href, children, title }: { href: string; children: ReactNode; title?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" title={title ?? href} className="break-all text-gold underline decoration-gold/50 underline-offset-2 transition-colors hover:text-white">
      {children}
    </a>
  )
}

/** Turns plain web addresses inside a piece of text into links (open in a new tab). */
function linkify(str: string, key: string): ReactNode[] {
  return str.split(URL_RE).map((part, i) => {
    if (!/^https?:\/\//.test(part)) return <Fragment key={`${key}-${i}`}>{part}</Fragment>
    const trail = part.match(TRAIL)?.[0] ?? ''
    const url = trail ? part.slice(0, -trail.length) : part
    return (
      <Fragment key={`${key}-${i}`}>
        <A href={url}>{shorten(url)}</A>
        {trail}
      </Fragment>
    )
  })
}

/** A line of document text: its own hyperlinks first, then any plain web addresses. */
export function ParaText({ p, text }: { p: Para; text?: string }) {
  const str = text ?? p.text
  const links = (p.links ?? []).filter((l) => /^https?:\/\//.test(l.url) && str.includes(l.text))
  if (!links.length) return <>{linkify(str, 'u')}</>
  const out: ReactNode[] = []
  let rest = str
  links.forEach((l, n) => {
    const at = rest.indexOf(l.text)
    if (at < 0) return
    if (at > 0) out.push(...linkify(rest.slice(0, at), `a${n}`))
    out.push(<A key={`l${n}`} href={l.url}>{/^https?:\/\//.test(l.text) ? shorten(l.text) : l.text}</A>)
    rest = rest.slice(at + l.text.length)
  })
  if (rest) out.push(...linkify(rest, 'z'))
  return <>{out}</>
}
