import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/useAuthStore'
import { useProgressStore } from '../store/useProgressStore'
import { TEAMS } from '../config/teams'
import { ActivityFeed } from '../components/multiplayer/ActivityFeed'

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

export default function World() {
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
      style={{ background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0FF 22%, #A8D878 60%, #5A9E58 100%)' }}
    >
      {/* ========== SCENIC BACKGROUND ========== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Clouds */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-70"
            style={{
              width: `${70 + i * 35}px`,
              height: `${25 + i * 8}px`,
              top: `${3 + i * 5}%`,
              left: `${i * 22 + 5}%`,
              filter: 'blur(2px)',
            }}
            animate={{ x: [0, 18, 0] }}
            transition={{ duration: 9 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Sparkles */}
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300 pointer-events-none"
            style={{ top: `${6 + i * 6}%`, left: `${8 + i * 13}%`, fontSize: '13px' }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.5 }}
          >✨</motion.div>
        ))}

        {/* Mountains — far background */}
        <div
          className="absolute flex justify-center items-end gap-0"
          style={{ bottom: '34%', left: 0, right: 0, opacity: 0.3 }}
        >
          {['⛰️','🏔️','⛰️','🏔️','⛰️'].map((m, i) => (
            <span key={i} style={{ fontSize: i % 2 === 1 ? '5.5rem' : '4rem', lineHeight: 1 }}>{m}</span>
          ))}
        </div>

        {/* Castle — large, center, gently floating */}
        <motion.span
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: '22%',
            fontSize: '8rem',
            lineHeight: 1,
            opacity: 0.92,
            filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.35))',
          }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >🏰</motion.span>

        {/* Back forest — small trees behind castle */}
        <div
          className="absolute flex justify-between items-end"
          style={{ bottom: '26%', left: '4%', right: '4%', opacity: 0.6 }}
        >
          {['🌲','🌳','🌲','🌲','🌳','🌲','🌲'].map((t, i) => (
            <span key={i} style={{ fontSize: i % 3 === 1 ? '4.5rem' : '3.5rem', lineHeight: 1 }}>{t}</span>
          ))}
        </div>

        {/* Mid forest — taller, closer */}
        <div
          className="absolute flex justify-around items-end"
          style={{ bottom: '18%', left: 0, right: 0, opacity: 0.78 }}
        >
          {['🌳','🌲','🌲','🌳','🌲','🌲','🌳'].map((t, i) => (
            <span key={i} style={{ fontSize: i % 3 === 0 ? '6rem' : '5rem', lineHeight: 1 }}>{t}</span>
          ))}
        </div>

        {/* Foreground trees LEFT — very large */}
        <span style={{ position: 'absolute', bottom: '11%', left: '-0.75rem', fontSize: '9rem', lineHeight: 1, opacity: 0.97, filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}>🌳</span>
        <span style={{ position: 'absolute', bottom: '13%', left: '5.5rem',   fontSize: '7rem', lineHeight: 1, opacity: 0.88 }}>🌲</span>
        <span style={{ position: 'absolute', bottom: '12%', left: '10.5rem',  fontSize: '5.5rem', lineHeight: 1, opacity: 0.78 }}>🌲</span>

        {/* Foreground trees RIGHT — very large */}
        <span style={{ position: 'absolute', bottom: '11%', right: '-0.75rem', fontSize: '9rem', lineHeight: 1, opacity: 0.97, filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}>🌳</span>
        <span style={{ position: 'absolute', bottom: '13%', right: '5.5rem',   fontSize: '7rem', lineHeight: 1, opacity: 0.88 }}>🌲</span>
        <span style={{ position: 'absolute', bottom: '12%', right: '10.5rem',  fontSize: '5.5rem', lineHeight: 1, opacity: 0.78 }}>🌲</span>

        {/* Ground details */}
        <span style={{ position: 'absolute', bottom: '11%', left: '31%',  fontSize: '2rem',   opacity: 0.65 }}>🪨</span>
        <span style={{ position: 'absolute', bottom: '11%', right: '32%', fontSize: '1.5rem', opacity: 0.55 }}>🪨</span>
        <span style={{ position: 'absolute', bottom: '11%', left: '40%',  fontSize: '1.5rem', opacity: 0.85 }}>🌸</span>
        <span style={{ position: 'absolute', bottom: '11%', right: '41%', fontSize: '1.5rem', opacity: 0.85 }}>🌺</span>
        <span style={{ position: 'absolute', bottom: '10%', left: '48%',  fontSize: '1.4rem', opacity: 0.7  }}>🍄</span>
      </div>

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

          {/* Right: missions + activity */}
          <div className="md:w-52">
            <h2 className="font-extrabold text-white text-lg drop-shadow mb-3" style={{ textShadow: '1px 1px 3px #00000060' }}>
              📜 Misiones
            </h2>
            <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-4 shadow-lg flex flex-col gap-2">
              {MISSIONS.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-2 py-2 border-b border-gray-100 last:border-0"
                >
                  <span className="text-xl">{m.icon}</span>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-700 leading-tight">{m.label}</p>
                    <p className="text-xs text-orange-500 font-bold">{m.reward}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 ${m.done ? 'bg-green-400 border-green-500' : 'border-gray-300'}`} />
                </motion.div>
              ))}
              <Link to="/learn">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-2 py-3 rounded-2xl text-white font-extrabold text-lg shadow-lg"
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
            </div>

            <div className="mt-4">
              <ActivityFeed />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
