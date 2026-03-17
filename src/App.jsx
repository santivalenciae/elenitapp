import { useEffect, Component } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuthStore } from './store/useAuthStore'
import { useProgressStore } from './store/useProgressStore'

// Layouts
import { AppLayout } from './layouts/AppLayout'

// Pages
import Enter from './pages/Enter'
import Onboarding from './pages/Onboarding'
import World from './pages/World'
import Learn from './pages/Learn'
import MathLesson from './pages/subjects/MathLesson'
import ReadingLesson from './pages/subjects/ReadingLesson'
import ScienceLesson from './pages/subjects/ScienceLesson'
import SpeedChallenge from './pages/subjects/SpeedChallenge'
import Profile from './pages/Profile'
import Pets from './pages/Pets'
import Shop from './pages/Shop'
import TeamIsland from './pages/TeamIsland'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 2 * 60 * 1000 } },
})

// Guards
function RequireProfile({ children }) {
  const profile = useAuthStore((s) => s.profile)
  if (!profile) return <Navigate to="/" replace />
  return children
}

function RequireTeam({ children }) {
  const profile = useAuthStore((s) => s.profile)
  if (!profile) return <Navigate to="/" replace />
  if (!profile.team_id) return <Navigate to="/onboarding" replace />
  return children
}

function RedirectIfLoggedIn({ children }) {
  const profile = useAuthStore((s) => s.profile)
  if (profile?.team_id) return <Navigate to="/world" replace />
  if (profile && !profile.team_id) return <Navigate to="/onboarding" replace />
  return children
}

function AppInit() {
  const profile = useAuthStore((s) => s.profile)
  const syncFromProfile = useProgressStore((s) => s.syncFromProfile)
  useEffect(() => {
    if (profile) syncFromProfile(profile)
  }, [profile, syncFromProfile])
  return null
}

class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 32, fontFamily: 'monospace', color: 'red' }}>
          <h2>Error:</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error.message}</pre>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppInit />
          <Routes>
            {/* Entrada libre */}
            <Route path="/" element={<RedirectIfLoggedIn><Enter /></RedirectIfLoggedIn>} />

            {/* Elige equipo */}
            <Route path="/onboarding" element={<RequireProfile><Onboarding /></RequireProfile>} />

            {/* App principal */}
            <Route element={<RequireTeam><AppLayout /></RequireTeam>}>
              <Route path="/world" element={<World />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/learn/math" element={<MathLesson />} />
              <Route path="/learn/reading" element={<ReadingLesson />} />
              <Route path="/learn/science" element={<ScienceLesson />} />
              <Route path="/learn/speed" element={<SpeedChallenge />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/pets" element={<Pets />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/team" element={<TeamIsland />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
