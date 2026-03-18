import { useQuery } from '@tanstack/react-query'
import { supabase } from '../config/supabaseClient'
import { QUESTIONS_PER_SESSION } from '../config/constants'

// Shuffle array in place (Fisher-Yates)
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function useQuestions(subject, userLevel = 1) {
  const difficulty = Math.min(Math.ceil(userLevel / 3), 3)

  return useQuery({
    queryKey: ['questions', subject, difficulty, Date.now()], // Date.now() forces a fresh fetch every mount
    queryFn: async () => {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('subject', subject)
        .lte('difficulty', difficulty)
      if (error) throw error
      return shuffle(data ?? []).slice(0, QUESTIONS_PER_SESSION)
    },
    enabled: !!subject,
    staleTime: 0,      // never cache — always re-fetch on mount
    gcTime: 0,         // discard from memory immediately after unmount
  })
}
