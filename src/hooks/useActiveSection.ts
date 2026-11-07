import { useEffect, useState } from 'react'

/** Which section is in the middle of the screen (used to underline the current nav link). */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  const key = ids.join('|')
  useEffect(() => {
    const els = key.split('|').map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e)
    if (!('IntersectionObserver' in window) || els.length === 0) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [key])
  return active
}
