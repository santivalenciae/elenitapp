import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/useAuthStore'
import { Button } from '../components/ui/Button'

export default function Enter() {
  const navigate = useNavigate()
  const { enter } = useAuthStore()
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!username.trim()) return
    setError('')
    setLoading(true)
    try {
      await enter(username.trim())
      navigate('/onboarding')
    } catch (err) {
      setError('Ese nombre ya está en uso, prueba otro 😅')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 12 }}
        className="text-8xl mb-4"
      >
        🍋
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-5xl font-extrabold text-orange-500 mb-2"
      >
        Limonaria
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-500 text-lg mb-8"
      >
        ¡Aprende. Juega. Crece!
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-xs"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-2 text-center">
              ¿Cómo te llamas, aventurero? 🌟
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-3 border-orange-200 rounded-3xl px-5 py-4 text-lg font-bold text-center focus:outline-none focus:border-orange-400 bg-white shadow-sm"
              placeholder="TuNombre"
              maxLength={20}
              minLength={2}
              required
              autoFocus
            />
          </div>
          {error && (
            <p className="text-red-500 font-bold text-center text-sm">{error}</p>
          )}
          <Button
            type="submit"
            size="lg"
            disabled={loading || username.trim().length < 2}
            className="w-full bg-orange-500 text-white"
          >
            {loading ? '¡Entrando...' : '¡Jugar! 🚀'}
          </Button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 flex gap-6 text-4xl"
      >
        {['🐱', '🐶', '🐿️', '🐻'].map((e, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
          >
            {e}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}
