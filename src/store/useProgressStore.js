import { create } from 'zustand'

export const useProgressStore = create((set, get) => ({
  xp: 0,
  level: 1,
  fruitcoins: 0,
  pendingLevelUp: false,
  pendingEgg: false,

  syncFromProfile: (profile) => {
    if (!profile) return
    set({
      xp: profile.xp ?? 0,
      level: profile.level ?? 1,
      fruitcoins: profile.fruitcoins ?? 0,
    })
  },

  addXP: (amount) => {
    set((state) => {
      const newXP = state.xp + amount
      const xpForNextLevel = state.level * 100
      if (newXP >= xpForNextLevel) {
        return {
          xp: newXP - xpForNextLevel,
          level: state.level + 1,
          fruitcoins: state.fruitcoins + 10,
          pendingLevelUp: true,
        }
      }
      return { xp: newXP }
    })
  },

  addFruitcoins: (amount) => {
    set((state) => ({ fruitcoins: state.fruitcoins + amount }))
  },

  spendFruitcoins: (amount) => {
    set((state) => ({ fruitcoins: Math.max(0, state.fruitcoins - amount) }))
  },

  clearPendingLevelUp: () => set({ pendingLevelUp: false }),
  setPendingEgg: (val) => set({ pendingEgg: val }),
}))
