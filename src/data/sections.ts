import type { SectionKey } from './types'

/**
 * How the guide is organised for planning, in the order a traveller needs it
 * (same idea as Wikivoyage and Lonely Planet: practical basics first, then places, then staying safe).
 */
export const SECTION_GROUPS: { title: string; keys: SectionKey[] }[] = [
  { title: 'Before you go', keys: ['visa', 'entry', 'connectivity', 'money', 'apps'] },
  { title: 'Getting around and staying', keys: ['transport', 'hotels'] },
  { title: 'Things to see and eat', keys: ['destinations', 'restaurants'] },
  { title: 'Stay safe and respectful', keys: ['etiquette', 'scams', 'protection'] },
]

/** Reading order used by the "Next" and "Back" links. */
export const FLOW: SectionKey[] = SECTION_GROUPS.flatMap((g) => g.keys)

/** Short labels for the overview tiles (interface wording, not guide content). */
export const SECTION_HELP: Record<SectionKey, string> = {
  visa: 'Passport and visa rules',
  entry: 'What to prepare for arrival',
  connectivity: 'Staying online',
  money: 'Where to exchange',
  destinations: 'Places to see',
  transport: 'Getting around',
  hotels: 'Where to stay',
  restaurants: 'Where to eat',
  etiquette: 'Local customs',
  scams: 'What to watch out for',
  apps: 'Useful downloads',
  protection: 'Your rights and who to call',
}

/** Sections whose items are places (they get photos and a tap-to-open row). */
export const PLACE_SECTIONS = new Set<SectionKey>(['destinations', 'transport', 'hotels', 'restaurants'])
export const PLACE_NOUN: Partial<Record<SectionKey, string>> = {
  destinations: 'places',
  transport: 'ways to get around',
  hotels: 'hotels',
  restaurants: 'restaurants',
}
