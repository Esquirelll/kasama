import pagoda from '@/assets/home/collage-1-golden-pagoda-night.webp'
import twinPagodas from '@/assets/home/collage-2-twin-pagodas-garden.webp'
import marinaBay from '@/assets/home/collage-3-marina-bay-supertrees.webp'
import umbrellas from '@/assets/home/collage-4-umbrella-street.webp'

// four diamonds placed like the mockup: top, left, right, bottom. zoom/origin tune each crop inside its diamond.
const tiles = [
  { place: 'left-1/4 top-0', src: pagoda, alt: 'Golden pagoda lit at dusk', origin: '28% 45%', zoom: 1.35 },
  { place: 'left-0 top-1/4', src: twinPagodas, alt: 'Twin pagodas above flower gardens on a hillside', origin: '58% 62%', zoom: 1.2 },
  { place: 'left-1/2 top-1/4', src: marinaBay, alt: 'Hotel towers and glowing tree-shaped towers at night', origin: '50% 50%', zoom: 1.1 },
  { place: 'left-1/4 top-1/2', src: umbrellas, alt: 'Street lined with colorful hanging umbrellas', origin: '50% 15%', zoom: 1.05 },
]

export function DiamondCollage() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
      {/* thin gold diamond outline behind the photos */}
      <span aria-hidden="true" className="absolute inset-[3%] rotate-45 border border-gold/60" style={{ transform: 'rotate(45deg) scale(0.7)' }} />
      {tiles.map((t) => (
        <div key={t.src} className={`absolute h-1/2 w-1/2 ${t.place}`} style={{ clipPath: 'polygon(50% 1.5%, 98.5% 50%, 50% 98.5%, 1.5% 50%)' }}>
          <img
            src={t.src}
            alt={t.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-110"
            style={{ transform: `scale(${t.zoom})`, transformOrigin: t.origin }}
          />
        </div>
      ))}
    </div>
  )
}
