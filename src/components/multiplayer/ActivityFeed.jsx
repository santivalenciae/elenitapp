import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useActivityFeed } from '../../hooks/useActivityFeed'
import { toggleReaction } from '../../lib/activity'
import { useAuthStore } from '../../store/useAuthStore'
import { SUBJECTS } from '../../config/subjects'

const TEAM_COLORS = {
  cat: '#FF6B35',
  dog: '#E6A800',
  squirrel: '#795548',
  bear: '#2E7D32',
}

const TEAM_EMOJIS = {
  cat: '🐱',
  dog: '🐶',
  squirrel: '🐿️',
  bear: '🐻',
}

const REACTION_EMOJIS = ['🌞', '😑', '👏', '😀', '🥳', '😸', '🐶']

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000
  if (diff < 60) return 'ahora'
  if (diff < 3600) return `${Math.floor(diff / 60)}m`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`
  return `${Math.floor(diff / 86400)}d`
}

function ReactionBar({ event, profile }) {
  const [floating, setFloating] = useState(null)
  const [pending, setPending] = useState(false)

  // Group reactions by emoji
  const grouped = {}
  for (const r of event.reactions ?? []) {
    if (!grouped[r.emoji]) grouped[r.emoji] = { count: 0, mine: false }
    grouped[r.emoji].count++
    if (r.reactor_user_id === profile?.id) grouped[r.emoji].mine = true
  }

  async function handleReact(emoji) {
    if (!profile || pending) return
    setPending(true)
    setFloating(emoji)
    setTimeout(() => setFloating(null), 700)
    await toggleReaction({
      eventId: event.id,
      userId: profile.id,
      username: profile.username,
      emoji,
    })
    setPending(false)
  }

  return (
    <div className="mt-2 flex flex-wrap gap-1 items-center relative">
      {/* Reaction buttons */}
      {REACTION_EMOJIS.map((emoji) => {
        const info = grouped[emoji]
        return (
          <motion.button
            key={emoji}
            whileTap={{ scale: 0.85 }}
            onClick={() => handleReact(emoji)}
            className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-bold transition-all"
            style={{
              background: info?.mine ? '#FFE033' : 'rgba(255,255,255,0.6)',
              border: info?.mine ? '2px solid #B8860B' : '2px solid rgba(200,200,200,0.5)',
              boxShadow: info?.mine ? '0 2px 0 #B8860B60' : 'none',
              cursor: profile ? 'pointer' : 'default',
            }}
          >
            <span>{emoji}</span>
            {info && <span className="text-gray-600 ml-0.5">{info.count}</span>}
          </motion.button>
        )
      })}

      {/* Floating emoji animation */}
      <AnimatePresence>
        {floating && (
          <motion.div
            key={floating}
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={{ y: -40, opacity: 0, scale: 1.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute left-2 bottom-4 text-2xl pointer-events-none"
            style={{ zIndex: 50 }}
          >
            {floating}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ActivityCard({ event, profile }) {
  const subject = SUBJECTS[event.subject]
  const teamColor = TEAM_COLORS[event.team_id] ?? '#888'
  const teamEmoji = TEAM_EMOJIS[event.team_id] ?? '🌟'
  const pct = Math.round((event.score / event.total) * 100)
  const star = pct === 100 ? '🌟' : pct >= 80 ? '⭐' : pct >= 50 ? '✨' : '💪'
  const isMe = event.user_id === profile?.id

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      layout
      className="bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-md"
      style={{ border: `2px solid ${teamColor}30` }}
    >
      <div className="flex items-center gap-2">
        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0 shadow"
          style={{ background: `${teamColor}25`, border: `2px solid ${teamColor}50` }}
        >
          {teamEmoji}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="font-extrabold text-gray-800 text-sm truncate" style={{ color: isMe ? teamColor : undefined }}>
              {isMe ? 'Tú' : event.username}
            </span>
            <span className="text-gray-400 text-xs">{timeAgo(event.created_at)}</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-gray-600">
            <span>{subject?.emoji ?? '📚'}</span>
            <span>{event.score}/{event.total}</span>
            <span>{star}</span>
            <span className="text-orange-500">+{event.xp_earned} XP</span>
          </div>
        </div>
      </div>

      <ReactionBar event={event} profile={profile} />
    </motion.div>
  )
}

export function ActivityFeed() {
  const { data: events, isLoading } = useActivityFeed()
  const profile = useAuthStore((s) => s.profile)

  return (
    <div>
      <h2 className="font-extrabold text-white text-lg drop-shadow mb-3" style={{ textShadow: '1px 1px 3px #00000060' }}>
        🌍 Actividad
      </h2>

      {isLoading && (
        <div className="bg-white/70 rounded-2xl p-4 text-center text-gray-500 font-bold text-sm">
          Cargando...
        </div>
      )}

      {!isLoading && (!events || events.length === 0) && (
        <div className="bg-white/70 rounded-2xl p-4 text-center">
          <div className="text-3xl mb-1">🌱</div>
          <p className="text-gray-500 font-bold text-sm">¡Sé el primero en jugar!</p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {(events ?? []).map((event) => (
            <ActivityCard key={event.id} event={event} profile={profile} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
