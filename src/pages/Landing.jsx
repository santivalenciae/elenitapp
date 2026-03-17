import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
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
          className="text-xl text-gray-600 mb-2"
        >
          ¡Aprende, juega y crece!
        </motion.p>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 mb-8 max-w-xs"
        >
          Únete a Naranix, Toroncitax, Mandax y Chatfrutix en el mundo de Limonix.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-3 w-full max-w-xs"
        >
          <Link to="/register">
            <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              ¡Empezar ahora! 🚀
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="w-full">
              Ya tengo cuenta
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 grid grid-cols-2 gap-4 max-w-sm w-full"
        >
          {[
            { emoji: '🔢', label: 'Matemáticas' },
            { emoji: '📖', label: 'Lectura' },
            { emoji: '🔬', label: 'Ciencias' },
            { emoji: '⚡', label: 'Velocidad' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
              <span className="text-3xl">{s.emoji}</span>
              <span className="font-bold text-gray-700">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  )
}
