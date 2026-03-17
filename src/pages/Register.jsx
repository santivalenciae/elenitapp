import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../config/supabaseClient'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

export default function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
    if (signUpError) { setError(signUpError.message); setLoading(false); return }

    // Create profile
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      username,
      level: 1,
      xp: 0,
      fruitcoins: 0,
    })

    setLoading(false)
    if (profileError) { setError(profileError.message); return }
    navigate('/onboarding')
  }

  return (
    <Card>
      <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">¡Crea tu cuenta! 🌟</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">Tu nombre de aventurero</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-base focus:outline-none focus:border-orange-400"
            placeholder="SuperAventurero123"
            required
            minLength={3}
            maxLength={20}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-base focus:outline-none focus:border-orange-400"
            placeholder="tu@correo.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-base focus:outline-none focus:border-orange-400"
            placeholder="••••••••"
            required
            minLength={6}
          />
        </div>
        {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}
        <Button type="submit" size="lg" disabled={loading} className="w-full bg-orange-500 text-white">
          {loading ? 'Creando cuenta...' : '¡Unirse a la aventura! 🚀'}
        </Button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-4">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-orange-500 font-bold hover:underline">
          Inicia sesión
        </Link>
      </p>
    </Card>
  )
}
