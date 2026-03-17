import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SUBJECTS } from '../config/subjects'
import { Card } from '../components/ui/Card'

export default function Learn() {
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-1">¿Qué quieres aprender? 📚</h1>
      <p className="text-gray-500 mb-6">Elige una materia para empezar</p>

      <div className="grid grid-cols-1 gap-4">
        {Object.values(SUBJECTS).map((subject, i) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={`/learn/${subject.id}`}>
              <Card className="flex items-center gap-4 hover:shadow-xl transition-all">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
                  style={{ backgroundColor: subject.color + '25' }}
                >
                  {subject.emoji}
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-gray-800">{subject.label}</h2>
                  <p className="text-gray-500 text-sm">{subject.description}</p>
                </div>
                <span className="ml-auto text-gray-300 text-2xl">›</span>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
