import { motion } from 'framer-motion'
import { TEAMS } from '../../config/teams'
import { Button } from '../ui/Button'

export function TeamReveal({ teamId, onContinue }) {
  const team = TEAMS[teamId]
  if (!team) return null

  return (
    <div className="text-center" data-team={teamId}>
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
        className="text-8xl mb-4"
      >
        {team.emoji}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-gray-500 text-lg mb-2">¡Tu equipo es...</p>
        <h2 className="text-4xl font-extrabold mb-1" style={{ color: team.color }}>
          Equipo {team.id === 'cat' ? 'Gato' : team.id === 'dog' ? 'Perro' : team.id === 'squirrel' ? 'Ardilla' : 'Oso'}
        </h2>
        <p className="text-2xl font-bold text-gray-700 mb-2">Líder: {team.leader}</p>
        <p className="text-gray-500 mb-6">{team.description}</p>
        <Button
          size="lg"
          onClick={onContinue}
          className="w-full text-white"
          style={{ backgroundColor: team.color }}
        >
          ¡Ir a la aventura! 🚀
        </Button>
      </motion.div>
    </div>
  )
}
