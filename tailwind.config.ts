import type { Config } from 'tailwindcss'

/**
 * Design tokens sampled from the mockup + logo (rounded; refine against full-res originals).
 * `theme.colors` is replaced on purpose: only brand colors exist, so default
 * Tailwind blues/indigos/purples cannot sneak in.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FCFCFC',
      gold: '#B48424',          // logo ring, plane, map hover / active
      'navy-deep': '#0C243C',   // membership panel, darkest areas
      'slate-main': '#244253',  // nav bar, map + About backgrounds, map borders
      'slate-light': '#435562', // waves, contact area
      'logo-navy': '#0C2C54',   // logo banner only (sampled range 0C2454-0C3C54)
    },
    fontFamily: {
      // Fonts from the original mockup. Alta, Barabara and Moontime are not on npm:
      // put their files in /public/fonts (see public/fonts/README.txt). Until then the fallbacks show.
      caps: ['Alta', '"Bebas Neue"', 'Impact', 'sans-serif'],        // "CHOOSE YOUR OWN DESTINATION"
      italic: ['Shrikhand', 'cursive'],                               // About us / Membership / Contact us
      nav: ['Barabara', '"Josefin Sans"', 'system-ui', 'sans-serif'], // nav + small caps
      body: ['Fredoka', 'system-ui', 'sans-serif'],                   // readable body copy, labels, contact items
      script: ['Moontime', 'Allura', 'cursive'],                      // "Travel with a Kasama"
    },
    extend: {
      letterSpacing: { nav: '0.22em' },
      keyframes: {
        kenburns: { '0%': { transform: 'scale(1)' }, '100%': { transform: 'scale(1.08)' } },
        cue: { '0%': { transform: 'scaleY(0)', transformOrigin: 'top' }, '50%': { transform: 'scaleY(1)', transformOrigin: 'top' }, '51%': { transform: 'scaleY(1)', transformOrigin: 'bottom' }, '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' } },
      },
      animation: { kenburns: 'kenburns 26s ease-out forwards', cue: 'cue 2.2s ease-in-out infinite' },
    },
  },
  plugins: [],
} satisfies Config
