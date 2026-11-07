import { AnimatePresence, motion } from 'framer-motion'

/** Small "coming soon" message. The live region always exists so screen readers announce changes. */
export function Toast({ message }: { message: string | null }) {
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <AnimatePresence>
        {message && (
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            className="border border-gold bg-navy-deep px-5 py-3 font-body text-sm text-white shadow-[0_10px_30px_rgba(12,36,60,0.5)]"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
