import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '../store/useAuthStore'
import { useProgressStore } from '../store/useProgressStore'
import { TEAMS } from '../config/teams'
import { ActivityFeedList } from '../components/multiplayer/ActivityFeed'
import { SceneBackground, SCENE_GRADIENT } from '../components/ui/SceneBackground'

const AREAS = [
  { to: '/learn/math',    label: 'Monte Matemático', emoji: '🔢', color: '#4ECDC4', bg: '#4ECDC420', shadow: '#2EA89E' },
  { to: '/learn/reading', label: 'Bosque de Libros',  emoji: '📖', color: '#FF6B9D', bg: '#FF6B9D20', shadow: '#CC3370' },
  { to: '/learn/science', label: 'Lab Verde',          emoji: '🔬', color: '#7BC67A', bg: '#7BC67A20', shadow: '#4A9E58' },
  { to: '/learn/speed',   label: 'Pista Veloz',        emoji: '⚡', color: '#FFB347', bg: '#FFB34720', shadow: '#CC8020' },
]

const MISSIONS = [
  { icon: '📜', label: 'Completa 3 lecciones', reward: '+30 XP', done: false },
  { icon: '⭐', label: 'Saca 100% en una sesión', reward: '+50 XP', done: false },
  { icon: '🥚', label: 'Consigue una mascota rara', reward: '+1 huevito', done: false },
]

const TABS = [
  { key: 'missions', label: '📜 Misiones' },
  { key: 'activity', label: '🌍 Actividad' },
]

export default function World() {
  const [activeTab, setActiveTab] = useState('missions')
  const profile = useAuthStore((s) => s.profile)
  const { level, xp } = useProgressStore()
  const xpForNextLevel = level * 100
  const team = profile?.team_id ? TEAMS[profile.team_id] : null

  const teamEmoji = team?.emoji ?? '🌟'
  const teamColor = team?.color ?? '#FFD700'
  const teamName = team ? (
    team.id === 'cat' ? 'Gato' :
    team.id === 'dog' ? 'Perro' :
    team.id === 'squirrel' ? 'Ardilla' : 'Oso'
  ) : null

  return (
    <div
      className="relative min-h-screen overflow-x-hidden flex flex-col"
      style={{ background: SCENE_GRADIENT }}
    >
      <SceneBackground />

      {/* ========== UI CONTENT ========== */}
      <div className="relative z-10 flex flex-col min-h-screen pb-4">

        {/* Welcome banner */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 14 }}
          className="mx-4 mt-4 bg-white/85 backdrop-blur-sm rounded-3xl px-4 py-3 shadow-lg flex items-center gap-3"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-4xl"
          >🍋</motion.div>
          <div className="flex-1">
            <p className="font-extrabold text-gray-800 text-base leading-tight">
              ¡Hola, <span style={{ color: teamColor }}>{profile?.username ?? 'Aventurero'}</span>! 🌟
            </p>
            {team && (
              <p className="text-xs font-bold text-gray-500">
                {teamEmoji} Equipo {teamName} · Nivel {level}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs font-bold text-gray-500">{xp} / {xpForNextLevel} XP</span>
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${teamColor}, ${teamColor}CC)` }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.round((xp / xpForNextLevel) * 100))}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Map + missions */}
        <div className="flex-1 flex flex-col md:flex-row gap-3 px-4 mt-4">

          {/* Left: learning zones + quick links */}
          <div className="flex-1">
            <h2 className="font-extrabold text-white text-lg drop-shadow mb-3" style={{ textShadow: '1px 1px 3px #00000060' }}>
              🗺️ Zonas de Aprendizaje
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {AREAS.map((area, i) => (
                <motion.div
                  key={area.to}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to={area.to}>
                    <div
                      className="rounded-3xl p-4 text-center shadow-lg"
                      style={{
                        background: `linear-gradient(145deg, ${area.bg}, white)`,
                        border: `3px solid ${area.color}50`,
                        boxShadow: `0 5px 0 ${area.shadow}60, 0 8px 20px ${area.color}30`,
                      }}
                    >
                      <div className="text-4xl mb-2 drop-shadow">{area.emoji}</div>
                      <p className="font-extrabold text-sm text-gray-700 leading-tight">{area.label}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              {[
                { to: '/pets', label: 'Mascotas', emoji: '🥚' },
                { to: '/shop', label: 'Tienda',   emoji: '🛒' },
                { to: '/team', label: 'Mi Equipo', emoji: '🏡' },
              ].map((link) => (
                <Link key={link.to} to={link.to}>
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl py-3 text-center shadow-md"
                    style={{ border: '2px solid rgba(255,255,255,0.6)' }}
                  >
                    <div className="text-2xl mb-1">{link.emoji}</div>
                    <p className="font-bold text-xs text-gray-700">{link.label}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: unified panel */}
          <div className="md:w-56">
            {/* Panel card */}
            <div
              className="bg-white/88 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden"
              style={{ border: '2px solid rgba(255,255,255,0.6)' }}
            >
              {/* Tab bar */}
              <div className="flex gap-1 p-2 bg-white/40 border-b border-gray-100/60">
                {TABS.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setActiveTab(t.key)}
                    className="flex-1 py-2 rounded-2xl text-xs font-extrabold transition-all duration-200"
                    style={{
                      background: activeTab === t.key
                        ? `linear-gradient(135deg, ${teamColor}, ${teamColor}CC)`
                        : 'transparent',
                      color: activeTab === t.key ? 'white' : '#9CA3AF',
                      boxShadow: activeTab === t.key ? `0 3px 0 ${teamColor}60` : 'none',
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="overflow-y-auto" style={{ maxHeight: '420px' }}>
                <AnimatePresence mode="wait">
                  {activeTab === 'missions' && (
                    <motion.div
                      key="missions"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                      className="p-4 flex flex-col gap-2"
                    >
                      {MISSIONS.map((m, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 14 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0"
                        >
                          <span className="text-xl flex-shrink-0">{m.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-700 leading-tight">{m.label}</p>
                            <p className="text-xs text-orange-500 font-bold">{m.reward}</p>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                              m.done ? 'bg-green-400 border-green-500' : 'border-gray-300'
                            }`}
                          />
                        </motion.div>
                      ))}

                      <Link to="/learn" className="mt-2">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="w-full py-3 rounded-2xl text-white font-extrabold text-lg shadow-lg"
                          style={{
                            background: 'linear-gradient(180deg, #FFE033 0%, #FFA500 100%)',
                            border: '3px solid #B8860B',
                            boxShadow: '0 4px 0 #B8860B, 0 6px 15px #FFD70040',
                            textShadow: '1px 1px 2px #00000040',
                          }}
                        >
                          ¡IR! 🚀
                        </motion.button>
                      </Link>
                    </motion.div>
                  )}

                  {activeTab === 'activity' && (
                    <motion.div
                      key="activity"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                      className="p-3"
                    >
                      <ActivityFeedList />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
