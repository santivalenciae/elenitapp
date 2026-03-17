const RARITY_STYLES = {
  common: 'bg-gray-100 text-gray-700',
  rare: 'bg-blue-100 text-blue-700',
  epic: 'bg-purple-100 text-purple-700',
  legendary: 'bg-amber-100 text-amber-700',
}

export function Badge({ children, rarity, className = '' }) {
  const style = rarity ? RARITY_STYLES[rarity] ?? '' : 'bg-gray-100 text-gray-700'
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${style} ${className}`}>
      {children}
    </span>
  )
}
