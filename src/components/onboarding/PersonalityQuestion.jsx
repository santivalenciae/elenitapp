import { motion } from 'framer-motion'

const QUESTIONS = [
  {
    text: '¿Qué harías en un día libre?',
    options: [
      { text: 'Explorar lugares nuevos', team: 'cat', emoji: '🗺️' },
      { text: 'Jugar con amigos todo el día', team: 'dog', emoji: '⚽' },
      { text: 'Recolectar cosas interesantes', team: 'squirrel', emoji: '🌰' },
      { text: 'Leer un buen libro tranquilo', team: 'bear', emoji: '📚' },
    ],
  },
]

export function PersonalityQuestion({ onAnswer }) {
  const question = QUESTIONS[0]
  return (
    <div className="text-center">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold text-gray-800 mb-6"
      >
        {question.text}
      </motion.p>
      <div className="grid grid-cols-1 gap-3">
        {question.options.map((opt, i) => (
          <motion.button
            key={opt.team}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onAnswer(opt.team)}
            className="btn-answer bg-white border-2 border-gray-200 hover:border-orange-400 hover:bg-orange-50 text-gray-800 flex items-center gap-4 px-6 w-full"
          >
            <span className="text-3xl">{opt.emoji}</span>
            <span className="font-bold text-lg">{opt.text}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
