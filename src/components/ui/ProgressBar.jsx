import { motion } from 'framer-motion'

export function ProgressBar({ value, max = 100, color = 'var(--team-color)', className = '' }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className={`w-full bg-gray-200 rounded-full h-3 overflow-hidden ${className}`}>
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  )
}
