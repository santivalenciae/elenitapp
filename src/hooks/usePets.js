import { useQuery } from '@tanstack/react-query'
import { supabase } from '../config/supabaseClient'
import { useAuthStore } from '../store/useAuthStore'

export function useAllPets() {
  return useQuery({
    queryKey: ['pets-all'],
    queryFn: async () => {
      const { data, error } = await supabase.from('pets').select('*').order('rarity')
      if (error) throw error
      return data
    },
    staleTime: 10 * 60 * 1000,
  })
}

export function useUserPets() {
  const profile = useAuthStore((s) => s.profile)
  return useQuery({
    queryKey: ['user-pets', profile?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_pets')
        .select('*, pets(*)')
        .eq('user_id', profile.id)
      if (error) throw error
      return data
    },
    enabled: !!profile?.id,
  })
}
