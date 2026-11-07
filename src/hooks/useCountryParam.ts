import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

export interface GoTarget { country: string | null; section?: string | null; item?: string | null; line?: string | null }

/** Reads/writes ?country=<id>&section=<key>&item=<id>&line=<id> so any state can be deep-linked. */
export function useCountryParam() {
  const [params, setParams] = useSearchParams()
  const country = params.get('country')
  const section = params.get('section')
  const item = params.get('item')
  const line = params.get('line')

  const setCountry = useCallback(
    (id: string | null, opts?: { replace?: boolean }) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          if (id) next.set('country', id)
          else next.delete('country')
          for (const k of ['section', 'item', 'line']) next.delete(k) // a new country starts on its overview
          return next
        },
        { replace: !!opts?.replace },
      )
    },
    [setParams],
  )
  const setSection = useCallback(
    (key: string | null) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          if (key) next.set('section', key)
          else next.delete('section')
          next.delete('item')
          next.delete('line')
          return next
        },
        { replace: true },
      )
    },
    [setParams],
  )
  /** Jump straight to a country, topic, item or line of text (used by the search). */
  const go = useCallback(
    (t: GoTarget) => {
      setParams((prev) => {
        const next = new URLSearchParams(prev)
        for (const k of ['country', 'section', 'item', 'line']) next.delete(k)
        if (t.country) next.set('country', t.country)
        if (t.section) next.set('section', t.section)
        if (t.item) next.set('item', t.item)
        if (t.line) next.set('line', t.line)
        return next
      })
    },
    [setParams],
  )
  return { country, section, item, line, setCountry, setSection, go }
}
