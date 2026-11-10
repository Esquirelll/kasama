/**
 * All the wording on the home page, in one place. The page and the search both read these strings,
 * so what you search for is exactly what is shown. Change a line here and it changes everywhere.
 */
export const SITE = {
  nav: { search: 'Search…', home: 'Home', about: 'About', contact: 'Contact', book: 'Book', signUp: 'Sign up', logOut: 'Log out' },
  hero: {
    url: 'www.kasamatourismo.com',
    tagline: 'Travel with a Kasama',
    blurb: 'Country guides for Filipino travelers: entry rules, money, getting around, and what to watch out for.',
    explore: 'Explore destinations',
    bookNow: 'Book now!',
  },
  map: {
    eyebrow: 'Where to?',
    title: 'Choose your own destination',
    blurb: 'Pick a country to see its entry rules, money tips, transport, hotels and what to watch out for.',
  },
  about: {
    eyebrow: 'Who we are',
    title: 'About us',
    blurb: 'Kasama Tourismo is a trusted travel companion in discovering the beauty and ways of Southeast Asia. We provide reliable travel guides and information of each country\'s required travel entries, how to manage expenses, to finding accommodations. We make travel planning easier for our Filipinos bearing a Philippine passport. With Kasama Tourismo, we guide you every step of the way.',
    features: [
      { key: 'safety', label: 'Safety', text: 'Common scams and emergency numbers for every country we cover.' },
      { key: 'support', label: 'Support', text: 'Tourist protection rules, and who to call when something goes wrong.' },
      { key: 'expenses', label: 'Expenses', text: 'Where to exchange money and what getting around usually costs.' },
    ],
  },
  membership: {
    eyebrow: 'Premium',
    title: 'Membership/premium tour',
    blurb: 'Premium tours and memberships are coming soon. This prototype shows where they will live.',
    badge: 'Paid feature · Coming soon',
    plans: {
      eyebrow: 'Plans',
      mockup: 'Mockup only: payments are not available yet.',
      subscription: { title: 'Monthly subscription', price: '₱1,500', per: 'month', note: 'Includes all services', cta: 'Subscribe' },
      aCarte: {
        title: 'A La Carte Services',
        blurb: 'For those who want to avail one service without needing a subscription.',
        items: [
          { key: 'visa', name: 'Visa Guidance', price: '₱600', per: 'person', detail: '' },
          { key: 'immigration', name: 'Mock Immigration', price: '₱300', per: 'session', detail: '' },
          { key: 'booking', name: 'Booking Services', price: '₱150', per: 'booking', detail: 'plane, hotel, restaurant' },
          { key: 'itinerary', name: 'Personalized Itinerary', price: '₱500', per: 'trip', detail: '' },
        ],
      },
    },
  },
  contact: {
    eyebrow: 'Say hello',
    title: 'Contact us',
    items: [
      { key: 'phone', label: 'Call us', value: '+63 901 234 5678' },
      { key: 'email', label: 'Email', value: 'Kasamatourismo@gmail.com' },
      { key: 'social', label: 'Social', value: '@kasamatourismocial' },
    ],
  },
} as const

/** Short messages shown in the small pop-up note. */
export const MESSAGES = {
  book: 'Booking and premium tours are coming soon. This is a prototype.',
  other: 'This section is coming soon.',
  philippines: 'The Philippines is our home country, so there is no guide for it.',
  plans: 'Payments are not available yet. This is a mockup.',
  signup: 'This is a mockup, so no account was created. Use the demo login to explore the site.',
} as const

/** What the search can find on the home page itself. */
export interface SitePage { id: string; title: string; text: string; target?: string; action?: 'book' | 'other' | 'philippines' }
export const SITE_PAGES: SitePage[] = [
  { id: 'home', title: SITE.nav.home, text: `${SITE.hero.tagline}. ${SITE.hero.blurb}`, target: 'top' },
  { id: 'map', title: SITE.map.title, text: SITE.map.blurb, target: 'destinations' },
  { id: 'about', title: SITE.about.title, text: SITE.about.blurb, target: 'about' },
  ...SITE.about.features.map((f) => ({ id: f.key, title: f.label, text: f.text, target: 'about' })),
  { id: 'membership', title: SITE.membership.title, text: `${SITE.membership.blurb} ${SITE.membership.badge}`, target: 'membership' },
  { id: 'plans', title: SITE.membership.plans.subscription.title, text: `${SITE.membership.plans.subscription.price}/${SITE.membership.plans.subscription.per} ${SITE.membership.plans.subscription.note}`, target: 'plans' },
  { id: 'acarte', title: SITE.membership.plans.aCarte.title, text: SITE.membership.plans.aCarte.blurb, target: 'plans' },
  ...SITE.membership.plans.aCarte.items.map((i) => ({ id: `svc-${i.key}`, title: i.name, text: `${i.price}/${i.per} ${i.detail}`.trim(), target: 'plans' })),
  { id: 'contact', title: SITE.contact.title, text: SITE.contact.items.map((c) => `${c.label} ${c.value}`).join(' '), target: 'contact' },
  ...SITE.contact.items.map((c) => ({ id: c.key, title: c.label, text: c.value, target: 'contact' })),
  { id: 'book', title: SITE.nav.book, text: MESSAGES.book, action: 'book' },
]
