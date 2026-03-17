import { motion } from 'framer-motion'

export function QuestionCard({ question, questionNumber, total }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-md p-6 mb-4"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold text-gray-400">Pregunta {questionNumber} de {total}</span>
        <span className="text-sm font-bold text-[var(--team-color)]">+{question.xp_reward} XP</span>
      </div>
      <p className="text-xl font-bold text-gray-800 leading-relaxed">
        {question.question_text}
      </p>
    </motion.div>
  )
}
