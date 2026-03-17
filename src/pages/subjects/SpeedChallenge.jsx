import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../config/supabaseClient'
import { useAuthStore } from '../../store/useAuthStore'
import { useProgressStore } from '../../store/useProgressStore'
import { useQuestions } from '../../hooks/useQuestions'
import { QuestionCard } from '../../components/lessons/QuestionCard'
import { AnswerGrid } from '../../components/lessons/AnswerGrid'
import { SpeedTimer } from '../../components/lessons/SpeedTimer'
import { LevelUpModal } from '../../components/rewards/LevelUpModal'
import { Button } from '../../components/ui/Button'

export default function SpeedChallenge() {
  const navigate = useNavigate()
  const session = useAuthStore((s) => s.session)
  const profile = useAuthStore((s) => s.profile)
  const { addXP, level, pendingLevelUp, clearPendingLevelUp } = useProgressStore()

  const { data: questions, isLoading } = useQuestions('math', profile?.level ?? 1)

  const [started, setStarted] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [totalXP, setTotalXP] = useState(0)
  const [timerKey, setTimerKey] = useState(0)

  const currentQuestion = questions?.[currentIdx]

  function handleTimeUp() {
    if (selected !== null) return
    setSelected(-1) // -1 means timeout
    setTimeout(goNext, 1000)
  }

  function handleAnswer(idx) {
    if (selected !== null) return
    setSelected(idx)
    const isCorrect = idx === currentQuestion.correct_index
    if (isCorrect) {
      setScore((s) => s + 1)
      const xp = (currentQuestion.xp_reward ?? 10) * 2 // double XP for speed
      setTotalXP((t) => t + xp)
      addXP(xp)
    }
    setTimeout(goNext, 1000)
  }

  function goNext() {
    setSelected(null)
    if (currentIdx + 1 >= (questions?.length ?? 0)) {
      setDone(true)
    } else {
      setCurrentIdx((i) => i + 1)
      setTimerKey((k) => k + 1)
    }
  }

  if (isLoading) return <div className="p-4 text-center font-bold text-gray-500">Cargando...</div>

  if (!started) {
    return (
      <div className="p-4 max-w-lg mx-auto text-center">
        <div className="text-7xl mb-4">⚡</div>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Modo Velocidad</h1>
        <p className="text-gray-500 mb-2">Responde lo más rápido posible.</p>
        <p className="text-[var(--team-color)] font-bold mb-6">¡Doble XP en cada respuesta correcta!</p>
        <Button size="lg" onClick={() => setStarted(true)} className="w-full bg-orange-500 text-white">
          ¡Empezar! ⚡
        </Button>
      </div>
    )
  }

  if (done) {
    const total = questions?.length ?? 0
    return (
      <div className="p-4 max-w-lg mx-auto text-center">
        <div className="text-7xl mb-4">⚡</div>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">¡Tiempo!</h2>
        <p className="text-xl text-gray-600 mb-1">{score} / {total} correctas</p>
        <p className="text-[var(--team-color)] font-bold text-xl mb-6">+{totalXP} XP</p>
        <div className="flex gap-3">
          <Button onClick={() => navigate('/learn')} variant="secondary" size="lg" className="flex-1">Volver</Button>
          <Button onClick={() => { setCurrentIdx(0); setScore(0); setTotalXP(0); setDone(false); setStarted(false) }} size="lg" className="flex-1 bg-orange-500 text-white">
            Repetir
          </Button>
        </div>
        <LevelUpModal open={pendingLevelUp} level={level} onClose={clearPendingLevelUp} />
      </div>
    )
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate('/learn')} className="text-gray-400 hover:text-gray-600 text-2xl">‹</button>
        <span className="font-bold text-gray-600">⚡ Velocidad</span>
        <span className="ml-auto text-gray-400 text-sm">{currentIdx + 1}/{questions?.length}</span>
      </div>

      <SpeedTimer key={timerKey} duration={15} onTimeUp={handleTimeUp} running={!done && started && selected === null} />

      <AnimatePresence mode="wait">
        <motion.div key={currentIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <QuestionCard question={currentQuestion} questionNumber={currentIdx + 1} total={questions?.length} />
          <AnswerGrid
            options={currentQuestion.options}
            onAnswer={handleAnswer}
            selectedIndex={selected === -1 ? null : selected}
            correctIndex={selected !== null ? currentQuestion.correct_index : null}
            disabled={selected !== null}
          />
        </motion.div>
      </AnimatePresence>
      <LevelUpModal open={pendingLevelUp && !done} level={level} onClose={clearPendingLevelUp} />
    </div>
  )
}
