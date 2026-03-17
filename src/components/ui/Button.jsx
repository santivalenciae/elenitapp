import { motion } from 'framer-motion'

export function Button({ children, onClick, variant = 'primary', size = 'md', disabled, className = '', type = 'button' }) {
  const base = 'rounded-2xl font-bold cursor-pointer transition-all focus:outline-none focus:ring-4 focus:ring-offset-2'
  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-[40px]',
    md: 'px-6 py-3 text-base min-h-[56px]',
    lg: 'px-8 py-4 text-lg min-h-[64px]',
  }
  const variants = {
    primary: 'bg-[var(--team-color)] text-white hover:brightness-110 focus:ring-[var(--team-color)]',
    secondary: 'bg-white text-gray-800 border-2 border-gray-200 hover:bg-gray-50 focus:ring-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-200',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileTap={disabled ? {} : { scale: 0.97 }}
      whileHover={disabled ? {} : { y: -1 }}
    >
      {children}
    </motion.button>
  )
}
