/** A line of text exactly as written in the Word document, plus any hyperlinks the document attached to it. */
export interface Para {
  text: string
  links?: { text: string; url: string }[]
}

export type Block =
  | { t: 'p'; p: Para }
  /** a short heading line that introduces the items below it (e.g. "Do's in Cambodia") */
  | { t: 'label'; p: Para }
  | { t: 'ul'; items: Para[] }
  /** a numbered/lettered entry. `marker` is the numbering the document used (kept, not shown). */
  | { t: 'item'; marker?: string; head: Para; body: Block[]; photos?: string[] }

/** One citation. `note` is the "(for I-III)" part of a "SOURCE (for I-III):" label. */
export interface Source {
  note?: string
  lines: Para[]
}

export type SectionKey =
  | 'visa' | 'entry' | 'connectivity' | 'money' | 'destinations' | 'transport'
  | 'hotels' | 'restaurants' | 'etiquette' | 'scams' | 'apps' | 'protection'

export interface Section {
  key: SectionKey
  sources: Source[]
  blocks: Block[]
}

/** Fixed titles shown on the site (the document's own headings vary from country to country). */
export const SECTION_TITLES: Record<SectionKey, string> = {
  visa: 'Visa requirements',
  entry: 'Entry requirements',
  connectivity: 'SIM and eSIM',
  money: 'Money exchange',
  destinations: 'Tourist destinations',
  transport: 'Transport',
  hotels: 'Hotels',
  restaurants: 'Restaurants',
  etiquette: 'Do’s and don’ts',
  scams: 'Common scams',
  apps: 'Essential apps',
  protection: 'Tourist protection',
}

export interface Country {
  /** 'cambodia' (same as the file name) */
  id: string
  name: string
  /** ISO numeric code matching the map shape */
  mapCode: string
  /** The city the guide covers, only where the document says so */
  focusCity?: string
  status: 'complete' | 'partial' | 'coming-soon'
  /** Emergency numbers, only for countries whose document lists them */
  emergency?: { title: string; lines: Para[] }
  /** Only the sections that exist in the document. Missing ones are simply not here. */
  sections: Section[]
}
