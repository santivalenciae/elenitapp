import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/world', label: 'Mundo', icon: '🗺️' },
  { to: '/learn', label: 'Aprender', icon: '📚' },
  { to: '/pets', label: 'Mascotas', icon: '🥚' },
  { to: '/shop', label: 'Tienda', icon: '🛒' },
  { to: '/team', label: 'Equipo', icon: '🏝️' },
]

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 md:hidden">
      <div className="flex">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center py-2 min-h-[56px] text-xs font-bold transition-colors ${
                isActive ? 'text-[var(--team-color)]' : 'text-gray-400'
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
