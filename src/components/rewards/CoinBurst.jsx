import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export function CoinBurst({ trigger }) {
  useEffect(() => {
    if (!trigger) return
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FFD700', '#FFB347', '#FF6B35'],
    })
  }, [trigger])
  return null
}
