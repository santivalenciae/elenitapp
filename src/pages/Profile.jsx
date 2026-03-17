import { useAuthStore } from '../store/useAuthStore'
import { useProgressStore } from '../store/useProgressStore'
import { TEAMS } from '../config/teams'
import { ProgressBar } from '../components/ui/ProgressBar'
import { Coin } from '../components/ui/Coin'
import { Button } from '../components/ui/Button'
import { xpForLevel } from '../lib/xp'

export default function Profile() {
  const profile = useAuthStore((s) => s.profile)
  const { signOut } = useAuthStore()
  const { xp, level, fruitcoins } = useProgressStore()
  const team = profile?.team_id ? TEAMS[profile.team_id] : null
  const xpMax = xpForLevel(level)

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Mi Perfil 👤</h1>

      {/* Avatar & name */}
      <div className="bg-white rounded-3xl shadow-md p-6 mb-4 flex items-center gap-5">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-extrabold text-white shadow-lg"
          style={{ backgroundColor: team?.color ?? '#FFB347' }}
        >
          {profile?.username?.[0]?.toUpperCase() ?? '?'}
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-gray-800">{profile?.username}</h2>
          {team && (
            <div className="flex items-center gap-1 mt-1">
              <span>{team.emoji}</span>
              <span className="font-bold text-sm" style={{ color: team.color }}>
                Equipo {team.id === 'cat' ? 'Gato' : team.id === 'dog' ? 'Perro' : team.id === 'squirrel' ? 'Ardilla' : 'Oso'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-3xl shadow-md p-4 text-center">
          <div className="text-4xl font-extrabold text-[var(--team-color)]">{level}</div>
          <div className="text-gray-500 text-sm font-bold">Nivel</div>
        </div>
        <div className="bg-white rounded-3xl shadow-md p-4 text-center">
          <div className="flex items-center justify-center"><Coin amount={fruitcoins} size="lg" /></div>
          <div className="text-gray-500 text-sm font-bold mt-1">Fruitcoins</div>
        </div>
      </div>

      {/* XP bar */}
      <div className="bg-white rounded-3xl shadow-md p-4 mb-6">
        <div className="flex justify-between text-sm font-bold text-gray-500 mb-2">
          <span>Experiencia</span>
          <span>{xp} / {xpMax} XP</span>
        </div>
        <ProgressBar value={xp} max={xpMax} />
      </div>

      {team && (
        <div
          className="rounded-3xl p-5 mb-6 text-center shadow-md"
          style={{ backgroundColor: team.color + '20' }}
        >
          <div className="text-5xl mb-2">{team.emoji}</div>
          <p className="font-extrabold text-gray-700">Líder: {team.leader}</p>
          <p className="text-gray-500 text-sm mt-1">{team.description}</p>
        </div>
      )}

      <Button onClick={signOut} variant="danger" size="lg" className="w-full">
        Cerrar sesión 🚪
      </Button>
    </div>
  )
}
