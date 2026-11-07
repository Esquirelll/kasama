import { useEffect, useState } from 'react'
import { summaryOf } from '../countryList'
import type { Country } from '../types'

// Each country is its own file and its own download: it is only fetched when someone opens that country.
// Adding a country = adding ONE file in this folder that default-exports a Country (and listing it in countryList.ts).
const loaders = import.meta.glob<{ default: Country }>(['./*.ts', '!./index.ts'])

const cache = new Map<string, Country>()
const pending = new Map<string, Promise<Country | undefined>>()

export function loadCountry(id: string): Promise<Country | undefined> {
  const hit = cache.get(id)
  if (hit) return Promise.resolve(hit)
  const loader = loaders[`./${id}.ts`]
  if (!loader) return Promise.resolve(undefined)
  let p = pending.get(id)
  if (!p) {
    p = loader().then((m) => {
      cache.set(id, m.default)
      return m.default
    })
    pending.set(id, p)
  }
  return p
}

/** Already-loaded country (or undefined). Use useCountry() in components. */
export const getCountry = (id: string) => cache.get(id)
export const hasGuide = (id: string) => `./${id}.ts` in loaders

export async function loadAllCountries(): Promise<Country[]> {
  const all = await Promise.all(Object.keys(loaders).map((p) => loadCountry(p.slice(2, -3))))
  return all.filter((c): c is Country => !!c)
}

export function useCountry(id: string) {
  const [country, setCountry] = useState<Country | undefined>(() => getCountry(id))
  useEffect(() => {
    let live = true
    setCountry(getCountry(id))
    if (!getCountry(id)) loadCountry(id).then((c) => live && setCountry(c))
    return () => { live = false }
  }, [id])
  return { country, loading: !country && hasGuide(id), summary: summaryOf(id) }
}
