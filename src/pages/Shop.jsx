import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useProgressStore } from '../store/useProgressStore'
import { supabase } from '../config/supabaseClient'
import { useQuery } from '@tanstack/react-query'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Coin } from '../components/ui/Coin'
import { Modal } from '../components/ui/Modal'
import { motion } from 'framer-motion'

function useCosmetics() {
  return useQuery({
    queryKey: ['cosmetics'],
    queryFn: async () => {
      const { data, error } = await supabase.from('cosmetics').select('*')
      if (error) throw error
      return data
    },
    staleTime: 10 * 60 * 1000,
  })
}

export default function Shop() {
  const profile = useAuthStore((s) => s.profile)
  const { fruitcoins, spendFruitcoins } = useProgressStore()
  const { data: cosmetics, isLoading } = useCosmetics()
  const [buying, setBuying] = useState(null)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleBuy(item) {
    if (fruitcoins < item.fruitcoin_price) {
      setError('¡No tienes suficientes Fruitcoins!')
      return
    }
    setError('')
    // Check if already owned
    const { data: existing } = await supabase
      .from('user_cosmetics')
      .select('id')
      .eq('user_id', profile.id)
      .eq('cosmetic_id', item.id)
      .single()

    if (existing) { setError('¡Ya tienes este objeto!'); setBuying(null); return }

    const { error: txError } = await supabase.from('transactions').insert({
      user_id: profile.id,
      type: 'purchase',
      fruitcoins_delta: -item.fruitcoin_price,
      metadata: { cosmetic_id: item.id, name: item.name },
    })
    if (txError) { setError(txError.message); return }

    await supabase.from('user_cosmetics').insert({ user_id: profile.id, cosmetic_id: item.id })
    await supabase.from('profiles').update({ fruitcoins: fruitcoins - item.fruitcoin_price }).eq('id', profile.id)
    spendFruitcoins(item.fruitcoin_price)
    setBuying(null)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2000)
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-1">Tienda 🛒</h1>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-gray-500">Tu saldo:</span>
        <Coin amount={fruitcoins} size="lg" />
      </div>

      {error && <p className="text-red-500 font-bold mb-3 text-center">{error}</p>}

      {isLoading ? (
        <div className="text-center py-8 text-gray-400 font-bold">Cargando tienda...</div>
      ) : !cosmetics?.length ? (
        <div className="text-center py-8">
          <div className="text-5xl mb-3">🛒</div>
          <p className="text-gray-500 font-bold">¡Próximamente más objetos!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {cosmetics.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="text-center">
                {item.preview_url ? (
                  <img src={item.preview_url} alt={item.name} className="w-16 h-16 mx-auto object-contain mb-2" />
                ) : (
                  <div className="text-5xl mb-2">🎨</div>
                )}
                <p className="font-extrabold text-gray-800 text-sm mb-1">{item.name}</p>
                <p className="text-gray-400 text-xs mb-3 capitalize">{item.type}</p>
                <Button
                  size="sm"
                  onClick={() => setBuying(item)}
                  className="w-full bg-[var(--team-color)] text-white"
                >
                  <Coin amount={item.fruitcoin_price} size="sm" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Confirm modal */}
      <Modal open={!!buying} onClose={() => setBuying(null)}>
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="text-xl font-extrabold text-gray-800 mb-2">¿Comprar {buying?.name}?</h3>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-gray-500">Precio:</span>
            <Coin amount={buying?.fruitcoin_price} size="lg" />
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setBuying(null)} className="flex-1">Cancelar</Button>
            <Button onClick={() => handleBuy(buying)} className="flex-1 bg-[var(--team-color)] text-white">Comprar</Button>
          </div>
        </div>
      </Modal>

      {/* Success toast */}
      {success && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg">
          ¡Compra exitosa! 🎉
        </div>
      )}
    </div>
  )
}
