import { motion, AnimatePresence } from 'framer-motion'

export function FeedbackOverlay({ show, correct }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className={`fixed inset-0 flex items-center justify-center z-40 pointer-events-none`}
        >
          <div className={`rounded-full p-8 shadow-2xl ${correct ? 'bg-green-500' : 'bg-red-400'}`}>
            <span className="text-7xl">{correct ? '⭐' : '💪'}</span>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`absolute bottom-1/3 text-3xl font-extrabold text-white drop-shadow-lg`}
          >
            {correct ? '¡Correcto!' : '¡Sigue intentando!'}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
