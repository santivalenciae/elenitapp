import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '../store/useAuthStore'
import { useProgressStore } from '../store/useProgressStore'
import { PersonalityQuestion } from '../components/onboarding/PersonalityQuestion'
import { TeamReveal } from '../components/onboarding/TeamReveal'
import { Card } from '../components/ui/Card'

export default function Onboarding() {
  const navigate = useNavigate()
  const { setTeam, profile } = useAuthStore()
  const syncFromProfile = useProgressStore((s) => s.syncFromProfile)
  const [step, setStep] = useState('question')
  const [teamId, setTeamId] = useState(null)

  async function handleAnswer(team) {
    setTeamId(team)
    await setTeam(team)
    setStep('reveal')
  }

  function handleContinue() {
    syncFromProfile({ ...profile, team_id: teamId })
    navigate('/world')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🍋</div>
          <h1 className="text-3xl font-extrabold text-orange-500">¡Elige tu equipo!</h1>
          {profile?.username && (
            <p className="text-gray-500 mt-1">Hola <strong>{profile.username}</strong> 👋</p>
          )}
        </div>
        <Card>
          <AnimatePresence mode="wait">
            {step === 'question' && (
              <motion.div key="question" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <PersonalityQuestion onAnswer={handleAnswer} />
              </motion.div>
            )}
            {step === 'reveal' && (
              <motion.div key="reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <TeamReveal teamId={teamId} onContinue={handleContinue} />
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  )
}
