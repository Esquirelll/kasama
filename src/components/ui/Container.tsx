import type { ElementType, ReactNode } from 'react'

type Props = { as?: ElementType; className?: string; children: ReactNode }

export function Container({ as: Tag = 'div', className = '', children }: Props) {
  return <Tag className={`mx-auto w-full max-w-[78rem] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</Tag>
}
