import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

type Variant = 'outline' | 'gold' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 font-nav uppercase tracking-nav text-sm px-6 py-3 ' +
  'transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  outline: 'border border-white/80 text-white hover:bg-white hover:text-slate-main',
  gold: 'bg-gold text-navy-deep font-semibold hover:bg-white',
  ghost: 'text-white hover:text-gold underline-offset-8 hover:underline',
}

type Common = { variant?: Variant }

export function Button({
  variant = 'outline',
  className = '',
  type = 'button',
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={`${base} ${variants[variant]} ${className}`} {...rest} />
}

export function ButtonLink({
  variant = 'outline',
  className = '',
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={`${base} ${variants[variant]} ${className}`} {...rest} />
}
