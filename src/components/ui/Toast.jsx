import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Toast({ message, type = 'success', duration = 2500, onDone }) {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); setTimeout(onDone, 300) }, duration)
    return () => clearTimeout(t)
  }, [duration, onDone])

  const colors = { success: 'bg-green-500', error: 'bg-red-500', info: 'bg-blue-500' }
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl text-white font-bold shadow-lg ${colors[type]}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
