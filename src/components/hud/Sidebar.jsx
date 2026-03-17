import { NavLink } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

const NAV_ITEMS = [
  { to: '/world', label: 'Mundo', icon: '🗺️' },
  { to: '/learn', label: 'Aprender', icon: '📚' },
  { to: '/pets', label: 'Mascotas', icon: '🥚' },
  { to: '/shop', label: 'Tienda', icon: '🛒' },
  { to: '/team', label: 'Equipo', icon: '🏝️' },
  { to: '/profile', label: 'Perfil', icon: '👤' },
]

export function Sidebar() {
  const { signOut } = useAuthStore()
  return (
    <aside className="hidden md:flex flex-col w-56 bg-white shadow-md min-h-screen p-4 gap-2">
      <div className="text-2xl font-extrabold text-[var(--team-color)] mb-4 flex items-center gap-2">
        🍋 <span>Limonaria</span>
      </div>
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-bold transition-colors min-h-[56px] ${
              isActive
                ? 'bg-[var(--team-color)] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <span className="text-xl">{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
      <div className="flex-1" />
      <button
        onClick={signOut}
        className="flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-bold text-red-500 hover:bg-red-50 transition-colors min-h-[56px]"
      >
        🚪 Salir
      </button>
    </aside>
  )
}
