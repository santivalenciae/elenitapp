import { motion } from 'framer-motion'
import { useActivityFeed } from '../../hooks/useActivityFeed'
import { useAuthStore } from '../../store/useAuthStore'

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

const RANK_MEDALS = ['🥇', '🥈', '🥉']

/** Agrupa los eventos por usuario y devuelve un array ordenado por XP total. */
function buildSummaries(events) {
  const map = {}
  for (const e of events) {
    if (!map[e.user_id]) {
      map[e.user_id] = {
        user_id: e.user_id,
        username: e.username,
        team_id: e.team_id,
        activities: 0,
        totalXP: 0,
      }
    }
    map[e.user_id].activities += 1
    map[e.user_id].totalXP += e.xp_earned ?? 0
  }
  return Object.values(map).sort((a, b) => b.totalXP - a.totalXP)
}

export function ActivityFeedList() {
  const { data: events, isLoading } = useActivityFeed()
  const profile = useAuthStore((s) => s.profile)

  if (isLoading) {
    return (
      <div className="py-6 text-center text-gray-400 font-bold text-sm">
        Cargando...
      </div>
    )
  }

  if (!events || events.length === 0) {
    return (
      <div className="py-6 text-center">
        <div className="text-3xl mb-1">🌱</div>
        <p className="text-gray-500 font-bold text-sm">¡Sé el primero en jugar!</p>
      </div>
    )
  }

  const summaries = buildSummaries(events)

  return (
    <div className="flex flex-col gap-2">
      {summaries.map((user, rank) => {
        const isMe = user.user_id === profile?.id
        const color = TEAM_COLORS[user.team_id] ?? '#888'
        const emoji = TEAM_EMOJIS[user.team_id] ?? '🌟'
        const medal = RANK_MEDALS[rank] ?? null

        return (
          <motion.div
            key={user.user_id}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: rank * 0.06 }}
            className="flex items-center gap-2 px-3 py-2 rounded-2xl"
            style={{
              background: isMe ? `${color}18` : 'rgba(255,255,255,0.55)',
              border: `2px solid ${isMe ? color + '60' : 'rgba(200,200,200,0.4)'}`,
            }}
          >
            {/* Rank */}
            <span className="text-base w-5 text-center flex-shrink-0">
              {medal ?? <span className="text-xs font-extrabold text-gray-400">#{rank + 1}</span>}
            </span>

            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0"
              style={{ background: `${color}25`, border: `2px solid ${color}50` }}
            >
              {emoji}
            </div>

            {/* Name */}
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-extrabold truncate leading-tight"
                style={{ color: isMe ? color : '#374151' }}
              >
                {isMe ? 'Tú' : user.username}
              </p>
              <p className="text-xs text-gray-400 font-bold">
                {user.activities} {user.activities === 1 ? 'actividad' : 'actividades'}
              </p>
            </div>

            {/* XP total */}
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-extrabold text-orange-500 leading-tight">{user.totalXP}</p>
              <p className="text-xs text-gray-400 font-bold">XP</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export function ActivityFeed() {
  return (
    <div>
      <h2 className="font-extrabold text-white text-lg drop-shadow mb-3" style={{ textShadow: '1px 1px 3px #00000060' }}>
        🌍 Actividad
      </h2>
      <ActivityFeedList />
    </div>
  )
}
