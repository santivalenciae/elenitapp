import { motion } from 'framer-motion'

const COLORS = ['#4ECDC4', '#FF6B9D', '#FFB347', '#95E86A']

export function AnswerGrid({ options, onAnswer, selectedIndex, correctIndex, disabled }) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {options.map((option, i) => {
        let extraStyle = ''
        if (selectedIndex !== null && selectedIndex !== undefined) {
          if (i === correctIndex) extraStyle = 'border-green-500 bg-green-50'
          else if (i === selectedIndex && i !== correctIndex) extraStyle = 'border-red-400 bg-red-50'
          else extraStyle = 'opacity-50'
        }

        return (
          <motion.button
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            disabled={disabled}
            onClick={() => onAnswer(i)}
            className={`btn-answer border-2 border-gray-200 text-gray-800 flex items-center gap-4 px-5 text-left ${extraStyle}`}
            style={selectedIndex === null || selectedIndex === undefined ? { borderColor: COLORS[i] + '80', backgroundColor: COLORS[i] + '15' } : {}}
          >
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ backgroundColor: COLORS[i] }}
            >
              {String.fromCharCode(65 + i)}
            </span>
            <span className="font-bold">{option}</span>
            {selectedIndex !== null && selectedIndex !== undefined && i === correctIndex && (
              <span className="ml-auto text-green-500 text-xl">✓</span>
            )}
            {selectedIndex === i && i !== correctIndex && (
              <span className="ml-auto text-red-400 text-xl">✗</span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
