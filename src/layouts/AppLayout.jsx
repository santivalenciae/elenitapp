import { Outlet } from 'react-router-dom'
import { TopHUD } from '../components/hud/TopHUD'
import { BottomNav } from '../components/hud/BottomNav'
import { Sidebar } from '../components/hud/Sidebar'
import { useAuthStore } from '../store/useAuthStore'
import { TEAMS } from '../config/teams'

export function AppLayout() {
  const profile = useAuthStore((s) => s.profile)
  const teamId = profile?.team_id

  return (
    <div data-team={teamId ?? undefined} className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <TopHUD />
        <main className="flex-1 pb-20 md:pb-0 overflow-y-auto">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
