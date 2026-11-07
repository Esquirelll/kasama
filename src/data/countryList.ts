import type { SectionKey } from './types'

/** Small summary of every country (no guide text), so the map and lists never need to load a whole guide. Generated with the country files. */
export interface CountrySummary {
  id: string
  name: string
  mapCode: string
  focusCity?: string
  status: 'complete' | 'partial' | 'coming-soon'
  hasEmergency?: boolean
  sections: SectionKey[]
}

export const COUNTRY_LIST: CountrySummary[] = [
 {
  "id": "cambodia",
  "name": "Cambodia",
  "mapCode": "116",
  "status": "complete",
  "sections": [
   "visa",
   "entry",
   "connectivity",
   "money",
   "destinations",
   "transport",
   "hotels",
   "restaurants",
   "etiquette",
   "scams",
   "apps",
   "protection"
  ],
  "focusCity": "Phnom Penh",
  "hasEmergency": true
 },
 {
  "id": "laos",
  "name": "Laos",
  "mapCode": "418",
  "status": "complete",
  "sections": [
   "visa",
   "entry",
   "connectivity",
   "money",
   "destinations",
   "transport",
   "hotels",
   "restaurants",
   "etiquette",
   "scams",
   "apps",
   "protection"
  ],
  "focusCity": "Vientiane"
 },
 {
  "id": "myanmar",
  "name": "Myanmar",
  "mapCode": "104",
  "status": "complete",
  "sections": [
   "visa",
   "entry",
   "connectivity",
   "money",
   "destinations",
   "transport",
   "hotels",
   "restaurants",
   "etiquette",
   "scams",
   "apps",
   "protection"
  ],
  "focusCity": "Naypyidaw"
 },
 {
  "id": "thailand",
  "name": "Thailand",
  "mapCode": "764",
  "status": "complete",
  "sections": [
   "visa",
   "entry",
   "connectivity",
   "money",
   "destinations",
   "transport",
   "hotels",
   "restaurants",
   "etiquette",
   "scams",
   "apps",
   "protection"
  ],
  "focusCity": "Bangkok"
 },
 {
  "id": "vietnam",
  "name": "Vietnam",
  "mapCode": "704",
  "status": "complete",
  "sections": [
   "visa",
   "entry",
   "connectivity",
   "money",
   "destinations",
   "transport",
   "hotels",
   "restaurants",
   "etiquette",
   "scams",
   "apps",
   "protection"
  ],
  "focusCity": "Hanoi"
 },
 {
  "id": "brunei",
  "name": "Brunei",
  "mapCode": "096",
  "status": "complete",
  "sections": [
   "visa",
   "entry",
   "connectivity",
   "money",
   "destinations",
   "transport",
   "hotels",
   "restaurants",
   "etiquette",
   "scams",
   "apps",
   "protection"
  ],
  "focusCity": "Bandar Seri Begawan"
 },
 {
  "id": "indonesia",
  "name": "Indonesia",
  "mapCode": "360",
  "status": "complete",
  "sections": [
   "visa",
   "entry",
   "connectivity",
   "money",
   "destinations",
   "transport",
   "hotels",
   "restaurants",
   "etiquette",
   "scams",
   "apps",
   "protection"
  ],
  "focusCity": "Jakarta"
 },
 {
  "id": "malaysia",
  "name": "Malaysia",
  "mapCode": "458",
  "status": "complete",
  "sections": [
   "visa",
   "entry",
   "connectivity",
   "money",
   "destinations",
   "transport",
   "hotels",
   "restaurants",
   "etiquette",
   "scams",
   "apps",
   "protection"
  ],
  "focusCity": "Kuala Lumpur"
 },
 {
  "id": "singapore",
  "name": "Singapore",
  "mapCode": "702",
  "status": "complete",
  "sections": [
   "visa",
   "entry",
   "connectivity",
   "money",
   "destinations",
   "transport",
   "hotels",
   "restaurants",
   "etiquette",
   "scams",
   "apps",
   "protection"
  ]
 },
 {
  "id": "timor-leste",
  "name": "Timor-Leste",
  "mapCode": "626",
  "status": "complete",
  "sections": [
   "visa",
   "entry",
   "connectivity",
   "money",
   "destinations",
   "transport",
   "hotels",
   "restaurants",
   "etiquette",
   "scams",
   "apps",
   "protection"
  ],
  "focusCity": "Dili"
 }
]

export const summaryOf = (id: string) => COUNTRY_LIST.find((c) => c.id === id)
