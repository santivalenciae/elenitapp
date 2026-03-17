import { EGG_DROP_RATE } from '../config/constants'

const RARITY_TABLE = [
  { rarity: 'legendary', weight: 1 },
  { rarity: 'epic', weight: 5 },
  { rarity: 'rare', weight: 20 },
  { rarity: 'common', weight: 74 },
]

export function rollEggDrop() {
  return Math.random() < EGG_DROP_RATE
}

export function rollRarity() {
  const total = RARITY_TABLE.reduce((sum, r) => sum + r.weight, 0)
  let roll = Math.random() * total
  for (const entry of RARITY_TABLE) {
    if (roll < entry.weight) return entry.rarity
    roll -= entry.weight
  }
  return 'common'
}

export async function awardEgg(supabase, userId, pets) {
  if (!rollEggDrop()) return null
  const rarity = rollRarity()
  const eligible = pets.filter((p) => p.rarity === rarity)
  if (!eligible.length) return null
  const pet = eligible[Math.floor(Math.random() * eligible.length)]

  const { data: existing } = await supabase
    .from('user_pets')
    .select('id')
    .eq('user_id', userId)
    .eq('pet_id', pet.id)
    .single()

  if (existing) {
    // Duplicate → fruitcoins instead
    const coins = rarity === 'legendary' ? 50 : rarity === 'epic' ? 20 : rarity === 'rare' ? 10 : 5
    await supabase.rpc('add_fruitcoins', { uid: userId, amount: coins })
    return { pet, duplicate: true, coins }
  }

  await supabase.from('user_pets').insert({ user_id: userId, pet_id: pet.id })
  return { pet, duplicate: false }
}
