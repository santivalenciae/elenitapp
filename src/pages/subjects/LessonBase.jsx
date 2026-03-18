import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../config/supabaseClient'
import { useAuthStore } from '../../store/useAuthStore'
import { useProgressStore } from '../../store/useProgressStore'
import { useQuestions } from '../../hooks/useQuestions'
import { useAllPets } from '../../hooks/usePets'
import { awardEgg } from '../../lib/eggs'
import { postActivity } from '../../lib/activity'
import { QuestionCard } from '../../components/lessons/QuestionCard'
import { AnswerGrid } from '../../components/lessons/AnswerGrid'
import { FeedbackOverlay } from '../../components/lessons/FeedbackOverlay'
import { LevelUpModal } from '../../components/rewards/LevelUpModal'
import { EggModal } from '../../components/rewards/EggModal'
import { Button } from '../../components/ui/Button'
import { SUBJECTS } from '../../config/subjects'

export function LessonBase({ subject }) {
  const navigate = useNavigate()
  const profile = useAuthStore((s) => s.profile)
  const { addXP, level, pendingLevelUp, clearPendingLevelUp } = useProgressStore()

  const { data: questions, isLoading } = useQuestions(subject, profile?.level ?? 1)
  const { data: allPets } = useAllPets()

  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [eggResult, setEggResult] = useState(null)
  const [showEgg, setShowEgg] = useState(false)
  const [totalXPEarned, setTotalXPEarned] = useState(0)

  const subjectConfig = SUBJECTS[subject]
  const currentQuestion = questions?.[currentIdx]

  async function handleAnswer(idx) {
    if (selected !== null) return
    setSelected(idx)
    const isCorrect = idx === currentQuestion.correct_index
    setCorrect(isCorrect)
    setShowFeedback(true)

    if (isCorrect) {
      setScore((s) => s + 1)
      const xpEarned = currentQuestion.xp_reward ?? 10
      setTotalXPEarned((t) => t + xpEarned)
      addXP(xpEarned)
    }

    setTimeout(async () => {
      setShowFeedback(false)
      setSelected(null)

      if (currentIdx + 1 >= (questions?.length ?? 0)) {
        // Session done — persist progress
        const finalScore = score + (isCorrect ? 1 : 0)
        const finalXP = totalXPEarned + (isCorrect ? currentQuestion.xp_reward ?? 10 : 0)
        await persistProgress(isCorrect, currentQuestion.xp_reward ?? 10)
        setDone(true)
        // Post to activity feed
        if (profile) {
          postActivity({
            userId: profile.id,
            username: profile.username,
            teamId: profile.team_id ?? 'cat',
            subject,
            score: finalScore,
            total: questions.length,
            xpEarned: finalXP,
          })
        }
        // Roll egg
        if (allPets && profile) {
          const result = await awardEgg(supabase, profile.id, allPets)
          if (result) { setEggResult(result); setShowEgg(true) }
        }
      } else {
        setCurrentIdx((i) => i + 1)
      }
    }, 1200)
  }

  async function persistProgress(lastCorrect, lastXp) {
    if (!profile) return
    await supabase.from('user_progress').upsert(
      {
        user_id: profile.id,
        subject,
        questions_answered: questions.length,
        questions_correct: score + (lastCorrect ? 1 : 0),
        total_xp_earned: totalXPEarned + (lastCorrect ? lastXp : 0),
      },
      { onConflict: 'user_id,subject' }
    )
    // Sync profile XP/level
    await supabase
      .from('profiles')
      .update({ xp: useProgressStore.getState().xp, level: useProgressStore.getState().level, fruitcoins: useProgressStore.getState().fruitcoins })
      .eq('id', profile.id)
  }

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="text-5xl animate-bounce mb-4">{subjectConfig?.emoji}</div>
        <p className="text-gray-500 font-bold">Cargando preguntas...</p>
      </div>
    )
  }

  if (!questions?.length) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500 font-bold">No hay preguntas disponibles aún.</p>
        <Button onClick={() => navigate('/learn')} className="mt-4 bg-orange-500 text-white">Volver</Button>
      </div>
    )
  }

  if (done) {
    const total = questions.length
    const pct = Math.round((score / total) * 100)
    return (
      <div className="p-4 max-w-lg mx-auto text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="text-7xl mb-4">
          {pct >= 80 ? '🌟' : pct >= 50 ? '⭐' : '💪'}
        </motion.div>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">¡Sesión completa!</h2>
        <p className="text-xl text-gray-600 mb-1">{score} / {total} correctas</p>
        <p className="text-[var(--team-color)] font-bold text-xl mb-6">+{totalXPEarned} XP</p>
        <div className="flex gap-3">
          <Button onClick={() => navigate('/learn')} variant="secondary" size="lg" className="flex-1">Volver</Button>
          <Button onClick={() => { setCurrentIdx(0); setScore(0); setTotalXPEarned(0); setDone(false) }} size="lg" className="flex-1 bg-orange-500 text-white">
            Repetir
          </Button>
        </div>

        <LevelUpModal open={pendingLevelUp} level={level} onClose={clearPendingLevelUp} />
        <EggModal open={showEgg} result={eggResult} onClose={() => setShowEgg(false)} />
      </div>
    )
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate('/learn')} className="text-gray-400 hover:text-gray-600 text-2xl">‹</button>
        <span className="font-bold text-gray-600">{subjectConfig?.label}</span>
        <span className="ml-auto text-gray-400 text-sm">{currentIdx + 1}/{questions.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentIdx + 1}
            total={questions.length}
          />
          <AnswerGrid
            options={currentQuestion.options}
            onAnswer={handleAnswer}
            selectedIndex={selected}
            correctIndex={currentQuestion.correct_index}
            disabled={selected !== null}
          />
        </motion.div>
      </AnimatePresence>

      <FeedbackOverlay show={showFeedback} correct={correct} />
      <LevelUpModal open={pendingLevelUp && !done} level={level} onClose={clearPendingLevelUp} />
    </div>
  )
}
