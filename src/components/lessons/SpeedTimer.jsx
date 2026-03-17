import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function SpeedTimer({ duration = 15, onTimeUp, running }) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    setTimeLeft(duration)
  }, [duration])

  useEffect(() => {
    if (!running) return
    if (timeLeft <= 0) { onTimeUp?.(); return }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, running, onTimeUp, duration])

  const pct = (timeLeft / duration) * 100
  const color = pct > 50 ? '#4ECDC4' : pct > 25 ? '#FFB347' : '#FF6B6B'

  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
        <motion.div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
          animate={{ width: `${pct}%` }}
        />
      </div>
      <motion.span
        key={timeLeft}
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        className="text-2xl font-extrabold w-10 text-right"
        style={{ color }}
      >
        {timeLeft}
      </motion.span>
    </div>
  )
}
