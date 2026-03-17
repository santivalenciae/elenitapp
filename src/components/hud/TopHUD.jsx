import { Link } from 'react-router-dom'
import { useProgressStore } from '../../store/useProgressStore'
import { useAuthStore } from '../../store/useAuthStore'
import { ProgressBar } from '../ui/ProgressBar'
import { Coin } from '../ui/Coin'
import { xpForLevel } from '../../lib/xp'

export function TopHUD() {
  const { xp, level, fruitcoins } = useProgressStore()
  const profile = useAuthStore((s) => s.profile)
  const xpMax = xpForLevel(level)

  return (
    <header className="bg-white shadow-sm px-4 py-2 flex items-center gap-3 sticky top-0 z-30">
      <Link to="/world" className="text-2xl font-extrabold text-[var(--team-color)]">🍋</Link>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-0.5">
          <span className="font-bold text-gray-700">Nv.{level}</span>
          <span>{xp}/{xpMax} XP</span>
        </div>
        <ProgressBar value={xp} max={xpMax} />
      </div>
      <Coin amount={fruitcoins} />
      <Link to="/profile" className="w-9 h-9 rounded-full bg-[var(--team-color)] flex items-center justify-center text-white font-bold text-sm">
        {profile?.username?.[0]?.toUpperCase() ?? '?'}
      </Link>
    </header>
  )
}
