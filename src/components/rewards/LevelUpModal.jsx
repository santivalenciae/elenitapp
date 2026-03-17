import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Coin } from '../ui/Coin'
import { FRUITCOINS_PER_LEVEL } from '../../config/constants'

export function LevelUpModal({ open, level, onClose }) {
  useEffect(() => {
    if (open) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } })
    }
  }, [open])

  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 10 }}
          className="text-7xl mb-4"
        >
          🏆
        </motion.div>
        <h2 className="text-3xl font-extrabold text-orange-500 mb-2">¡Subiste de nivel!</h2>
        <p className="text-6xl font-extrabold text-gray-800 mb-4">{level}</p>
        <div className="bg-yellow-50 rounded-2xl p-4 mb-6 flex items-center justify-center gap-2">
          <span className="text-gray-600 font-bold">Ganaste</span>
          <Coin amount={FRUITCOINS_PER_LEVEL} size="lg" />
        </div>
        <Button size="lg" onClick={onClose} className="w-full bg-orange-500 text-white">
          ¡Seguir aprendiendo! 🚀
        </Button>
      </div>
    </Modal>
  )
}
