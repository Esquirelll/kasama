import { PHOTO_URLS } from './photoUrls'

// Country photos live in src/assets/countries/<country>/<NN-section>/<name>.webp (listed in photoUrls.ts).
/** key looks like "cambodia/05-destinations/wat-phnom" */
export function photoUrl(key: string): string | undefined {
  return PHOTO_URLS[key]
}

/** Photos I flagged as possibly not matching their spot (see manifest.csv). Shown as a note in dev only. */
export const DOUBTFUL_PHOTOS = new Set<string>([])
