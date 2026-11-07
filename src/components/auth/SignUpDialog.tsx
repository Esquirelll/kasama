import { useEffect, useRef, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/Button'
import { SampleTag } from '@/components/ui/SampleTag'
import { MESSAGES, SITE } from '@/data/site'

const field = 'w-full rounded-full border border-white/70 bg-transparent px-5 py-3 text-base text-white placeholder:text-white/45 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold'
const label = 'mb-2 block pl-1 font-nav text-xs uppercase tracking-nav text-white/80'

/** MOCKUP: there are no real accounts. Submitting just explains that. */
export function SignUpDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const first = useRef<HTMLInputElement>(null)
  const box = useRef<HTMLDivElement>(null)
  const [sent, setSent] = useState(false)
  const plans = SITE.membership.plans

  useEffect(() => {
    if (!open) { setSent(false); return }
    const opener = document.activeElement as HTMLElement | null
    first.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.stopPropagation(); onClose(); return }
      if (e.key !== 'Tab' || !box.current) return
      const f = [...box.current.querySelectorAll<HTMLElement>('input, button, a[href]')].filter((x) => !x.hasAttribute('disabled'))
      if (!f.length) return
      const a = document.activeElement
      if (e.shiftKey && a === f[0]) { e.preventDefault(); f[f.length - 1].focus() }
      else if (!e.shiftKey && a === f[f.length - 1]) { e.preventDefault(); f[0].focus() }
    }
    window.addEventListener('keydown', onKey, true)
    return () => { window.removeEventListener('keydown', onKey, true); document.body.style.overflow = prev; opener?.focus?.() }
  }, [open, onClose])

  if (!open) return null
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true) }
  return createPortal(
    <div className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-navy-deep/85 p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={box} role="dialog" aria-modal="true" aria-labelledby="signup-title" className="my-8 w-full max-w-md border border-gold/60 bg-navy-deep p-8 shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <h2 id="signup-title" className="font-italic text-4xl text-shadow-soft">Sign up</h2>
          <button type="button" onClick={onClose} aria-label="Close sign up" className="grid h-10 w-10 place-items-center border border-white/40 text-white/90 hover:border-gold hover:text-gold">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="h-4 w-4"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
        <p className="mt-2"><SampleTag>Mockup</SampleTag></p>
        {sent ? (
          <div className="mt-6" role="status">
            <p className="border-l-2 border-gold pl-4 text-lg text-white/90">{MESSAGES.signup}</p>
            <Button variant="gold" className="mt-8 w-full rounded-full" onClick={onClose}>Close</Button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-5">
            <div><label htmlFor="su-name" className={label}>Full name</label><input ref={first} id="su-name" autoComplete="name" className={field} /></div>
            <div><label htmlFor="su-email" className={label}>Email</label><input id="su-email" type="email" autoComplete="email" className={field} /></div>
            <div><label htmlFor="su-pass" className={label}>Password</label><input id="su-pass" type="password" autoComplete="new-password" className={field} /></div>
            <fieldset>
              <legend className={label}>Plan</legend>
              <div className="space-y-2 text-white/90">
                <label className="flex items-center gap-3"><input type="radio" name="plan" defaultChecked className="accent-gold" /> {plans.subscription.title} · {plans.subscription.price}/{plans.subscription.per}</label>
                <label className="flex items-center gap-3"><input type="radio" name="plan" className="accent-gold" /> {plans.aCarte.title}</label>
              </div>
            </fieldset>
            <Button type="submit" variant="gold" className="w-full rounded-full">Create account</Button>
          </form>
        )}
      </div>
    </div>,
    document.body,
  )
}
