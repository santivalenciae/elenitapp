import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '../config/supabaseClient'

// Genera un UUID simple
function genId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

export const useAuthStore = create(
  persist(
    (set, get) => ({
      profile: null,   // { id, username, team_id, level, xp, fruitcoins }
      loading: false,

      // Ingreso libre: solo pide nombre de usuario
      enter: async (username) => {
        set({ loading: true })
        const id = genId()
        const newProfile = { id, username, team_id: null, level: 1, xp: 0, fruitcoins: 0 }

        const { error } = await supabase.from('profiles').insert(newProfile)
        if (error) { set({ loading: false }); throw error }

        set({ profile: newProfile, loading: false })
      },

      setTeam: async (teamId) => {
        const profile = get().profile
        if (!profile) return
        await supabase.from('profiles').update({ team_id: teamId }).eq('id', profile.id)
        set({ profile: { ...profile, team_id: teamId } })
      },

      refreshProfile: async () => {
        const profile = get().profile
        if (!profile) return
        const { data } = await supabase.from('profiles').select('*').eq('id', profile.id).single()
        if (data) set({ profile: data })
      },

      updateProfile: (changes) => {
        set((s) => ({ profile: { ...s.profile, ...changes } }))
      },

      signOut: () => {
        set({ profile: null })
      },
    }),
    {
      name: 'limonaria-player',
      partialize: (state) => ({ profile: state.profile }),
    }
  )
)
