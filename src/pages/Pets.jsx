import { useUserPets, useAllPets } from '../hooks/usePets'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { motion } from 'framer-motion'

const RARITY_ORDER = { legendary: 0, epic: 1, rare: 2, common: 3 }

export default function Pets() {
  const { data: userPets, isLoading } = useUserPets()
  const { data: allPets } = useAllPets()

  const ownedIds = new Set(userPets?.map((up) => up.pet_id) ?? [])

  const sortedAll = [...(allPets ?? [])].sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity])

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-1">Mis Mascotas 🥚</h1>
      <p className="text-gray-500 mb-6">
        {userPets?.length ?? 0} / {allPets?.length ?? '?'} desbloqueadas
      </p>

      {isLoading ? (
        <div className="text-center py-8 text-gray-400 font-bold">Cargando...</div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {sortedAll.map((pet, i) => {
            const owned = ownedIds.has(pet.id)
            return (
              <motion.div
                key={pet.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className={`text-center p-3 ${!owned ? 'opacity-40 grayscale' : ''}`}>
                  <div className="text-4xl mb-1">
                    {pet.sprite_url ? (
                      <img src={pet.sprite_url} alt={pet.name} className="w-12 h-12 mx-auto object-contain" />
                    ) : (
                      '🐾'
                    )}
                  </div>
                  <p className="text-xs font-extrabold text-gray-700 truncate">{pet.name}</p>
                  <Badge rarity={pet.rarity} className="mt-1 text-xs">{pet.rarity}</Badge>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}

      {!isLoading && !allPets?.length && (
        <div className="text-center py-8">
          <div className="text-5xl mb-3">🥚</div>
          <p className="text-gray-500 font-bold">¡Completa lecciones para ganar huevitos!</p>
        </div>
      )}
    </div>
  )
}
