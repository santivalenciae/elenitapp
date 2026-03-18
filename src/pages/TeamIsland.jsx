import { useAuthStore } from '../store/useAuthStore'
import { TEAMS } from '../config/teams'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const TEAM_HOUSES = {
  cat: {
    house: '🏠',
    houseColor: '#9B59B6',
    houseBg: 'linear-gradient(135deg, #CE93D8 0%, #9B59B6 100%)',
    ground: '#C8A8E9',
    missions: [
      '¡Completa 5 lecciones esta semana!',
      '¡Saca 3 estrellas en Lectura!',
      '¡Ayuda a tus amigos explorando!',
    ],
  },
  dog: {
    house: '🏡',
    houseColor: '#E6A800',
    houseBg: 'linear-gradient(135deg, #FFE082 0%, #E6A800 100%)',
    ground: '#FFF176',
    missions: [
      '¡Completa 5 lecciones esta semana!',
      '¡Saca 3 estrellas en Matemáticas!',
      '¡Sé el más rápido en Pista Veloz!',
    ],
  },
  squirrel: {
    house: '🏚️',
    houseColor: '#795548',
    houseBg: 'linear-gradient(135deg, #BCAAA4 0%, #795548 100%)',
    ground: '#D7CCC8',
    missions: [
      '¡Resuelve 10 puzzles esta semana!',
      '¡Saca 3 estrellas en Ciencia!',
      '¡Recolecta 5 mascotas!',
    ],
  },
  bear: {
    house: '🏘️',
    houseColor: '#2E7D32',
    houseBg: 'linear-gradient(135deg, #A5D6A7 0%, #2E7D32 100%)',
    ground: '#C8E6C9',
    missions: [
      '¡Cuida a 3 mascotas esta semana!',
      '¡Completa todas las materias!',
      '¡Descubre una mascota legendaria!',
    ],
  },
}

export default function TeamIsland() {
  const profile = useAuthStore((s) => s.profile)
  const team = profile?.team_id ? TEAMS[profile.team_id] : null

  if (!team) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 text-center shadow-lg">
          <div className="text-5xl mb-3">🏝️</div>
          <p className="text-gray-600 font-bold mb-4">No tienes equipo todavía.</p>
          <Link to="/onboarding">
            <button className="px-6 py-3 bg-orange-500 text-white font-extrabold rounded-full shadow-lg">
              Elegir equipo
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const house = TEAM_HOUSES[team.id]
  const teamName = team.id === 'cat' ? 'Gato' : team.id === 'dog' ? 'Perro' : team.id === 'squirrel' ? 'Ardilla' : 'Oso'

  return (
    <div
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0FF 30%, #7BC67A 65%, #5A9E58 100%)' }}
      data-team={team.id}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-70"
            style={{
              width: `${60 + i * 30}px`,
              height: `${22 + i * 7}px`,
              top: `${4 + i * 7}%`,
              left: `${15 + i * 25}%`,
              filter: 'blur(2px)',
            }}
            animate={{ x: [0, 12, 0] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        {/* Ground trees */}
        <div className="absolute bottom-14 left-2 text-5xl opacity-90">🌳</div>
        <div className="absolute bottom-14 left-16 text-4xl opacity-70">🌲</div>
        <div className="absolute bottom-14 right-2 text-5xl opacity-90">🌳</div>
        <div className="absolute bottom-14 right-16 text-4xl opacity-70">🌲</div>
        <div className="absolute bottom-10 left-1/4 text-2xl opacity-60">🪨</div>
        <div className="absolute bottom-10 right-1/3 text-xl opacity-50">🌺</div>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300 pointer-events-none"
            style={{ top: `${6 + i * 10}%`, left: `${5 + i * 18}%`, fontSize: '14px' }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.6 }}
          >✨</motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 pt-6 pb-6 gap-4">

        {/* Team header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 12 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl px-5 py-3 shadow-lg text-center w-full max-w-sm"
        >
          <h1 className="text-3xl font-extrabold" style={{ color: team.color }}>
            {team.emoji} Equipo {teamName}
          </h1>
          <p className="text-gray-500 text-sm font-bold mt-1">{team.description}</p>
        </motion.div>

        {/* Team house + leader */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: 'spring', damping: 12 }}
          className="w-full max-w-sm"
        >
          <div
            className="rounded-3xl p-6 text-center shadow-xl"
            style={{
              background: house.houseBg,
              boxShadow: `0 8px 0 ${team.color}60, 0 12px 30px ${team.color}30`,
            }}
          >
            {/* House scene */}
            <div className="flex justify-center items-end gap-3 mb-4">
              <div className="text-5xl">🌺</div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="text-7xl drop-shadow-2xl"
              >
                {house.house}
              </motion.div>
              <div className="text-5xl">🌸</div>
            </div>

            {/* Leader */}
            <div className="bg-white/80 rounded-2xl px-4 py-3 shadow-md">
              <div className="flex items-center justify-center gap-3 mb-1">
                <span className="text-3xl">👑</span>
                <div className="text-3xl">{team.emoji}</div>
              </div>
              <p className="font-extrabold text-gray-800 text-lg">{team.leader}</p>
              <p className="text-gray-500 text-xs font-bold">Líder del Equipo {teamName}</p>
            </div>
          </div>
        </motion.div>

        {/* Missions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-sm bg-white/90 backdrop-blur-sm rounded-3xl p-5 shadow-lg"
        >
          <h3 className="text-lg font-extrabold text-gray-700 mb-3 flex items-center gap-2">
            <span>📜</span> Misiones del Equipo
          </h3>
          {house.missions.map((mission, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-extrabold flex-shrink-0"
                style={{ background: house.houseBg }}
              >
                {i + 1}
              </div>
              <span className="text-gray-600 font-bold text-sm flex-1">{mission}</span>
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0" />
            </motion.div>
          ))}
        </motion.div>

        {/* Limonix world section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-sm rounded-3xl p-4 shadow-lg text-center"
          style={{
            background: 'linear-gradient(135deg, #FFF9C4 0%, #FFE082 100%)',
            border: '3px solid #FFD700',
            boxShadow: '0 5px 0 #B8860B60, 0 8px 20px #FFD70040',
          }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-5xl mb-2"
          >🍋</motion.div>
          <p className="font-extrabold text-gray-700">Limonix — Líder del Mundo</p>
          <p className="text-gray-500 text-xs mt-1">¡Todos los equipos llenan el árbol de Limonaria!</p>
        </motion.div>

        {/* Back to world */}
        <Link to="/world" className="w-full max-w-sm">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 rounded-2xl text-white font-extrabold text-lg shadow-lg"
            style={{
              background: 'linear-gradient(180deg, #FFE033 0%, #FFA500 100%)',
              border: '3px solid #B8860B',
              boxShadow: '0 4px 0 #B8860B, 0 6px 15px #FFD70040',
              textShadow: '1px 1px 2px #00000040',
            }}
          >
            🗺️ Volver al Mundo
          </motion.button>
        </Link>
      </div>
    </div>
  )
}
