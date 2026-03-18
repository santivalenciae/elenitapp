import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '../store/useAuthStore'

const LEADERS = [
  { name: 'Naranix', team: 'Equipo Gato', emoji: '🐱', color: '#FF6B35', bg: '#FF6B3520', corner: 'top-left' },
  { name: 'Toroncitax', team: 'Equipo Perro', emoji: '🐶', color: '#FFD700', bg: '#FFD70020', corner: 'top-right' },
  { name: 'Mandax', team: 'Equipo Ardilla', emoji: '🐿️', color: '#A0522D', bg: '#A0522D20', corner: 'bottom-left' },
  { name: 'Chatfrutix', team: 'Equipo Oso', emoji: '🐻', color: '#4CAF50', bg: '#4CAF5020', corner: 'bottom-right' },
]

const NAV_ITEMS = [
  { icon: '📜', label: 'Misiones' },
  { icon: '🐾', label: 'Mascotas' },
  { icon: '🏪', label: 'Tienda' },
  { icon: '🗺️', label: 'Mapa' },
  { icon: '🎉', label: 'Eventos' },
]

export default function Enter() {
  const navigate = useNavigate()
  const { enter } = useAuthStore()
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showInput, setShowInput] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!username.trim()) return
    setError('')
    setLoading(true)
    try {
      await enter(username.trim())
      navigate('/onboarding')
    } catch (err) {
      if (err?.code === '23505') {
        setError('Ese nombre ya está en uso, prueba otro 😅')
      } else {
        setError(err?.message || 'Error al entrar, intenta de nuevo')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col" style={{
      background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0FF 30%, #7BC67A 70%, #5A9E58 100%)'
    }}>
      {/* Sky clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-80"
            style={{
              width: `${80 + i * 40}px`,
              height: `${30 + i * 10}px`,
              top: `${5 + i * 8}%`,
              left: `${i * 20}%`,
              filter: 'blur(2px)',
            }}
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        {/* Rainbow */}
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <div style={{
            width: '100%',
            height: '200px',
            background: 'conic-gradient(from 180deg at 50% 100%, transparent 0deg, transparent 160deg, rgba(255,0,0,0.15) 165deg, rgba(255,165,0,0.15) 168deg, rgba(255,255,0,0.15) 171deg, rgba(0,255,0,0.15) 174deg, rgba(0,0,255,0.15) 177deg, rgba(128,0,128,0.15) 180deg, transparent 185deg)',
            borderRadius: '50% 50% 0 0',
          }} />
        </div>
        {/* Castle silhouette */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-6xl opacity-60 pointer-events-none">🏰</div>
        {/* Trees */}
        <div className="absolute bottom-20 left-4 text-5xl opacity-80">🌳</div>
        <div className="absolute bottom-20 left-16 text-4xl opacity-70">🌲</div>
        <div className="absolute bottom-20 right-4 text-5xl opacity-80">🌳</div>
        <div className="absolute bottom-20 right-16 text-4xl opacity-70">🌲</div>
        {/* Sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300 text-lg pointer-events-none"
            style={{ top: `${10 + Math.random() * 60}%`, left: `${Math.random() * 100}%` }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3 }}
          >✨</motion.div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 text-center pt-6 px-4">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 12 }}
        >
          <h1 className="text-5xl font-extrabold drop-shadow-lg" style={{
            color: '#FFD700',
            textShadow: '2px 2px 0 #B8860B, 4px 4px 0 #8B6914, 0 0 20px #FFD70080',
            fontFamily: "'Baloo 2', cursive",
          }}>
            🍋 LIMONARIA
          </h1>
          <p className="text-white font-bold text-lg drop-shadow" style={{ textShadow: '1px 1px 3px #00000060' }}>
            El Mundo de Limonix
          </p>
        </motion.div>
      </div>

      {/* Team leaders corners */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-2">
        {/* Top-left: Naranix */}
        <motion.div
          initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          className="absolute top-2 left-2 flex flex-col items-center"
        >
          <div className="text-4xl mb-1 drop-shadow-lg">🐱</div>
          <div className="px-2 py-1 rounded-xl text-white text-xs font-extrabold shadow-lg" style={{ background: '#FF6B35', textShadow: '1px 1px 2px #00000040' }}>
            <div>Naranix</div>
            <div className="text-xs opacity-90">Equipo Gato</div>
          </div>
        </motion.div>

        {/* Top-right: Toroncitax */}
        <motion.div
          initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}
          className="absolute top-2 right-2 flex flex-col items-center"
        >
          <div className="text-4xl mb-1 drop-shadow-lg">🐶</div>
          <div className="px-2 py-1 rounded-xl text-white text-xs font-extrabold shadow-lg" style={{ background: '#E6A800', textShadow: '1px 1px 2px #00000040' }}>
            <div>Toroncitax</div>
            <div className="text-xs opacity-90">Equipo Perro</div>
          </div>
        </motion.div>

        {/* Bottom-left: Mandax */}
        <motion.div
          initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}
          className="absolute bottom-2 left-2 flex flex-col items-center"
        >
          <div className="text-4xl mb-1 drop-shadow-lg">🐿️</div>
          <div className="px-2 py-1 rounded-xl text-white text-xs font-extrabold shadow-lg" style={{ background: '#A0522D', textShadow: '1px 1px 2px #00000040' }}>
            <div>Mandax</div>
            <div className="text-xs opacity-90">Equipo Ardilla</div>
          </div>
        </motion.div>

        {/* Bottom-right: Chatfrutix */}
        <motion.div
          initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}
          className="absolute bottom-2 right-2 flex flex-col items-center"
        >
          <div className="text-4xl mb-1 drop-shadow-lg">🐻</div>
          <div className="px-2 py-1 rounded-xl text-white text-xs font-extrabold shadow-lg" style={{ background: '#4CAF50', textShadow: '1px 1px 2px #00000040' }}>
            <div>Chatfrutix</div>
            <div className="text-xs opacity-90">Equipo Oso</div>
          </div>
        </motion.div>

        {/* Center: Limonix + input */}
        <div className="flex flex-col items-center gap-3 z-10">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-8xl drop-shadow-2xl"
          >
            🍋
          </motion.div>

          <AnimatePresence mode="wait">
            {!showInput ? (
              <motion.button
                key="jugar"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowInput(true)}
                className="px-12 py-4 text-2xl font-extrabold text-white rounded-full shadow-2xl cursor-pointer"
                style={{
                  background: 'linear-gradient(180deg, #FFE033 0%, #FFA500 100%)',
                  border: '3px solid #B8860B',
                  textShadow: '1px 1px 3px #00000050',
                  boxShadow: '0 6px 0 #B8860B, 0 8px 20px #00000040',
                }}
              >
                ¡JUGAR!
              </motion.button>
            ) : (
              <motion.form
                key="form"
                initial={{ scale: 0.8, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-3 w-64"
              >
                <div className="bg-white/90 rounded-2xl px-4 py-2 w-full shadow-lg">
                  <p className="text-center text-sm font-bold text-gray-600 mb-1">¿Cómo te llamas? 🌟</p>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full text-center text-lg font-bold text-gray-800 bg-transparent focus:outline-none"
                    placeholder="Tu nombre..."
                    maxLength={20}
                    minLength={2}
                    required
                    autoFocus
                  />
                </div>
                {error && (
                  <p className="text-red-600 font-bold text-sm text-center bg-white/80 rounded-xl px-3 py-1">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading || username.trim().length < 2}
                  className="px-10 py-3 text-xl font-extrabold text-white rounded-full shadow-xl cursor-pointer w-full"
                  style={{
                    background: loading ? '#ccc' : 'linear-gradient(180deg, #FFE033 0%, #FFA500 100%)',
                    border: '3px solid #B8860B',
                    textShadow: '1px 1px 3px #00000050',
                    boxShadow: '0 4px 0 #B8860B, 0 6px 15px #00000040',
                  }}
                >
                  {loading ? '¡Entrando...' : '¡Aventura! 🚀'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="relative z-10 pb-2">
        <div className="flex justify-center gap-1 px-2">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="flex flex-col items-center px-2 py-2 rounded-2xl bg-white/20 backdrop-blur-sm flex-1 max-w-[64px]">
              <span className="text-xl">{item.icon}</span>
              <span className="text-white text-xs font-bold" style={{ textShadow: '1px 1px 2px #00000060' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
