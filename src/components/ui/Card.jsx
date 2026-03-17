export function Card({ children, className = '', onClick }) {
  return (
    <div
      className={`bg-white rounded-3xl shadow-md p-4 ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
