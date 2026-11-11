import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../context/StoreContext'

export default function Toast() {
  const { toast } = useStore()
  return (
    <div className="toast-wrap" aria-live="polite">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            className="toast"
            initial={{ y: 40, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <span className="toast-dot" /> {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
