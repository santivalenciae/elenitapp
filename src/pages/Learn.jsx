import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SUBJECTS } from '../config/subjects'
import { SceneBackground, SCENE_GRADIENT } from '../components/ui/SceneBackground'

export default function Learn() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: SCENE_GRADIENT }}
    >
      <SceneBackground />

      <div className="relative z-10 px-4 pt-6 pb-24 max-w-lg mx-auto">
        <motion.div
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 14 }}
          className="bg-white/85 backdrop-blur-sm rounded-3xl px-5 py-4 shadow-lg mb-5 flex items-center gap-3"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-4xl"
          >🍋</motion.div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">¿Qué quieres aprender?</h1>
            <p className="text-gray-500 text-sm font-bold">Elige una materia para empezar 🚀</p>
          </div>
        </motion.div>

        <div className="flex flex-col gap-3">
          {Object.values(SUBJECTS).map((subject, i) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link to={`/learn/${subject.id}`}>
                <div
                  className="flex items-center gap-4 rounded-3xl px-5 py-4 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, white, ${subject.color}15)`,
                    border: `3px solid ${subject.color}40`,
                    boxShadow: `0 5px 0 ${subject.color}40, 0 8px 20px ${subject.color}20`,
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 shadow-md"
                    style={{ background: `linear-gradient(135deg, ${subject.color}30, ${subject.color}60)` }}
                  >
                    {subject.emoji}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-extrabold text-gray-800">{subject.label}</h2>
                    <p className="text-gray-500 text-sm">{subject.description}</p>
                  </div>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-extrabold text-lg flex-shrink-0 shadow"
                    style={{ background: subject.color }}
                  >›</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
