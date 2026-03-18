import { motion } from 'framer-motion'

/**
 * Shared scenic background used in World, Learn and TeamIsland.
 * Must be placed inside a `relative overflow-hidden` container with the
 * scene gradient applied to it.
 */
export const SCENE_GRADIENT = 'linear-gradient(180deg, #87CEEB 0%, #B0E0FF 22%, #A8D878 60%, #5A9E58 100%)'

export function SceneBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">

      {/* Clouds */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white opacity-70"
          style={{
            width: `${70 + i * 35}px`,
            height: `${25 + i * 8}px`,
            top: `${3 + i * 5}%`,
            left: `${i * 22 + 5}%`,
            filter: 'blur(2px)',
          }}
          animate={{ x: [0, 18, 0] }}
          transition={{ duration: 9 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Sparkles */}
      {[...Array(7)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-300 pointer-events-none"
          style={{ top: `${6 + i * 6}%`, left: `${8 + i * 13}%`, fontSize: '13px' }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.5 }}
        >✨</motion.div>
      ))}

      {/* Mountains — far background */}
      <div
        className="absolute flex justify-center items-end gap-0"
        style={{ bottom: '34%', left: 0, right: 0, opacity: 0.3 }}
      >
        {['⛰️', '🏔️', '⛰️', '🏔️', '⛰️'].map((m, i) => (
          <span key={i} style={{ fontSize: i % 2 === 1 ? '5.5rem' : '4rem', lineHeight: 1 }}>{m}</span>
        ))}
      </div>

      {/* Castle — center, gently floating */}
      <motion.span
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: '22%',
          fontSize: '8rem',
          lineHeight: 1,
          opacity: 0.92,
          filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.35))',
        }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >🏰</motion.span>

      {/* Back forest */}
      <div
        className="absolute flex justify-between items-end"
        style={{ bottom: '26%', left: '4%', right: '4%', opacity: 0.6 }}
      >
        {['🌲', '🌳', '🌲', '🌲', '🌳', '🌲', '🌲'].map((t, i) => (
          <span key={i} style={{ fontSize: i % 3 === 1 ? '4.5rem' : '3.5rem', lineHeight: 1 }}>{t}</span>
        ))}
      </div>

      {/* Mid forest */}
      <div
        className="absolute flex justify-around items-end"
        style={{ bottom: '18%', left: 0, right: 0, opacity: 0.78 }}
      >
        {['🌳', '🌲', '🌲', '🌳', '🌲', '🌲', '🌳'].map((t, i) => (
          <span key={i} style={{ fontSize: i % 3 === 0 ? '6rem' : '5rem', lineHeight: 1 }}>{t}</span>
        ))}
      </div>

      {/* Foreground trees LEFT */}
      <span style={{ position: 'absolute', bottom: '11%', left: '-0.75rem', fontSize: '9rem', lineHeight: 1, opacity: 0.97, filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}>🌳</span>
      <span style={{ position: 'absolute', bottom: '13%', left: '5.5rem',   fontSize: '7rem',  lineHeight: 1, opacity: 0.88 }}>🌲</span>
      <span style={{ position: 'absolute', bottom: '12%', left: '10.5rem', fontSize: '5.5rem', lineHeight: 1, opacity: 0.78 }}>🌲</span>

      {/* Foreground trees RIGHT */}
      <span style={{ position: 'absolute', bottom: '11%', right: '-0.75rem', fontSize: '9rem', lineHeight: 1, opacity: 0.97, filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}>🌳</span>
      <span style={{ position: 'absolute', bottom: '13%', right: '5.5rem',   fontSize: '7rem',  lineHeight: 1, opacity: 0.88 }}>🌲</span>
      <span style={{ position: 'absolute', bottom: '12%', right: '10.5rem', fontSize: '5.5rem', lineHeight: 1, opacity: 0.78 }}>🌲</span>

      {/* Ground details */}
      <span style={{ position: 'absolute', bottom: '11%', left:  '31%', fontSize: '2rem',   opacity: 0.65 }}>🪨</span>
      <span style={{ position: 'absolute', bottom: '11%', right: '32%', fontSize: '1.5rem', opacity: 0.55 }}>🪨</span>
      <span style={{ position: 'absolute', bottom: '11%', left:  '40%', fontSize: '1.5rem', opacity: 0.85 }}>🌸</span>
      <span style={{ position: 'absolute', bottom: '11%', right: '41%', fontSize: '1.5rem', opacity: 0.85 }}>🌺</span>
      <span style={{ position: 'absolute', bottom: '10%', left:  '48%', fontSize: '1.4rem', opacity: 0.7  }}>🍄</span>
    </div>
  )
}
