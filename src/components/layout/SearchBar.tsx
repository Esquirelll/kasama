import { MicIcon, SearchIcon } from '@/components/ui/icons'

/** UI only for now: submitting shows a "coming soon" message. Real search arrives in Phase 8. */
export function SearchBar({ onSubmit }: { onSubmit: () => void }) {
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="flex w-full items-center gap-3 rounded-full border border-white/80 px-4 py-2 focus-within:border-gold focus-within:ring-1 focus-within:ring-gold md:w-72 lg:w-48 min-[1440px]:w-72"
    >
      <SearchIcon className="h-4 w-4 shrink-0 text-white" />
      <label htmlFor="site-search" className="sr-only">Search destinations</label>
      <input
        id="site-search"
        type="search"
        placeholder="Search…"
        className="min-w-0 flex-1 bg-transparent font-nav text-sm uppercase tracking-nav text-white placeholder:text-white/70 focus:outline-none"
      />
      {/* Decorative for now (not a button): voice search is not part of this prototype. */}
      <MicIcon className="h-4 w-4 shrink-0 text-white/80" />
    </form>
  )
}
