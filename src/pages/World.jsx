import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/useAuthStore'
import { useProgressStore } from '../store/useProgressStore'
import { TEAMS } from '../config/teams'
import { Card } from '../components/ui/Card'

const AREAS = [
  { to: '/learn/math', label: 'Monte Matemático', emoji: '🔢', color: '#4ECDC4' },
  { to: '/learn/reading', label: 'Bosque de Libros', emoji: '📖', color: '#FF6B9D' },
  { to: '/learn/science', label: 'Laboratorio Verde', emoji: '🔬', color: '#95E86A' },
  { to: '/learn/speed', label: 'Pista Veloz', emoji: '⚡', color: '#FFB347' },
]

export default function World() {
  const profile = useAuthStore((s) => s.profile)
  const { level, xp } = useProgressStore()
  const team = profile?.team_id ? TEAMS[profile.team_id] : null

  return (
    <div className="p-4 max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-extrabold text-gray-800">
          ¡Hola, {profile?.username ?? 'Aventurero'}! 👋
        </h1>
        {team && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl">{team.emoji}</span>
            <span className="font-bold" style={{ color: team.color }}>
              Equipo {team.id === 'cat' ? 'Gato' : team.id === 'dog' ? 'Perro' : team.id === 'squirrel' ? 'Ardilla' : 'Oso'}
            </span>
            <span className="text-gray-400 text-sm">· Nv.{level}</span>
          </div>
        )}
      </motion.div>

      {/* World map areas */}
      <h2 className="text-xl font-extrabold text-gray-700 mb-3">🗺️ Mapa del Mundo</h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {AREAS.map((area, i) => (
          <motion.div
            key={area.to}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={area.to}>
              <div
                className="rounded-3xl p-4 text-center cursor-pointer hover:scale-105 transition-transform shadow-md"
                style={{ backgroundColor: area.color + '20', border: `3px solid ${area.color}40` }}
              >
                <div className="text-4xl mb-2">{area.emoji}</div>
                <p className="font-extrabold text-sm text-gray-700 leading-tight">{area.label}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick links */}
      <h2 className="text-xl font-extrabold text-gray-700 mb-3">🏆 Explorar</h2>
      <div className="grid grid-cols-3 gap-3">
        {[
          { to: '/pets', label: 'Mascotas', emoji: '🥚' },
          { to: '/shop', label: 'Tienda', emoji: '🛒' },
          { to: '/team', label: 'Mi Equipo', emoji: '🏝️' },
        ].map((link) => (
          <Link key={link.to} to={link.to}>
            <Card className="text-center hover:shadow-xl transition-all">
              <div className="text-3xl mb-1">{link.emoji}</div>
              <p className="font-bold text-sm text-gray-700">{link.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Leader section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-5 text-center"
      >
        <div className="text-5xl mb-2">🍋</div>
        <p className="font-extrabold text-gray-700">Limonix te da la bienvenida</p>
        <p className="text-gray-500 text-sm mt-1">¡Sigue aprendiendo para desbloquear recompensas!</p>
      </motion.div>
    </div>
  )
}
