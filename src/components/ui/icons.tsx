import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>
// One icon family: bold white shapes, round joins. Stroke icons use 2.2; solid icons cut their detail out in slate.
const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const
const base = (p: P) => ({ viewBox: '0 0 24 24', 'aria-hidden': true, focusable: false, ...p }) as P
const CUT = '#244253' // slate-main: the "cut-out" color on solid icons

export const SearchIcon = (p: P) => (
  <svg {...base(p)} {...line}><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5 L21 21" /></svg>
)
export const MicIcon = (p: P) => (
  <svg {...base(p)} {...line}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11.5 a6.5 6.5 0 0 0 13 0 M12 18 V21.5" /></svg>
)
export const HomeIcon = (p: P) => (
  <svg {...base(p)} {...line}><path d="M4 11.5 L12 4.5 L20 11.5 M6.5 9.5 V20 H17.5 V9.5" /></svg>
)
export const PinIcon = (p: P) => (
  <svg {...base(p)} {...line}><path d="M12 21 C12 21 5 14.5 5 9.5 a7 7 0 0 1 14 0 C19 14.5 12 21 12 21 Z" /><circle cx="12" cy="9.5" r="2.4" /></svg>
)
export const ShieldCheckIcon = (p: P) => (
  <svg {...base(p)}>
    <path fill="currentColor" d="M12 2 L20 5 V11 C20 16 16.5 20 12 22 C7.5 20 4 16 4 11 V5 Z" />
    <path fill="none" stroke={CUT} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" d="M8.2 11.8 L10.8 14.4 L15.8 9" />
  </svg>
)
export const ClockIcon = (p: P) => (
  <svg {...base(p)} {...line} strokeWidth={2.4}><circle cx="12" cy="12" r="9.5" /><path d="M12 6.5 V12 L15.8 14.3" /></svg>
)
export const MoneyBagIcon = (p: P) => (
  <svg {...base(p)}>
    <path fill="currentColor" d="M9.2 2.5 H14.8 L13.1 6 H10.9 Z" />
    <path fill="currentColor" d="M12 6.6 C7 6.6 4.5 11.4 4.5 15.2 C4.5 19.2 7.6 21.5 12 21.5 C16.4 21.5 19.5 19.2 19.5 15.2 C19.5 11.4 17 6.6 12 6.6 Z" />
    <text x="12" y="18.2" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="9.5" fill={CUT}>$</text>
  </svg>
)

export const PhoneIcon = (p: P) => (
  <svg {...base(p)} {...line}><path d="M6.5 3.5 H10 L11.5 8 L9.3 9.5 C10.4 11.8 12.2 13.6 14.5 14.7 L16 12.5 L20.5 14 V17.5 C20.5 18.9 19.4 20 18 20 C10.8 19.6 4.4 13.2 4 6 C4 4.6 5.1 3.5 6.5 3.5 Z" /></svg>
)
export const MailIcon = (p: P) => (
  <svg {...base(p)} {...line}><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="M4 7.5 L12 13 L20 7.5" /></svg>
)
export const AtIcon = (p: P) => (
  <svg {...base(p)} {...line}><circle cx="12" cy="12" r="3.6" /><path d="M15.6 12 V13.2 a2.4 2.4 0 0 0 4.8 0 V12 a8.4 8.4 0 1 0 -3.3 6.7" /></svg>
)
