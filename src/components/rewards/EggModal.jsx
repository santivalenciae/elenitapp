import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { Coin } from '../ui/Coin'

export function EggModal({ open, result, onClose }) {
  const [cracked, setCracked] = useState(false)

  function handleCrack() {
    setCracked(true)
  }

  function handleClose() {
    setCracked(false)
    onClose()
  }

  if (!result) return null

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="text-center">
        <AnimatePresence mode="wait">
          {!cracked ? (
            <motion.div key="egg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0 }}>
              <motion.div
                animate={{ rotate: [-5, 5, -5, 5, 0], y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-8xl mb-4 cursor-pointer"
                onClick={handleCrack}
              >
                🥚
              </motion.div>
              <p className="text-xl font-bold text-gray-700 mb-4">¡Un huevito misterioso!</p>
              <p className="text-gray-500 mb-6">Tócalo para abrirlo</p>
              <Button size="lg" onClick={handleCrack} className="w-full bg-orange-500 text-white">
                ¡Abrir! 💥
              </Button>
            </motion.div>
          ) : (
            <motion.div key="reveal" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 10 }}
                className="text-7xl mb-4"
              >
                {result.duplicate ? '🍋' : '🐾'}
              </motion.div>
              {result.duplicate ? (
                <>
                  <h3 className="text-2xl font-extrabold text-gray-800 mb-2">¡Ya tienes a {result.pet.name}!</h3>
                  <p className="text-gray-500 mb-2">Recibiste monedas en su lugar:</p>
                  <div className="flex justify-center mb-6">
                    <Coin amount={result.coins} size="lg" />
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-extrabold text-gray-800 mb-2">¡Nueva mascota!</h3>
                  <p className="text-xl font-bold text-[var(--team-color)] mb-2">{result.pet.name}</p>
                  <Badge rarity={result.pet.rarity} className="mb-6">{result.pet.rarity}</Badge>
                </>
              )}
              <Button size="lg" onClick={handleClose} className="w-full bg-orange-500 text-white">
                ¡Genial! 🎉
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  )
}
