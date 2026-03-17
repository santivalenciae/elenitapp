export function Coin({ amount, size = 'md' }) {
  const sizes = { sm: 'text-sm', md: 'text-base', lg: 'text-xl' }
  return (
    <span className={`inline-flex items-center gap-1 font-bold ${sizes[size]}`}>
      <span className="text-yellow-500">🍋</span>
      <span>{amount}</span>
    </span>
  )
}
