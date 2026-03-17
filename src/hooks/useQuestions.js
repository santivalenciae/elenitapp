import { useQuery } from '@tanstack/react-query'
import { supabase } from '../config/supabaseClient'
import { QUESTIONS_PER_SESSION } from '../config/constants'

export function useQuestions(subject, userLevel = 1) {
  const difficulty = Math.min(Math.ceil(userLevel / 3), 5)
  return useQuery({
    queryKey: ['questions', subject, difficulty],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('subject', subject)
        .lte('difficulty', difficulty)
        .limit(QUESTIONS_PER_SESSION * 3)
      if (error) throw error
      // Shuffle and pick QUESTIONS_PER_SESSION
      const shuffled = data.sort(() => Math.random() - 0.5)
      return shuffled.slice(0, QUESTIONS_PER_SESSION)
    },
    enabled: !!subject,
    staleTime: 5 * 60 * 1000,
  })
}
