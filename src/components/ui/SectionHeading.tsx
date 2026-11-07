import type { ReactNode } from 'react'

type Props = {
  variant?: 'caps' | 'italic'
  as?: 'h1' | 'h2' | 'h3'
  id?: string
  className?: string
  children: ReactNode
}

const styles = {
  // "CHOOSE YOUR OWN DESTINATION"
  caps: 'font-caps uppercase leading-[0.95] tracking-[0.02em] text-5xl sm:text-6xl lg:text-7xl text-shadow-soft',
  // "About us", "Membership/premium tour", "Contact us"
  italic: 'font-italic font-normal not-italic leading-[1.08] text-4xl sm:text-5xl lg:text-6xl text-shadow-soft',
}

export function SectionHeading({ variant = 'caps', as: Tag = 'h2', id, className = '', children }: Props) {
  return <Tag id={id} className={`${styles[variant]} ${className}`}>{children}</Tag>
}
