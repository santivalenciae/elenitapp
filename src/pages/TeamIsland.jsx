import { useAuthStore } from '../store/useAuthStore'
import { TEAMS } from '../config/teams'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export default function TeamIsland() {
  const profile = useAuthStore((s) => s.profile)
  const team = profile?.team_id ? TEAMS[profile.team_id] : null

  if (!team) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500 font-bold">No tienes equipo todavía.</p>
        <Link to="/onboarding">
          <Button className="mt-4 bg-orange-500 text-white">Elegir equipo</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="p-4 max-w-lg mx-auto text-center" data-team={team.id}>
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 10 }}
        className="text-9xl mb-4"
      >
        {team.emoji}
      </motion.div>

      <h1
        className="text-4xl font-extrabold mb-2"
        style={{ color: team.color }}
      >
        Isla {team.id === 'cat' ? 'Gato' : team.id === 'dog' ? 'Perro' : team.id === 'squirrel' ? 'Ardilla' : 'Oso'}
      </h1>

      <div
        className="rounded-3xl p-6 mb-6 shadow-md"
        style={{ backgroundColor: team.colorLight + '30', border: `3px solid ${team.color}40` }}
      >
        <div className="text-5xl mb-3">👑</div>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-1">Líder: {team.leader}</h2>
        <p className="text-gray-600">{team.description}</p>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-md text-left">
        <h3 className="text-lg font-extrabold text-gray-700 mb-3">🌟 Misiones del equipo</h3>
        {[
          '¡Completa 5 lecciones esta semana!',
          '¡Obtén 3 estrellas en Matemáticas!',
          '¡Descubre una mascota épica o legendaria!',
        ].map((mission, i) => (
          <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
            <span className="text-2xl">📋</span>
            <span className="text-gray-600 font-bold">{mission}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-5">
        <div className="text-4xl mb-2">🍋</div>
        <p className="font-extrabold text-gray-700">Limonix — Líder del Mundo</p>
        <p className="text-gray-500 text-sm mt-1">¡Todos los equipos trabajan juntos para llenar el árbol de Limonaria!</p>
      </div>
    </div>
  )
}
