import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '../store/useAuthStore'
import { useProgressStore } from '../store/useProgressStore'
import { TeamReveal } from '../components/onboarding/TeamReveal'

const PERSONALITY_OPTIONS = [
  {
    team: 'cat',
    icon: '🔍',
    icon2: '📖',
    text: 'Me gusta explorar y aprender cosas nuevas.',
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    shadow: '#4C1D95',
  },
  {
    team: 'squirrel',
    icon: '💡',
    icon2: '🧩',
    text: 'Me encanta resolver puzzles difíciles.',
    color: '#D97706',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    shadow: '#92400E',
  },
  {
    team: 'dog',
    icon: '⚡',
    icon2: '🏃',
    text: 'Prefiero los retos y la acción rápida.',
    color: '#DC2626',
    gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    shadow: '#7F1D1D',
  },
  {
    team: 'bear',
    icon: '🐾',
    icon2: '❤️',
    text: 'Disfruto cuidar a mis amigos y mascotas.',
    color: '#059669',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    shadow: '#064E3B',
  },
]

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
    <div
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{ background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0FF 35%, #7BC67A 70%, #5A9E58 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-16 left-4 text-5xl opacity-80">🌳</div>
        <div className="absolute bottom-16 left-20 text-4xl opacity-60">🌲</div>
        <div className="absolute bottom-16 right-4 text-5xl opacity-80">🌳</div>
        <div className="absolute bottom-16 right-20 text-4xl opacity-60">🌲</div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-5xl opacity-40">🏰</div>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300 pointer-events-none"
            style={{ top: `${5 + i * 12}%`, left: `${i % 2 === 0 ? 5 + i * 8 : 60 + i * 5}%`, fontSize: '16px' }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5] }}
            transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          >✨</motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 'question' ? (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center px-4 pt-8 pb-24 flex-1"
          >
            {/* Limonix + speech bubble */}
            <div className="flex items-start gap-3 mb-6 max-w-sm w-full">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl flex-shrink-0"
              >
                🍋
              </motion.div>
              <div className="relative bg-white rounded-3xl rounded-tl-none px-4 py-3 shadow-lg flex-1">
                <p className="font-extrabold text-gray-800 text-base leading-snug">
                  ¡Hola <span className="text-orange-500">{profile?.username}</span>! Soy Limonix ✨
                </p>
                <p className="font-bold text-gray-600 text-sm mt-1">¿Qué tipo de aventurero eres?</p>
                {/* bubble tail */}
                <div className="absolute -left-3 top-3 w-0 h-0" style={{
                  borderTop: '12px solid transparent',
                  borderBottom: '0px solid transparent',
                  borderRight: '14px solid white',
                }} />
              </div>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-3 w-full max-w-sm">
              {PERSONALITY_OPTIONS.map((opt, i) => (
                <motion.button
                  key={opt.team}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.12 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(opt.team)}
                  className="flex items-center gap-4 px-5 py-4 rounded-full text-white font-extrabold text-base shadow-lg cursor-pointer"
                  style={{
                    background: opt.gradient,
                    boxShadow: `0 5px 0 ${opt.shadow}, 0 8px 20px ${opt.color}40`,
                    border: `2px solid ${opt.color}80`,
                    minHeight: '72px',
                  }}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <span className="text-2xl">{opt.icon2}</span>
                  <span className="text-sm leading-tight flex-1 text-left">{opt.text}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex-1 flex items-center justify-center p-4"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 max-w-sm w-full">
              <TeamReveal teamId={teamId} onContinue={handleContinue} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
