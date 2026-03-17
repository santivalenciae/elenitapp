import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl mb-2">🍋</div>
          <h1 className="text-4xl font-extrabold text-orange-500">Limonaria</h1>
          <p className="text-gray-500 mt-1">Aprende. Juega. Crece.</p>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
