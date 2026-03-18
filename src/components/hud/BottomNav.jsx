import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const NAV_ITEMS = [
  { to: '/world',  label: 'Mundo',    icon: '🗺️' },
  { to: '/learn',  label: 'Aprender', icon: '📚' },
  { to: '/pets',   label: 'Mascotas', icon: '🐾' },
  { to: '/shop',   label: 'Tienda',   icon: '🛒' },
  { to: '/team',   label: 'Equipo',   icon: '🏡' },
]

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 md:hidden"
      style={{
        background: 'linear-gradient(180deg, #1A2744 0%, #111C35 100%)',
        borderTop: '3px solid #2E4080',
        boxShadow: '0 -4px 20px #00000060',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex items-center justify-around px-2 py-2 gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} className="flex-1 flex justify-center">
            {({ isActive }) => (
              <motion.div
                whileTap={{ scale: 0.88, y: 2 }}
                className="flex flex-col items-center justify-center gap-0.5"
                style={{
                  width: '100%',
                  minWidth: 52,
                  height: 64,
                  borderRadius: 16,
                  background: isActive
                    ? 'linear-gradient(180deg, #4A90D9 0%, #2563AB 100%)'
                    : 'linear-gradient(180deg, #2A3A6A 0%, #1E2D54 100%)',
                  border: isActive
                    ? '2px solid #60A5FA'
                    : '2px solid #374A80',
                  boxShadow: isActive
                    ? '0 4px 0 #1A4A8A, 0 6px 16px #1E3A8A60, inset 0 1px 0 #7BB8FF40'
                    : '0 4px 0 #0F1A3A, 0 6px 12px #00000040, inset 0 1px 0 #3D5490',
                }}
              >
                <span
                  style={{
                    fontSize: 28,
                    lineHeight: 1,
                    filter: isActive ? 'drop-shadow(0 0 6px #60A5FA)' : 'none',
                    transform: isActive ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.15s',
                    display: 'block',
                  }}
                >
                  {item.icon}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: '0.02em',
                    color: isActive ? '#93C5FD' : '#6B7FC4',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.label}
                </span>
              </motion.div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
